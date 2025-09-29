import CanadaSection from "@/components/ui/canada-section";
import { RegionHero } from "@/components/ui/region-hero";
import RegionMapPanel, { Region } from "@/components/ui/region-map-panel";
import { ScrollingCards } from "@/components/ui/scrolling-cards";
import React from "react";
// Import the GeoJSON outline for Canada
// import canadaOutline from "@/data/canada-outline";

export const CANADA_REGIONS: Region[] = [
  { id: "yt", name: "YUKON TERRITORY", labelPosition: [63.6, -135.6] },
  { id: "nt", name: "NORTHWEST TERRITORIES", labelPosition: [64.8, -117.0] },
  { id: "nu", name: "NUNAVUT", labelPosition: [66.5, -95.0] },
  { id: "bc", name: "BRITISH COLUMBIA", labelPosition: [53.5, -124.7] },
  { id: "ab", name: "ALBERTA", labelPosition: [54.5, -114.7] },
  { id: "sk", name: "SASKATCHEWAN", labelPosition: [54.0, -105.0] },
  { id: "mb", name: "MANITOBA", labelPosition: [54.8, -98.3] },
  { id: "on", name: "ONTARIO", labelPosition: [49.5, -84.5] },
  { id: "qc", name: "QUEBEC", labelPosition: [49.5, -71.0] },
  { id: "nl", name: "NEWFOUNDLAND", labelPosition: [49.0, -56.0] },
  { id: "nb", name: "NEW BRUNSWICK", labelPosition: [46.6, -66.5] },
  { id: "ns", name: "NOVA SCOTIA", labelPosition: [45.2, -63.0] },
  { id: "pe", name: "PRINCE EDWARD ISLAND", labelPosition: [46.4, -63.2] },
];
const CanadaPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <RegionHero
        eyebrow="Canada • Provincial Programs"
        title="Immigrate to Canada with confidence."
        subtitle="Explore Express Entry, PNPs, work-study pathways, and investment options—tailored to your province or region."
        primaryCta={{ label: "Free Assessment", href: "#assessment" }}
        secondaryCta={{ label: "Explore Programs", href: "#programs" }}
        bgImageUrl="https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=1600"
        align="left"
      />

      {/* <CanadaSection /> */}
      <ScrollingCards />
    </div>
  );
};

export default CanadaPage;
