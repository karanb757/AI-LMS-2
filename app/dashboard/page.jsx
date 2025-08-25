import Navbar from '../components/Navbar'
import CourseList from './_components/CourseList'
import React from 'react'

const Dashboard = () => {
    return (
        <div className="min-h-screen">
            <CourseList/>
        </div>
    )
}

export default Dashboard