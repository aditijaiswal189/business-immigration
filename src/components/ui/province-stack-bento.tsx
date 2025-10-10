"use client";

import * as React from "react";
import { ContainerScroll, CardSticky } from "@/components/blocks/cards-stack";
import {
  Search as SearchIcon,
  ChevronDown,
  Phone,
  ArrowRight,
  MapPin,
  Users,
  DollarSign,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { Button } from "./button";

/** tiny cn helper */
const cn = (...c: Array<string | false | null | undefined>) =>
  c.filter(Boolean).join(" ");

type ProgramCard = {
  id: string;
  title: string;
  href: string;
  image: string;
  badge?: string;
  budgetText?: string;
  prText?: string;
};

type ProvinceStack = {
  id: string;
  name: string;
  programs: ProgramCard[];
  color: string;
  flag?: string;
  description: string;
  totalPrograms: number;
};

type Props = {
  title?: string;
  provinces?: ProvinceStack[];
  phoneHref?: string;
};

/* -------------------- Group programs by province -------------------- */
const groupProgramsByProvince = (programs: ProgramCard[]): ProvinceStack[] => {
  const provinceMap = new Map<string, ProgramCard[]>();

  programs.forEach((program) => {
    // Extract province from href or title
    let province = "Federal";

    if (
      program.href.includes("/alberta/") ||
      program.title.includes("Alberta")
    ) {
      province = "Alberta";
    } else if (
      program.href.includes("/br-columbia/") ||
      program.title.includes("BC")
    ) {
      province = "British Columbia";
    } else if (
      program.href.includes("/manitoba/") ||
      program.title.includes("Manitoba")
    ) {
      province = "Manitoba";
    } else if (
      program.href.includes("/ontario") ||
      program.title.includes("Ontario")
    ) {
      province = "Ontario";
    } else if (
      program.href.includes("/quebec/") ||
      program.title.includes("Quebec")
    ) {
      province = "Quebec";
    } else if (
      program.href.includes("/saskatchewan/") ||
      program.title.includes("Saskatchewan")
    ) {
      province = "Saskatchewan";
    } else if (
      program.href.includes("/nova-scotia/") ||
      program.title.includes("Nova Scotia")
    ) {
      province = "Nova Scotia";
    } else if (
      program.href.includes("/newfoundland-labrador/") ||
      program.title.includes("NL")
    ) {
      province = "Newfoundland & Labrador";
    } else if (
      program.href.includes("/prince-edward-island") ||
      program.title.includes("PEI")
    ) {
      province = "Prince Edward Island";
    } else if (
      program.href.includes("/new-brunswick") ||
      program.title.includes("New Brunswick")
    ) {
      province = "New Brunswick";
    } else if (
      program.href.includes("/northwest-territories") ||
      program.title.includes("Northwest Territories")
    ) {
      province = "Northwest Territories";
    } else if (
      program.href.includes("/yukon") ||
      program.title.includes("Yukon")
    ) {
      province = "Yukon";
    }

    if (!provinceMap.has(province)) {
      provinceMap.set(province, []);
    }
    provinceMap.get(province)!.push(program);
  });

  const provinceColors = {
    Federal: "rgb(59, 130, 246)", // Blue
    Alberta: "rgb(239, 68, 68)", // Red
    "British Columbia": "rgb(34, 197, 94)", // Green
    Manitoba: "rgb(168, 85, 247)", // Purple
    Ontario: "rgb(245, 158, 11)", // Amber
    Quebec: "rgb(20, 184, 166)", // Teal
    Saskatchewan: "rgb(236, 72, 153)", // Pink
    "Nova Scotia": "rgb(139, 69, 19)", // Brown
    "Newfoundland & Labrador": "rgb(75, 85, 99)", // Gray
    "Prince Edward Island": "rgb(220, 38, 127)", // Rose
    "New Brunswick": "rgb(101, 163, 13)", // Lime
    "Northwest Territories": "rgb(147, 51, 234)", // Violet
    Yukon: "rgb(249, 115, 22)", // Orange
  };

  const provinceDescriptions = {
    Federal: "National immigration programs available across Canada",
    Alberta: "Western Canada's energy hub with diverse opportunities",
    "British Columbia":
      "Pacific coast province with tech and natural resources",
    Manitoba: "Prairie province with strong agricultural sector",
    Ontario: "Canada's economic center and most populous province",
    Quebec: "French-speaking province with unique immigration system",
    Saskatchewan: "Prairie province rich in natural resources",
    "Nova Scotia": "Maritime province with growing tech sector",
    "Newfoundland & Labrador":
      "Atlantic province with natural resource opportunities",
    "Prince Edward Island": "Smallest province with agricultural focus",
    "New Brunswick": "Bilingual maritime province",
    "Northwest Territories": "Northern territory with resource opportunities",
    Yukon: "Northern territory with mining and tourism",
  };

  return Array.from(provinceMap.entries()).map(([name, programs]) => ({
    id: name.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and"),
    name,
    programs,
    color:
      provinceColors[name as keyof typeof provinceColors] ||
      "rgb(107, 114, 128)",
    description:
      provinceDescriptions[name as keyof typeof provinceDescriptions] || "",
    totalPrograms: programs.length,
  }));
};

/* -------------------- Province Stack Card -------------------- */
function ProvinceStackCard({
  province,
  index,
  isExpanded,
  onToggle,
}: {
  province: ProvinceStack;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <CardSticky
      key={province.id}
      index={index + 2}
      className="rounded-2xl border border-white/20 backdrop-blur-md overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105"
      style={{ background: province.color }}
      onClick={onToggle}
    >
      {!isExpanded ? (
        // Collapsed Province Card
        <div className="p-8 text-white">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <MapPin className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold tracking-tight">
                  {province.name}
                </h2>
                <p className="text-white/80 text-sm">
                  {province.totalPrograms} immigration programs
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-white/90">
                {String(province.totalPrograms).padStart(2, "0")}
              </div>
              <div className="text-sm text-white/70">Programs</div>
            </div>
          </div>

          <p className="text-white/90 mb-6 leading-relaxed">
            {province.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-white/80">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>Multiple streams</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>Various timelines</span>
              </div>
            </div>
            <div className="text-sm text-white/90 font-medium">
              Click to expand →
            </div>
          </div>
        </div>
      ) : (
        // Expanded Programs List
        <div className="p-6">
          <div className="flex items-center justify-between mb-6 text-white">
            <h2 className="text-xl font-bold">{province.name} Programs</h2>

            <Button
              variant="goldBlack"
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
            >
              {/* inner dark fill above the gold border but below the label */}
              <div className="pointer-events-none absolute inset-[2px] rounded-[inherit] bg-[linear-gradient(135deg,#000,#111,#000)] shadow-[inset_0_3px_6px_rgba(0,0,0,0.9),inset_0_-1px_3px_rgba(255,255,255,0.08),0_1px_0_rgba(255,255,255,0.08)] z-[5]" />
              <span className="relative z-20 font-bold flex items-center gap-2">
                Collapse
              </span>
            </Button>
            {/* <button
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
              className="text-sm bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition-colors"
            >
              Collapse
            </button> */}
          </div>

          <div className="grid gap-4">
            {province.programs.map((program) => (
              <div
                key={program.id}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-white font-semibold mb-2 leading-tight">
                      {program.title}
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-white/70 mb-1">Investment</div>
                        <div className="text-white/90 font-medium">
                          {program.budgetText || "Varies"}
                        </div>
                      </div>
                      <div>
                        <div className="text-white/70 mb-1">Timeline</div>
                        <div className="text-white/90 font-medium">
                          {program.prText || "Standard processing"}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    {program.badge && (
                      <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full font-medium">
                        {program.badge}
                      </span>
                    )}
                    {/* <a
                      href={program.href}
                      onClick={(e) => e.stopPropagation()}
                      className="bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                    >
                      <span>Details</span>
                      <ArrowRight className="w-3 h-3" />
                    </a> */}
                    <Button variant="goldBlack" size="lg">
                      <Link
                        href={program.href}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="absolute inset-[2px] rounded-[inherit] bg-[linear-gradient(135deg,#000,#111,#000)] shadow-[inset_0_3px_6px_rgba(0,0,0,0.9),inset_0_-1px_3px_rgba(255,255,255,0.08),0_1px_0_rgba(255,255,255,0.08)]" />
                        <span className="relative z-10 text-white font-bold flex items-center gap-2">
                          View details <ArrowRight className="size-5" />
                        </span>
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </CardSticky>
  );
}

/* -------------------- Main component -------------------- */
export function ProvinceStackBento({
  title = "Canada Immigration Programs",
  provinces: providedProvinces,
  phoneHref = "tel:+1-000-000-0000",
}: Props) {
  const [expandedProvince, setExpandedProvince] = React.useState<string | null>(
    null
  );
  const [query, setQuery] = React.useState("");

  // If no provinces provided, we'll need to get them from somewhere
  const provinces = providedProvinces || [];

  const filteredProvinces = React.useMemo(() => {
    return provinces.filter(
      (province) =>
        province.name.toLowerCase().includes(query.toLowerCase().trim()) ||
        province.programs.some((program) =>
          program.title.toLowerCase().includes(query.toLowerCase().trim())
        )
    );
  }, [provinces, query]);

  const handleProvinceToggle = (provinceId: string) => {
    setExpandedProvince(expandedProvince === provinceId ? null : provinceId);
  };

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white min-h-screen">
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left sticky panel */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <div className="space-y-8">
              <div>
                <h5 className="text-xs uppercase tracking-wide text-white/60 mb-4">
                  Provincial Programs
                </h5>
                <h2 className="text-4xl font-bold tracking-tight mb-6">
                  Explore{" "}
                  <span className="text-blue-400">Canada's provinces</span> and
                  their programs
                </h2>
                <p className="text-white/80 leading-relaxed">
                  Each Canadian province and territory offers unique immigration
                  programs tailored to their economic needs. Click on any
                  province to explore their specific programs and requirements.
                </p>
              </div>

              {/* Search */}
              <div className="relative">
                <SearchIcon className="absolute left-4 top-1/2 w-5 h-5 -translate-y-1/2 text-white/40" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search provinces or programs..."
                  className="w-full h-12 bg-white/10 border border-white/20 rounded-lg pl-12 pr-4 text-white placeholder:text-white/40 focus:outline-none focus:border-blue-400 transition-colors"
                />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-400">
                    {provinces.length}
                  </div>
                  <div className="text-sm text-white/70">
                    Provinces & Territories
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-400">
                    {provinces.reduce((sum, p) => sum + p.totalPrograms, 0)}
                  </div>
                  <div className="text-sm text-white/70">Total Programs</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right scrolling stack */}
          <div className="relative">
            <ContainerScroll className="min-h-[400vh] space-y-8">
              {filteredProvinces.map((province, index) => (
                <ProvinceStackCard
                  key={province.id}
                  province={province}
                  index={index}
                  isExpanded={expandedProvince === province.id}
                  onToggle={() => handleProvinceToggle(province.id)}
                />
              ))}
            </ContainerScroll>
          </div>
        </div>
      </div>
    </section>
  );
}

// Export the grouping function for use with existing data
export { groupProgramsByProvince };
export type { ProvinceStack, ProgramCard };
