import { CanadaProgramsBento } from "@/components/ui/canada-programs-bento";
import //   CountriesTimelineBento,
//   ImmigrationTimelineSection,
"@/components/ui/immigration-timeline-section";
import { RegionHero } from "@/components/ui/region-hero";
import RegionHeroColor from "@/components/ui/region-hero-color";
import ScrollCard from "@/components/ui/scroll-card";
import React from "react";

const EuropePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* <ScrollCard /> */}
      {/* <RegionHero
        eyebrow="Canada • Provincial Programs"
        title="Immigrate to Canada with confidence."
        subtitle="Explore Express Entry, PNPs, work-study pathways, and investment options—tailored to your province or region."
        primaryCta={{ label: "Free Assessment", href: "#assessment" }}
        secondaryCta={{ label: "Explore Programs", href: "#programs" }}
        bgImageUrl="https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=1600"
        align="left"
      /> */}
      <RegionHeroColor
        eyebrow="Immigration · Canada"
        title="Your pathway to"
        highlight="Permanent Residence"
        subtitle="Explore Express Entry, PNPs, study and work routes. We guide you from eligibility to landing."
        primaryCta={{ label: "Check eligibility", href: "#eligibility" }}
        secondaryCta={{ label: "Talk to an expert", href: "#contact" }}
      />
      {/* <ImmigrationTimelineSection /> */}
      <CanadaProgramsBento />
    </div>
  );
};

export default EuropePage;
