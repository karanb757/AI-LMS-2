"use client"
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import FlashCardItem from './_components/FlashCardItem'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../../../../components/ui/carousel"

const Flashcards = () => {
    const { courseId } = useParams();
    const router = useRouter();
    const [flashcards, setFlashCards] = useState([])
    const [isFlipped, setIsFlipped] = useState(false);
    const [api, setApi] = useState()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [generating, setGenerating] = useState(false);

    useEffect(() => {
        getFlashCards();
    }, [courseId]);

    useEffect(() => {
        if (!api) return;
        api.on('select', () => {
            setIsFlipped(false);
        });
    }, [api]);

    const getFlashCards = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const result = await axios.post('/api/study-type', {
                courseId: courseId,
                studyType: 'Flashcard'
            });

            console.log('Flashcard API response:', result.data);
            
            // Based on your API structure, it seems to return an array of flashcards
            if (Array.isArray(result.data) && result.data.length > 0) {
                setFlashCards(result.data);
            } 
            // Or if it returns an object with flashcard array
            else if (result.data?.flashCard && Array.isArray(result.data.flashCard)) {
                setFlashCards(result.data.flashCard);
            }
            // Or if it returns content array
            else if (result.data?.content && Array.isArray(result.data.content)) {
                setFlashCards(result.data.content);
            }
            else {
                setFlashCards([]);
                console.log('No flashcards found or empty array');
            }
        } catch (error) {
            console.error('Error fetching flashcards:', error);
            setError('Failed to load flashcards');
        } finally {
            setLoading(false);
        }
    }

    const handleGenerateFlashcards = async () => {
        setGenerating(true);
        try {
            // First, check if flashcards already exist
            const existingResult = await axios.post('/api/study-type', {
                courseId: courseId,
                studyType: 'Flashcard'
            });

            let existingFlashcards = [];
            
            if (Array.isArray(existingResult.data)) {
                existingFlashcards = existingResult.data;
            } else if (existingResult.data?.flashCard) {
                existingFlashcards = existingResult.data.flashCard;
            } else if (existingResult.data?.content) {
                existingFlashcards = existingResult.data.content;
            }

            if (existingFlashcards.length > 0) {
                // Flashcards already exist, just use them
                setFlashCards(existingFlashcards);
                setGenerating(false);
                return;
            }

            // If no flashcards exist, generate them
            let chapters = '';
            
            // Get course data to extract chapters
            const courseResult = await axios.get(`/api/courses?courseId=${courseId}`);
            const course = courseResult.data?.result;
            
            if (course?.courseLayout?.chapters) {
                course.courseLayout.chapters.forEach(chapter => {
                    const chapterTitle = chapter.chapter_title || chapter?.chapterTitle || '';
                    if (chapterTitle) {
                        chapters += chapterTitle + ',';
                    }
                });
            }

            // Generate flashcards
            await axios.post('/api/study-type-content', {
                courseId: courseId,
                type: 'Flashcard',
                chapters: chapters
            });

            // Poll for completion - check every 2 seconds
            const checkStatus = async () => {
                try {
                    const result = await axios.post('/api/study-type', {
                        courseId: courseId,
                        studyType: 'Flashcard'
                    });
                    
                    let newFlashcards = [];
                    
                    if (Array.isArray(result.data)) {
                        newFlashcards = result.data;
                    } else if (result.data?.flashCard) {
                        newFlashcards = result.data.flashCard;
                    } else if (result.data?.content) {
                        newFlashcards = result.data.content;
                    }
                    
                    if (newFlashcards.length > 0) {
                        setFlashCards(newFlashcards);
                        setGenerating(false);
                    } else {
                        // Continue polling
                        setTimeout(checkStatus, 2000);
                    }
                } catch (error) {
                    console.error('Error checking status:', error);
                    // Continue polling even if there's an error
                    setTimeout(checkStatus, 2000);
                }
            };

            // Start polling
            setTimeout(checkStatus, 2000);

        } catch (error) {
            console.error('Error generating flashcards:', error);
            setError('Failed to generate flashcards');
            setGenerating(false);
        }
    }

    const handleClick = () => {
        setIsFlipped(!isFlipped);
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p>Loading flashcards...</p>
                </div>
            </div>
        );
    }

    if (generating) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p>Generating flashcards... This may take a minute.</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-8 border rounded-lg bg-red-50">
                <p className="text-red-600 mb-4">{error}</p>
                <button 
                    onClick={getFlashCards}
                    className="bg-primary text-white px-4 py-2 rounded mr-2"
                >
                    Try Again
                </button>
                <button 
                    onClick={() => router.back()}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="p-6 text-center mt-36">

            <h2 className="font-bold text-2xl mb-2">Flashcards</h2>
            <p className="text-gray-600 mb-6">Flashcards: The ultimate Tool to Lock in Concepts!</p>

            {flashcards.length === 0 ? (
                <div className="text-center p-8 border rounded-lg mt-10">
                    <p className="text-gray-500 mb-4">
                        No flashcards available yet.
                    </p>
                    <button 
                        onClick={handleGenerateFlashcards}
                        className="bg-primary text-white px-4 py-2 rounded mr-2"
                        disabled={generating}
                    >
                        {generating ? 'Generating...' : 'Generate Flashcards'}
                    </button>
                    <button 
                        onClick={() => router.back()}
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                        Go Back
                    </button>
                </div>
            ) : (
                <div className='flex flex-col items-center justify-center mt-10'>
                    <div className="mb-4">
                        <p className="text-sm text-gray-500">
                            {flashcards.length} flashcards available
                        </p>
                    </div>
                    <Carousel setApi={setApi} className="w-full max-w-md">
                        <CarouselContent>
                            {flashcards.map((flashcard, index) => (
                                <CarouselItem key={index} className='flex items-center justify-center'>
                                    <FlashCardItem 
                                        handleClick={handleClick} 
                                        isFlipped={isFlipped} 
                                        flashcard={flashcard}
                                    />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>

                    {flashcards.length > 0 && api?.selectedScrollSnap() === flashcards.length - 1 && (
  <div className="text-center p-8 border rounded-lg bg-green-50 shadow-md mt-6">
    <h2 className="text-xl font-bold text-green-600 mb-2">
      🎉 Congratulations!
    </h2>
    <p className="text-gray-700 mb-4">
      You have completed all the flashcards.
    </p>
    <button
      onClick={() => router.back()}
      className="bg-primary text-white px-4 py-2 rounded"
    >
      Go Back
    </button>
  </div>
)}
                    
                    <button 
                        onClick={handleGenerateFlashcards}
                        className="mt-6 bg-primary text-white px-4 py-2 rounded"
                        disabled={generating}
                    >
                        {generating ? 'Regenerating...' : 'Regenerate Flashcards'}
                    </button>
                </div>
            )}
        </div>
    );
}

export default Flashcards;