import { Benefit } from "@/components/ui/benefits-slider";
import { ProgramCard } from "@/components/ui/programs-bento";
import { StatItem } from "@/components/ui/stats";

export const canadaBenefits: Benefit[] = [
  {
    id: "education",
    title: "Education system",
    subtitle: "Top quality education",
    description: "Canada boasts a world-class education system, with top-ranked universities globally, cutting-edge curricula and a multicultural learning environment, offering students unparalleled opportunities for growth.",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3",
    isActive: false
  },
  {
    id: "healthcare",
    title: "Social welfare and health",
    subtitle: "The most advanced and developed",
    description: "Canada is famous for its comprehensive social security and welfare system, including free health care, unemployment benefits, pensions and many family support programs, ensuring a high quality of life for residents.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3",
    isActive: false
  },
  {
    id: "opportunities",
    title: "Job and investment opportunities",
    subtitle: "Many opportunities for advancement",
    description: "Canada is an ideal destination for work and investment, with a stable economy, policies to attract talent and a favorable business environment for businesses and individuals to develop.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3",
    isActive: false
  },
  {
    id: "politics",
    title: "Politics and Society",
    subtitle: "Stable and safe",
    description: "Canada has a stable political system, safe and friendly society. Safety and happiness index is high, bringing a peaceful life to people and immigrants.",
    image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3",
    isActive: true
  },
  {
    id: "nature",
    title: "Nature - environment",
    subtitle: "Beautiful and fresh",
    description: "Canada possesses many majestic and diverse natural landscapes, a clean living environment and good air quality, ideal for future life and relaxation.",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3",
    isActive: false
  }
];

