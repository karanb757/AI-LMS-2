import { CHAPTER_NOTES_TABLE, STUDY_TYPE_CONTENT_TABLE } from "../../../configs/schema";
import { NextResponse } from "next/server";
import { db } from "../../../configs/db"; 
import { eq, and } from "drizzle-orm";

export async function POST(req){
    try {
        const {courseId, studyType} = await req.json();

        console.log("=== API DEBUG START ===");
        console.log("Received request:", { courseId, studyType });

        // Validate input
        if (!courseId) {
            console.log("❌ Missing courseId");
            return NextResponse.json({ error: "courseId is required" }, { status: 400 });
        }

        if (studyType === 'ALL') {
            console.log("📚 Fetching ALL study types");
            
            const notes = await db.select().from(CHAPTER_NOTES_TABLE)
                .where(eq(CHAPTER_NOTES_TABLE.courseId, courseId));

            const contentList = await db.select().from(STUDY_TYPE_CONTENT_TABLE)
                .where(eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId));

            console.log("Notes found:", notes?.length || 0);
            console.log("Content list found:", contentList?.length || 0);

            const result = {
                notes: notes,
                Flashcard: contentList?.filter(item => item.type === 'Flashcard'),
                quiz: contentList?.filter(item => item.type === 'Quiz'),
                qa: contentList?.filter(item => item.type === 'QA'),
            };
            
            console.log("Returning ALL result:", JSON.stringify(result, null, 2));
            return NextResponse.json(result);
        }
        else if (studyType === 'notes') {
            console.log("📖 Fetching notes only");
            
            const notes = await db.select().from(CHAPTER_NOTES_TABLE)
                .where(eq(CHAPTER_NOTES_TABLE.courseId, courseId));

            console.log("Notes found:", notes?.length || 0);
            console.log("Notes data:", JSON.stringify(notes, null, 2));
            
            return NextResponse.json(notes);
        }
        else {
            console.log(`🎯 Fetching specific study type: ${studyType}`);
            console.log("Query conditions:", {
                courseId: courseId,
                type: studyType
            });

            const result = await db.select().from(STUDY_TYPE_CONTENT_TABLE)
                .where(and(
                    eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId),
                    eq(STUDY_TYPE_CONTENT_TABLE.type, studyType)
                ));

            console.log("=== STUDY TYPE QUERY RESULT ===");
            console.log("Raw result:", JSON.stringify(result, null, 2));
            console.log("Result length:", result?.length || 0);
            console.log("First item:", result?.[0]);
            
            if (result && result.length > 0) {
                console.log("✅ Found data, returning first item");
                console.log("Returning:", JSON.stringify(result[0], null, 2));
                return NextResponse.json(result[0]);
            } else {
                console.log("❌ No data found, returning empty object");
                return NextResponse.json({
                    id: null,
                    courseId: courseId,
                    content: null,
                    type: studyType,
                    status: 'Not Found'
                });
            }
        }
    } 
    catch (error) {
        console.error("❌ ERROR in /api/study-type:", error);
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
        return NextResponse.json(
            { error: "Internal server error", details: error.message },
            { status: 500 }
        );
    }
}