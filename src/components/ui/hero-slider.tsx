// components/hero/hero-slider.tsx
"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSlider } from "@/hooks/use-slider";
import { PixelatedTransitionOverlay } from "./reusable/pixelated-transition";
import { GoldButton } from "./reusable/gold-button";
import { ArrowButton } from "./reusable/arrow-button";
import { DotIndicators } from "./reusable/dot-indicators";

type Slide = {
  id: number;
  category: string;
  title: string;
  buttonText: string;
  image: string;
};

const slides: Slide[] = [
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

export default function HeroSlider() {
  const { current, isTransitioning, nextIndex, next, prev, goTo } = useSlider(
    slides.length,
    5000,
    1500
  );

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background slides */}
      <div className="absolute inset-0">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000",
              i === current ? "opacity-100" : "opacity-0"
            )}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/65 via-[var(--primary)]/60 to-[var(--accent)]/50" />
          </div>
        ))}

        {/* Transition overlay */}
        <PixelatedTransitionOverlay
          running={isTransitioning}
          nextImage={slides[nextIndex].image}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div
                className={cn(
                  "text-content",
                  isTransitioning && "text-fade-transition"
                )}
              >
                <div className="text-gray-300 text-sm font-semibold tracking-widest mb-4 uppercase">
                  {slides[current].category}
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8">
                  {slides[current].title}
                </h1>

                <GoldButton tone="white" className="rounded-xl px-10 py-4">
                  {slides[current].buttonText}
                </GoldButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prev/Next text buttons (bottom-left) */}
      <div className="absolute left-8 bottom-8 space-y-4 gap-4 flex flex-row z-30">
        <GoldButton
          tone="black"
          onClick={prev}
          disabled={isTransitioning}
          className="rounded-xl px-6 py-2 z-30"
        >
          PREVIOUS
        </GoldButton>
        <GoldButton
          tone="white"
          onClick={next}
          disabled={isTransitioning}
          className="rounded-xl px-6 py-2 z-30"
        >
          NEXT
        </GoldButton>
      </div>

      {/* Center dots */}
      <DotIndicators
        count={slides.length}
        activeIndex={current}
        onSelect={goTo}
        disabled={isTransitioning}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
      />

      {/* Arrow nav (sides) */}
      <ArrowButton
        onClick={prev}
        disabled={isTransitioning}
        className="absolute left-8 top-1/2 -translate-y-1/2"
      >
        <span className="relative z-30">
          <ChevronLeft className="w-5 h-5" />
        </span>
      </ArrowButton>

      <ArrowButton
        onClick={next}
        disabled={isTransitioning}
        className="absolute right-8 top-1/2 -translate-y-1/2"
      >
        <span className="relative z-30">
          <ChevronRight className="w-5 h-5" />
        </span>
      </ArrowButton>

      {/* Scroll CTA */}
      <GoldButton
        tone="black"
        onClick={() =>
          document
            .getElementById("next-section")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        className="absolute bottom-8 right-8 z-30 rounded-xl px-6 py-2"
      >
        Scroll to Explore
      </GoldButton>
    </div>
  );
}
