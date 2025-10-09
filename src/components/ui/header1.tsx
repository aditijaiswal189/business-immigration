"use client";
import { useState } from "react";
import { Search, Menu, X, Box } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header1() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gray-800 text-white fixed w-full top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {/* <Box className="text-primary-yellow text-2xl" /> */}
          <Button variant="goldWhite" className="rounded-xl px-10 py-4">
            {/* inner surface under text */}
            <div
              className="absolute inset-[2px] rounded-[inherit] z-10
                  bg-[linear-gradient(135deg,#fff,#f9f9f9,#f0f0f0)]
                  shadow-[inset_0_2px_5px_rgba(255,255,255,0.8),inset_0_-1px_2px_rgba(0,0,0,0.15),0_1px_0_rgba(255,255,255,0.7)]
                  pointer-events-none"
            />
            {/* text above everything */}
            <span className="relative z-30 font-bold text-black">
              GTR WORLDWIDE Business Immigration
            </span>
          </Button>
        </div>

        <div className="hidden lg:flex items-center space-x-8">
          <div className="flex items-center space-x-6">
            <a
              href="#home"
              className="text-primary-yellow hover:text-white transition-colors"
            >
              Home
            </a>
            <div className="relative group">
              <a
                href="#pages"
                className="hover:text-primary-yellow transition-colors flex items-center"
              >
                Pages <span className="ml-1">▼</span>
              </a>
            </div>
            <div className="relative group">
              <a
                href="#services"
                className="hover:text-primary-yellow transition-colors flex items-center"
              >
                Services <span className="ml-1">▼</span>
              </a>
            </div>
            <div className="relative group">
              <a
                href="#portfolio"
                className="hover:text-primary-yellow transition-colors flex items-center"
              >
                Portfolio <span className="ml-1">▼</span>
              </a>
            </div>
            <a
              href="#shop"
              className="hover:text-primary-yellow transition-colors"
            >
              Shop
            </a>
            <div className="relative group">
              <a
                href="#blog"
                className="hover:text-primary-yellow transition-colors flex items-center"
              >
                Blog <span className="ml-1">▼</span>
              </a>
            </div>
            <a
              href="#contact"
              className="hover:text-primary-yellow transition-colors"
            >
              Contact Us
            </a>
          </div>

          <Button className="bg-gray-600 hover:bg-primary-yellow px-4 py-2 rounded-md transition-colors">
            Get In Touch +
          </Button>

          <button className="text-xl hover:text-primary-yellow transition-colors">
            <Search />
          </button>
        </div>

        <button
          className="lg:hidden text-2xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-gray-700 px-6 py-4">
          <div className="flex flex-col space-y-4">
            <a
              href="#home"
              className="text-primary-yellow hover:text-white transition-colors"
            >
              Home
            </a>
            <a
              href="#pages"
              className="hover:text-primary-yellow transition-colors"
            >
              Pages
            </a>
            <a
              href="#services"
              className="hover:text-primary-yellow transition-colors"
            >
              Services
            </a>
            <a
              href="#portfolio"
              className="hover:text-primary-yellow transition-colors"
            >
              Portfolio
            </a>
            <a
              href="#shop"
              className="hover:text-primary-yellow transition-colors"
            >
              Shop
            </a>
            <a
              href="#blog"
              className="hover:text-primary-yellow transition-colors"
            >
              Blog
            </a>
            <a
              href="#contact"
              className="hover:text-primary-yellow transition-colors"
            >
              Contact Us
            </a>
            <Button className="bg-gray-600 hover:bg-primary-yellow px-4 py-2 rounded-md transition-colors w-fit">
              Get In Touch +
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
