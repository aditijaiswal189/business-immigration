import { Benefit } from "@/components/ui/benefits-slider";
import { ProgramCard } from "@/components/ui/programs-bento";
import { StatItem } from "@/components/ui/stats";

export const maltaBenefits: Benefit[] = [
  {
    id: "eu-citizenship",
    title: "EU Citizenship",
    subtitle: "Full European Union passport",
    description: "Malta citizenship provides full EU citizenship with the right to live, work, and study in any of the 27 EU member states, plus visa-free travel to 180+ countries worldwide.",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3",
    isActive: true
  },
  {
    id: "tax-benefits",
    title: "Favorable Tax System",
    subtitle: "Attractive tax regime",
    description: "Malta offers a competitive tax system with various incentives for residents, including the possibility of claiming non-domiciled status and benefiting from remittance-based taxation.",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3",
    isActive: false
  },
  {
    id: "strategic-location",
    title: "Strategic Mediterranean Location",
    subtitle: "Gateway between Europe and Africa",
    description: "Malta's strategic position in the Mediterranean makes it an ideal base for business operations, with excellent connectivity to Europe, North Africa, and the Middle East.",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3",
    isActive: false
  },
  {
    id: "quality-life",
    title: "High Quality of Life",
    subtitle: "Mediterranean lifestyle",
    description: "Enjoy year-round sunshine, beautiful beaches, rich history, excellent healthcare, and a safe, English-speaking environment with a high standard of living.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3",
    isActive: false
  },
  {
    id: "business-hub",
    title: "Financial Services Hub",
    subtitle: "Leading financial center",
    description: "Malta is a major financial services hub with a well-regulated banking sector, blockchain-friendly legislation, and numerous international companies choosing it as their EU base.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3",
    isActive: false
  }
];

export const maltaPrograms: ProgramCard[] = [
  {
    id: "citizenship-investment",
    title: "Malta Citizenship by Investment",
    href: "/emea/malta/citizenship",
    image: "https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    badge: "EU Passport",
    budgetText: "€690,000+ investment",
    prText: "12-36 months processing",
  },
  {
    id: "golden-visa",
    title: "Malta Golden Visa (MRVP)",
    href: "/emea/malta/golden-visa",
    image: "https://images.pexels.com/photos/414459/pexels-photo-414459.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "€300,000+ investment",
    prText: "Permanent residency",
  },
  {
    id: "startup-visa",
    title: "Malta Startup Visa",
    href: "/emea/malta/startup",
    image: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "€25,000+ investment",
    prText: "Innovation-based residency",
  },
  {
    id: "nomad-residence",
    title: "Malta Nomad Residence Permit",
    href: "/emea/malta/nomad",
    image: "https://images.pexels.com/photos/355747/pexels-photo-355747.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "€2,700/month income",
    prText: "1-year renewable",
  },
];

export const maltaStats: StatItem[] = [
  { number: "2K+", label: "Passports Issued" },
  { number: "180+", label: "Visa-Free Destinations" },
  { number: "99%", label: "Success Rate" },
  { number: "18", label: "Months Avg Processing" },
];
