import BenefitsSlider from "@/components/ui/benefits-slider";
import { ScrollingCards } from "@/components/ui/scrolling-cards";
import React from "react";
import RegionHeroColor from "@/components/ui/region-hero-color";
import { ProgramsBento } from "@/components/ui/programs-bento";
import Stats from "@/components/ui/stats";
import USAFeaturesSection from "./usa-features-section";
import USAStepsSection from "./usa-steps-section";
import {
  americasBenefits,
  americasPrograms,
  americasStats,
} from "@/data/americas";

const AmericasPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex gap-4 md:gap-20 flex-col">
      <RegionHeroColor
        eyebrow="Immigration · Americas"
        title="Your gateway to"
        highlight="The Americas"
        subtitle="Discover residency and citizenship opportunities across North and South America, from the USA to Paraguay and beyond."
        primaryCta={{ label: "Explore Programs", href: "#programs" }}
        secondaryCta={{ label: "Talk to an expert", href: "#contact" }}
      />
      <Stats stats={americasStats} />
      <BenefitsSlider
        benefits={americasBenefits}
        region="The Americas"
        defaultActive="market-access"
      />
      {/* USA Feature Requirements Section */}
      <section
        id="usa-eligibility"
        className="w-full flex flex-col items-center px-4 md:px-0"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-brown mb-2 mt-8 md:mt-12">
          USA Investor Visa Requirements
        </h2>
        <p className="text-lg text-gray-700 mb-6 max-w-2xl text-center">
          Hover over each card to see the detailed eligibility and requirements
          for US investor and business immigration programs.
        </p>
        <USAFeaturesSection />
      </section>
      <USAStepsSection />
      {/* <ProgramsBento
        title="Americas"
        items={americasPrograms}
        searchPlaceholder="Search Americas programs"
        budgetLabel="Investment Required"
        timelineLabel="Processing Time"
        contactLabel="Contact advisor"
        viewDetailsLabel="Learn more"
      />
      <ScrollingCards /> */}
    </div>
  );
};

export default AmericasPage;
