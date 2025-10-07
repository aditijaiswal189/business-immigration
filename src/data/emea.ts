import { Benefit } from "@/components/ui/benefits-slider";
import { ProgramCard } from "@/components/ui/programs-bento";
import { StatItem } from "@/components/ui/stats";

export const emeaBenefits: Benefit[] = [
  {
    id: "eu-access",
    title: "European Union Access",
    subtitle: "Gateway to 27 EU countries",
    description: "Many EMEA programs offer pathways to EU citizenship or residency, providing access to live, work, and study across 27 European Union member states with freedom of movement.",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3",
    isActive: true
  },
  {
    id: "business-hub",
    title: "Global Business Hub",
    subtitle: "Strategic location for business",
    description: "EMEA region serves as a bridge between Europe, Middle East, and Africa, offering excellent business opportunities, advanced infrastructure, and access to global markets.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3",
    isActive: false
  },
  {
    id: "lifestyle",
    title: "Quality of Life",
    subtitle: "Rich culture and history",
    description: "Experience world-class healthcare, education systems, rich cultural heritage, and diverse lifestyle options from Mediterranean beaches to Alpine mountains.",
    image: "https://images.unsplash.com/photo-1520637836862-4d197d17c93a?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3",
    isActive: false
  },
  {
    id: "investment",
    title: "Investment Opportunities",
    subtitle: "Diverse investment programs",
    description: "Multiple investment-based residency and citizenship programs available, from real estate investments to government bonds and business investments.",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3",
    isActive: false
  },
  {
    id: "education",
    title: "World-Class Education",
    subtitle: "Top universities and schools",
    description: "Access to some of the world's oldest and most prestigious universities, excellent public education systems, and multilingual learning environments.",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3",
    isActive: false
  }
];

