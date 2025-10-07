import BenefitsSlider from "@/components/ui/benefits-slider";
import { ScrollingCards } from "@/components/ui/scrolling-cards";
import React from "react";
import RegionHeroColor from "@/components/ui/region-hero-color";
import { ProgramsBento } from "@/components/ui/programs-bento";
import Stats from "@/components/ui/stats";
import { cambodiaBenefits, cambodiaPrograms, cambodiaStats } from "@/data/cambodia";

const CambodiaSecondHomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex gap-4 md:gap-20 flex-col">
      <RegionHeroColor
        eyebrow="Immigration · Cambodia"
        title="Your gateway to"
        highlight="Southeast Asia"
        subtitle="Discover Cambodia's Second Home Program - a 10-year renewable visa with low investment requirements and access to the growing ASEAN market."
        primaryCta={{ label: "Apply Now", href: "#apply" }}
        secondaryCta={{ label: "Talk to an expert", href: "#contact" }}
      />
      <Stats stats={cambodiaStats} />
      <BenefitsSlider 
        benefits={cambodiaBenefits} 
        region="Cambodia"
        defaultActive="second-home"
      />
      <ProgramsBento 
        title="Cambodia"
        items={cambodiaPrograms}
        searchPlaceholder="Search Cambodia programs"
        budgetLabel="Investment Required"
        timelineLabel="Processing Time"
        contactLabel="Contact advisor"
        viewDetailsLabel="Learn more"
      />
      <ScrollingCards />
    </div>
  );
};

export default CambodiaSecondHomePage;
