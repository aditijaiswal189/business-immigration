"use client";
import React, { useState } from "react";
import { ChevronDown, Search, Menu, X } from "lucide-react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { name: "HOME", hasDropdown: false },
    { name: "ABOUT US", hasDropdown: true },
    { name: "NORTH AMERICA", hasDropdown: true },
    { name: "LATIN AMERICA", hasDropdown: true },
    { name: "EMEA", hasDropdown: true },
    { name: "APAC", hasDropdown: true },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-800 text-white w-full shadow">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Header Bar */}
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="text-white font-bold text-2xl tracking-wider">
            <span className="bg-gray-600 px-2 py-1 rounded">GTR</span> BUSINESS
            IMMIGRATION
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <div key={item.name} className="relative group">
                <button className="flex items-center text-white hover:text-gray-300 transition-colors duration-200 text-sm font-medium tracking-wide">
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
            <button className="text-white hover:text-gray-300 transition-colors duration-200">
              <Search className="h-5 w-5" />
            </button>
            <button className="bg-gray-600/80 backdrop-blur-sm hover:bg-gray-600 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105">
              BOOK AN APPOINTMENT →
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            className="lg:hidden text-white hover:text-gray-300 transition-colors duration-200"
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
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-md z-40 border-t border-gray-600/20">
            <div className="px-4 py-6 space-y-4">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  className="block w-full text-left text-white hover:text-gray-600 transition-colors duration-200 text-sm font-medium tracking-wide py-2"
                >
                  {item.name}
                </button>
              ))}
              <button className="w-full bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-full font-medium transition-colors duration-300 mt-4">
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
