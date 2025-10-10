import AboutSection from "@/components/ui/about-section";
import ContactSection from "@/components/ui/contact-section";
import Footer from "@/components/ui/footer";
import HeroSlider from "@/components/ui/hero-slider";
import ProcessSectionAnimated from "@/components/ui/process-section-animated";
import StatsSection from "@/components/ui/stats-section";
import TestimonialSection from "@/components/ui/testimonial-section";
import MapClient from "@/components/ui/map-client";
import { ImmigrationServicesTimeline } from "@/components/ui/immigration-services-timeline";
import RegionHeader from "@/components/ui/region-header";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <RegionHeader />
      <HeroSlider />
      <AboutSection />
      <StatsSection />
      <MapClient />
      <ImmigrationServicesTimeline />
      <ProcessSectionAnimated />
      <TestimonialSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

{
  /* <AnnualReportSection /> */
}
{
  /* <ProcessSection /> */
}
{
  /* <Hero /> */
}
{
  /* <BusinessImmigrationJourney /> */
}
{
  /* <TeamSection /> */
}
{
  /* <BlogSection /> */
}
{
  /* <BrandLogos /> */
}
{
  /* <ServicesGrid /> */
}