export const canadaPrograms: ProgramCard[] = [
  // Federal Programs
  {
    id: "suv",
    title: "Start-Up Visa (SUV)",
    href: "/immigrate-canada/start-up-visa",
    image: "https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    badge: "Popular",
    budgetText: "Varies (designated org support)",
    prText: "Processing time varies by case",
  },

  // Alberta Programs
  {
    id: "alberta-graduate-entrepreneur",
    title: "Alberta Graduate Entrepreneur",
    href: "/canada/alberta/graduate-entrepreneur",
    image: "https://images.pexels.com/photos/573552/pexels-photo-573552.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "CAD $100K investment",
    prText: "Graduate entrepreneurs",
  },
  {
    id: "alberta-foreign-graduate",
    title: "Alberta Foreign Graduate Entrepreneur",
    href: "/canada/alberta/foreign-graduate-entrepreneur",
    image: "https://images.pexels.com/photos/573552/pexels-photo-573552.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "CAD $100K investment",
    prText: "International graduates",
  },
  {
    id: "alberta-rural-entrepreneur",
    title: "Alberta Rural Entrepreneur",
    href: "/canada/alberta/rural-entrepreneur",
    image: "https://images.pexels.com/photos/573552/pexels-photo-573552.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "CAD $200K investment",
    prText: "Rural communities",
  },
  {
    id: "alberta-farm-stream",
    title: "Alberta Farm Stream",
    href: "/canada/alberta/farm-stream",
    image: "https://images.pexels.com/photos/573552/pexels-photo-573552.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "CAD $500K investment",
    prText: "Farm ownership",
  },

  // British Columbia Programs
  {
    id: "bc-base-category",
    title: "BC Entrepreneur Base Category",
    href: "/canada/br-columbia/base-category",
    image: "https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "CAD $600K investment",
    prText: "Business establishment",
  },
  {
    id: "bc-regional-pilot",
    title: "BC Regional Pilot",
    href: "/canada/br-columbia/regional-pilot",
    image: "https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "CAD $200K investment",
    prText: "Regional communities",
  },

  // Manitoba Programs
  {
    id: "manitoba-entrepreneur",
    title: "Manitoba Entrepreneur",
    href: "/canada/manitoba/entrepreneur",
    image: "https://images.pexels.com/photos/414459/pexels-photo-414459.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "CAD $250K investment",
    prText: "Business ownership",
  },
  {
    id: "manitoba-farm-investor",
    title: "Manitoba Farm Investor",
    href: "/canada/manitoba/farm-investor",
    image: "https://images.pexels.com/photos/414459/pexels-photo-414459.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "CAD $300K investment",
    prText: "Farm operation",
  },

  // Ontario Programs
  {
    id: "oinp-entrepreneur",
    title: "Ontario Entrepreneur Stream (OINP)",
    href: "/canada/ontario",
    image: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "Min. investment depends on location",
    prText: "Work permit → nomination → PR",
  },

  // Quebec Programs
  {
    id: "quebec-investor",
    title: "Quebec Investor Program",
    href: "/canada/quebec/investor",
    image: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    badge: "Suspended",
    budgetText: "CAD $1.2M investment",
    prText: "Passive investment",
  },
  {
    id: "quebec-entrepreneur",
    title: "Quebec Entrepreneur Program",
    href: "/canada/quebec/entrepreneur",
    image: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "CAD $900K investment",
    prText: "Active business management",
  },
  {
    id: "quebec-self-employed",
    title: "Quebec Self-Employed Program",
    href: "/canada/quebec/self-employed",
    image: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "CAD $200K investment",
    prText: "Self-employment",
  },

  // Saskatchewan Programs
  {
    id: "sask-entrepreneur",
    title: "Saskatchewan Entrepreneur",
    href: "/canada/saskatchewan/entrepreneur",
    image: "https://images.pexels.com/photos/355747/pexels-photo-355747.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "CAD $300K investment",
    prText: "Business establishment",
  },
  {
    id: "sask-entrepreneur-category",
    title: "Saskatchewan Entrepreneur Category",
    href: "/canada/saskatchewan/entrepreneur-category",
    image: "https://images.pexels.com/photos/355747/pexels-photo-355747.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "CAD $200K investment",
    prText: "Young entrepreneurs",
  },
  {
    id: "sask-farm-owner",
    title: "Saskatchewan Farm Owner Operator",
    href: "/canada/saskatchewan/farm-owner-and-operator",
    image: "https://images.pexels.com/photos/355747/pexels-photo-355747.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "CAD $500K investment",
    prText: "Farm ownership",
  },
  {
    id: "sask-graduate-entrepreneur",
    title: "Saskatchewan International Graduate Entrepreneur",
    href: "/canada/saskatchewan/international-graduate-entrepreneur",
    image: "https://images.pexels.com/photos/355747/pexels-photo-355747.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "CAD $200K investment",
    prText: "Graduate entrepreneurs",
  },

  // Nova Scotia Programs
  {
    id: "nova-scotia-entrepreneur",
    title: "Nova Scotia Entrepreneur",
    href: "/canada/nova-scotia/entrepreneur",
    image: "https://images.pexels.com/photos/356830/pexels-photo-356830.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "CAD $350K investment",
    prText: "Business ownership",
  },
  {
    id: "nova-scotia-graduate-entrepreneur",
    title: "Nova Scotia International Graduate Entrepreneur",
    href: "/canada/nova-scotia/international-graduate-entrepreneur",
    image: "https://images.pexels.com/photos/356830/pexels-photo-356830.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "CAD $150K investment",
    prText: "Graduate entrepreneurs",
  },

  // Newfoundland & Labrador Programs
  {
    id: "nl-international-entrepreneur",
    title: "NL International Entrepreneur",
    href: "/canada/newfoundland-labrador/international-entrepreneur",
    image: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "CAD $200K investment",
    prText: "Business establishment",
  },
  {
    id: "nl-graduate-entrepreneur",
    title: "NL International Graduate Entrepreneur",
    href: "/canada/newfoundland-labrador/international-graduate-entrepreneur",
    image: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "CAD $150K investment",
    prText: "Graduate entrepreneurs",
  },

  // Other Provincial Programs
  {
    id: "pei-business-impact",
    title: "PEI Business Impact Category",
    href: "/canada/prince-edward-island",
    image: "https://images.pexels.com/photos/573552/pexels-photo-573552.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "CAD $150K investment",
    prText: "Business ownership",
  },
  {
    id: "new-brunswick-entrepreneur",
    title: "New Brunswick Entrepreneur",
    href: "/canada/new-brunswick",
    image: "https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "CAD $250K investment",
    prText: "Business establishment",
  },
  {
    id: "northwest-territories-business",
    title: "Northwest Territories Business",
    href: "/canada/northwest-territories",
    image: "https://images.pexels.com/photos/414459/pexels-photo-414459.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "CAD $300K investment",
    prText: "Northern opportunity",
  },
  {
    id: "yukon-business-nominee",
    title: "Yukon Business Nominee",
    href: "/canada/yukon",
    image: "https://images.pexels.com/photos/355747/pexels-photo-355747.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "CAD $300K investment",
    prText: "Northern business",
  },
];

export const canadaStats: StatItem[] = [
  { number: "15K+", label: "Successful Applications" },
  { number: "98%", label: "Success Rate" },
  { number: "25+", label: "Provincial Programs" },
  { number: "11", label: "Provinces & Territories" },
];
