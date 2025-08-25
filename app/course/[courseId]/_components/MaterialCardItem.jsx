import { Button } from '../../../../components/ui/button'
import { RefreshCcw } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

const MaterialCardItem = ({item,studyTypeContent,course,refreshData}) => {

  const [loading,setLoading]=useState(false);

  const GenerateContent = async ()=>{
    
    // toast('Generating Your content .... ');
    setLoading(true)
    let chapters=''
    course?.courseLayout.chapters.forEach(chapter=>{
      chapters=(chapter.chapter_title||chapter?.chapterTitle)+','+chapters
    })
    
    const result = await axios.post('/api/study-type-content',{
      courseId:course?.courseId,
      type:item.name,
      chapters:chapters
    })

    setLoading(false);
    console.log(result);
    refreshData(); // Call refreshData to update the UI
  }

  return (
    <div className="border shadow-md rounded-lg p-5 flex flex-col h-full relative">
      <Link href={`/course/${course?.courseId}${item.path}`} className="flex-grow">
        <div className="flex flex-col items-center cursor-pointer transition-all duration-300 hover:scale-105">
          <h2 className="p-1 px-2 bg-green-500 text-white rounded-full text-[10px] mb-2">
            Generate
          </h2>
          <Image src={item.icon} alt={item.name} width={50} height={50} />
          <h2 className="font-medium mt-3">{item.name}</h2>
          <p className="text-gray-500 text-sm text-center">{item.desc}</p>
        </div>
      </Link>
    
      <div className="mt-4 pt-4 ">
      <Link href={`/course/${course?.courseId}${item.path}`}>
        <Button className="w-full hover:bg-[#21C55D] hover:text-white" variant="outline">
          Generate
        </Button>
      </Link>
    </div>
  </div>
  )
}

export default MaterialCardItem