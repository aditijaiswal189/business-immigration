import { Benefit } from "@/components/ui/benefits-slider";
import { ProgramCard } from "@/components/ui/programs-bento";
import { StatItem } from "@/components/ui/stats";

export const caribbeanBenefits: Benefit[] = [
  {
    id: "citizenship-investment",
    title: "Citizenship by Investment",
    subtitle: "Fast-track to second passport",
    description: "Caribbean nations offer some of the world's most established and reputable citizenship by investment programs with fast processing times and strong passports.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3",
    isActive: true
  },
  {
    id: "tax-benefits",
    title: "Tax Advantages",
    subtitle: "No global taxation",
    description: "Most Caribbean nations offer territorial tax systems with no tax on worldwide income, capital gains, inheritance, or wealth taxes for residents and citizens.",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3",
    isActive: false
  },
  {
    id: "visa-free-travel",
    title: "Visa-Free Travel",
    subtitle: "Global mobility freedom",
    description: "Caribbean passports provide visa-free or visa-on-arrival access to 120+ countries including EU Schengen area, UK, and many other destinations worldwide.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3",
    isActive: false
  },
  {
    id: "tropical-lifestyle",
    title: "Tropical Paradise",
    subtitle: "Year-round perfect weather",
    description: "Enjoy pristine beaches, crystal-clear waters, tropical climate, and relaxed island lifestyle in some of the world's most beautiful destinations.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3",
    isActive: false
  },
  {
    id: "stable-democracy",
    title: "Political Stability",
    subtitle: "Stable democratic governments",
    description: "Well-established democratic institutions, English common law systems, and stable political environments provide security for investors and families.",
    image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3",
    isActive: false
  }
];

export const caribbeanPrograms: ProgramCard[] = [
  {
    id: "st-kitts-citizenship",
    title: "St. Kitts & Nevis Citizenship",
    href: "/caribbean/st-kitts-nevis",
    image: "https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    badge: "Oldest Program",
    budgetText: "$150,000+ donation",
    prText: "3-6 months processing",
  },
  {
    id: "dominica-citizenship",
    title: "Dominica Citizenship",
    href: "/caribbean/dominica",
    image: "https://images.pexels.com/photos/414459/pexels-photo-414459.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    badge: "Most Affordable",
    budgetText: "$100,000+ donation",
    prText: "3-4 months processing",
  },
  {
    id: "grenada-citizenship",
    title: "Grenada Citizenship",
    href: "/caribbean/grenada",
    image: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    badge: "USA E-2 Treaty",
    budgetText: "$150,000+ donation",
    prText: "USA treaty benefits",
  },
  {
    id: "antigua-citizenship",
    title: "Antigua & Barbuda Citizenship",
    href: "/caribbean/antigua-barbuda",
    image: "https://images.pexels.com/photos/355747/pexels-photo-355747.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "$100,000+ donation",
    prText: "4-6 months processing",
  },
  {
    id: "st-lucia-citizenship",
    title: "St. Lucia Citizenship",
    href: "/caribbean/st-lucia",
    image: "https://images.pexels.com/photos/356830/pexels-photo-356830.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "$100,000+ donation",
    prText: "3-4 months processing",
  },
  {
    id: "barbados-welcome-stamp",
    title: "Barbados Welcome Stamp",
    href: "/caribbean/barbados",
    image: "https://images.pexels.com/photos/573552/pexels-photo-573552.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "$2,000 application fee",
    prText: "12-month remote work visa",
  },
];

export const caribbeanStats: StatItem[] = [
  { number: "25K+", label: "Passports Issued" },
  { number: "120+", label: "Visa-Free Destinations" },
  { number: "99%", label: "Success Rate" },
  { number: "4", label: "Months Avg Processing" },
];
