import BenefitsSlider from "@/components/ui/benefits-slider";
import { ScrollingCards } from "@/components/ui/scrolling-cards";
import React from "react";
import RegionHeroColor from "@/components/ui/region-hero-color";
import { ProgramsBento } from "@/components/ui/programs-bento";
import Stats from "@/components/ui/stats";
import { emeaBenefits, emeaPrograms, emeaStats } from "@/data/emea";

const EuropePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex gap-4 md:gap-20 flex-col">
      <RegionHeroColor
        eyebrow="Immigration · EMEA"
        title="Your gateway to"
        highlight="Europe & Beyond"
        subtitle="Discover investment programs, EU citizenship pathways, and residency options across Europe, Middle East, and Africa."
        primaryCta={{ label: "Explore Programs", href: "#programs" }}
        secondaryCta={{ label: "Talk to an expert", href: "#contact" }}
      />
      <Stats stats={emeaStats} />
      <BenefitsSlider 
        benefits={emeaBenefits} 
        region="EMEA"
        defaultActive="eu-access"
      />
      <ProgramsBento 
        title="EMEA"
        items={emeaPrograms}
        searchPlaceholder="Search EMEA programs"
        budgetLabel="Investment Required"
        timelineLabel="Processing Time"
        contactLabel="Contact advisor"
        viewDetailsLabel="Learn more"
      />
      <ScrollingCards />
    </div>
  );
};

export default EuropePage;
