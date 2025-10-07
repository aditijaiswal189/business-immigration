import { Benefit } from "@/components/ui/benefits-slider";
import { ProgramCard } from "@/components/ui/programs-bento";
import { StatItem } from "@/components/ui/stats";

export const paraguayBenefits: Benefit[] = [
  {
    id: "business",
    title: "Business Opportunities",
    subtitle: "Growing economy with opportunities",
    description: "Paraguay offers a rapidly growing economy with excellent business opportunities, low corporate taxes, and strategic location in South America for regional expansion.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3",
    isActive: true
  },
  {
    id: "cost",
    title: "Cost of Living",
    subtitle: "Affordable lifestyle",
    description: "Paraguay provides one of the lowest costs of living in South America while maintaining good quality of life, making it attractive for retirees and entrepreneurs.",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3",
    isActive: false
  },
  {
    id: "residency",
    title: "Easy Residency Process",
    subtitle: "Simple and straightforward",
    description: "Paraguay offers one of the most straightforward residency processes in South America, with minimal requirements and fast processing times for qualified applicants.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3",
    isActive: false
  },
  {
    id: "location",
    title: "Strategic Location",
    subtitle: "Heart of South America",
    description: "Located in the heart of South America, Paraguay provides easy access to major markets in Brazil, Argentina, and other Mercosur countries.",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3",
    isActive: false
  },
  {
    id: "culture",
    title: "Rich Culture",
    subtitle: "Welcoming and diverse",
    description: "Paraguay boasts a rich cultural heritage with welcoming people, bilingual society (Spanish and Guaraní), and strong traditions that embrace international residents.",
    image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3",
    isActive: false
  }
];

export const paraguayPrograms: ProgramCard[] = [
  {
    id: "temporary-residency",
    title: "Temporary Residency",
    href: "/immigrate-paraguay/temporary-residency",
    image: "https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    badge: "Most Popular",
    budgetText: "$5,000 bank deposit",
    prText: "2-3 months processing",
  },
  {
    id: "permanent-residency",
    title: "Permanent Residency",
    href: "/immigrate-paraguay/permanent-residency",
    image: "https://images.pexels.com/photos/414459/pexels-photo-414459.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "After 3 years temporary",
    prText: "Direct path to citizenship",
  },
  {
    id: "investor-visa",
    title: "Investor Visa",
    href: "/immigrate-paraguay/investor-visa",
    image: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "$70,000+ investment",
    prText: "Fast-track residency",
  },
  {
    id: "retirement-visa",
    title: "Retirement Visa",
    href: "/immigrate-paraguay/retirement-visa",
    image: "https://images.pexels.com/photos/355747/pexels-photo-355747.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "$1,000/month pension",
    prText: "Immediate residency",
  },
  {
    id: "family-reunification",
    title: "Family Reunification",
    href: "/immigrate-paraguay/family-reunification",
    image: "https://images.pexels.com/photos/356830/pexels-photo-356830.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "Sponsor required",
    prText: "Family-based immigration",
  },
  {
    id: "student-visa",
    title: "Student Visa",
    href: "/immigrate-paraguay/student-visa",
    image: "https://images.pexels.com/photos/573552/pexels-photo-573552.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    budgetText: "University enrollment",
    prText: "Study + work pathway",
  },
];

export const paraguayStats: StatItem[] = [
  { number: "2K+", label: "Successful Residencies" },
  { number: "95%", label: "Approval Rate" },
  { number: "3", label: "Months Average Processing" },
  { number: "$5K", label: "Minimum Investment" },
];
