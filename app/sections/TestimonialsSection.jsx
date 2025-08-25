"use client";
import React, { useEffect, useState } from 'react';
import { Button } from '../../components/ui/button.jsx';

const TestimonialsSection = ({ isDark, textClass, subtextClass, cardBg, borderClass, router }) => {
  // State for icons in Testimonials
  const [Star, setStar] = useState(null);
  const [ChevronDown, setChevronDown] = useState(null);

  // State for icons in CTA
  const [ArrowRight, setArrowRight] = useState(null);
  const [Sparkles, setSparkles] = useState(null);
  const [Clock, setClock] = useState(null);
  const [CheckCircle, setCheckCircle] = useState(null);

  // Dynamically import icons
  useEffect(() => {
    import('lucide-react').then(mod => {
      setStar(() => mod.Star);
      setChevronDown(() => mod.ChevronDown);
      setArrowRight(() => mod.ArrowRight);
      setSparkles(() => mod.Sparkles);
      setClock(() => mod.Clock);
      setCheckCircle(() => mod.CheckCircle);
    });
  }, []);

  const scrollToNext = () => {
    const ctaSection = document.getElementById('cta-section');
    if (ctaSection) {
      ctaSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const testimonials = [
    {
      name: "Garvit Khare",
      role: "BTech 3rd Year Student",
      content: "AI-LMS transformed how I study for exams. The structured learning paths and AI-generated summaries helped me grasp complex concepts faster than ever before.",
      rating: 5,
      avatar: "👨‍💻"
    },
    {
      name: "Om Goyal", 
      role: "Beginner Developer",
      content: "The personalized flashcards and quizzes are game-changers. I've improved my retention and exam scores significantly since using this platform.",
      rating: 4,
      avatar: "🎓"
    },
    {
      name: "Hemant Singh",
      role: "2nd Year Engineering Student",
      content: "As someone new to coding, the adaptive learning feature was perfect. It started with basics and gradually increased difficulty at my pace.",
      rating: 5,
      avatar: "🚀"
    }
  ];

  // Show loading state until icons are loaded
  if (!Star || !ChevronDown || !ArrowRight || !Sparkles || !Clock || !CheckCircle) {
    return (
      <section className="min-h-screen flex items-center justify-center overflow-hidden py-16">
        <div className="text-center">Loading...</div>
      </section>
    );
  }

  return (
    <>
      {/* ===================== Testimonials Section ===================== */}
      <section className="min-h-screen flex items-center justify-center overflow-hidden py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className={`text-3xl sm:text-5xl md:text-6xl font-bold ${textClass} mb-6 sm:mb-8`}>
              Loved by <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Learners Worldwide</span>
            </h2>
            <p className={`text-lg sm:text-xl ${subtextClass} max-w-3xl mx-auto`}>
              Join thousands who transformed their learning journey from chaos to clarity.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`group ${cardBg} p-6 sm:p-8 rounded-3xl shadow-xl hover:shadow-2xl border ${borderClass} transform hover:-translate-y-2 transition-all duration-500 hover:scale-105`}
              >
                <div className="text-center mb-4 sm:mb-6">
                  <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{testimonial.avatar}</div>
                  <div className="flex justify-center mb-3 sm:mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <p className={`${subtextClass} mb-4 sm:mb-6 leading-relaxed italic text-center text-sm sm:text-base group-hover:text-blue-600 transition-colors duration-300`}>
                  "{testimonial.content}"
                </p>
                <div className="text-center">
                  <div className={`font-bold ${textClass} text-base sm:text-lg`}>{testimonial.name}</div>
                  <div className={`${subtextClass} text-sm sm:text-base`}>{testimonial.role}</div>
                </div>
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

      {/* ===================== CTA Section ===================== */}
      <section id="cta-section" className="min-h-screen flex items-center justify-center relative overflow-hidden py-16">
        <div className="relative z-10 max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl sm:text-5xl md:text-7xl font-bold ${textClass} mb-6 sm:mb-8`}>
            Ready to Transform Your Learning?
          </h2>
          <p className={`text-lg sm:text-2xl ${subtextClass} mb-8 sm:mb-12 leading-relaxed`}>
            Join thousands of students and professionals who are already using AI to accelerate their learning journey.
            <br />
            <span className="text-blue-600 font-semibold">Start creating your first course in under 60 seconds.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-8 sm:mb-12">
            <Button 
              size="lg" 
              onClick={() => router.push('/dashboard')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 sm:px-16 py-5 sm:py-6 text-xl sm:text-2xl font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all w-full sm:w-auto"
            >
              Create Your First Course
              <ArrowRight className="ml-4 w-6 h-6 sm:w-7 sm:h-7" />
            </Button>

            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => router.push('/contact')}
              className={`border-2 ${borderClass} ${textClass} ${cardBg} hover:bg-blue-100 px-12 sm:px-16 py-5 sm:py-6 text-xl sm:text-2xl font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto`}
            >
              Learn More
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 lg:space-x-8">
            <div className="flex items-center">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 mr-2" />
              <span className={`text-base sm:text-lg ${subtextClass}`}>No credit card required</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mr-2" />
              <span className={`text-base sm:text-lg ${subtextClass}`}>Start in 60 seconds</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 mr-2" />
              <span className={`text-base sm:text-lg ${subtextClass}`}>Free forever plan</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TestimonialsSection;
