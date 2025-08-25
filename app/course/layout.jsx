'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import Navbar from '../components/Navbar'


const CourseViewLayout = ({children}) => {
  const pathname = usePathname()
  
  // Check if we're on the notes page
  const isNotesPage = pathname?.includes('/notes')
  
  return (
    <div>
      <Navbar />
      <div className={isNotesPage ? '' : 'mx-10 md:mx-36 lg:px-60 mt-10'}>
        {children}
      </div>
    </div>
  )
}

export default CourseViewLayout