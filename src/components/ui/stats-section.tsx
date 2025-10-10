// Server or shared file (OK to be server): stats-section.tsx
// import StatsShowcase from "./stats-showcase";

import StatsShowcase from "./reusable/stats-showcase";

const stats = [
  {
    icon: "lucide:building-2",
    count: 1962,
    label: "Companies analyzed",
    suffix: "+",
  },
  {
    icon: "mdi:briefcase",
    count: 2566,
    label: "Projects released",
    suffix: "",
  },
  {
    icon: "mdi:lightbulb-on",
    count: 1856,
    label: "Strategies planned",
    suffix: "+",
  },
  {
    icon: "mdi:account-group",
    count: 1862,
    label: "Satisfied clients",
    suffix: "",
  },
];

export default function StatSection() {
  return (
    <StatsShowcase
      backgroundImage="https://images.unsplash.com/photo-1542626991-cbc4e32524cc?auto=format&fit=crop&w=1920&h=1080"
      overline="WORK"
      title="Have a view of our amazing Workflow"
      stats={stats}
      skills={[
        { name: "Business Analysis", percentage: 68 },
        { name: "Financial Reporting", percentage: 85 },
        { name: "Investment Analysis", percentage: 56 },
      ]}
    />
  );
}
