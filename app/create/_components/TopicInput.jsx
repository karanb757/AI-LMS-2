import React, { useState } from 'react'
import { Textarea } from "../../../components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../components/ui/select"

const TopicInput = ({setTopic, setDifficultyLevel}) => {
    const [topicValue, setTopicValue] = useState('');
    const [difficultyValue, setDifficultyValue] = useState('');

    const handleTopicChange = (event) => {
        const value = event.target.value;
        setTopicValue(value);
        setTopic(value);
    };

    const handleDifficultyChange = (value) => {
        setDifficultyValue(value);
        setDifficultyLevel(value);
    };

    return (
        <div className='mt-10 w-full flex flex-col space-y-6'>
            {/* Topic Input Section */}
            <div>
                <h2 className='text-lg font-semibold text-gray-800 mb-3'>
                    Enter topic or paste the content for which you want to generate the study material
                </h2>
                <Textarea 
                    className='mt-2 min-h-[120px] resize-none border-2 focus:border-blue-500 transition-colors duration-200' 
                    placeholder='E.g., JavaScript fundamentals, Machine Learning basics, Project Management, etc...'
                    value={topicValue}
                    onChange={handleTopicChange}
                />
                <div className="mt-2 flex items-center justify-between">
                    <span className={`text-sm ${topicValue.trim().length > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                        {topicValue.trim().length > 0 ? '✓ Topic entered' : 'Topic is required'}
                    </span>
                    <span className="text-xs text-gray-400">
                        {topicValue.length}/500
                    </span>
                </div>
            </div>

            {/* Difficulty Level Section */}
            <div>
                <h2 className='text-lg font-semibold text-gray-800 mb-3'>
                    Select the difficulty level
                </h2>
                
                <Select onValueChange={handleDifficultyChange} value={difficultyValue}>
                    <SelectTrigger className={`w-full h-12 border-2 transition-colors duration-200 ${
                        difficultyValue ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-blue-500'
                    }`}>
                        <SelectValue placeholder="Choose difficulty level" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Easy" className="hover:bg-green-50">
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                                <div>
                                    <div className="font-medium">Easy</div>
                                    <div className="text-xs text-gray-500">Basic concepts, simple explanations</div>
                                </div>
                            </div>
                        </SelectItem>
                        <SelectItem value="Moderate" className="hover:bg-yellow-50">
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                                <div>
                                    <div className="font-medium">Moderate</div>
                                    <div className="text-xs text-gray-500">Intermediate level, some complexity</div>
                                </div>
                            </div>
                        </SelectItem>
                        <SelectItem value="Hard" className="hover:bg-red-50">
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                                <div>
                                    <div className="font-medium">Hard</div>
                                    <div className="text-xs text-gray-500">Advanced concepts, detailed analysis</div>
                                </div>
                            </div>
                        </SelectItem>
                    </SelectContent>
                </Select>

                <div className="mt-2">
                    <span className={`text-sm ${difficultyValue ? 'text-green-600' : 'text-gray-400'}`}>
                        {difficultyValue ? `✓ Selected: ${difficultyValue}` : 'Please select difficulty level'}
                    </span>
                </div>
            </div>

            {/* Summary Card */}
            {topicValue.trim() && difficultyValue && (
                <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">Course Preview:</h3>
                    <div className="space-y-1 text-sm">
                        <p><span className="font-medium">Topic:</span> {topicValue.trim()}</p>
                        <p><span className="font-medium">Difficulty:</span> {difficultyValue}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TopicInput