"use client";
import React, { useState, useMemo, useCallback } from "react";
import { Button } from "../../components/ui/button";
import {
  ChevronDown,
  ChevronUp,
  Search,
  MessageSquare,
  Brain,
  Zap,
  Star,
  Clock,
  CreditCard,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import { useTheme } from "../_context/ThemeContext";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";

// Memoized FAQ Item Component
const FAQItem = React.memo(({ faq, isOpen, onToggle, isDark, textClass, subtextClass, cardBg, borderClass }) => (
  <div className={`${cardBg} ${borderClass} rounded-2xl overflow-hidden hover:${isDark ? "border-gray-600" : "border-slate-300"} transition-all duration-300`}>
    <button
      onClick={() => onToggle(faq.id)}
      className={`w-full p-6 text-left flex items-center justify-between ${isDark ? "hover:bg-gray-700/20" : "hover:bg-slate-100/50"} transition-colors duration-200`}
    >
      <div className="flex items-center flex-1">
        {faq.popular && <Star className="w-5 h-5 text-yellow-400 mr-3" />}
        <h3 className={`text-lg font-semibold ${textClass}`}>{faq.question}</h3>
      </div>
      <div className="ml-4 p-2">
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-blue-400 transform transition-transform duration-200" />
        ) : (
          <ChevronDown className="w-5 h-5 text-blue-400 transform transition-transform duration-200" />
        )}
      </div>
    </button>
    
    {isOpen && (
      <div className="px-6 pb-6">
        <div className={`border-t ${borderClass} pt-4`}>
          <p className={subtextClass}>{faq.answer}</p>
        </div>
      </div>
    )}
  </div>
));

FAQItem.displayName = 'FAQItem';

// Memoized Category Button Component
const CategoryButton = React.memo(({ category, isSelected, onClick, isDark, cardBg, borderClass }) => (
  <button
    onClick={() => onClick(category.id)}
    className={`flex items-center px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
      isSelected
        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
        : `${cardBg} ${isDark ? "text-gray-300 hover:bg-gray-700/60" : "text-slate-700 hover:bg-slate-200/60"} ${borderClass}`
    }`}
  >
    {category.icon}
    <span className="ml-2 mr-1">{category.name}</span>
    <span className={`text-xs ${isDark ? "bg-white/20" : "bg-slate-800/20"} px-2 py-0.5 rounded-full`}>{category.count}</span>
  </button>
));

