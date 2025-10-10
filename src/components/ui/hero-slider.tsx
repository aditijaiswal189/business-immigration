"use client";

import Tilt from "react-parallax-tilt";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowDown } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

const slides = [
  {
    id: 1,
    category: "BUSINESS IMMIGRATION",
    title: "Your Gateway to Global Business Success",
    buttonText: "START YOUR JOURNEY →",
    image:
      "https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
  },
  {
    id: 2,
    category: "EXPERT VISA SERVICES",
    title: "Navigate Immigration with Confidence",
    buttonText: "CONSULT EXPERTS →",
    image:
      "https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
  },
  {
    id: 3,
    category: "GLOBAL OPPORTUNITIES",
    title: "Unlock International Business Potential",
    buttonText: "EXPLORE OPTIONS →",
    image:
      "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextSlideIndex, setNextSlideIndex] = useState(0);

  const nextSlide = () => {
    if (isTransitioning) return;
    const next = (currentSlide + 1) % slides.length;
    setNextSlideIndex(next);
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(next);
      setIsTransitioning(false);
    }, 1500);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    setNextSlideIndex(prev);
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(prev);
      setIsTransitioning(false);
    }, 1500);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    setNextSlideIndex(index);
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsTransitioning(false);
    }, 1500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        const next = (currentSlide + 1) % slides.length;
        setNextSlideIndex(next);
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentSlide(next);
          setIsTransitioning(false);
        }, 1500);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide, isTransitioning]);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0">
        {/* All Slides */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/65 via-[var(--primary)]/60 to-[var(--accent)]/50" />
          </div>
        ))}

        {/* Pixelated Transition Overlay */}
        {isTransitioning && (
          <div className="absolute inset-0 pixelated-grid-container">
            <div className="pixelated-grid">
              {Array.from({ length: 1200 }).map((_, i) => {
                const row = Math.floor(i / 40);
                const col = i % 40;
                const centerDistance = Math.sqrt(
                  Math.pow(col - 20, 2) + Math.pow(row - 15, 2)
                );
                const maxDistance = Math.sqrt(20 * 20 + 15 * 15);
                const normalizedDistance = centerDistance / maxDistance;

                return (
                  <div
                    key={i}
                    className="pixel-square"
                    style={{
                      animationDelay: `${
                        normalizedDistance * 0.6 + Math.random() * 0.3
                      }s`,
                      backgroundImage: `url(${slides[nextSlideIndex].image})`,
                      backgroundSize: "100vw 100vh",
                      backgroundPosition: `${-(i % 40) * 2.5}vw ${
                        -Math.floor(i / 40) * 3.33
                      }vh`,
                    }}
                  />
                );
              })}
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/65 via-[var(--primary)]/60 to-[var(--accent)]/50" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-8">
              <div
                className={`text-content ${
                  isTransitioning ? "text-fade-transition" : ""
                }`}
              >
                <div className="text-gray-300 text-sm font-semibold tracking-widest mb-4 uppercase">
                  {slides[currentSlide].category}
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8">
                  {slides[currentSlide].title}
                </h1>
                {/* <Tilt
                  glareEnable={true}
                  glareMaxOpacity={0.4}
                  scale={1.02}
                  tiltEnable={true}
                > */}
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
                    {slides[currentSlide].buttonText}
                  </span>
                </Button>
                {/* </Tilt> */}
              </div>
            </div>

            {/* Right Side - Slide Numbers */}
            {/* <div className="lg:col-span-4 flex lg:justify-end">
              <div className="text-right bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="text-6xl font-bold text-white/30 mb-2">
                  {String(currentSlide + 1).padStart(2, "0")}.
                </div>
                <div className="text-4xl font-bold text-white/50 mb-8">
                  {String(slides.length).padStart(2, "0")}.
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute left-8 bottom-28 space-y-4 ">
        {/* <button
         
          className="block text-white/90 hover:text-[var(--accent)] transition-all duration-300 text-sm font-medium tracking-widest disabled:opacity-50 hover:scale-105"
        >
         
        </button>
        <button
         
          className="block text-white/90 hover:text-[var(--accent)] transition-all duration-300 text-sm font-medium tracking-widest disabled:opacity-50 hover:scale-105"
        >
        
        </button> */}
        <Button
          variant="goldBlack"
          onClick={prevSlide}
          disabled={isTransitioning}
          className="block "
        >
          <div className="absolute inset-[2px] rounded-[inherit] bg-[linear-gradient(135deg,#000,#111,#000)] shadow-[inset_0_3px_6px_rgba(0,0,0,0.9),inset_0_-1px_3px_rgba(255,255,255,0.08),0_1px_0_rgba(255,255,255,0.08)]" />
          <span className="relative z-10 text-white font-bold">PREVIOUS</span>
        </Button>

        <Button
          variant="goldWhite"
          onClick={nextSlide}
          disabled={isTransitioning}
          className="block "
        >
          <div className="absolute inset-[2px] rounded-[inherit] bg-[linear-gradient(135deg,#fff,#f9f9f9,#f0f0f0)] shadow-[inset_0_2px_5px_rgba(255,255,255,0.8),inset_0_-1px_2px_rgba(0,0,0,0.15),0_1px_0_rgba(255,255,255,0.7)]" />
          <span className="relative z-10 font-bold ">NEXT</span>
        </Button>
      </div>

      {/* Slide Indicators */}
      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isTransitioning}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-[linear-gradient(90deg,var(--primary),var(--accent))] scale-125 shadow-lg"
                : "bg-white/40 hover:bg-white/60 hover:scale-110"
            } disabled:opacity-50`}
          />
        ))}
      </div> */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30
             bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10"
        role="tablist"
        aria-label="Slide indicators"
      >
        {slides.map((_, i) => {
          const active = i === currentSlide;
          return (
            <Button
              key={i}
              onClick={() => goToSlide(i)}
              disabled={isTransitioning}
              aria-selected={active}
              aria-label={`Go to slide ${i + 1}`}
              role="tab"
              variant="goldBlack"
              className={cn(
                // tiny round dot geometry
                "relative size-4 rounded-full p-0",
                // disable shimmer overlay from the gold variant for dots
                "after:opacity-0 after:!hidden hover:after:opacity-0",
                active ? "scale-110" : "opacity-80 hover:opacity-100"
              )}
            >
              {/* center fill: light when idle, gradient when active */}
              <div
                className={cn(
                  "absolute inset-[1px] rounded-[inherit] pointer-events-none",
                  active
                    ? "bg-[linear-gradient(90deg,var(--primary),var(--accent))] shadow-[inset_0_1px_2px_rgba(255,255,255,0.25)]"
                    : "bg-white/80 dark:bg-white/25"
                )}
              />
              <span className="sr-only">Slide {i + 1}</span>
            </Button>
          );
        })}
      </div>

      {/* Rating Section */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 translate-y-20 text-center z-30">
        {/* <div className="text-5xl font-bold text-white mb-2">4.5+</div> */}
        <div className="text-sm text-white/80 tracking-widest">
          BASED ON 1,200 REVIEWS
        </div>
      </div>

      {/* Navigation Arrows */}

      <Button
        variant="goldBlack"
        onClick={prevSlide}
        disabled={isTransitioning}
        className="absolute left-8 top-1/2 transform -translate-y-1/2"
      >
        <div className="absolute inset-[2px] rounded-[inherit] bg-[linear-gradient(135deg,#000,#111,#000)] shadow-[inset_0_3px_6px_rgba(0,0,0,0.9),inset_0_-1px_3px_rgba(255,255,255,0.08),0_1px_0_rgba(255,255,255,0.08)]" />
        <span className="relative z-10 text-white font-bold">
          <ChevronLeft className="w-5 h-5" />
        </span>
      </Button>

      <Button
        variant="goldWhite"
        onClick={nextSlide}
        disabled={isTransitioning}
        className="absolute right-8 top-1/2 transform -translate-y-1/2"
      >
        <div className="absolute inset-[2px] rounded-[inherit] bg-[linear-gradient(135deg,#fff,#f9f9f9,#f0f0f0)] shadow-[inset_0_2px_5px_rgba(255,255,255,0.8),inset_0_-1px_2px_rgba(0,0,0,0.15),0_1px_0_rgba(255,255,255,0.7)]" />
        <span className="relative z-10 font-bold ">
          {" "}
          <ChevronRight className="w-5 h-5" />
        </span>
      </Button>

      {/* Scroll Indicator */}

      <Button
        variant="goldBlack"
        onClick={() => {
          const el = document.getElementById("next-section");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
        className="absolute bottom-8 right-8 text-center z-30 cursor-pointer"
      >
        <div className="absolute inset-[2px] rounded-[inherit] bg-[linear-gradient(135deg,#000,#111,#000)] shadow-[inset_0_3px_6px_rgba(0,0,0,0.9),inset_0_-1px_3px_rgba(255,255,255,0.08),0_1px_0_rgba(255,255,255,0.08)]" />
        <span className="relative z-10 text-white font-bold">
          Scroll to Explore
        </span>
      </Button>
    </div>
  );
};

export default HeroSlider;
