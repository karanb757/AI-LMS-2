"use client"
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import { Button } from '../../../../components/ui/button'
import { 
  ChevronLeft, 
  ChevronRight,
  ArrowLeft
} from 'lucide-react'

const ViewNotes = () => {
  const { courseId } = useParams()
  const router = useRouter()
  const [notes, setNotes] = useState([])
  const [currentChapter, setCurrentChapter] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [copiedCode, setCopiedCode] = useState(null)
  const [chapterTitle, setChapterTitle] = useState('')

  useEffect(() => {
    GetNotes()
  }, [])

  useEffect(() => {
    // Extract chapter title from content when chapter changes
    if (notes[currentChapter]?.notes) {
      extractChapterTitle(notes[currentChapter].notes)
    }
  }, [currentChapter, notes])

  const GetNotes = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const result = await axios.post('/api/study-type', {
        courseId: courseId,
        studyType: 'notes'
      })
      
      setNotes(result?.data || [])
    } catch (error) {
      console.error("Error fetching notes:", error)
      setError("Failed to load notes. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const extractChapterTitle = (content) => {
    if (!content) {
      setChapterTitle('Study Notes')
      return
    }
    
    // Try to find h2 tag in the content
    const h2Match = content.match(/<h2[^>]*>(.*?)<\/h2>/i)
    if (h2Match && h2Match[1]) {
      // Remove any HTML tags from the title
      const cleanTitle = h2Match[1].replace(/<[^>]*>/g, '')
      setChapterTitle(cleanTitle)
    } else {
      setChapterTitle('Study Notes')
    }
  }

  const formatContent = (content) => {
    if (!content) return ''
    
    // Split content by code blocks
    const parts = content.split(/(```[\s\S]*?```)/g)
    
    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        // This is a code block
        const codeContent = part.slice(3, -3).trim()
        const lines = codeContent.split('\n')
        const language = lines[0] || 'text'
        const code = lines.slice(1).join('\n')
        const codeId = `code-${currentChapter}-${index}`
        
        return (
          <div key={index} className="my-6 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
            {/* FORMAT CODE :  */}
            <div className="overflow-x-auto bg-gray-50 pl-8">
              <pre className="p-6 text-sm leading-relaxed">
                <code className="text-gray-800 font-mono whitespace-pre">
                  {code}
                </code>
              </pre>
            </div>
          </div>
        )
      } 
      
      else {
        // Regular content
        return (
          <div 
            key={index}
            className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-700 prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700"
            dangerouslySetInnerHTML={{ __html: part }}
          />
        )
      }
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your notes...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">⚠️</div>
          <p className="text-red-600 mb-4 text-lg">{error}</p>
          <Button onClick={GetNotes} className="bg-blue-600 hover:bg-blue-700">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  if (!notes || notes.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">📚</div>
          <p className="text-gray-600 mb-4 text-lg">No notes available for this course yet.</p>
          <Button onClick={() => router.back()} className="bg-blue-600 hover:bg-blue-700">
            Go Back to Course
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      
      <div className="flex flex-1 pt-24">

        {/* Main Content */}
        <div className="flex-1 bg-white overflow-y-auto w-full">
          <div className="max-w-5xl mx-auto p-8 w-full">

            {/* Header Section */}
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Chapter {currentChapter + 1}: {chapterTitle}
              </h1>
              <p className="text-blue-600 font-medium">
                {currentChapter + 1} of {notes.length} chapters
              </p>
              
              <div className="flex justify-center space-x-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => setCurrentChapter(Math.max(0, currentChapter - 1))}
                  disabled={currentChapter === 0}
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setCurrentChapter(Math.min(notes.length - 1, currentChapter + 1))}
                  disabled={currentChapter === notes.length - 1}
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>

            {/* Notes Content */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 w-full">
              {notes[currentChapter]?.notes ? (
                formatContent(notes[currentChapter].notes)
              ) : (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">📖</div>
                  <p className="text-gray-500 text-lg">No content available for this chapter.</p>
                </div>
              )}
            </div>

            {/* Navigation at the bottom */}
            <div className="flex justify-between items-center mt-8 p-4 bg-gray-50 rounded-lg">
              <Button
                variant="outline"
                onClick={() => setCurrentChapter(Math.max(0, currentChapter - 1))}
                disabled={currentChapter === 0}
                className="flex items-center"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous Chapter
              </Button>
              
              <span className="text-blue-600 font-medium">
                Chapter {currentChapter + 1} of {notes.length}
              </span>
              
              <Button
                variant="outline"
                onClick={() => setCurrentChapter(Math.min(notes.length - 1, currentChapter + 1))}
                disabled={currentChapter === notes.length - 1}
                className="flex items-center"
              >
                Next Chapter
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            {/* Completion Message */}
            {currentChapter === notes.length - 1 && (
              <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-8 text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Course Completed!
                </h2>
                <p className="text-gray-600 mb-6">
                  Congratulations! You've finished all chapters. Ready to test your knowledge?
                </p>
                <div className="flex justify-center space-x-4">
                  <Button 
                    onClick={() => router.back()}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Course
                  </Button>
                  <Button 
                    onClick={() => router.push(`/course/${courseId}/quiz`)}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Take Quiz
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewNotes