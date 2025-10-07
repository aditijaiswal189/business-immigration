import BenefitsSlider from "@/components/ui/benefits-slider";
import { ScrollingCards } from "@/components/ui/scrolling-cards";
import React from "react";
import RegionHeroColor from "@/components/ui/region-hero-color";
import { ProgramsBento } from "@/components/ui/programs-bento";
import Stats from "@/components/ui/stats";
import { caribbeanBenefits, caribbeanPrograms, caribbeanStats } from "@/data/caribbean";

const CaribbeanPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex gap-4 md:gap-20 flex-col">
      <RegionHeroColor
        eyebrow="Immigration · Caribbean"
        title="Your gateway to"
        highlight="Paradise"
        subtitle="Explore citizenship by investment programs, tax benefits, and tropical lifestyle opportunities across the Caribbean islands."
        primaryCta={{ label: "Explore Programs", href: "#programs" }}
        secondaryCta={{ label: "Talk to an expert", href: "#contact" }}
      />
      <Stats stats={caribbeanStats} />
      <BenefitsSlider 
        benefits={caribbeanBenefits} 
        region="Caribbean"
        defaultActive="citizenship-investment"
      />
      <ProgramsBento 
        title="Caribbean"
        items={caribbeanPrograms}
        searchPlaceholder="Search Caribbean programs"
        budgetLabel="Investment Required"
        timelineLabel="Processing Time"
        contactLabel="Contact advisor"
        viewDetailsLabel="Learn more"
      />
      <ScrollingCards />
    </div>
  );
};

export default CaribbeanPage;
