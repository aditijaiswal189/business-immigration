import BenefitsSlider from "@/components/ui/benefits-slider";
import { ScrollingCards } from "@/components/ui/scrolling-cards";
import React from "react";
import RegionHeroColor from "@/components/ui/region-hero-color";
import { ProgramsBento } from "@/components/ui/programs-bento";
import Stats from "@/components/ui/stats";
import { americasBenefits, americasPrograms, americasStats } from "@/data/americas";

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
      <ProgramsBento 
        title="Americas"
        items={americasPrograms}
        searchPlaceholder="Search Americas programs"
        budgetLabel="Investment Required"
        timelineLabel="Processing Time"
        contactLabel="Contact advisor"
        viewDetailsLabel="Learn more"
      />
      <ScrollingCards />
    </div>
  );
};

export default AmericasPage;
