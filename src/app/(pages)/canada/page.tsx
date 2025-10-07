import BenefitsSlider from "@/components/ui/benefits-slider";
import { ScrollingCards } from "@/components/ui/scrolling-cards";
import React from "react";
import RegionHeroColor from "@/components/ui/region-hero-color";
import { ProgramsBento } from "@/components/ui/programs-bento";
import Stats from "@/components/ui/stats";
import { canadaBenefits, canadaPrograms, canadaStats } from "@/data/canada";

const CanadaPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex gap-4 md:gap-20 flex-col">
      <RegionHeroColor
        eyebrow="Immigration · Canada"
        title="Your pathway to"
        highlight="Permanent Residence"
        subtitle="Explore Express Entry, PNPs, study and work routes. We guide you from eligibility to landing."
        primaryCta={{ label: "Check eligibility", href: "#eligibility" }}
        secondaryCta={{ label: "Talk to an expert", href: "#contact" }}
      />
      <Stats stats={canadaStats} />
      <BenefitsSlider 
        benefits={canadaBenefits} 
        region="Canada"
        defaultActive="politics"
      />
      <ProgramsBento 
        title="Canada"
        items={canadaPrograms}
        searchPlaceholder="Search Canadian programs"
        budgetLabel="Typical budget / funds"
        timelineLabel="Pathway / timeline"
        contactLabel="Contact advisor"
        viewDetailsLabel="View details"
      />
      <ScrollingCards />
    </div>
  );
};

export default CanadaPage;
