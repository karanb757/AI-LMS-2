import { STUDY_TYPE_CONTENT_TABLE } from "../../../configs/schema";
import { NextResponse } from "next/server";
import { db } from "../../../configs/db"; 
import { inngest } from "../../../inngest/client";

export async function POST(req){
    const {chapters,courseId,type}=await req.json();

    const PROMPT = type === 'Flashcard' ? 
    'Generate the flashcard on topic : '+chapters+' in JSON Format with front back content, Maximum 15'
    : 'Generate Quiz on topic : '+chapters+' with quizTitle Questions and Options along with correct answer in JSON format (Max 10)'

    //Insert Record To DB,updata tehe status to Generating ....
    const result = await db.insert(STUDY_TYPE_CONTENT_TABLE).values({
        courseId:courseId,
        type:type
    }).returning({id:STUDY_TYPE_CONTENT_TABLE.id})

    //Trigger Inngest Function 
    inngest.send({
        name:'studyType.content',
        data:{
            studyType:type,
            prompt:PROMPT,
            courseId:courseId,
            recordId:result[0].id
        }
    }) 

    return NextResponse.json(result[0].id)
}

