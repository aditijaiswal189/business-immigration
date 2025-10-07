import { Benefit } from "@/components/ui/benefits-slider";
import { ProgramCard } from "@/components/ui/programs-bento";
import { StatItem } from "@/components/ui/stats";

export const apacBenefits: Benefit[] = [
  {
    id: "economic-growth",
    title: "Economic Powerhouse",
    subtitle: "Fastest growing economies",
    description: "APAC region hosts some of the world's fastest-growing economies with excellent business opportunities, innovation hubs, and emerging markets offering high growth potential.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3",
    isActive: true
  },
  {
    id: "lifestyle-diversity",
    title: "Diverse Lifestyles",
    subtitle: "From modern cities to tropical paradise",
    description: "Experience diverse cultures, from ultra-modern cities like Singapore to tropical paradises like Vanuatu, offering various lifestyle choices and climates.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3",
    isActive: false
  },
  {
    id: "strategic-location",
    title: "Strategic Location",
    subtitle: "Gateway to Asia-Pacific",
    description: "Perfect positioning for business expansion into Asian markets, with excellent connectivity, time zone advantages, and access to billions of consumers.",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3",
    isActive: false
  },
  {
    id: "innovation-tech",
    title: "Innovation & Technology",
    subtitle: "Leading tech ecosystems",
    description: "Home to major tech hubs, innovation centers, and startup ecosystems with government support for technology businesses and digital nomads.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3",
    isActive: false
  },
  {
    id: "tax-benefits",
    title: "Tax Advantages",
    subtitle: "Favorable tax structures",
    description: "Many APAC countries offer attractive tax regimes, territorial tax systems, and special incentives for foreign investors and entrepreneurs.",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3",
    isActive: false
  }
];

export const apacPrograms: ProgramCard[] = [
  // Vanuatu Programs
  {
    id: "vanuatu-citizenship",
    title: "Vanuatu Citizenship by Investment",
    href: "/apac/vanuatu",
    image: "https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    badge: "Fast Track",
    budgetText: "$130,000+ donation",
    prText: "1-2 months processing",
  },

  // Cambodia Programs
  {
    id: "cambodia-second-home",
    title: "Cambodia Second Home Program",
    href: "/apac/cambodia/second-home",
    image: "https://images.pexels.com/photos/414459/pexels-photo-414459.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    badge: "Popular",
    budgetText: "$100,000+ investment",
    prText: "10-year renewable visa",
  },
  {
    id: "cambodia-direct-citizenship",
    title: "Cambodia Direct Citizenship",
    href: "/apac/cambodia/direct-citizenship",
    image: "https://images.pexels.com/photos/414459/pexels-photo-414459.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "$300,000+ investment",
    prText: "Direct citizenship pathway",
  },

  // Thailand Programs
  {
    id: "thailand-elite-visa",
    title: "Thailand Elite Visa",
    href: "/apac/thailand",
    image: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    badge: "Most Popular",
    budgetText: "$15,000+ membership",
    prText: "5-20 year visa options",
  },

  // Singapore Programs
  {
    id: "singapore-investor",
    title: "Singapore Global Investor Programme",
    href: "/apac/singapore",
    image: "https://images.pexels.com/photos/355747/pexels-photo-355747.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "S$2.5M+ investment",
    prText: "Global business hub",
  },

  // Australia Programs
  {
    id: "australia-investor-visa",
    title: "Australia Investor Visa (Subclass 188)",
    href: "/apac/australia",
    image: "https://images.pexels.com/photos/356830/pexels-photo-356830.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "AUD $1.5M+ investment",
    prText: "Path to permanent residency",
  },

  // New Zealand Programs
  {
    id: "new-zealand-investor-1",
    title: "New Zealand Investor 1 Visa",
    href: "/apac/new-zealand",
    image: "https://images.pexels.com/photos/573552/pexels-photo-573552.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "NZD $10M+ investment",
    prText: "No other requirements",
  },
  {
    id: "new-zealand-investor-2",
    title: "New Zealand Investor 2 Visa",
    href: "/apac/new-zealand",
    image: "https://images.pexels.com/photos/573552/pexels-photo-573552.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "NZD $3M+ investment",
    prText: "Points-based system",
  },

  // Fiji Programs
  {
    id: "fiji-investor-visa",
    title: "Fiji Investor Visa",
    href: "/apac/fiji",
    image: "https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "FJD $250,000+ investment",
    prText: "Pacific island paradise",
  },

  // Nauru Programs
  {
    id: "nauru-citizenship",
    title: "Nauru Citizenship by Investment",
    href: "/apac/nauru",
    image: "https://images.pexels.com/photos/414459/pexels-photo-414459.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "$100,000+ donation",
    prText: "Pacific citizenship",
  },
];

export const apacStats: StatItem[] = [
  { number: "5K+", label: "Successful Applications" },
  { number: "10+", label: "Countries Available" },
  { number: "94%", label: "Success Rate" },
  { number: "10", label: "Investment Programs" },
];
