"use client";

import * as React from "react";

interface Benefit {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  isActive?: boolean;
}

const benefits: Benefit[] = [
  {
    id: "education",
    title: "Education system",
    subtitle: "Top quality education",
    description: "Canada boasts a world-class education system, with top-ranked universities globally, cutting-edge curricula and a multicultural learning environment, offering students unparalleled opportunities for growth.",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3",
    isActive: false
  },
  {
    id: "healthcare",
    title: "Social welfare and health",
    subtitle: "The most advanced and developed",
    description: "Canada is famous for its comprehensive social security and welfare system, including free health care, unemployment benefits, pensions and many family support programs, ensuring a high quality of life for residents.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3",
    isActive: false
  },
  {
    id: "opportunities",
    title: "Job and investment opportunities",
    subtitle: "Many opportunities for advancement",
    description: "Canada is an ideal destination for work and investment, with a stable economy, policies to attract talent and a favorable business environment for businesses and individuals to develop.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3",
    isActive: false
  },
  {
    id: "politics",
    title: "Politics and Society",
    subtitle: "Stable and safe",
    description: "Canada has a stable political system, safe and friendly society. Safety and happiness index is high, bringing a peaceful life to people and immigrants.",
    image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3",
    isActive: true
  },
  {
    id: "nature",
    title: "Nature - environment",
    subtitle: "Beautiful and fresh",
    description: "Canada possesses many majestic and diverse natural landscapes, a clean living environment and good air quality, ideal for future life and relaxation.",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3",
    isActive: false
  }
];

export default function CanadaBenefitsSlider() {
  const [activeBenefit, setActiveBenefit] = React.useState<string>("politics");

  const handleBenefitHover = (benefitId: string) => {
    setActiveBenefit(benefitId);
  };

  const currentBenefit = benefits.find(b => b.id === activeBenefit) || benefits[3];

  return (
    <section className="relative min-h-screen bg-background overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={currentBenefit.image}
          alt={currentBenefit.title}
          className="w-full h-full object-cover transition-all duration-700 ease-in-out"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20"></div>
      </div>

      {/* Content Container - Exactly matching the HTML structure */}
      <div className="xsm:hidden absolute size-full inset-0 z-10 pl-[5rem] pt-[5rem]">
        {/* Decorative SVG Line */}
        <svg 
          className="w-[59.75rem] ml-[-5rem]" 
          xmlns="http://www.w3.org/2000/svg" 
          width="959" 
          height="6" 
          viewBox="0 0 959 6" 
          fill="none"
        >
          <path 
            d="M0.333333 3C0.333333 4.47276 1.52724 5.66667 3 5.66667C4.47276 5.66667 5.66667 4.47276 5.66667 3C5.66667 1.52724 4.47276 0.333333 3 0.333333C1.52724 0.333333 0.333333 1.52724 0.333333 3ZM3 3.5H959V2.5H3V3.5Z" 
            fill="black" 
            fillOpacity="0.1"
          />
        </svg>

        {/* Benefits Container */}
        <div className="relative w-[59.75rem] mt-[1.62rem]">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className={`absolute w-full flex items-center justify-between transition-all duration-500 cursor-pointer ${
                activeBenefit === benefit.id ? 'opacity-100' : 'opacity-0'
              }`}
              onMouseEnter={() => handleBenefitHover(benefit.id)}
            >
              <div className="space-y-[0.31rem]">
                <h2 className="text-[2.625rem] font-medium leading-[1.2] tracking-[-0.0525rem] uppercase font-optima bg-gradient-to-r from-[#95502F] via-[#F5C178] to-[#F5C178] bg-clip-text text-transparent">
                  {benefit.title}
                </h2>
                <p className="text-white/87 text-[1.25rem] font-normal leading-[1.2] tracking-[-0.0375rem]">
                  {benefit.subtitle}
                </p>
              </div>
              <p className="w-[21.375rem] text-white/80 text-[0.8125rem] uppercase leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Features List Navigation */}
        <div className="absolute bottom-8 left-0 right-0 px-8">
          <div className="flex justify-center space-x-8">
            {benefits.map((benefit) => (
              <button
                key={benefit.id}
                className={`group flex flex-col items-center space-y-2 p-4 rounded-xl transition-all duration-300 hover:bg-white/10 ${
                  activeBenefit === benefit.id ? 'bg-white/15' : ''
                }`}
                onMouseEnter={() => handleBenefitHover(benefit.id)}
                onClick={() => handleBenefitHover(benefit.id)}
              >
                {/* Feature Icon/Indicator */}
                <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeBenefit === benefit.id 
                    ? 'bg-[#F5C178] scale-125' 
                    : 'bg-white/40 group-hover:bg-white/70'
                }`} />
                
                {/* Feature Title */}
                <span className={`text-xs font-medium uppercase tracking-wide transition-colors duration-300 text-center leading-tight ${
                  activeBenefit === benefit.id 
                    ? 'text-[#F5C178]' 
                    : 'text-white/70 group-hover:text-white/90'
                }`}>
                  {benefit.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Version */}
      <div className="lg:hidden relative z-10 min-h-screen flex items-center px-4">
        <div className="w-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Why Choose Canada?
            </h2>
            <p className="text-white/80 text-lg">
              Discover the benefits of Canadian immigration
            </p>
          </div>

          <div className="space-y-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.id}
                className={`p-6 rounded-2xl backdrop-blur-md border transition-all duration-300 ${
                  activeBenefit === benefit.id 
                    ? 'bg-white/20 border-[#F5C178]/50' 
                    : 'bg-white/10 border-white/20'
                }`}
                onClick={() => handleBenefitHover(benefit.id)}
              >
                <h3 className="text-xl font-semibold text-white mb-2 uppercase">
                  {benefit.title}
                </h3>
                <p className="text-white/80 text-sm mb-3">
                  {benefit.subtitle}
                </p>
                {activeBenefit === benefit.id && (
                  <p className="text-white/70 text-xs uppercase leading-relaxed">
                    {benefit.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
