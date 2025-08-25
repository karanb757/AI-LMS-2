import React, { useState } from 'react';

const WhySection = ({ isDark, textClass, subtextClass, cardBg, borderClass }) => {
  const [Youtube, setYoutube] = useState(null);
  const [Globe, setGlobe] = useState(null);
  const [MessageSquare, setMessageSquare] = useState(null);
  const [BookMarked, setBookMarked] = useState(null);
  const [Lightbulb, setLightbulb] = useState(null);
  const [TrendingUp, setTrendingUp] = useState(null);
  const [ChevronDown, setChevronDown] = useState(null);

  // Dynamically import icons
  React.useEffect(() => {
    import('lucide-react').then(mod => {
      setYoutube(() => mod.Youtube);
      setGlobe(() => mod.Globe);
      setMessageSquare(() => mod.MessageSquare);
      setBookMarked(() => mod.BookMarked);
      setLightbulb(() => mod.Lightbulb);
      setTrendingUp(() => mod.TrendingUp);
      setChevronDown(() => mod.ChevronDown);
    });
  }, []);

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight * 2, // Scroll to the third section (Features)
      behavior: 'smooth'
    });
  };

  if (!Youtube || !Globe || !MessageSquare || !BookMarked || !Lightbulb || !TrendingUp || !ChevronDown) {
    return (
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden py-16">
        <div className="text-center">Loading...</div>
      </section>
    );
  }

  const problems = [
    {
      icon: <Youtube className="w-8 h-8 text-red-500" />,
      title: "YouTube Overload",
      description: "Jumping between countless tutorials without a clear path",
    },
    {
      icon: <Globe className="w-8 h-8 text-blue-500" />,
      title: "Website Clutter",
      description: "Getting lost in multiple websites and resources",
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-green-500" />,
      title: "No Clear Direction",
      description: "Confusion about where to start and what to learn next",
    }
  ];

  const solutions = [
    {
      icon: <BookMarked className="w-10 h-10 text-purple-600" />,
      title: "Dedicated Learning Path",
      description: "AI creates a structured, personalized curriculum tailored to your goals and skill level",
      benefit: "90% faster learning progression"
    },
    {
      icon: <Lightbulb className="w-10 h-10 text-yellow-600" />,
      title: "Smart Content Generation",
      description: "Automatically generates notes, chapters, flashcards, and quizzes based on your chosen topic",
      benefit: "Save 10+ hours per course"
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-green-600" />,
      title: "Progressive Difficulty",
      description: "Start easy and gradually increase complexity as you master each concept",
      benefit: "95% completion rate"
    }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden py-16">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-red-500 mb-6 sm:mb-8">The Problem Every Learner Faces</h3>
            <div className="space-y-4 sm:space-y-6">
              {problems.map((problem, index) => (
                <div 
                  key={index} 
                  className={`flex items-start p-4 sm:p-6 ${cardBg} rounded-2xl border ${borderClass} hover:scale-105 transition-all duration-300 shadow-lg`}
                >
                  <div className={`p-2 sm:p-3 ${isDark ? 'bg-gray-700' : 'bg-slate-100'} rounded-xl mr-4 backdrop-blur-sm`}>
                    {problem.icon}
                  </div>
                  <div>
                    <h4 className={`text-lg sm:text-xl font-semibold ${textClass} mb-2`}>{problem.title}</h4>
                    <p className={subtextClass}>{problem.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-green-500 mb-6 sm:mb-8">Our AI-Powered Solution</h3>
            <div className="space-y-4 sm:space-y-6">
              {solutions.map((solution, index) => (
                <div 
                  key={index} 
                  className={`flex items-start p-4 sm:p-6 ${cardBg} rounded-2xl border ${borderClass} hover:scale-105 transition-all duration-300 shadow-lg`}
                >
                  <div className={`p-2 sm:p-3 ${isDark ? 'bg-gray-700' : 'bg-slate-100'} rounded-xl mr-4 backdrop-blur-sm`}>
                    {solution.icon} </div>
                  <div className="flex-1">
                    <h4 className={`text-lg sm:text-xl font-semibold ${textClass} mb-2`}>{solution.title}</h4>
                    <p className={`${subtextClass} mb-3`}>{solution.description}</p>
                    <span className="inline-block px-3 sm:px-4 py-1 sm:py-2 bg-green-500/20 text-green-500 rounded-full text-xs sm:text-sm font-semibold">
                      {solution.benefit}
                    </span>
                  </div>
                </div>
              ))}
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

export default WhySection;