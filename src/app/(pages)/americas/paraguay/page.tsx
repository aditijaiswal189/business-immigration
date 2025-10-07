import BenefitsSlider from "@/components/ui/benefits-slider";
import { ScrollingCards } from "@/components/ui/scrolling-cards";
import React from "react";
import RegionHeroColor from "@/components/ui/region-hero-color";
import { ProgramsBento } from "@/components/ui/programs-bento";
import Stats from "@/components/ui/stats";
import { paraguayBenefits, paraguayPrograms, paraguayStats } from "@/data/paraguay";

const ParaguayPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex gap-4 md:gap-20 flex-col">
      <RegionHeroColor
        eyebrow="Immigration · Paraguay"
        title="Your gateway to"
        highlight="South America"
        subtitle="Discover Paraguay's simple residency process, low cost of living, and strategic business opportunities in the heart of South America."
        primaryCta={{ label: "Check requirements", href: "#requirements" }}
        secondaryCta={{ label: "Talk to an expert", href: "#contact" }}
      />
      <Stats stats={paraguayStats} />
      <BenefitsSlider 
        benefits={paraguayBenefits} 
        region="Paraguay"
        defaultActive="business"
      />
      <ProgramsBento 
        title="Paraguay"
        items={paraguayPrograms}
        searchPlaceholder="Search Paraguay programs"
        budgetLabel="Investment / Requirements"
        timelineLabel="Processing time"
        contactLabel="Contact advisor"
        viewDetailsLabel="Learn more"
      />
      <ScrollingCards />
    </div>
  );
};

export default ParaguayPage;
