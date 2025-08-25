import React, { useState } from 'react'

const QuizCardItem = ({ quiz, userSelectedOption }) => {
    const [selectedOption, setSelectedOption] = useState();

    if (!quiz) {
        return <div>No quiz data available</div>;
    }

    return (
        <div className='mt-10 p-5'>
            <h2 className='font-medium text-center text-3xl mb-6'>
                {quiz?.question}
            </h2>
           
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-6'>
                {quiz.options?.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setSelectedOption(option);
                            userSelectedOption(option);
                        }}
                        className={`w-full border rounded-full p-3 px-4 text-center 
                            text-lg hover:bg-gray-200 cursor-pointer transition-colors
                            ${selectedOption === option 
                                ? 'bg-primary text-white hover:bg-primary/90' 
                                : 'bg-white hover:bg-gray-100'
                            }`}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default QuizCardItem;