import React, { useEffect, useState } from 'react'
import MaterialCardItem from './MaterialCardItem'
import axios from 'axios'

const StudyMaterialSection = ({courseId,course}) => {

    const [studyTypeContent,setstudyTypeContent]=useState();

    const MaterialList=[
        {
            name:'Notes/Chapters',
            desc:'Read notes to prepare it',
            icon:'/notes.png',
            path:'/notes',
            type:'notes'
        },
        {
            name:'Flashcard',
            desc:'Flash card help to remember the concepts',
            icon:'/flashcard.png',
            path:'/flashcards',
            type:'Flashcard'
        },
        {
            name:'Quiz',
            desc:'Great way to test your knowledge',
            icon:'/quiz.png',
            path:'/quiz',
            type:'quiz'
        },
        {
            name:'Question/Answer',
            desc:'Help to practice your language',
            icon:'/qa.png',
            path:'/qa',
            type:'qa'
        },
    ]

    useEffect(()=>{
        GetStudyMaterial();
    },[courseId])

    const GetStudyMaterial = async () => {
        try {
            const result = await axios.post('/api/study-type', {
                courseId: courseId,
                studyType: 'ALL'    
            });
            console.log('Study material result:', result?.data);
            setstudyTypeContent(result.data);
        } catch (error) {
            console.error('Error fetching study material:', error);
        }
    }

  return (
    <div className='mt-5'>
        <h2 className='font-medium text-xl'>Study Material</h2>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-5 mt-3 '>    
            {MaterialList.map((item,index)=>(
                <MaterialCardItem item={item} key={index}
                    studyTypeContent={studyTypeContent}
                    course={course}
                    refreshData={GetStudyMaterial}
                />
            ))}
        </div>
    </div>
  )
}

export default StudyMaterialSection