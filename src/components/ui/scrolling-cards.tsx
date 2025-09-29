"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Users,
  Globe,
  FileCheck,
  Award,
  Clock,
  MapPin,
} from "lucide-react";

// tiny local cn to avoid external dep
function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

interface CardData {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  image: string;
  badge?: string;
}

const cardData: CardData[] = [
  {
    id: 1,
    title: "Express Entry Program",
    description:
      "Fast-track your Canadian immigration through the most popular federal program",
    icon: <Globe className="w-8 h-8" />,
    features: [
      "6-8 months processing",
      "No job offer required",
      "Permanent residence",
    ],
    image:
      "https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
    badge: "Most Popular",
  },
  {
    id: 2,
    title: "Provincial Nominee Program",
    description:
      "Get nominated by a Canadian province for faster immigration processing",
    icon: <MapPin className="w-8 h-8" />,
    features: [
      "Provincial support",
      "Job opportunities",
      "Community integration",
    ],
    image:
      "https://images.pexels.com/photos/2422588/pexels-photo-2422588.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
  },
  {
    id: 3,
    title: "Family Sponsorship",
    description:
      "Reunite with your loved ones through Canada's family immigration programs",
    icon: <Users className="w-8 h-8" />,
    features: [
      "Sponsor family members",
      "No language requirements",
      "Direct pathway",
    ],
    image:
      "https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
  },
  {
    id: 4,
    title: "Business Immigration",
    description:
      "Invest in Canada and build your business while obtaining permanent residence",
    icon: <Award className="w-8 h-8" />,
    features: [
      "Investment opportunities",
      "Business support",
      "Fast processing",
    ],
    image:
      "https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
    badge: "Premium",
  },
  {
    id: 5,
    title: "Study Permits",
    description:
      "Start your Canadian journey with world-class education opportunities",
    icon: <FileCheck className="w-8 h-8" />,
    features: [
      "Work while studying",
      "Post-graduation work permit",
      "Pathway to PR",
    ],
    image:
      "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
  },
  {
    id: 6,
    title: "Work Permits",
    description:
      "Gain valuable Canadian work experience with various work permit options",
    icon: <Clock className="w-8 h-8" />,
    features: [
      "Immediate work authorization",
      "Canadian experience",
      "Family benefits",
    ],
    image:
      "https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
  },
];

export function ScrollingCards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const cardWidth = 384; // w-96
  const gap = 24; // gap-6
  const totalWidth = cardWidth + gap;

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const scrollPosition = index * totalWidth;
      scrollRef.current.scrollTo({ left: scrollPosition, behavior: "smooth" });
      setCurrentIndex(index);
    }
  };

  const nextSlide = () => scrollToIndex((currentIndex + 1) % cardData.length);
  const prevSlide = () =>
    scrollToIndex(currentIndex === 0 ? cardData.length - 1 : currentIndex - 1);

  useEffect(() => {
    if (isAutoScrolling) {
      intervalRef.current = setInterval(nextSlide, 5000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAutoScrolling, currentIndex]);

  const handleMouseEnter = () => setIsAutoScrolling(false);
  const handleMouseLeave = () => setIsAutoScrolling(true);

  return (
    <main
      className="min-h-screen bg-background text-foreground"
      style={{
        // soft background using your vars
        backgroundImage:
          "linear-gradient(to bottom right, var(--muted), var(--primary-light))",
      }}
    >
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-[var(--section-padding-x)]">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Your Path to
              <span
                className="ml-3 text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, var(--primary), var(--accent))",
                }}
              >
                Canadian Dreams
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover the perfect immigration program tailored to your unique
              situation. Our expert team guides you through every step of your
              Canadian immigration journey.
            </p>
          </div>

          {/* Cards */}
          <div className="relative">
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {cardData.map((card, index) => (
                <div
                  key={card.id}
                  className={cn(
                    "flex-shrink-0 w-96 rounded-2xl transition-all duration-500 transform hover:-translate-y-2 group cursor-pointer",
                    "bg-card text-card-foreground shadow-lg hover:shadow-2xl border border-border overflow-hidden"
                  )}
                  onClick={() => scrollToIndex(index)}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage:
                          "linear-gradient(to top, color-mix(in oklab, var(--foreground) 12%, transparent), transparent)",
                      }}
                    />
                    {card.badge && (
                      <div className="absolute top-4 left-4">
                        <span
                          className="px-3 py-1 rounded-full text-sm font-semibold shadow-lg"
                          style={{
                            color: "var(--primary-foreground)",
                            backgroundImage:
                              "linear-gradient(90deg, var(--primary), var(--accent))",
                          }}
                        >
                          {card.badge}
                        </span>
                      </div>
                    )}
                    {/* Icon pill */}
                    <div
                      className="absolute bottom-4 right-4 rounded-full p-3 shadow-lg transition-all duration-300"
                      style={{
                        backgroundColor:
                          "color-mix(in oklab, var(--card) 90%, transparent)",
                      }}
                    >
                      <div className="transition-all duration-300 group-hover:scale-110">
                        {card.icon}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <h3
                      className="text-2xl font-bold mb-3 transition-colors duration-300"
                      style={{ color: "var(--foreground)" }}
                    >
                      {card.title}
                    </h3>
                    <p className="mb-6 leading-relaxed text-muted-foreground">
                      {card.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2 mb-6">
                      {card.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <span
                            className="w-2 h-2 rounded-full mr-3 flex-shrink-0"
                            style={{
                              backgroundImage:
                                "linear-gradient(90deg, var(--primary), var(--accent))",
                            }}
                          />
                          <span className="text-sm text-foreground/80">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <div className="flex items-center justify-between">
                      <button
                        className="px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                        style={{
                          color: "var(--primary-foreground)",
                          backgroundImage:
                            "linear-gradient(90deg, var(--primary), var(--accent))",
                        }}
                      >
                        Learn More
                      </button>
                      <span
                        className="font-semibold text-sm transition-transform duration-300 group-hover:translate-x-1"
                        style={{ color: "var(--primary)" }}
                      >
                        Explore Program →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full p-3 z-10 group transition-all duration-300 shadow-lg hover:shadow-xl"
              style={{
                backgroundColor:
                  "color-mix(in oklab, var(--card) 92%, transparent)",
              }}
            >
              <ChevronLeft
                className="w-6 h-6"
                style={{ color: "var(--foreground)" }}
              />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-3 z-10 group transition-all duration-300 shadow-lg hover:shadow-xl"
              style={{
                backgroundColor:
                  "color-mix(in oklab, var(--card) 92%, transparent)",
              }}
            >
              <ChevronRight
                className="w-6 h-6"
                style={{ color: "var(--foreground)" }}
              />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {cardData.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={cn(
                  "h-3 rounded-full transition-all duration-300",
                  currentIndex === index ? "w-8" : "w-3"
                )}
                style={{
                  background:
                    currentIndex === index
                      ? "linear-gradient(90deg, var(--primary), var(--accent))"
                      : "var(--border)",
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "15K+", label: "Successful Applications" },
              { number: "98%", label: "Success Rate" },
              { number: "50+", label: "Countries Served" },
              { number: "24/7", label: "Expert Support" },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div
                  className="text-4xl font-bold mb-2 text-transparent bg-clip-text"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, var(--primary), var(--accent))",
                  }}
                >
                  {stat.number}
                </div>
                <div className="font-medium text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hide scrollbar (WebKit) */}
        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </section>
    </main>
  );
}
