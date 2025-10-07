import BenefitsSlider from "@/components/ui/benefits-slider";
import { ScrollingCards } from "@/components/ui/scrolling-cards";
import React from "react";
import RegionHeroColor from "@/components/ui/region-hero-color";
import { ProgramsBento } from "@/components/ui/programs-bento";
import Stats from "@/components/ui/stats";
import { apacBenefits, apacPrograms, apacStats } from "@/data/apac";

const ApacPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex gap-4 md:gap-20 flex-col">
      <RegionHeroColor
        eyebrow="Immigration · APAC"
        title="Your gateway to"
        highlight="Asia-Pacific"
        subtitle="Explore investment opportunities, business visas, and citizenship programs across the dynamic Asia-Pacific region."
        primaryCta={{ label: "Explore Programs", href: "#programs" }}
        secondaryCta={{ label: "Talk to an expert", href: "#contact" }}
      />
      <Stats stats={apacStats} />
      <BenefitsSlider 
        benefits={apacBenefits} 
        region="Asia-Pacific"
        defaultActive="economic-growth"
      />
      <ProgramsBento 
        title="APAC"
        items={apacPrograms}
        searchPlaceholder="Search APAC programs"
        budgetLabel="Investment Required"
        timelineLabel="Processing Time"
        contactLabel="Contact advisor"
        viewDetailsLabel="Learn more"
      />
      <ScrollingCards />
    </div>
  );
};

export default ApacPage;