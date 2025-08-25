import { inngest } from "./client";
import { STUDY_MATERIAL_TABLE, STUDY_TYPE_CONTENT_TABLE, USER_TABLE } from "../configs/schema";
import { db } from "../configs/db";
import { eq } from "drizzle-orm";
import { generateNotesAiModel, GenerateQuizAiModel, GenerateStudyTypeContentAiModel } from "../configs/AiModel";
import { CHAPTER_NOTES_TABLE } from "../configs/schema";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);

//USED TO CREATE NEW USER
export const CreateNewUser = inngest.createFunction(
  {id: 'create-user' },
  { event: 'user.create' },
  async ({ event, step }) => {

    const { user } = event.data; // ✅ extract user here
    
    //Get Event Data
    const result = await step.run("Check User and Create New if Not in DB",async () => {
      // Check is User Already Exist
      const result = await db.select().from(USER_TABLE)
      .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress));

        if (result?.length == 0) {
          //IF NOT, THEN ADD TO DB
          const userResponse = await db.insert(USER_TABLE).values({
              name: user?.fullName,
              email: user?.primaryEmailAddress?.emailAddress,
            }).returning({ id: USER_TABLE.id });
            return userResponse;
        }
        return result;
      });

    return 'Success';
  }
);

//USED TO GENERATE NOTES 
export const GenerateNotes = inngest.createFunction(
  { id: "generate-course" },
  { event: "notes.generate" },
  async ({ event, step }) => {
    console.log("=== STARTING NOTES GENERATION ===");
    
    const { course } = event.data;
    
    // Validate course data
    if (!course) {
      console.error("❌ No course data received");
      throw new Error("No course data received");
    }

    if (!course.courseId) {
      console.error("❌ Course ID is missing");
      throw new Error("Course ID is missing");
    }

    // Generate Notes for each chapter with AI
    await step.run("Generate Chapter Notes", async () => {
      const chapters = course?.courseLayout?.chapters;

      // Validate chapters
      if (!chapters) {
        console.error("❌ No chapters found in courseLayout");
        console.log("Available courseLayout keys:", Object.keys(course.courseLayout || {}));
        return "No chapters to process";
      }

      if (!Array.isArray(chapters)) {
        console.error("❌ Chapters is not an array, it's:", typeof chapters);
        console.log("Chapters value:", chapters);
        return "Chapters is not an array";
      }

      console.log(`📚 Processing ${chapters.length} chapters`);

      for (const [index, chapter] of chapters.entries()) {
        try {
          console.log(`🔍 Processing chapter ${index + 1}/${chapters.length}: ${chapter.chapter_title || 'Untitled'}`);
          
          // Validate chapter structure
          if (!chapter.chapter_title) {
            console.warn(`⚠️ Chapter ${index} missing title, skipping`);
            continue;
          }

          const PROMPT = `
            Generate exam material detail content for this chapter.
            Make sure to include all topic points.
            Return in HTML format (no <html>, <head>, <body>, or <title> tags).
            Chapter: ${JSON.stringify(chapter)}
          `;

          console.log("🤖 Sending prompt to AI model...");
          
          // Call AI model
          const result = await generateNotesAiModel.sendMessage(PROMPT);
          const aiResp = result.response.text();
          
          console.log("✅ AI response received, length:", aiResp.length);
          console.log("AI response preview:", aiResp.substring(0, 200) + "...");

          // Validate AI response
          if (!aiResp || aiResp.trim().length === 0) {
            console.error(`❌ Empty AI response for chapter ${index}`);
            continue;
          }

          // Prepare insert data
          const insertData = {
            chapterId: index,
            courseId: course.courseId,
            notes: aiResp,
          };

          console.log("💾 Inserting into database with data:", {
            chapterId: insertData.chapterId,
            courseId: insertData.courseId,
            notesLength: insertData.notes.length
          });

          // Insert into database
          const insertResult = await db.insert(CHAPTER_NOTES_TABLE)
            .values(insertData)
            .returning();

          console.log("✅ Successfully inserted chapter notes:", {
            id: insertResult[0]?.id,
            chapterId: insertResult[0]?.chapterId,
            courseId: insertResult[0]?.courseId
          });
          
        } catch (error) {
          console.error(`❌ Error processing chapter ${index}:`, error);
          console.error("Error message:", error.message);
          console.error("Error stack:", error.stack);
          
          // Don't throw - continue with other chapters
          continue;
        }
      }

      return "Completed";
    });

    // Update Status to 'Ready'
    await step.run("Update course status to Ready", async () => {
      try {
        console.log("🔄 Updating course status to Ready...");
        console.log("Course ID for update:", course.courseId);
        
        const updateResult = await db
          .update(STUDY_MATERIAL_TABLE)
          .set({ status: "Ready" })
          .where(eq(STUDY_MATERIAL_TABLE.courseId, course.courseId))
          .returning();

        console.log("✅ Updated Course Status:", updateResult);
        return "SUCCESS";
      } catch (error) {
        console.error("❌ Error updating course status:", error);
        console.error("Error details:", error.message);
        console.error("Error stack:", error.stack);
        throw error;
      }
    });

    console.log("=== NOTES GENERATION COMPLETED ===");
  }
);

//USED TO CREATE FLASHCARDS | QUIZ | Q/A
export const GenerateStudyTypeContent = inngest.createFunction(
  { id: "generate-study-type-content" },
  { event: "studyType.content" },
  async ({ event, step }) => {
    const { studyType, prompt, courseId,recordId } = event.data;

      const AiResult = await step.run(
        "Generating Flashcard using AI",
        async () => {

          const result = 
          studyType=='Flashcard'?
          await GenerateStudyTypeContentAiModel.sendMessage(prompt):
          await GenerateQuizAiModel.sendMessage(prompt);
          
          try {
            const AIResult = JSON.parse(result.response.text());
            return AIResult;
          } catch (error) {
            throw error;
          }
        }
      )
  
    // Save the result
    const dbResult = await step.run("Save Result to database", async () => {
      const result = await db.update(STUDY_TYPE_CONTENT_TABLE)
      .set({
        content: AiResult,
        status:'Ready'
      }).where(eq(STUDY_TYPE_CONTENT_TABLE.id,recordId))

      return "Data inserted successfully";
    });

    return dbResult;
  }
);