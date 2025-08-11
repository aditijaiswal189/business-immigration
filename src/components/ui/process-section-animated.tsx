"use client";
import React, { useState } from "react";
import { Users, TrendingUp, BarChart3, Box, Database } from "lucide-react";

const steps = [
  {
    icon: Users,
    title: "People",
    number: "01",
    description:
      "We guarantee to provide affordable business consulting solutions that help you reduce costs.",
    image:
      "https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    icon: TrendingUp,
    title: "Strategy",
    number: "02",
    description:
      "Our solutions are designed to grow with your business and help you get most.",
    image:
      "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    icon: BarChart3,
    title: "Analysis",
    number: "03",
    description:
      "We specialize in serving specific industries, such as healthcare, finance, or manufacturing.",
    image:
      "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    icon: Box,
    title: "Cooperation",
    number: "04",
    description:
      "We embarked on a distinct approach adhering to our core values.",
    image:
      "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    icon: Database,
    title: "Statistics",
    number: "05",
    description:
      "We guarantee to provide affordable business consulting solutions that help you reduce costs.",
    image:
      "https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

function ProcessSectionAnimated() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className=" bg-gray-50">
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs text-gray-400 tracking-[0.3em] uppercase mb-4 font-light">
              PROCESS
            </div>
            <h2 className="text-5xl font-light text-gray-800 leading-tight">
              How does it Work?
            </h2>
          </div>

          <div className="relative flex items-center justify-center">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className={`group relative ${
                    index !== 0 ? "-ml-20" : ""
                  } transition-all duration-300`}
                  style={{
                    zIndex:
                      hoveredIndex === index
                        ? 999
                        : hoveredIndex === null
                        ? index
                        : index, // fallback if not hovered
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div
                    className="w-90 h-90 rounded-full border border-gray-200 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center p-8 transition-all duration-500 hover:scale-105 hover:shadow-xl cursor-pointer hover:bg-cover hover:bg-center"
                    style={{
                      backgroundImage: "var(--hover-bg, none)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.setProperty(
                        "--hover-bg",
                        `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${step.image})`
                      );
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.setProperty("--hover-bg", "none");
                    }}
                  >
                    <div className="mb-6">
                      <Icon className="w-12 h-12 text-primary-yellow stroke-1 group-hover:text-primary-yellow transition-colors duration-500" />
                    </div>
                    <h3 className="text-2xl font-light text-gray-800 mb-4 group-hover:text-white transition-colors duration-500">
                      <span className="text-primary-yellow font-normal group-hover:text-primary-yellow">
                        {step.number}
                      </span>{" "}
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-center text-sm leading-relaxed group-hover:text-white/90 transition-colors duration-500">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProcessSectionAnimated;
