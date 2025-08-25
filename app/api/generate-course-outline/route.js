import { courseOutlineAIModel } from "../../../configs/AiModel";
import { STUDY_MATERIAL_TABLE } from "../../../configs/schema";
import { db } from "../../../configs/db";
import { inngest } from "../../../inngest/client.js";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {    
    const requestBody = await req.json();    
    const { courseId, topic, courseType, difficultyLevel, createdBy } = requestBody;

    console.log("Received request:", { courseId, topic, courseType, difficultyLevel, createdBy });

    // ✅ Enhanced Input validation
    if (!courseId) {
      console.error("❌ Missing courseId");
      return NextResponse.json({ 
        success: false, 
        error: "Course ID is required" 
      }, { status: 400 });
    }

    if (!topic || typeof topic !== 'string' || topic.trim().length === 0) {
      console.error("❌ Invalid topic");
      return NextResponse.json({ 
        success: false, 
        error: "Valid topic is required" 
      }, { status: 400 });
    }

    if (!courseType) {
      console.error("❌ Missing courseType");
      return NextResponse.json({ 
        success: false, 
        error: "Course type is required" 
      }, { status: 400 });
    }

    if (!difficultyLevel || !['Easy', 'Moderate', 'Hard'].includes(difficultyLevel)) {
      console.error("❌ Invalid difficulty level");
      return NextResponse.json({ 
        success: false, 
        error: "Valid difficulty level is required (Easy, Moderate, or Hard)" 
      }, { status: 400 });
    }

    if (!createdBy) {
      console.error("❌ Missing createdBy");
      return NextResponse.json({ 
        success: false, 
        error: "User information is required" 
      }, { status: 400 });
    }

    // Sanitize topic input
    const sanitizedTopic = topic.trim();
    
    // Enhanced prompt for better AI response
    const PROMPT = `Generate a comprehensive study material for the topic "${sanitizedTopic}" designed for ${courseType}, with ${difficultyLevel} difficulty level. 

    Please provide a structured JSON response with the following format:
    {
      "course_title": "Clear, descriptive title",
      "summary": "Brief overview of what the course covers",
      "chapters": [
        {
          "chapter_title": "Chapter name",
          "chapter_summary": "What this chapter covers",
          "emoji_icon": "📚",
          "topics": ["topic1", "topic2", "topic3"]
        }
      ]
    }
    
    Requirements:
    - Create exactly 3 chapters maximum
    - Each chapter should have 3-5 relevant topics
    - Use appropriate emoji icons for each chapter
    - Ensure content matches the ${difficultyLevel} difficulty level
    - Make it suitable for ${courseType} preparation
    
    Respond ONLY with valid JSON format.`;
    
    console.log("Sending prompt to AI:", PROMPT);
    
    // ✅ Generate course layout using AI with error handling
    let aiResp;
    try {
      aiResp = await courseOutlineAIModel.sendMessage(PROMPT);
      console.log("✅ AI response received");
    } catch (aiError) {
      console.error("❌ AI Model Error:", aiError);
      return NextResponse.json({ 
        success: false, 
        error: "AI service is currently unavailable. Please try again." 
      }, { status: 503 });
    }
    
    const aiText = aiResp.response.text();
    console.log("Raw AI response:", aiText);
    
    let aiResult;
    try {
      // Clean the AI response to ensure it's valid JSON
      let cleanedText = aiText.trim();
      
      // Remove any markdown code blocks if present
      if (cleanedText.startsWith('```json')) {
        cleanedText = cleanedText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (cleanedText.startsWith('```')) {
        cleanedText = cleanedText.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }
      
      aiResult = JSON.parse(cleanedText);
      
      // Validate the AI response structure
      if (!aiResult.course_title || !aiResult.summary || !Array.isArray(aiResult.chapters)) {
        throw new Error("Invalid AI response structure");
      }
      
      // Ensure we have valid chapters
      if (aiResult.chapters.length === 0 || aiResult.chapters.length > 3) {
        throw new Error("Invalid number of chapters");
      }
      
      // Validate each chapter
      aiResult.chapters.forEach((chapter, index) => {
        if (!chapter.chapter_title || !chapter.chapter_summary) {
          throw new Error(`Invalid chapter structure at index ${index}`);
        }
        // Ensure emoji_icon exists
        if (!chapter.emoji_icon) {
          chapter.emoji_icon = "📚";
        }
        // Ensure topics exist
        if (!Array.isArray(chapter.topics)) {
          chapter.topics = ["Topic 1", "Topic 2", "Topic 3"];
        }
      });
      
    } catch (parseError) {
      console.error("❌ JSON Parse Error:", parseError);
      console.error("❌ Raw AI Text:", aiText);
      
      // Fallback: Create a basic course structure
      aiResult = {
        course_title: `${sanitizedTopic} - ${courseType} Preparation`,
        summary: `A comprehensive ${difficultyLevel.toLowerCase()} level course covering ${sanitizedTopic} for ${courseType}.`,
        chapters: [
          {
            chapter_title: `Introduction to ${sanitizedTopic}`,
            chapter_summary: `Basic concepts and fundamentals of ${sanitizedTopic}`,
            emoji_icon: "📚",
            topics: ["Overview", "Key Concepts", "Getting Started"]
          },
          {
            chapter_title: `Core ${sanitizedTopic} Topics`,
            chapter_summary: `In-depth coverage of main topics in ${sanitizedTopic}`,
            emoji_icon: "🔍",
            topics: ["Advanced Concepts", "Practical Applications", "Case Studies"]
          },
          {
            chapter_title: `Practice and Application`,
            chapter_summary: `Hands-on practice and real-world applications`,
            emoji_icon: "💪",
            topics: ["Exercises", "Projects", "Review"]
          }
        ]
      };
      
      console.log("Using fallback course structure");
    }

    // ✅ Save to database with error handling
    let dbResult;
    try {
      dbResult = await db.insert(STUDY_MATERIAL_TABLE).values({
        courseId: courseId,
        courseType: courseType,
        createdBy: createdBy,
        topic: sanitizedTopic,
        courseLayout: aiResult,
        difficultyLevel: difficultyLevel,
        status: 'Generating' // Add status field
      }).returning();

      console.log("✅ DB insert successful");
      console.log("Inserted record:", dbResult[0]);
    } catch (dbError) {
      console.error("❌ Database Error:", dbError);
      return NextResponse.json({ 
        success: false, 
        error: "Failed to save course. Please try again." 
      }, { status: 500 });
    }

    // ✅ Trigger the Inngest Function to generate chapter Notes
    try {
      console.log("🚀 Triggering Inngest function 'notes.generate'...");
      const inngestResult = await inngest.send({
        name: 'notes.generate',
        data: {
          course: {
            courseId: dbResult[0].courseId,
            courseLayout: dbResult[0].courseLayout,
            topic: dbResult[0].topic,
            difficultyLevel: dbResult[0].difficultyLevel,
            courseType: dbResult[0].courseType,
            createdBy: dbResult[0].createdBy
          }
        }
      });
      
      console.log("✅ Inngest function triggered successfully");
      
      return NextResponse.json({ 
        success: true, 
        result: dbResult[0],
        inngestEventId: inngestResult.ids?.[0],
        message: "Course created successfully! Content is being generated."
      }, { status: 200 });
      
    } catch (inngestError) {
      console.error("❌ Inngest Error:", inngestError);
      
      // Even if Inngest fails, the course was created, so return success
      // but mention that background processing might be delayed
      return NextResponse.json({ 
        success: true, 
        result: dbResult[0],
        warning: "Course created but background processing may be delayed.",
        message: "Course created successfully!"
      }, { status: 200 });
    }
      
  } catch (error) {
    console.error("❌ Unexpected Error:", error);
    return NextResponse.json({ 
      success: false, 
      error: "An unexpected error occurred. Please try again.",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 });
  }
}