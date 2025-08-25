import React, { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';

const DemoSection = ({ isDark, textClass, subtextClass, cardBg, borderClass, router }) => {
  const [ArrowRight, setArrowRight] = useState(null);
  const [Clock, setClock] = useState(null);
  const [Brain, setBrain] = useState(null);
  const [Target, setTarget] = useState(null);
  const [BookOpen, setBookOpen] = useState(null);
  const [CheckCircle, setCheckCircle] = useState(null);
  const [ChevronDown, setChevronDown] = useState(null);

  // Dynamically import icons
  useEffect(() => {
    import('lucide-react').then(mod => {
      setArrowRight(() => mod.ArrowRight);
      setClock(() => mod.Clock);
      setBrain(() => mod.Brain);
      setTarget(() => mod.Target);
      setBookOpen(() => mod.BookOpen);
      setCheckCircle(() => mod.CheckCircle);
      setChevronDown(() => mod.ChevronDown);
    });
  }, []);

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight * 4, // Scroll to the fifth section (Testimonials)
      behavior: 'smooth'
    });
  };

  // Show loading state until icons are loaded
  if (!ArrowRight || !Clock || !Brain || !Target || !BookOpen || !CheckCircle || !ChevronDown) {
    return (
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden py-16">
        <div className="text-center">Loading...</div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden py-16">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div>
            <h2 className={`text-3xl sm:text-5xl md:text-6xl font-bold ${textClass} mb-6 sm:mb-8`}>
              See AI-LMS in Action
            </h2>
            <p className={`text-lg sm:text-xl ${subtextClass} mb-8 sm:mb-10 leading-relaxed`}>
              Watch how our AI transforms any topic into a complete learning experience in seconds.
              From course outline to interactive quizzes - all generated automatically.
            </p>

            <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
              {[
                { icon: <Clock className="w-5 h-5 sm:w-6 sm:h-6" />, text: "Generate content in under 60 seconds" },
                { icon: <Brain className="w-5 h-5 sm:w-6 sm:h-6" />, text: "AI adapts to your learning style" },
                { icon: <Target className="w-5 h-5 sm:w-6 sm:h-6" />, text: "Personalized difficulty progression" },
                { icon: <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />, text: "Complete course materials included" }
              ].map((item, index) => (
                <div key={index} className={`flex items-center ${textClass} hover:scale-105 transition-transform duration-300`}>
                  <div className={`p-2 ${isDark ? 'bg-gray-700' : 'bg-blue-100'} rounded-lg mr-3 sm:mr-4`}>
                    {item.icon}
                  </div>
                  <span className="text-base sm:text-lg font-medium">{item.text}</span>
                </div>
              ))}
            </div>

            <Button 
              size="lg" 
              onClick={() => router.push('/dashboard')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 sm:px-10 py-4 sm:py-5 text-lg sm:text-xl font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
            >
              Try It Now - Free
              <ArrowRight className="ml-3 w-5 h-5 sm:w-6 sm:h-6" />
            </Button>
          </div>

          <div className="relative">
            <div className={`${cardBg} backdrop-blur-lg rounded-3xl p-6 sm:p-8 border ${borderClass} shadow-2xl`}>
              <div className={`${isDark ? 'bg-gray-700' : 'bg-white'} rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-lg`}>
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded-full mr-2"></div>
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-yellow-500 rounded-full mr-2"></div>
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full"></div>
                  <span className={`ml-3 sm:ml-4 text-sm ${subtextClass} font-medium`}>AI Course Generator</span>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center">
                    <span className={`text-sm font-medium ${subtextClass} mr-3 w-12`}>Topic:</span>
                    <div className="h-2 sm:h-3 bg-blue-200 rounded flex-1 animate-pulse"></div>
                  </div>
                  <div className="flex items-center">
                    <span className={`text-sm font-medium ${subtextClass} mr-3 w-12`}>Level:</span>
                    <div className="h-2 sm:h-3 bg-purple-200 rounded w-1/3 animate-pulse"></div>
                  </div>
                  <div className="flex items-center">
                    <span className={`text-sm font-medium ${subtextClass} mr-3 w-12`}>Type:</span>
                    <div className="h-2 sm:h-3 bg-green-200 rounded w-1/2 animate-pulse"></div>
                  </div>
                </div>
              </div>

              <div className={`${isDark ? 'bg-gray-700/80' : 'bg-white/80'} rounded-2xl p-4 sm:p-6 backdrop-blur-sm`}>
                <h4 className={`font-bold ${textClass} mb-3`}>Generated Content:</h4>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3" />
                    <span className={`${subtextClass} text-sm sm:text-base`}>Course Outline Created</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3" />
                    <span className={`${subtextClass} text-sm sm:text-base`}>Chapter Notes Generated</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3" />
                    <span className={`${subtextClass} text-sm sm:text-base`}>Flashcards Ready</span>
                  </div>
                  <div className="flex items-center animate-pulse">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-blue-500 rounded-full mr-2 sm:mr-3 animate-spin"></div>
                    <span className={`${subtextClass} text-sm sm:text-base`}>Generating Quizzes...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce z-20"
        onClick={scrollToNext}
      >
        <ChevronDown className={`w-8 h-8 ${subtextClass} hover:text-blue-600 transition-colors duration-300`} />
      </div>
    </section>
  );
};

export default DemoSection;