// CourseCardItem.jsx
import { RefreshCw, Calendar, BookOpen, Play, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { Progress } from '../../../components/ui/progress'
import { Button } from '../../../components/ui/button'

export default function CourseCardItem({course}) {
    return (
        <div className='group bg-white rounded-3xl shadow-lg hover:shadow-2xl border border-slate-100 hover:border-blue-200 p-6 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 relative overflow-hidden'>
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className='relative z-10 flex flex-col h-full'>
                {/* Header */}
                <div className='flex justify-between items-start mb-4'>
                    <div className="p-3 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                        <BookOpen className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex items-center px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-xs font-semibold shadow-md">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(course?.createdAt || course?.dateCreated || Date.now()).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                        })}
                    </div>
                </div>

                {/* Course Title */}
                <h2 className='font-bold text-xl text-slate-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300'>
                    {course?.courseLayout?.course_title}
                </h2>
                
                {/* Course Summary */}
                <p className='text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3'>
                    {course?.courseLayout?.course_summary || course?.courseLayout?.summary}
                </p>
        
                {/* Action Button */}
                <div className='flex justify-end mt-auto'>
                    {course?.status=='Generating' ? (
                        <div className='flex items-center px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 rounded-xl border border-amber-200'>
                            <RefreshCw className='h-4 w-4 mr-2 animate-spin'/>
                            <span className="text-sm font-medium">Generating...</span>
                        </div>
                    ) : (
                        <Link href={'/course/'+course?.courseId} className="w-full">
                            <Button className="mt-3 w-full bg-blue-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group">
                                <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                                Continue Learning
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    )}
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-100/50 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-purple-100/50 to-transparent rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
    )
}