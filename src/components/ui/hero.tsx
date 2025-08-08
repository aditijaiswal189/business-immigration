"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import CubeTransition from "./cube-animation";
// import CubeTransition from "./CubeAnimation";

const slides = [
  {
    id: 1,
    type: "innovative",
    subtitle: "INNOVATIVE FINANCIAL",
    title: "Financial Expertise You Can Trust & Secure.",
    description:
      "Our comprehensive financial services ensure your business growth with innovative solutions and strategic planning.",
    buttonText: "LEARN MORE →",
    background:
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
  },
  {
    id: 2,
    type: "strategic",
    subtitle: "SMART FINANCIAL STRATEGIES",
    title: "Expert Guidance for Your Financial Future",
    description:
      "Strategic planning and expert consulting to help you navigate complex financial decisions with confidence.",
    buttonText: "TALK TO EXPERT →",
    background:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
  },
  {
    id: 3,
    type: "comprehensive",
    subtitle: "VISIONS INTO REALITY",
    title: "Comprehensive Financial Planning & Consulting",
    description:
      "Transform your financial visions into reality with our comprehensive planning and consulting services.",
    buttonText: "VIEW SERVICES →",
    background:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const images = slides.map((slide) => slide.background);

  const handleSlideChange = (newIndex: number) => {
    if (newIndex !== currentSlide && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide(newIndex);
    }
  };

  const handleTransitionComplete = () => {
    setIsTransitioning(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        handleSlideChange((currentSlide + 1) % slides.length);
      }
    }, 4000); // Slightly faster for better demo

    return () => clearInterval(interval);
  }, [currentSlide, isTransitioning]);

  const currentSlideData = slides[currentSlide];

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden">
      {/* Pixelated Cube Transition Effect */}
      <div className="absolute inset-0">
        <CubeTransition
          images={images}
          currentImageIndex={currentSlide}
          onTransitionComplete={handleTransitionComplete}
        />
      </div>

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-40"
        style={{ zIndex: 2 }}
      />

      <div className="relative flex items-center min-h-screen pt-20 z-10">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="hero-content text-white fade-in-up">
              <p className="text-primary-yellow text-sm uppercase tracking-wider mb-4">
                {currentSlideData.subtitle}
              </p>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
                {currentSlideData.title}
              </h1>
              <p className="text-lg mb-8 max-w-lg text-gray-300">
                {currentSlideData.description}
              </p>

              <Button className="bg-primary-yellow text-white px-8 py-4 rounded-md hover:bg-yellow-600 transition-all duration-300 font-semibold hover-lift">
                {currentSlideData.buttonText}
              </Button>

              {/* Rating Display */}
              <div className="mt-12 flex items-center space-x-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">4.5+</div>
                  <p className="text-sm text-gray-400 uppercase tracking-wider">
                    BASED ON 1,200 REVIEWS
                  </p>
                </div>
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() =>
                      handleSlideChange(
                        (currentSlide - 1 + slides.length) % slides.length
                      )
                    }
                    className="text-gray-400 hover:text-primary-yellow transition-colors text-sm"
                  >
                    PREVIOUS
                  </button>
                  <button
                    onClick={() =>
                      handleSlideChange((currentSlide + 1) % slides.length)
                    }
                    className="text-gray-400 hover:text-primary-yellow transition-colors text-sm"
                  >
                    NEXT
                  </button>
                </div>
              </div>
            </div>

            {/* Right side indicators */}
            <div className="hidden lg:flex flex-col items-end space-y-8">
              <div className="text-right text-white">
                <div className="text-8xl font-bold text-primary-yellow opacity-20">
                  {String(currentSlide + 1).padStart(2, "0")}.
                </div>
              </div>
              <div className="text-right text-white">
                <div className="text-8xl font-bold text-primary-yellow opacity-20">
                  {String(slides.length).padStart(2, "0")}.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Navigation */}
      <div className="absolute bottom-8 left-6 flex space-x-4 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-primary-yellow opacity-100"
                : "bg-white opacity-50 hover:opacity-75"
            }`}
            onClick={() => handleSlideChange(index)}
          />
        ))}
      </div>

      {/* Scroll to explore */}
      <div className="absolute bottom-8 right-8 text-white z-10">
        <div className="flex flex-col items-center">
          <p className="text-sm mb-2 rotate-90 origin-center uppercase tracking-wider">
            SCROLL TO EXPLORE
          </p>
          <div className="w-px h-12 bg-primary-yellow"></div>
        </div>
      </div>
    </section>
  );
}
