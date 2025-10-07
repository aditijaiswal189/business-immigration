import BenefitsSlider from "@/components/ui/benefits-slider";
import { ScrollingCards } from "@/components/ui/scrolling-cards";
import React from "react";
import RegionHeroColor from "@/components/ui/region-hero-color";
import { ProgramsBento } from "@/components/ui/programs-bento";
import Stats from "@/components/ui/stats";
import { maltaBenefits, maltaPrograms, maltaStats } from "@/data/malta";

const MaltaPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex gap-4 md:gap-20 flex-col">
      <RegionHeroColor
        eyebrow="Immigration · Malta"
        title="Your pathway to"
        highlight="EU Citizenship"
        subtitle="Discover Malta's citizenship and residency programs - your gateway to European Union membership with Mediterranean lifestyle and global mobility."
        primaryCta={{ label: "Apply Now", href: "#apply" }}
        secondaryCta={{ label: "Talk to an expert", href: "#contact" }}
      />
      <Stats stats={maltaStats} />
      <BenefitsSlider 
        benefits={maltaBenefits} 
        region="Malta"
        defaultActive="eu-citizenship"
      />
      <ProgramsBento 
        title="Malta"
        items={maltaPrograms}
        searchPlaceholder="Search Malta programs"
        budgetLabel="Investment Required"
        timelineLabel="Processing Time"
        contactLabel="Contact advisor"
        viewDetailsLabel="Learn more"
      />
      <ScrollingCards />
    </div>
  );
};

export default MaltaPage;