CategoryButton.displayName = 'CategoryButton';

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openItems, setOpenItems] = useState(new Set());
  const { isDark } = useTheme();
  const router = useRouter();

  const categories = useMemo(() => [
    { id: "all", name: "All Questions", icon: <HelpCircle className="w-5 h-5" />, count: 6 },
    { id: "getting-started", name: "Getting Started", icon: <Sparkles className="w-5 h-5" />, count: 2 },
    { id: "features", name: "Features", icon: <Brain className="w-5 h-5" />, count: 2 },
    { id: "pricing", name: "Pricing", icon: <CreditCard className="w-5 h-5" />, count: 1 },
    { id: "technical", name: "Technical", icon: <Zap className="w-5 h-5" />, count: 1 }
  ], []);

  const faqData = useMemo(() => [
    {
      id: 1,
      category: "getting-started",
      question: "How do I get started with AI-LMS?",
      answer: "Getting started is simple! Just click 'Start Learning Now' on our homepage, create your free account, choose your learning topic, and our AI will instantly generate a personalized curriculum with study materials, flashcards, and quizzes tailored to your skill level.",
      popular: true
    },
    {
      id: 2,
      category: "features",
      question: "What makes AI-LMS different from other learning platforms?",
      answer: "AI-LMS uses advanced AI to create personalized learning experiences. Unlike traditional platforms with static content, our system generates fresh study materials, adapts to your learning pace, and creates interactive content specifically for your chosen topics and skill level.",
      popular: true
    },
    {
      id: 3,
      category: "pricing",
      question: "Is AI-LMS really free to get started?",
      answer: "Yes! You can start learning immediately with our free tier, which includes basic AI-generated study materials and limited quiz access. Upgrade to our premium plans for unlimited content generation, advanced features, and priority support.",
      popular: true
    },
    {
      id: 4,
      category: "technical",
      question: "How accurate is the AI-generated content?",
      answer: "Our AI is trained on high-quality educational resources and continuously updated. The content accuracy is over 95%, and we have built-in fact-checking mechanisms. Users can also report any inaccuracies, which helps us improve the system continuously.",
      popular: false
    },
    {
      id: 5,
      category: "features",
      question: "Can I customize the difficulty level of my learning materials?",
      answer: "Absolutely! AI-LMS offers three difficulty levels: Easy, Moderate, and Hard. You can switch between levels at any time, and our AI will adapt the content complexity, question difficulty, and explanation depth accordingly.",
      popular: false
    },
    {
      id: 6,
      category: "getting-started",
      question: "What subjects and topics can I learn with AI-LMS?",
      answer: "AI-LMS supports a vast range of subjects including programming, data science, mathematics, science, business, languages, and more. Simply enter any topic you want to learn, and our AI will create comprehensive study materials for it.",
      popular: true
    }
  ], []);

  const filteredFAQs = useMemo(() => faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }), [searchTerm, selectedCategory, faqData]);

  const toggleItem = useCallback((id) => {
    setOpenItems(prev => {
      const newOpenItems = new Set(prev);
      if (newOpenItems.has(id)) {
        newOpenItems.delete(id);
      } else {
        newOpenItems.add(id);
      }
      return newOpenItems;
    });
  }, []);

  const handleCategorySelect = useCallback((categoryId) => {
    setSelectedCategory(categoryId);
  }, []);

  // Theme-based classes
  const themeClasses = useMemo(() => ({
    bgClass: isDark ? "bg-gradient-to-br from-gray-900 via-black to-gray-800" : "bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50",
    textClass: isDark ? "text-white" : "text-slate-800",
    subtextClass: isDark ? "text-gray-300" : "text-slate-600",
    cardBg: isDark ? "bg-gray-800/40" : "bg-white/80",
    borderClass: isDark ? "border-gray-700" : "border-slate-200",
    inputBg: isDark ? "bg-gray-800/60" : "bg-white/80",
  }), [isDark]);

  return (
    <div className={`min-h-screen ${themeClasses.bgClass} ${themeClasses.textClass}`}>
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className={`inline-flex items-center px-6 py-3 ${isDark ? "bg-white/10" : "bg-slate-300/10"} backdrop-blur-sm rounded-full ${themeClasses.borderClass} mb-8 shadow-xl`}>
            <HelpCircle className="w-5 h-5 text-blue-400 mr-3 animate-pulse" />
            <span className={`text-sm font-semibold ${isDark ? "text-white/90" : "text-slate-800/90"}`}>Frequently Asked Questions</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Got Questions?
            </span>
            <br />
            <span className={themeClasses.textClass}>We Have Answers</span>
          </h1>
          
          <p className={`text-xl ${themeClasses.subtextClass} mb-12 max-w-3xl mx-auto leading-relaxed`}>
            Find suitable answers to your common FAQ's about AI-Learning Management System
          </p>

          {/* Search Bar */}
          <div className="relative mb-8 max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-12 pr-4 py-4 ${themeClasses.inputBg} ${themeClasses.borderClass} rounded-2xl ${themeClasses.textClass} placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 backdrop-blur-sm`}
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {categories.map((category) => (
              <CategoryButton
                key={category.id}
                category={category}
                isSelected={selectedCategory === category.id}
                onClick={handleCategorySelect}
                isDark={isDark}
                cardBg={themeClasses.cardBg}
                borderClass={themeClasses.borderClass}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Main FAQ Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-20">
              <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-400 mb-4">No results found</h3>
              <p className="text-gray-500 mb-8">Try adjusting your search or browse our categories above.</p>
              <Button 
                onClick={() => router.push('/contact')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
              >
                Contact Us
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map((faq) => (
                <FAQItem
                  key={faq.id}
                  faq={faq}
                  isOpen={openItems.has(faq.id)}
                  onToggle={toggleItem}
                  isDark={isDark}
                  textClass={themeClasses.textClass}
                  subtextClass={themeClasses.subtextClass}
                  cardBg={themeClasses.cardBg}
                  borderClass={themeClasses.borderClass}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className={`py-20 px-4 sm:px-6 lg:px-8 `}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Still Have Questions?</h2>
          <p className={`text-xl ${themeClasses.subtextClass} mb-8`}>
            Our support team is here to help you succeed with AI-LMS.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => router.push('/contact')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 px-8 py-4 text-lg font-semibold"
            >
              <MessageSquare className="mr-3 w-5 h-5" />
              Contact Us
            </Button>
            <Button 
              variant="outline" 
              className={`border-2 ${isDark ? "border-gray-600 hover:border-blue-400" : "border-slate-300 hover:border-blue-400"} px-8 py-4 text-lg font-semibold ${themeClasses.textClass} ${isDark ? "bg-black/20" : "bg-white/50"} backdrop-blur-sm`}
            >
              <Clock className="mr-3 w-5 h-5" />
              24/7 Support
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${themeClasses.subtextClass} p-8 text-center`}>
        <p>© 2025 AI-LMS. All rights reserved.</p>
        <p className="mt-2">Made with ❤️ by Karan</p>
      </footer>
    </div>
  );
}