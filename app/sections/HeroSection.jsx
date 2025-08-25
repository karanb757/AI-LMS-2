import React, { useState } from 'react';
import { Button } from '../../components/ui/button';

const HeroSection = ({ isDark, textClass, subtextClass, cardBg, borderClass, router }) => {
  const [ArrowRight, setArrowRight] = useState(null);
  const [Sparkles, setSparkles] = useState(null);
  const [ChevronDown, setChevronDown] = useState(null);
  const [CheckCircle, setCheckCircle] = useState(null);
  const [Play, setPlay] = useState(null);

  // Dynamically import icons
  React.useEffect(() => {
    import('lucide-react').then(mod => {
      setArrowRight(() => mod.ArrowRight);
      setSparkles(() => mod.Sparkles);
      setChevronDown(() => mod.ChevronDown);
      setCheckCircle(() => mod.CheckCircle);
      setPlay(() => mod.Play);
    });
  }, []);

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  if (!ArrowRight || !Sparkles || !ChevronDown || !CheckCircle || !Play) {
    return (
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24">
        <div className="text-center">Loading...</div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24">
      <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12`}>
        <div className={`inline-flex items-center px-4 sm:px-6 py-3 ${cardBg} backdrop-blur-sm rounded-full border ${borderClass} mb-8 shadow-lg`}>
          <Sparkles className="w-5 h-5 text-yellow-400 mr-3 animate-spin [animation-duration:2s]" />
          <span className="text-sm font-semibold text-blue-500">Next-Generation Learning Platform</span>
        </div>
        
        <h1 className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 sm:mb-8 leading-tight`}>
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            AI Learning
          </span>
          <br />
          <span className={textClass}>Management System</span>
        </h1>
        
        <p className={`text-lg sm:text-xl md:text-2xl ${subtextClass} mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed`}>
          Transform your learning experience with AI-powered study materials. Generate personalized content, 
          interactive flashcards, and adaptive quizzes in seconds.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 sm:mb-16">
          <Button 
            size="lg" 
            onClick={() => router.push('/dashboard')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 sm:px-10 py-4 sm:py-5 text-lg sm:text-xl font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all w-full sm:w-auto"
          >
            Start Learning Now
            <ArrowRight className="ml-3 w-5 h-5 sm:w-6 sm:h-6" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className={`border-2 ${borderClass} ${textClass} hover:border-blue-500 px-8 sm:px-10 py-4 sm:py-5 text-lg sm:text-xl font-semibold ${cardBg} backdrop-blur-sm shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto`}
          >
            <Play className="mr-3 w-5 h-5 sm:w-6 sm:h-6" />
            Watch Demo
          </Button>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 lg:space-x-12">
          {[
            { icon: <CheckCircle className="w-6 h-6 text-green-500" />, text: "Free to Get Started" },
            { icon: <CheckCircle className="w-6 h-6 text-green-500" />, text: "AI-Powered" },
            { icon: <CheckCircle className="w-6 h-6 text-green-500" />, text: "Instant Results" }
          ].map((item, index) => (
            <div key={index} className="flex items-center hover:scale-105 transition-transform duration-300">
              {item.icon}
              <span className={`ml-2 font-medium ${subtextClass}`}>{item.text}</span>
            </div>
          ))}
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

export default HeroSection;