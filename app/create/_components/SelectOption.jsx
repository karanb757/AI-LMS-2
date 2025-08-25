import Image from 'next/image'
import React, { useState } from 'react'

const SelectOption = ({selectedStudyType}) => {
    const Options = [
        {
            name:'Exam',
            icon:'/exam_1.png'
        },
        {
            name:'Job Interview',
            icon:'/job.png'
        },
        {
            name:'Practise',
            icon:'/practice.png'
        },
        {
            name:'Coding Prep',
            icon:'/code.png'
        },
        {
            name:'Other',
            icon:'/knowledge.png'
        }
    ]
    
    const [selectedOption, setSelectedOption] = useState();

    const handleSelection = (optionName) => {
        setSelectedOption(optionName);
        selectedStudyType(optionName);
    };

    return (
        <div>
            <h3 className="text-center mb-6 text-lg font-semibold text-gray-700">
                For which purpose do you want to create your study material?
            </h3>
            <div className='grid grid-cols-2 mt-8 md:grid-cols-3 lg:grid-cols-5 gap-6'>
                {Options.map((option,index)=>(
                    <div key={index} 
                        className={`group bg-white p-6 flex flex-col items-center justify-center rounded-lg shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 border-2
                        ${option?.name === selectedOption 
                            ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 shadow-xl' 
                            : 'border-slate-100 hover:border-blue-200'
                        }`}
                        onClick={() => handleSelection(option.name)}
                    >
                        <div className={`mb-4 p-3 rounded-2xl transition-all duration-300 group-hover:scale-110 ${
                            option?.name === selectedOption 
                                ? 'bg-gradient-to-br from-blue-100 to-purple-100' 
                                : 'bg-gradient-to-br from-slate-50 to-blue-50 group-hover:from-blue-100 group-hover:to-purple-100'
                        }`}>
                            <Image src={option.icon} alt={option.name} width={50} height={50} />
                        </div>
                        <h2 className={`text-sm font-semibold text-center transition-colors duration-300 ${
                            option?.name === selectedOption 
                                ? 'text-blue-600' 
                                : 'text-slate-700 group-hover:text-blue-600'
                        }`}>
                            {option.name}
                        </h2>
                        {option?.name === selectedOption && (
                            <div className="mt-2 w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                        )}
                    </div>
                ))}
            </div>
            
            {selectedOption && (
                <div className="mt-6 text-center">
                    <div className="inline-flex items-center px-4 py-2 bg-green-50 border border-green-200 rounded-full">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-green-800 text-sm font-medium">
                            Selected: {selectedOption}
                        </span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SelectOption