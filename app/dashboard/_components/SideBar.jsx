"use client"
import React, { useContext } from 'react'
import { Button } from '../../../components/ui/button.jsx'
import { HomeIcon, LayoutDashboard, Shield, UserCircle } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Progress } from '../../../components/ui/progress'
import Link from 'next/link'
import { CourseCountContext } from '../../_context/CourseCountContext.jsx'
import { useRouter } from 'next/navigation';

function SideBar() {

  const MenuList=[
    {
      name:'Home',
      icon:HomeIcon,
      path:'/'
    },
    {
      name:'Dashboard',
      icon:LayoutDashboard,
      path:'/dashboard'
    },
    {
      name:'Upgrade',
      icon:Shield,
      path:'/dashboard/upgrade'
    },
    {
      name:'Profile',
      icon:UserCircle,
      path:'/dashboard/profile'
    }
  ]

  const {totalCourse,setTotalCourse}=useContext(CourseCountContext);
  const path = usePathname();

  const router = useRouter();

  return (
    <div className='h-full w-60 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 shadow-xl border-r border-slate-100 p-4 flex flex-col overflow-y-auto'>
        {/* Logo Section */}
        <div className='flex gap-2 items-center justify-center mt-6 mb-8'>
            <h2 onClick={() => router.push('/')} className='font-extrabold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent cursor-pointer'>AI-LMS</h2>
        </div>

        {/* Navigation Menu */}
        <div className='flex-1 space-y-3'>
          {MenuList.map((menu,index)=>(
            <Link href={menu.path} key={index} className='w-full' >
              <div className={`flex gap-3 w-full h-11 mb-2 rounded-xl items-center cursor-pointer transition-all duration-300 px-3
                ${path==menu.path 
                  ? 'bg-blue-600  gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-85 pt-2 pb-2' 
                  : 'hover:bg-white hover:shadow-md text-slate-700 hover:text-blue-600 border border-transparent hover:border-slate-200'
                }`}>
                <menu.icon className={`w-5 h-5 shrink-0 transition-colors duration-300 ${
                  path==menu.path 
                    ? 'text-white' 
                    : 'text-slate-500'
                }`} />
                <h2 className={`text-base font-medium transition-colors duration-300 ${
                  path==menu.path 
                    ? 'text-white' 
                    : 'text-slate-700'
                }`}>
                     {menu.name}
                </h2>
              </div>
            </Link>
          ))}
        </div>

        {/* Credits Section */}
        <div className='bg-white/70 backdrop-blur-lg border border-slate-200 p-4 rounded-2xl shadow-xl mt-4'>
          <h2 className='text-base mb-2 font-semibold text-slate-800'>Available Credits: {(5-totalCourse)}</h2>
          <Progress value={(totalCourse/5)*100} className='mb-3 h-2'/>
          <h2 className='text-sm text-slate-600 mb-3'>{totalCourse} Out of 5 Credits Used</h2>

          <Link href={'/dashboard/upgrade'} className='block'>
            <Button variant='outline' className='w-full h-9 rounded-xl border-2 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 font-medium text-sm shadow-md hover:shadow-lg transform hover:scale-105'>
              Upgrade to Create More
            </Button>
          </Link>
        </div>
    </div>
  )
}

export default SideBar 