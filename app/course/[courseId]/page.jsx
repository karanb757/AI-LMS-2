"use client"
import axios from 'axios';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import CourseIntroCard from './_components/CourseIntroCard';
import StudyMaterialSection from './_components/StudyMaterialSection';
import ChapterList from './_components/ChapterList';

const Course = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (courseId) {
            GetCourse();
        }
    }, [courseId]);

    const GetCourse = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const result = await axios.get('/api/courses?courseId=' + courseId);
            
            if (result.data?.result) {
                // If courseLayout is a string, parse it to JSON
                if (typeof result.data.result.courseLayout === 'string') {
                    try {
                        result.data.result.courseLayout = JSON.parse(result.data.result.courseLayout);
                    } catch (parseError) {
                        console.error("Failed to parse courseLayout:", parseError);
                        setError("Invalid course data format");
                        return;
                    }
                }
                
                setCourse(result.data.result);
            } else {
                setError("No course data found");
            }
        } catch (error) {
            console.error("Error fetching course:", error);
            setError("Failed to fetch course data");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div>
                <div>
                    <div className='flex items-center justify-center h-64'>
                        <div className='text-center'>
                            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4'></div>
                            <p className='text-gray-500'>Loading course details...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <div>
                    <div className='text-center p-8 border rounded-lg bg-red-50'>
                        <div className='text-red-600 text-xl mb-4'>⚠️</div>
                        <p className='text-red-600 font-semibold mb-4'>Error: {error}</p>
                        <button 
                            onClick={GetCourse}
                            className='bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 transition-colors'
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!course) {
        return (
            <div>
                <div>
                    <div className='text-center p-8 border rounded-lg'>
                        <p className='text-gray-500'>No course data available</p>
                        <button 
                            onClick={GetCourse}
                            className='mt-4 bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 transition-colors'
                        >
                            Reload
                        </button>
                    </div>
                </div>
            </div>
        );
    }


    return (
        <div>
            <div className='pt-20'>
                <CourseIntroCard course={course} />
                <StudyMaterialSection courseId={courseId} course={course}/>
                <ChapterList course={course}/>
            </div>
        </div>
    );
}

export default Course;

