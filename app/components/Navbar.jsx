"use client";
import React, { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTheme } from '../_context/ThemeContext';

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const router = useRouter();

  const handleNavigation = (path) => {
    // Simply navigate without loading states
    router.push(path);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      if (scrollPosition < 100) {
        setShowNavbar(true);
      } else if (scrollPosition > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      
      setLastScrollY(scrollPosition);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Fix: Define navigation items as static objects with paths
  const navigationItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Contact', path: '/contact' },
    { name: 'Help', path: '/help' },
  ];

  return (
    <nav className={`fixed top-4 left-4 right-4 z-50 transition-all duration-300 ${showNavbar ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}`}>
      <div className={`${isDark ? 'bg-gray-800/10' : 'bg-white/10'} backdrop-blur-lg rounded-full border ${isDark ? 'border-gray-700/50' : 'border-white/20'} shadow-lg px-6 py-3`}>
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <h1 
              className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent cursor-pointer"
              onClick={() => handleNavigation('/')}
            >
              AI-LMS
            </h1>
          </div>
          
          {/* Center Navigation - Desktop */}
          <div className="hidden lg:flex items-center pl-28 space-x-8">
            {navigationItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(item.path)}
                className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} font-medium text-sm transition-colors duration-200 hover:scale-105 transform`}
              >
                {item.name}
              </button>
            ))}
          </div>
          
          {/* Right side - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className={`${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-700/50' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100/50'} transition-colors duration-200 rounded-full`}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            <Button
              onClick={() => handleNavigation('/dashboard')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Get Started
            </Button> 
          </div>
          
          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className={`${isDark ? 'text-gray-300 hover:bg-gray-700/50' : 'text-gray-700 hover:bg-gray-100/50'} rounded-full`}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`${isDark ? 'text-gray-300 hover:bg-gray-700/50' : 'text-gray-700 hover:bg-gray-100/50'} rounded-full`}
            >
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={`lg:hidden mt-2 sm:max-w-sm ${isDark ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-lg rounded-2xl border ${isDark ? 'border-gray-700/50' : 'border-white/20'} shadow-lg p-4`}>
          <div className="space-y-2 flex flex-col items-center">
            {navigationItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  handleNavigation(item.path);
                  setIsMenuOpen(false);
                }}
                className={`w-full text-center px-4 py-3 rounded-xl cursor-pointer hover:bg-gray-400 ${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-700/50' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100/50'} font-medium transition-colors duration-200`}
              >
                {item.name}
              </button>
            ))}
            <Button
              onClick={() => {
                handleNavigation('/dashboard');
                setIsMenuOpen(false);
              }}
              className="w-full mt-3 max-w-[140px] mx-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 rounded-xl text-xs font-medium cursor-pointer"
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}