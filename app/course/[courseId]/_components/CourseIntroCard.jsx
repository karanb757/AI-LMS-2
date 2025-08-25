'use client'
import React from 'react'

const CourseIntroCard = ({course}) => {
    
  return (
    <div className='flex gap-5 items-center p-5 border shadow-md rounded-lg'>
        <div className='flex-1 text-center'>
            <h2 className='font-bold text-2xl'>{course?.courseLayout.course_title}</h2>
            <p className='text-gray-400 text-sm mb-3'>{course?.courseLayout?.summary}</p>
            
            {/* Activity Status */}
                <div className='flex gap-2 mt-4 text-xs items-center justify-center mb-3'>
                    <span className='px-2 py-1 rounded bg-gray-100 text-gray-500'>
                        Notes 
                    </span>
                    <span className='px-2 py-1 rounded bg-gray-100 text-gray-500'>
                        Flashcards 
                    </span>
                    <span className='px-2 py-1 rounded bg-gray-100 text-gray-500'>
                        Quiz 
                    </span>
                    <span className='px-2 py-1 rounded bg-gray-100 text-gray-500'>
                        Q&A 
                    </span>
                </div>


            <h2 className='text-lg text-primary'>Total Chapters : {course?.courseLayout?.chapters?.length}</h2>
        </div>
    </div>
  )
}

export default CourseIntroCard

