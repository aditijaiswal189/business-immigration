import AboutSection from "@/components/ui/about-section";
import BlogSection from "@/components/ui/blog-section";
import BrandLogos from "@/components/ui/brand-logos";
import ContactSection from "@/components/ui/contact-section";
import Footer from "@/components/ui/footer";
// import Header from "@/components/ui/header";
import Header1 from "@/components/ui/header1";
import Hero from "@/components/ui/hero";
import HeroSlider from "@/components/ui/hero-slider";
import { BusinessImmigrationJourney } from "@/components/ui/business-immigration-journey";
import ProcessSectionAnimated from "@/components/ui/process-section-animated";
import ServicesGrid from "@/components/ui/services-grid";

// import ShaderScene from "@/components/ui/shader-scene";
import StatsSection from "@/components/ui/stats-section";
import TeamSection from "@/components/ui/team-section";
import TestimonialSection from "@/components/ui/testimonial-section";
import ProcessSection from "@/components/ui/process-section";
import AnnualReportSection from "@/components/ui/annual-report-section";
import MapClient from "@/components/ui/map-client";
import { ImmigrationServicesTimeline } from "@/components/ui/immigration-services-timeline";
import { ImmigrationTimeline } from "@/components/ui/immigration-timeline";
// import { HeroSlider } from "@/components/ui/hero-slider";
import RegionHeader from "@/components/ui/region-header";
// import { HeroSlider } from "@/components/ui/hero-slider";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <RegionHeader />
      <HeroSlider />

      {/* <Hero /> */}
      <AboutSection />
      <StatsSection />
      {/* <BlogSection /> */}
      <MapClient />
      <ImmigrationServicesTimeline />
      {/* <BrandLogos /> */}
      <ProcessSectionAnimated />
      {/* <AnnualReportSection /> */}
      {/* <ProcessSection /> */}
      {/* <BusinessImmigrationJourney /> */}
      {/* <TeamSection /> */}
      <TestimonialSection />
      {/* <ServicesGrid /> */}
      <ContactSection />
      <Footer />
    </div>
  );
}
