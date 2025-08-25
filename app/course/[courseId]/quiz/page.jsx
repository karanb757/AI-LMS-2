'use client'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import StepProgress from '../_components/StepProgress'
import QuizCardItem from './_components/QuizCardItem'

const Quiz = () => {
    const { courseId } = useParams(); 
    const [quizData, setQuizData] = useState(null);
    const [quiz, setQuiz] = useState([]); // Initialize as empty array
    const [stepCount, setStepCount] = useState(0);
    const [iscorrectAns, setIsCorrectAns] = useState(null);
    const [correctAns, setCorrectAns] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        GetQuiz();
    }, [courseId]);

    const GetQuiz = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const result = await axios.post('/api/study-type', {
                courseId: courseId,
                studyType: 'Quiz'
            });
            
            setQuizData(result.data);
            
            // Handle different response structures
            if (result.data?.content && Array.isArray(result.data.content) && result.data.content.length > 0) {
                console.log('✅ Setting quiz data from content array');
                setQuiz(result.data.content);
            } else if (result.data?.content && typeof result.data.content === 'object' && result.data.content.questions) {
                console.log('✅ Setting quiz data from content.questions');
                setQuiz(result.data.content.questions);
            } else if (Array.isArray(result.data) && result.data.length > 0) {
                console.log('✅ Setting quiz data from direct array response');
                setQuiz(result.data);
            } else {
                console.log('❌ No quiz content found, setting empty array');
                setQuiz([]);
            }
            
        } catch (error) {
            console.error('❌ Error fetching quiz:', error);
            console.error('Error message:', error.message);
            console.error('Error response:', error.response?.data);
            setError('Failed to load quiz data');
            setQuiz([]);
        } finally {
            setLoading(false);
        }
    };

    const checkAnswer = (userAnswer, currentQuestion) => {
        console.log('=== ANSWER CHECK DEBUG ===');
        console.log('User answer:', userAnswer);
        console.log('Current question:', currentQuestion);
        console.log('Correct answer:', currentQuestion?.correctAnswer);
        console.log('Match:', userAnswer === currentQuestion?.correctAnswer);
        
        if (userAnswer === currentQuestion?.correctAnswer) {
            setIsCorrectAns(true);
            setCorrectAns(currentQuestion?.correctAnswer);
            return;
        }
        setIsCorrectAns(false);
        setCorrectAns(currentQuestion?.correctAnswer);
    };

    const generateQuiz = async () => {
        try {
            setLoading(true);
            console.log('🚀 Generating new quiz...');
            
            // First get course data to extract chapters
            const courseResult = await axios.get(`/api/courses?courseId=${courseId}`);
            const course = courseResult.data?.result;
            
            let chapters = '';
            if (course?.courseLayout?.chapters) {
                course.courseLayout.chapters.forEach(chapter => {
                    const chapterTitle = chapter.chapter_title || chapter?.chapterTitle || '';
                    if (chapterTitle) {
                        chapters += chapterTitle + ',';
                    }
                });
            }

            console.log('Chapters for generation:', chapters);

            // Generate quiz
            const generateResult = await axios.post('/api/study-type-content', {
                courseId: courseId,
                type: 'Quiz',
                chapters: chapters
            });

            console.log('Generate result:', generateResult.data);

            // Poll for completion
            const pollForCompletion = async (attempts = 0) => {
                if (attempts > 10) { // Max 10 attempts (20 seconds)
                    throw new Error('Quiz generation timed out');
                }

                await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds

                const result = await axios.post('/api/study-type', {
                    courseId: courseId,
                    studyType: 'Quiz'
                });

                console.log(`Polling attempt ${attempts + 1}:`, result.data?.status);

                if (result.data?.status === 'Ready' && result.data?.content) {
                    setQuizData(result.data);
                    setQuiz(Array.isArray(result.data.content) ? result.data.content : []);
                    setLoading(false);
                    return;
                }

                // Continue polling
                return pollForCompletion(attempts + 1);
            };

            await pollForCompletion();

        } catch (error) {
            console.error('❌ Error generating quiz:', error);
            setError('Failed to generate quiz');
            setLoading(false);
        }
    };

    useEffect(() => {
        setCorrectAns(null);
        setIsCorrectAns(null);
    }, [stepCount]);

    // Loading state
    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p>Loading quiz...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="text-center p-8 border rounded-lg bg-red-50">
                <p className="text-red-600 mb-4">{error}</p>
                <button 
                    onClick={GetQuiz}
                    className="bg-primary text-white px-4 py-2 rounded mr-2"
                >
                    Try Again
                </button>
                <button 
                    onClick={generateQuiz}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Generate Quiz
                </button>
            </div>
        );
    }

    return (
        <div>
            <h2 className="font-bold text-2xl text-center mb-4 mt-36">Quiz</h2>

            {/* Check if quiz has data and current question exists */}
            {quiz && quiz.length > 0 && quiz[stepCount] ? (
                <>
                    <StepProgress
                        data={quiz}
                        stepCount={stepCount}
                        setStepCount={(value) => {
                            if (value >= 0 && value < quiz.length) {
                                setStepCount(value);
                            }
                        }}
                    />

                    <div >
                        <QuizCardItem
                            quiz={quiz[stepCount]}
                            userSelectedOption={(v) => checkAnswer(v, quiz[stepCount])}
                        />
                    </div>

                    {/* Answer feedback */}
                    {iscorrectAns === false && (
                        <div className='border p-3 border-red-700 bg-red-200 rounded-lg mt-4'>
                            <h2 className='font-bold text-lg text-red-600'>Incorrect</h2>
                            <p className='text-red-600'>Correct Answer is: {correctAns}</p>
                        </div>
                    )}

                    {iscorrectAns === true && (
                        <div className='border p-3 border-green-700 bg-green-200 rounded-lg mt-4'>
                            <h2 className='font-bold text-lg text-green-600'>Correct!</h2>
                            <p className='text-green-600'>Your Answer is Correct</p>
                        </div>
                    )}
                </>
            ) : (
                // No quiz data available
                <div className="text-center p-8 border rounded-lg">
                    {quizData?.status === 'Generating' ? (
                        <div>
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                            <p className="text-gray-600 mb-4">Generating quiz questions...</p>
                            <p className="text-sm text-gray-500">This may take a minute.</p>
                        </div>
                    ) : (
                        <div>
                            <p className="text-gray-500 mb-4">No quiz questions available yet.</p>
                            <button 
                                onClick={generateQuiz}
                                className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 mr-2"
                                disabled={loading}
                            >
                                {loading ? 'Generating...' : 'Generate Quiz'}
                            </button>
                            <button 
                                onClick={GetQuiz}
                                className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
                            >
                                Refresh
                            </button>
                        </div>
                    )}
                </div>
            )}

        </div>
    );
};

export default Quiz;

