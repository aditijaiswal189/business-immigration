"use client";
import React, { useState, useEffect } from "react";
import { ChevronDown, Search, Menu, X } from "lucide-react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkBackground, setIsDarkBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Check if we're over a dark background section
      let darkBg = false;
      
      // Get element at header position
      const elementAtHeader = document.elementFromPoint(window.innerWidth / 2, 80);
      if (elementAtHeader) {
        let currentElement = elementAtHeader;
        
        // Traverse up the DOM to find background styles
        while (currentElement && currentElement !== document.body) {
          const computedStyle = window.getComputedStyle(currentElement);
          const bgColor = computedStyle.backgroundColor;
          const classes = currentElement.className || '';
          
          // Check for dark backgrounds
          if (classes.includes('bg-primary') || 
              classes.includes('bg-dark') || 
              classes.includes('bg-black') || 
              classes.includes('bg-gray-900') ||
              classes.includes('bg-slate-900') ||
              bgColor.includes('rgb(0, 0, 0)') ||
              bgColor.includes('rgba(0, 0, 0')) {
            darkBg = true;
            break;
          }
          
          currentElement = currentElement.parentElement as HTMLElement;
        }
      }
      
      setIsDarkBackground(darkBg);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll(); // Check initial state
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const menuItems = [
    { name: "HOME", hasDropdown: false },
    { name: "ABOUT US", hasDropdown: true },
    { name: "NORTH AMERICA", hasDropdown: true },
    { name: "LATIN AMERICA", hasDropdown: true },
    { name: "EMEA", hasDropdown: true },
    { name: "APAC", hasDropdown: true },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-[9999] backdrop-blur-md border-b w-full transition-all duration-300 ${
      isDarkBackground 
        ? 'bg-black/20 border-white/20' 
        : 'bg-white/20 border-gray-200/30'
    }`}>
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Header Bar */}
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className={`font-bold text-2xl tracking-wider transition-colors duration-300 ${
            isDarkBackground ? 'text-white' : 'text-primary'
          }`}>
            <span className="bg-primary-yellow/90 backdrop-blur-sm px-3 py-1 rounded-lg text-primary shadow-lg">
              GTR
            </span>{" "}
            BUSINESS IMMIGRATION
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <div key={item.name} className="relative group">
                <button className={`flex items-center hover:text-primary-yellow transition-all duration-300 text-sm font-medium tracking-wide hover:scale-105 ${
                  isDarkBackground ? 'text-white/90' : 'text-primary/90'
                }`}>
                  {item.name}
                  {item.hasDropdown && (
                    <ChevronDown className="ml-1 h-4 w-4 group-hover:rotate-180 transition-transform duration-200" />
                  )}
                </button>
              </div>
            ))}
          </nav>

          {/* Right Side Actions (Desktop) */}
          <div className="hidden lg:flex items-center space-x-6">
            <button className={`hover:text-primary-yellow transition-all duration-300 p-2 rounded-full hover:bg-white/10 ${
              isDarkBackground ? 'text-white/90' : 'text-primary/90'
            }`}>
              <Search className="h-5 w-5" />
            </button>
            <button className="bg-primary-yellow/90 backdrop-blur-sm hover:bg-primary-yellow text-primary px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg border border-white/20">
              BOOK AN APPOINTMENT →
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            className={`lg:hidden hover:text-primary-yellow transition-all duration-300 p-2 rounded-full hover:bg-white/10 ${
              isDarkBackground ? 'text-white/90' : 'text-primary/90'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-black/20 backdrop-blur-xl shadow-2xl z-40 border-t border-white/10">
            <div className="px-4 py-6 space-y-4">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  className="block w-full text-left text-primary/90 hover:text-primary-yellow transition-all duration-300 text-sm font-medium tracking-wide py-3 px-2 rounded-lg hover:bg-white/10"
                >
                  {item.name}
                </button>
              ))}
              <button className="w-full bg-primary-yellow/90 backdrop-blur-sm hover:bg-primary-yellow text-primary px-6 py-3 rounded-full font-medium transition-all duration-300 mt-4 shadow-lg border border-white/20">
                BOOK AN APPOINTMENT →
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
