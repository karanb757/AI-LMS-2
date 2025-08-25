import React, { useState, useEffect } from 'react';

const FeaturesSection = ({ isDark, textClass, subtextClass, cardBg, borderClass }) => {
  const [Brain, setBrain] = useState(null);
  const [BookOpen, setBookOpen] = useState(null);
  const [Zap, setZap] = useState(null);
  const [Target, setTarget] = useState(null);
  const [ChevronDown, setChevronDown] = useState(null);

  // Dynamically import icons
  useEffect(() => {
    import('lucide-react').then(mod => {
      setBrain(() => mod.Brain);
      setBookOpen(() => mod.BookOpen);
      setZap(() => mod.Zap);
      setTarget(() => mod.Target);
      setChevronDown(() => mod.ChevronDown);
    });
  }, []);

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight * 3, // Scroll to the third section (Features)
      behavior: 'smooth'
    });
  };

  // Show loading state until icons are loaded
  if (!Brain || !BookOpen || !Zap || !Target || !ChevronDown) {
    return (
      <section className="min-h-screen flex items-center justify-center overflow-hidden py-16">
        <div className="text-center">Loading...</div>
      </section>
    );
  }

  const features = [
    {
      icon: <Brain className="w-12 h-12 text-blue-600" />,
      title: "AI-Powered Content Generation",
      description: "Create personalized study materials, flashcards, and quizzes instantly using advanced AI technology.",
    },
    {
      icon: <BookOpen className="w-12 h-12 text-purple-600" />,
      title: "Comprehensive Study Materials",
      description: "Get detailed chapter notes, summaries, and structured learning paths tailored to your needs.",
    },
    {
      icon: <Zap className="w-12 h-12 text-yellow-600" />,
      title: "Interactive Learning",
      description: "Engage with dynamic flashcards, quizzes, and Q&A sessions to reinforce your knowledge.",
    },
    {
      icon: <Target className="w-12 h-12 text-green-600" />,
      title: "Adaptive Difficulty",
      description: "Choose your learning level - Easy, Moderate, or Hard - and let AI adapt to your pace.",
    }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center overflow-hidden py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className={`text-3xl sm:text-5xl md:text-6xl font-bold ${textClass} mb-6 sm:mb-8`}>
            Powerful Features for <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Modern Learning</span>
          </h2>
          <p className={`text-lg sm:text-xl ${subtextClass} max-w-3xl mx-auto`}>
            Discover how our AI-powered platform revolutionizes the way you create and consume educational content.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group ${cardBg} p-6 sm:p-8 rounded-3xl shadow-xl hover:shadow-2xl border ${borderClass} hover:border-blue-200 transform hover:-translate-y-2 transition-all duration-500 hover:scale-105`}
            >
              <div className={`mb-4 sm:mb-6 p-3 sm:p-4 ${isDark ? 'bg-gray-700' : 'bg-gradient-to-br from-slate-50 to-blue-50'} rounded-2xl w-fit group-hover:scale-110 transition-transform duration-500 mx-auto`}>
                {feature.icon}
              </div>
              <h3 className={`text-lg sm:text-xl font-bold ${textClass} mb-3 sm:mb-4 text-center group-hover:text-blue-600 transition-colors duration-300`}>
                {feature.title}
              </h3>
              <p className={`${subtextClass} leading-relaxed text-center text-sm sm:text-base`}>
                {feature.description}
              </p>
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

export default FeaturesSection;