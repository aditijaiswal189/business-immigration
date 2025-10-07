import { Benefit } from "@/components/ui/benefits-slider";
import { ProgramCard } from "@/components/ui/programs-bento";
import { StatItem } from "@/components/ui/stats";

export const americasBenefits: Benefit[] = [
  {
    id: "market-access",
    title: "Market Access",
    subtitle: "Gateway to North & South America",
    description: "Strategic access to both North and South American markets, with free trade agreements, NAFTA benefits, and Mercosur access providing excellent business opportunities.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3",
    isActive: true
  },
  {
    id: "cost-effective",
    title: "Cost-Effective Living",
    subtitle: "Affordable lifestyle options",
    description: "Many countries offer significantly lower cost of living compared to North America and Europe, while maintaining good quality of life and modern amenities.",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3",
    isActive: false
  },
  {
    id: "simple-processes",
    title: "Simple Immigration",
    subtitle: "Straightforward residency programs",
    description: "Most countries in the region offer relatively simple and fast immigration processes with minimal requirements and reasonable investment thresholds.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3",
    isActive: false
  },
  {
    id: "natural-beauty",
    title: "Natural Beauty",
    subtitle: "Diverse landscapes and climates",
    description: "From tropical beaches to mountain ranges, deserts to rainforests, the Americas offer incredible natural diversity and year-round pleasant climates.",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3",
    isActive: false
  },
  {
    id: "cultural-richness",
    title: "Cultural Richness",
    subtitle: "Vibrant cultures and communities",
    description: "Rich cultural heritage, welcoming communities, and growing expat populations create vibrant international communities throughout the region.",
    image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3",
    isActive: false
  }
];

export const americasPrograms: ProgramCard[] = [
  // USA Programs
  {
    id: "usa-eb5",
    title: "USA EB-5 Investor Visa",
    href: "/americas/usa",
    image: "https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    badge: "Green Card",
    budgetText: "$800,000+ investment",
    prText: "Path to US citizenship",
  },

  // Canada Programs (Federal)
  {
    id: "canada-startup-visa",
    title: "Canada Start-up Visa",
    href: "/canada",
    image: "https://images.pexels.com/photos/573552/pexels-photo-573552.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    badge: "Popular",
    budgetText: "Designated org support",
    prText: "Permanent residence",
  },

  // Paraguay Programs
  {
    id: "paraguay-residency",
    title: "Paraguay Permanent Residency",
    href: "/americas/paraguay",
    image: "https://images.pexels.com/photos/414459/pexels-photo-414459.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    badge: "Most Popular",
    budgetText: "$5,000 bank deposit",
    prText: "2-3 months processing",
  },

  // Panama Programs
  {
    id: "panama-friendly-nations",
    title: "Panama Friendly Nations Visa",
    href: "/americas/panama",
    image: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "$5,000 bank deposit",
    prText: "Fast-track residency",
  },

  // Brazil Programs
  {
    id: "brazil-investor",
    title: "Brazil Investor Visa",
    href: "/americas/brazil",
    image: "https://images.pexels.com/photos/355747/pexels-photo-355747.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "R$150,000+ investment",
    prText: "Business investment visa",
  },

  // Mexico Programs
  {
    id: "mexico-temporary-resident",
    title: "Mexico Temporary Resident Visa",
    href: "/americas/mexico",
    image: "https://images.pexels.com/photos/356830/pexels-photo-356830.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "$2,000/month income",
    prText: "Renewable residency",
  },
];

export const americasStats: StatItem[] = [
  { number: "12K+", label: "Successful Applications" },
  { number: "6", label: "Countries Available" },
  { number: "96%", label: "Success Rate" },
  { number: "3", label: "Months Avg Processing" },
];