export const emeaPrograms: ProgramCard[] = [
  // Malta Programs
  {
    id: "malta-citizenship",
    title: "Malta Citizenship by Investment",
    href: "/emea/malta",
    image: "https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    badge: "EU Passport",
    budgetText: "€690,000+ investment",
    prText: "12-36 months processing",
  },
  
  // Cyprus Programs
  {
    id: "cyprus-citizenship",
    title: "Cyprus Citizenship by Investment",
    href: "/emea/cyprus/citizenship",
    image: "https://images.pexels.com/photos/414459/pexels-photo-414459.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    badge: "EU Passport",
    budgetText: "€2,000,000+ investment",
    prText: "6 months processing",
  },
  {
    id: "cyprus-residency",
    title: "Cyprus Permanent Residency",
    href: "/emea/cyprus/permanent-residency",
    image: "https://images.pexels.com/photos/414459/pexels-photo-414459.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "€300,000+ real estate",
    prText: "EU residency pathway",
  },
  
  // Portugal Programs
  {
    id: "portugal-golden-visa",
    title: "Portugal Golden Visa",
    href: "/emea/portugal/golden-visa",
    image: "https://images.pexels.com/photos/355747/pexels-photo-355747.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    badge: "Popular",
    budgetText: "€280,000+ investment",
    prText: "Path to EU citizenship",
  },
  {
    id: "portugal-global-talent",
    title: "Portugal Global Talent Visa",
    href: "/emea/portugal/global-talent",
    image: "https://images.pexels.com/photos/355747/pexels-photo-355747.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "Talent-based program",
    prText: "Fast-track residency",
  },
  
  // Greece Programs
  {
    id: "greece-golden-visa",
    title: "Greece Golden Visa",
    href: "/emea/greece",
    image: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "€250,000+ investment",
    prText: "5-year renewable residency",
  },
  
  // Austria Programs
  {
    id: "austria-citizenship",
    title: "Austria Citizenship by Investment",
    href: "/emea/austria/citizenship",
    image: "https://images.pexels.com/photos/573552/pexels-photo-573552.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "€10,000,000+ investment",
    prText: "Exceptional contribution",
  },
  {
    id: "austria-residence",
    title: "Austria Red-White-Red Card",
    href: "/emea/austria/residence",
    image: "https://images.pexels.com/photos/573552/pexels-photo-573552.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "Skilled worker program",
    prText: "Points-based system",
  },
  
  // North Macedonia Programs
  {
    id: "north-macedonia-citizenship",
    title: "North Macedonia Citizenship",
    href: "/emea/north-macedonia/citizenship",
    image: "https://images.pexels.com/photos/356830/pexels-photo-356830.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "€200,000+ investment",
    prText: "EU candidate country",
  },
  {
    id: "north-macedonia-residency",
    title: "North Macedonia Permanent Residency",
    href: "/emea/north-macedonia/permanent-residency",
    image: "https://images.pexels.com/photos/356830/pexels-photo-356830.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "€400,000+ investment",
    prText: "5-year pathway",
  },
  
  // Italy Programs
  {
    id: "italy-investor-visa",
    title: "Italy Investor Visa",
    href: "/emea/italy",
    image: "https://images.pexels.com/photos/356830/pexels-photo-356830.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "€500,000+ investment",
    prText: "Self-employment visa",
  },
  
  // Spain Programs
  {
    id: "spain-golden-visa",
    title: "Spain Golden Visa",
    href: "/emea/spain",
    image: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "€500,000+ real estate",
    prText: "EU residency pathway",
  },
  
  // UK Programs
  {
    id: "uk-investor-visa",
    title: "UK Investor Visa",
    href: "/emea/uk",
    image: "https://images.pexels.com/photos/573552/pexels-photo-573552.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "£2,000,000+ investment",
    prText: "Tier 1 Investor",
  },
  
  // Switzerland Programs
  {
    id: "switzerland-residence",
    title: "Switzerland Residence Permit",
    href: "/emea/switzerland",
    image: "https://images.pexels.com/photos/355747/pexels-photo-355747.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "CHF 1,000,000+ investment",
    prText: "High net worth individuals",
  },
  
  // UAE Programs
  {
    id: "uae-golden-visa",
    title: "UAE Golden Visa",
    href: "/emea/uae",
    image: "https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    badge: "Popular",
    budgetText: "AED 2,000,000+ investment",
    prText: "10-year renewable visa",
  },
  
  // Turkey Programs
  {
    id: "turkey-citizenship",
    title: "Turkey Citizenship by Investment",
    href: "/emea/turkey",
    image: "https://images.pexels.com/photos/414459/pexels-photo-414459.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "$400,000+ real estate",
    prText: "3-6 months processing",
  },
  
  // Other EMEA Countries
  {
    id: "andorra-residency",
    title: "Andorra Residency",
    href: "/emea/andorra",
    image: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "€400,000+ investment",
    prText: "Tax-friendly jurisdiction",
  },
  {
    id: "hungary-residency",
    title: "Hungary Residency Bond",
    href: "/emea/hungary",
    image: "https://images.pexels.com/photos/356830/pexels-photo-356830.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "€300,000+ bonds",
    prText: "EU residency pathway",
  },
  {
    id: "latvia-residency",
    title: "Latvia Investment Residency",
    href: "/emea/latvia",
    image: "https://images.pexels.com/photos/573552/pexels-photo-573552.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "€250,000+ real estate",
    prText: "EU residency pathway",
  },
  {
    id: "moldova-citizenship",
    title: "Moldova Citizenship by Investment",
    href: "/emea/moldova",
    image: "https://images.pexels.com/photos/355747/pexels-photo-355747.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "€100,000+ investment",
    prText: "European citizenship",
  },
  {
    id: "serbia-residency",
    title: "Serbia Temporary Residence",
    href: "/emea/serbia",
    image: "https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "Company registration",
    prText: "EU candidate country",
  },
  {
    id: "cayman-islands-residency",
    title: "Cayman Islands Residency",
    href: "/emea/cayman-islands",
    image: "https://images.pexels.com/photos/414459/pexels-photo-414459.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "$1,200,000+ investment",
    prText: "Offshore financial center",
  },
  {
    id: "egypt-residency",
    title: "Egypt Golden Visa",
    href: "/emea/egypt",
    image: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "$300,000+ investment",
    prText: "5-year renewable visa",
  },
  {
    id: "jordan-residency",
    title: "Jordan Investment Residency",
    href: "/emea/jordan",
    image: "https://images.pexels.com/photos/356830/pexels-photo-356830.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "$150,000+ investment",
    prText: "Middle East gateway",
  },
  {
    id: "namibia-residency",
    title: "Namibia Permanent Residence",
    href: "/emea/namibia",
    image: "https://images.pexels.com/photos/573552/pexels-photo-573552.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "$100,000+ investment",
    prText: "African opportunity",
  },
  {
    id: "oman-residency",
    title: "Oman Investor Residency",
    href: "/emea/oman",
    image: "https://images.pexels.com/photos/355747/pexels-photo-355747.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "$500,000+ investment",
    prText: "Gulf region access",
  },
];

export const emeaStats: StatItem[] = [
  { number: "8K+", label: "Successful Applications" },
  { number: "27", label: "EU Member States" },
  { number: "92%", label: "Success Rate" },
  { number: "25+", label: "Investment Programs" },
];
