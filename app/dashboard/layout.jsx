"use client"
import React, { useState } from 'react'
import SideBar from './_components/SideBar'
import { CourseCountContext } from '../_context/CourseCountContext'

function DashboardLayout({children}) {
  
  const [totalCourse,setTotalCourse]=useState(0);

  return (
    <CourseCountContext.Provider value={{totalCourse,setTotalCourse}}>
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div className='md:w-60 hidden md:block fixed h-screen z-10'>
            <SideBar/>
        </div>
        <div className='md:ml-60 min-h-screen'>
            <div className='p-6 md:p-10'>
                {children}
            </div>
        </div>
    </div>
    </CourseCountContext.Provider>
  )
}

export default DashboardLayout

