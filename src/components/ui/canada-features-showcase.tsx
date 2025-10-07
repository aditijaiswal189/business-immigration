"use client";

import * as React from "react";
import { GraduationCap, Heart, Briefcase, Shield, TreePine } from "lucide-react";

interface Feature {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

const features: Feature[] = [
  {
    id: "education",
    title: "Education System",
    subtitle: "Top quality education",
    description: "Canada boasts a world-class education system, with top-ranked universities globally, cutting-edge curricula and a multicultural learning environment, offering students unparalleled opportunities for growth.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "healthcare",
    title: "Social Welfare & Health",
    subtitle: "The most advanced and developed",
    description: "Canada is famous for its comprehensive social security and welfare system, including free health care, unemployment benefits, pensions and many family support programs, ensuring a high quality of life for residents.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "opportunities",
    title: "Job & Investment Opportunities",
    subtitle: "Many opportunities for advancement",
    description: "Canada is an ideal destination for work and investment, with a stable economy, policies to attract talent and a favorable business environment for businesses and individuals to develop.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "politics",
    title: "Politics & Society",
    subtitle: "Stable and safe",
    description: "Canada has a stable political system, safe and friendly society. Safety and happiness index is high, bringing a peaceful life to people and immigrants.",
    image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "nature",
    title: "Nature & Environment",
    subtitle: "Beautiful and fresh",
    description: "Canada possesses many majestic and diverse natural landscapes, a clean living environment and good air quality, ideal for future life and relaxation.",
    image: "https://images.unsplash.com/photo-1503614472-8c93d56cd601?q=80&w=1200&auto=format&fit=crop"
  }
];

export default function CanadaFeaturesShowcase() {
  const [activeFeature, setActiveFeature] = React.useState<string>("politics"); // Default to "Politics & Society" like in the original

  const handleFeatureHover = (featureId: string) => {
    setActiveFeature(featureId);
  };

  const currentFeature = features.find(f => f.id === activeFeature) || features[3];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-background to-muted/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        {/* Background Image */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden">
          <img
            src={currentFeature.image}
            alt={currentFeature.title}
            className="w-full h-full object-cover transition-all duration-700 ease-in-out"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 min-h-[600px] flex items-center">
          <div className="w-full max-w-4xl">
            {/* Decorative Line */}
            <div className="hidden lg:block mb-8 pl-20 pt-20">
              <svg className="w-[59.75rem] ml-[-5rem]" xmlns="http://www.w3.org/2000/svg" width="959" height="6" viewBox="0 0 959 6" fill="none">
                <path d="M0.333333 3C0.333333 4.47276 1.52724 5.66667 3 5.66667C4.47276 5.66667 5.66667 4.47276 5.66667 3C5.66667 1.52724 4.47276 0.333333 3 0.333333C1.52724 0.333333 0.333333 1.52724 0.333333 3ZM3 3.5H959V2.5H3V3.5Z" fill="white" fillOpacity="0.3"></path>
              </svg>
            </div>

            {/* Features Container */}
            <div className="relative w-full mt-[1.62rem] pl-20">
              {features.map((feature, index) => (
                <div
                  key={feature.id}
                  className={`absolute w-full flex items-center justify-between transition-all duration-500 cursor-pointer ${
                    activeFeature === feature.id ? 'opacity-100' : 'opacity-0'
                  }`}
                  onMouseEnter={() => handleFeatureHover(feature.id)}
                >
                  <div className="space-y-[0.31rem]">
                    <h2 className="text-[2.625rem] font-medium leading-[1.2] tracking-[-0.0525rem] uppercase font-serif bg-gradient-to-r from-primary-yellow to-accent bg-clip-text text-transparent">
                      {feature.title}
                    </h2>
                    <p className="text-white/90 text-[1.25rem] font-normal leading-[1.2] tracking-[-0.0375rem]">
                      {feature.subtitle}
                    </p>
                  </div>
                  <p className="w-[21.375rem] text-white/80 text-[0.875rem] uppercase leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-8 left-20 flex space-x-3">
              {features.map((feature) => (
                <button
                  key={feature.id}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeFeature === feature.id 
                      ? 'bg-primary-yellow scale-125' 
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                  onMouseEnter={() => handleFeatureHover(feature.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
