import { Benefit } from "@/components/ui/benefits-slider";
import { ProgramCard } from "@/components/ui/programs-bento";
import { StatItem } from "@/components/ui/stats";

export const cambodiaBenefits: Benefit[] = [
  {
    id: "second-home",
    title: "Second Home Program",
    subtitle: "10-year renewable visa",
    description: "Cambodia's Second Home Program offers a 10-year renewable visa for foreign investors, providing long-term residency with minimal requirements and excellent benefits.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3",
    isActive: true
  },
  {
    id: "low-investment",
    title: "Low Investment Threshold",
    subtitle: "Affordable entry point",
    description: "With a minimum investment of just $100,000, Cambodia offers one of the most affordable investment visa programs in Southeast Asia.",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3",
    isActive: false
  },
  {
    id: "strategic-location",
    title: "Strategic Location",
    subtitle: "Gateway to ASEAN",
    description: "Located in the heart of Southeast Asia, Cambodia provides excellent access to the growing ASEAN market and neighboring countries like Vietnam and Thailand.",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3",
    isActive: false
  },
  {
    id: "growing-economy",
    title: "Rapidly Growing Economy",
    subtitle: "High growth potential",
    description: "Cambodia has one of the fastest-growing economies in Asia, with strong GDP growth, increasing foreign investment, and expanding business opportunities.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3",
    isActive: false
  },
  {
    id: "cultural-heritage",
    title: "Rich Cultural Heritage",
    subtitle: "Ancient temples and traditions",
    description: "Experience Cambodia's incredible cultural heritage, from the magnificent Angkor Wat temples to vibrant local traditions and welcoming communities.",
    image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3",
    isActive: false
  }
];

export const cambodiaPrograms: ProgramCard[] = [
  {
    id: "second-home-program",
    title: "Cambodia Second Home Program",
    href: "/apac/cambodia/second-home",
    image: "https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    badge: "Featured",
    budgetText: "$100,000+ investment",
    prText: "10-year renewable visa",
  },
  {
    id: "direct-citizenship",
    title: "Cambodia Direct Citizenship",
    href: "/apac/cambodia/direct-citizenship",
    image: "https://images.pexels.com/photos/414459/pexels-photo-414459.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "$300,000+ investment",
    prText: "Direct citizenship pathway",
  },
  {
    id: "business-visa",
    title: "Cambodia Business Visa",
    href: "/apac/cambodia/business-visa",
    image: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "Business registration",
    prText: "1-year renewable",
  },
  {
    id: "retirement-visa",
    title: "Cambodia Retirement Visa",
    href: "/apac/cambodia/retirement-visa",
    image: "https://images.pexels.com/photos/355747/pexels-photo-355747.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "$2,000/month pension",
    prText: "Long-term residency",
  },
];

export const cambodiaStats: StatItem[] = [
  { number: "500+", label: "Approved Applications" },
  { number: "10", label: "Years Visa Validity" },
  { number: "97%", label: "Success Rate" },
  { number: "3", label: "Months Processing" },
];
