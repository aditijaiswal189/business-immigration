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
  ChevronLeft,
} from "lucide-react";
import { Button } from "./button";
import Link from "next/link";

/** tiny cn helper */
const cn = (...c: Array<string | false | null | undefined>) =>
  c.filter(Boolean).join(" ");

export type ProgramCard = {
  id: string;
  title: string;
  href: string;
  image: string;
  badge?: string;
  budgetText?: string;
  prText?: string;
};

type ProvinceGroup = {
  id: string;
  name: string;
  programs: ProgramCard[];
  color: string;
  isStack: boolean; // Whether this province should use stacking effect
};

export type EnhancedProgramsBentoProps = {
  title?: string;
  items?: ProgramCard[];
  className?: string;
  searchPlaceholder?: string;
  budgetLabel?: string;
  timelineLabel?: string;
  contactLabel?: string;
  viewDetailsLabel?: string;
};

/* -------------------- Group programs by province -------------------- */
const groupProgramsByProvince = (programs: ProgramCard[]): ProvinceGroup[] => {
  const provinceMap = new Map<string, ProgramCard[]>();

  programs.forEach((program) => {
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
    Federal: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
    Alberta: "linear-gradient(135deg, #ef4444, #dc2626)",
    "British Columbia": "linear-gradient(135deg, #22c55e, #16a34a)",
    Manitoba: "linear-gradient(135deg, #a855f7, #9333ea)",
    Ontario: "linear-gradient(135deg, #f59e0b, #d97706)",
    Quebec: "linear-gradient(135deg, #14b8a6, #0d9488)",
    Saskatchewan: "linear-gradient(135deg, #ec4899, #db2777)",
    "Nova Scotia": "linear-gradient(135deg, #8b5cf6, #7c3aed)",
    "Newfoundland & Labrador": "linear-gradient(135deg, #6b7280, #4b5563)",
    "Prince Edward Island": "linear-gradient(135deg, #f97316, #ea580c)",
    "New Brunswick": "linear-gradient(135deg, #84cc16, #65a30d)",
    "Northwest Territories": "linear-gradient(135deg, #06b6d4, #0891b2)",
    Yukon: "linear-gradient(135deg, #f59e0b, #d97706)",
  };

  return Array.from(provinceMap.entries()).map(([name, programs]) => ({
    id: name.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and"),
    name,
    programs,
    color:
      provinceColors[name as keyof typeof provinceColors] ||
      "linear-gradient(135deg, #6b7280, #4b5563)",
    isStack: programs.length > 1, // Use stacking for provinces with multiple programs
  }));
};

/* -------------------- Regular Program Card -------------------- */
function ProgramBentoCard({
  item,
  budgetLabel = "Typical budget / funds",
  timelineLabel = "Pathway / timeline",
  contactLabel = "Contact advisor",
  viewDetailsLabel = "View details",
}: {
  item: ProgramCard;
  budgetLabel?: string;
  timelineLabel?: string;
  contactLabel?: string;
  viewDetailsLabel?: string;
}) {
  return (
    <div
      className={cn(
        "w-full rounded-[1.25rem] border border-[rgba(0,0,0,0.08)] bg-white shadow-[0px_4px_11px_0px_rgba(114,114,114,0.08)]",
        "md:even:translate-y-[7.5rem]"
      )}
    >
      {/* Image + overlay title */}
      <a
        href={item.href}
        className="relative block h-[18.5625rem] w-full overflow-hidden rounded-[1.25rem] sm:h-[18.5625rem] xsm:h-[14.25rem]"
      >
        <img
          alt={item.title}
          src={item.image}
          className="size-full rounded-[1.25rem] object-cover"
        />
        <div className="absolute inset-0 z-10 size-full rounded-[1.25rem] bg-[linear-gradient(180deg,rgba(20,13,5,0.00)_0%,rgba(20,13,5,0.92)_98%)]" />
        {item.badge && (
          <span
            className="absolute left-4 top-4 z-20 rounded-full px-3 py-1 text-xs font-semibold text-white shadow"
            style={{
              backgroundImage:
                "linear-gradient(97deg, var(--primary) -3.86%, var(--accent) 117.18%)",
            }}
          >
            {item.badge}
          </span>
        )}
        <h3 className="absolute bottom-6 left-6 z-[11] line-clamp-2 text-white text-[1.75rem] font-semibold leading-tight xsm:bottom-[4.25rem] xsm:left-4 xsm:text-[1.5rem]">
          {item.title}
        </h3>
      </a>

      {/* Metrics row */}
      <div className="hidden items-center justify-between px-6 py-5 sm:flex">
        <div>
          <p className="text-[0.95rem] text-neutral-500">{budgetLabel}</p>
          <p
            className="text-[1.125rem] font-semibold leading-[1.33]"
            style={{ color: "var(--accent)" }}
          >
            {item.budgetText ?? "—"}
          </p>
        </div>
        <div>
          <p className="text-[0.95rem] text-neutral-500">{timelineLabel}</p>
          <p
            className="text-[1.125rem] font-semibold leading-[1.33]"
            style={{ color: "var(--accent)" }}
          >
            {item.prText ?? "—"}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between gap-2 px-5 py-4">
        {/* <a
          target="_blank"
          rel="noreferrer"
          href="#contact"
          className="group flex cursor-pointer items-center gap-3"
          aria-label={contactLabel}
        >
          <div className="rounded-[1.875rem] bg-[#F4EEEA] p-[0.875rem] transition-all group-hover:[background-image:linear-gradient(97deg,var(--primary)_-3.86%,var(--accent)_117.18%)]">
            <Phone className="size-5 text-[color:var(--accent)] group-hover:text-white transition-colors" />
          </div>
          <p className="hidden text-[0.95rem] font-medium text-[#3F2214] transition-colors sm:block">
            {contactLabel}
          </p>
        </a> */}
        <Button variant="goldMorph" size="lg" asChild>
          <Link
            href="#contact"
            aria-label={contactLabel}
            className="inline-flex items-center gap-2"
          >
            {/* same two inner fills as above */}
            <div className="pointer-events-none absolute inset-[2px] rounded-[inherit] z-[5] bg-[linear-gradient(135deg,#fff,#f9f9f9,#f0f0f0)] shadow-[inset_0_2px_5px_rgba(255,255,255,0.8),inset_0_-1px_2px_rgba(0,0,0,0.15),0_1px_0_rgba(255,255,255,0.7)] transition-opacity duration-300 group-hover:opacity-0" />
            <div className="pointer-events-none absolute inset-[2px] rounded-[inherit] z-[6] opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[linear-gradient(135deg,#000,#111,#000)] shadow-[inset_0_3px_6px_rgba(0,0,0,0.9),inset_0_-1px_3px_rgrgba(255,255,255,0.08),0_1px_0_rgba(255,255,255,0.08)]" />
            <Phone className="relative z-20 size-5 transition-colors duration-300 text-[#3F2214] group-hover:text-white" />
            <span className="relative z-20 hidden text-[0.95rem] font-medium sm:block transition-colors duration-300 text-[#3F2214] group-hover:text-white">
              {contactLabel}
            </span>
          </Link>
        </Button>

        <Button variant="goldBlack" size="lg" asChild>
          <Link
            href={item.href}
            className="xsm:flex-1 inline-flex items-center gap-2"
          >
            <div className="pointer-events-none absolute inset-[2px] rounded-[inherit] bg-[linear-gradient(135deg,#000,#111,#000)] shadow-[inset_0_3px_6px_rgba(0,0,0,0.9),inset_0_-1px_3px_rgba(255,255,255,0.08),0_1px_0_rgba(255,255,255,0.08)] z-[5]" />
            <span className="relative z-20 text-[0.95rem] font-medium">
              {viewDetailsLabel}
            </span>
            <ArrowRight className="size-5 relative z-20" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

/* -------------------- Province Stack Card (Single Grid Space) -------------------- */
function ProvinceStackCard({
  province,
  isExpanded,
  onToggle,
  budgetLabel,
  timelineLabel,
  contactLabel,
  viewDetailsLabel,
}: {
  province: ProvinceGroup;
  isExpanded: boolean;
  onToggle: () => void;
  budgetLabel: string;
  timelineLabel: string;
  contactLabel: string;
  viewDetailsLabel: string;
}) {
  // Always return the collapsed state - expansion will be handled by showing individual cards
  return (
    <div
      className={cn(
        "w-full rounded-[1.25rem] border border-[rgba(0,0,0,0.08)] bg-white shadow-[0px_4px_11px_0px_rgba(114,114,114,0.08)] cursor-pointer transition-all duration-300 hover:scale-105",
        "md:even:translate-y-[7.5rem]"
      )}
      onClick={onToggle}
    >
      {/* Image section with province info */}
      <div className="relative h-[18.5625rem] w-full overflow-hidden rounded-[1.25rem] sm:h-[18.5625rem] xsm:h-[14.25rem]">
        {/* Use first program's image as background */}
        <img
          alt={province.name}
          src={province.programs[0]?.image || ""}
          className="size-full rounded-[1.25rem] object-cover"
        />
        <div className="absolute inset-0 z-10 size-full rounded-[1.25rem] bg-[linear-gradient(180deg,rgba(20,13,5,0.00)_0%,rgba(20,13,5,0.92)_98%)]" />

        {/* Province badge */}
        <span
          className="absolute left-4 top-4 z-20 rounded-full px-3 py-1 text-xs font-semibold text-white shadow"
          style={{
            backgroundImage:
              "linear-gradient(97deg, var(--primary) -3.86%, var(--accent) 117.18%)",
          }}
        >
          {province.programs.length} Programs
        </span>

        {/* Province name and info */}
        <div className="absolute bottom-6 left-6 z-[11] text-white">
          <h3 className="text-[1.75rem] font-semibold leading-tight mb-2 xsm:text-[1.5rem]">
            {province.name}
          </h3>
          <div className="flex items-center gap-2 text-sm text-white/80">
            <MapPin className="w-4 h-4" />
            <span>
              {isExpanded
                ? "Click to collapse"
                : "Click to explore all programs"}
            </span>
          </div>
        </div>
      </div>

      {/* Metrics section */}
      <div className="hidden items-center justify-between px-6 py-5 sm:flex">
        <div>
          <p className="text-[0.95rem] text-neutral-500">Programs available</p>
          <p
            className="text-[1.125rem] font-semibold leading-[1.33]"
            style={{ color: "var(--accent)" }}
          >
            {province.programs.length} streams
          </p>
        </div>
        <div>
          <p className="text-[0.95rem] text-neutral-500">Investment range</p>
          <p
            className="text-[1.125rem] font-semibold leading-[1.33]"
            style={{ color: "var(--accent)" }}
          >
            Various levels
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between gap-2 px-5 py-4">
        <div className="group flex cursor-pointer items-center gap-3">
          {/* <div className="rounded-[1.875rem] bg-[#F4EEEA] p-[0.875rem] transition-all group-hover:[background-image:linear-gradient(97deg,var(--primary)_-3.86%,var(--accent)_117.18%)]">
            <Users className="size-5 text-[color:var(--accent)] group-hover:text-white transition-colors" />
          </div>
          <p className="hidden text-[0.95rem] font-medium text-[#3F2214] transition-colors sm:block">
            Multiple programs
          </p> */}
          <Button variant="goldWhite" size="lg" asChild>
            <Link
              href=""
              rel="noreferrer"
              aria-label={contactLabel}
              className="group inline-flex items-center gap-3"
            >
              {/* inner fill (above border, below content) */}
              <div className="absolute inset-[2px] rounded-[inherit] bg-[linear-gradient(135deg,#fff,#f9f9f9,#f0f0f0)] shadow-[inset_0_2px_5px_rgba(255,255,255,0.8),inset_0_-1px_2px_rgba(0,0,0,0.15),0_1px_0_rgba(255,255,255,0.7)]" />
              <div className="relative z-20 ">
                <Users className="size-5" />
              </div>
              <span className="relative z-20 hidden text-[0.95rem] font-medium sm:block">
                Multiple programs
              </span>
            </Link>
          </Button>
        </div>

        <Button
          variant="goldBlack"
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          className="xsm:flex-1" // keeps layout parity on mobile
        >
          {/* inner fill above border, below content */}
          <div className="pointer-events-none absolute inset-[2px] rounded-[inherit] bg-[linear-gradient(135deg,#000,#111,#000)] shadow-[inset_0_3px_6px_rgba(0,0,0,0.9),inset_0_-1px_3px_rgba(255,255,255,0.08),0_1px_0_rgba(255,255,255,0.08)] z-[5]" />
          <span className="relative z-20 text-[0.95rem] font-medium">
            {isExpanded ? "Collapse" : "Explore all"}
          </span>
          <ArrowRight className="size-5 relative z-20" />
        </Button>
      </div>
    </div>
  );
}

/* -------------------- Sticky left panel -------------------- */
const SORT_OPTIONS = [
  { id: "all", label: "All" },
  { id: "az", label: "A–Z" },
  { id: "za", label: "Z–A" },
] as const;
type SortId = (typeof SORT_OPTIONS)[number]["id"];

function LeftStickyPanel({
  query,
  onQuery,
  sort,
  onSort,
  open,
  setOpen,
  title,
  searchPlaceholder = "Search programs",
}: {
  query: string;
  onQuery: (v: string) => void;
  sort: SortId;
  onSort: (v: SortId) => void;
  open: boolean;
  setOpen: (v: boolean) => void;
  title: string;
  searchPlaceholder?: string;
}) {
  return (
    <div className="sticky w-[23.9375rem] space-y-10 sm:top-[7.75rem] sm:pb-[6.5rem] xsm:top-[1rem] xsm:z-10 xsm:w-full xsm:space-y-4 xsm:bg-background xsm:px-4 xsm:pb-4">
      <h2 className="text-4xl font-semibold leading-tight text-[#3F2214] sm:capitalize">
        Immigration programs — <span className="text-[#3F2214]">{title}</span>
      </h2>

      <div className="mb-8 flex items-center justify-between sm:flex-col sm:space-y-4">
        {/* Search */}
        <div className="relative h-12 sm:w-full">
          <SearchIcon className="absolute left-4 top-1/2 size-6 -translate-y-1/2 text-neutral-400" />
          <input
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="h-full w-[23.9375rem] rounded-[0.5rem] bg-[#EEE] pl-12 pr-3 font-medium tracking-[-0.0175rem] placeholder:text-neutral-400 focus:outline-none sm:w-full"
          />
        </div>

        {/* Sort */}
        <div className="relative sm:min-w-full">
          <button
            onClick={() => setOpen(!open)}
            className="flex h-12 w-[23.9375rem] items-center justify-between rounded-[0.5rem] bg-[#EEE] px-3 sm:w-full"
            aria-haspopup="listbox"
            aria-expanded={open}
          >
            <span className="flex items-center gap-2 text-[1rem]">
              <b className="font-semibold">Sort by:</b>
              {SORT_OPTIONS.find((o) => o.id === sort)?.label ?? "All"}
            </span>
            <ChevronDown className="size-6" />
          </button>

          <div
            className={cn(
              "absolute left-0 top-[110%] z-20 mt-2 flex max-h-[22rem] w-full flex-col space-y-2 overflow-y-auto rounded-[0.5rem] bg-white p-2 shadow-[0_4px_10px_rgba(0,0,0,0.20)]",
              open
                ? "pointer-events-auto opacity-100"
                : "pointer-events-none opacity-0"
            )}
          >
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                className={cn(
                  "h-12 rounded-[0.3rem] px-4 text-left text-[1rem] font-medium hover:bg-neutral-100",
                  sort === opt.id && "bg-neutral-100"
                )}
                onClick={() => {
                  onSort(opt.id);
                  setOpen(false);
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------- Main component -------------------- */
export function EnhancedProgramsBento({
  title = "Region",
  items = [],
  className = "",
  searchPlaceholder = "Search programs",
  budgetLabel = "Typical budget / funds",
  timelineLabel = "Pathway / timeline",
  contactLabel = "Contact advisor",
  viewDetailsLabel = "View details",
}: EnhancedProgramsBentoProps) {
  const [query, setQuery] = React.useState("");
  const [sort, setSort] = React.useState<SortId>("all");
  const [open, setOpen] = React.useState(false);
  const [expandedProvince, setExpandedProvince] = React.useState<string | null>(
    null
  );

  React.useEffect(() => {
    const onDoc = () => setOpen(false);
    if (open) document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, [open]);

  // Group programs by province
  const provinces = React.useMemo(() => {
    return groupProgramsByProvince(items);
  }, [items]);

  // Filter and sort
  const filtered = React.useMemo(() => {
    const filteredProvinces = provinces.filter(
      (province) =>
        province.name.toLowerCase().includes(query.toLowerCase().trim()) ||
        province.programs.some((program) =>
          program.title.toLowerCase().includes(query.toLowerCase().trim())
        )
    );

    switch (sort) {
      case "az":
        filteredProvinces.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "za":
        filteredProvinces.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
    return filteredProvinces;
  }, [provinces, query, sort]);

  const handleProvinceToggle = (provinceId: string) => {
    setExpandedProvince(expandedProvince === provinceId ? null : provinceId);
  };

  return (
    <section className={`relative bg-background text-foreground ${className}`}>
      <div className="relative z-10 mx-auto flex max-w-8xl gap-10 px-10 py-14 sm:items-start sm:space-x-[6.19rem] xsm:flex-col">
        {/* Left sticky */}
        <LeftStickyPanel
          title={title}
          query={query}
          onQuery={setQuery}
          sort={sort}
          onSort={setSort}
          open={open}
          setOpen={setOpen}
          searchPlaceholder={searchPlaceholder}
        />

        {/* Right content */}
        <div className="flex flex-1 flex-col items-center pb-[9.5rem] xsm:mt-4 xsm:w-full">
          {/* Single grid with both individual programs and province stacks */}
          <div className="grid w-full grid-cols-2 gap-6 pb-24 xsm:grid-cols-1 xsm:pb-0">
            {/* Individual programs (single programs) */}
            {filtered
              .filter((province) => !province.isStack)
              .map((province) =>
                province.programs.map((program) => (
                  <ProgramBentoCard
                    key={program.id}
                    item={program}
                    budgetLabel={budgetLabel}
                    timelineLabel={timelineLabel}
                    contactLabel={contactLabel}
                    viewDetailsLabel={viewDetailsLabel}
                  />
                ))
              )}

            {/* Province stack cards (collapsed and expanded in same grid space) */}
            {filtered
              .filter((province) => province.isStack)
              .map((province) => {
                const isExpanded = expandedProvince === province.id;

                if (isExpanded) {
                  // Show stacked cards in the same grid space
                  return (
                    <div
                      key={`${province.id}-expanded`}
                      className="relative z-40"
                    >
                      <ContainerScroll className="min-h-[300vh] space-y-4 relative z-30">
                        {province.programs.map((program, index) => (
                          <CardSticky
                            key={program.id}
                            index={index + 2}
                            className="rounded-[1.25rem] border border-[rgba(0,0,0,0.08)] bg-white shadow-[0px_4px_11px_0px_rgba(114,114,114,0.08)] overflow-hidden"
                          >
                            {/* Program Card Content */}
                            <div className="relative block h-[18.5625rem] w-full overflow-hidden rounded-t-[1.25rem]">
                              <a
                                href={program.href}
                                className="block w-full h-full"
                              >
                                <img
                                  alt={program.title}
                                  src={program.image}
                                  className="size-full object-cover"
                                />
                                <div className="absolute inset-0 z-10 size-full bg-[linear-gradient(180deg,rgba(20,13,5,0.00)_0%,rgba(20,13,5,0.92)_98%)]" />
                                <h4 className="absolute bottom-6 left-6 z-[11] line-clamp-2 text-white text-[1.75rem] font-semibold leading-tight">
                                  {program.title}
                                </h4>
                              </a>

                              {/* Collapse button inside each card at top right */}
                              <Button
                                variant="goldBlack"
                                size="sm"
                                className="absolute top-4 right-4 z-30"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleProvinceToggle(province.id);
                                }}
                              >
                                <div className="pointer-events-none absolute inset-[2px] rounded-[inherit] bg-[linear-gradient(135deg,#000,#111,#000)] shadow-[inset_0_3px_6px_rgba(0,0,0,0.9),inset_0_-1px_3px_rgba(255,255,255,0.08),0_1px_0_rgba(255,255,255,0.08)] z-[5]" />
                                <span className="relative z-20 text-xs font-medium">
                                  Collapse
                                </span>
                                <ArrowRight className="size-3 rotate-90 relative z-20" />
                              </Button>

                              {program.badge && (
                                <span
                                  className="absolute left-4 top-4 z-20 rounded-full px-3 py-1 text-xs font-semibold text-white shadow"
                                  style={{
                                    backgroundImage:
                                      "linear-gradient(97deg, var(--primary) -3.86%, var(--accent) 117.18%)",
                                  }}
                                >
                                  {program.badge}
                                </span>
                              )}
                            </div>

                            {/* Metrics section */}
                            <div className="flex items-center justify-between px-6 py-5">
                              <div>
                                <p className="text-[0.95rem] text-neutral-500">
                                  {budgetLabel}
                                </p>
                                <p
                                  className="text-[1.125rem] font-semibold leading-[1.33]"
                                  style={{ color: "var(--accent)" }}
                                >
                                  {program.budgetText ?? "—"}
                                </p>
                              </div>
                              <div>
                                <p className="text-[0.95rem] text-neutral-500">
                                  {timelineLabel}
                                </p>
                                <p
                                  className="text-[1.125rem] font-semibold leading-[1.33]"
                                  style={{ color: "var(--accent)" }}
                                >
                                  {program.prText ?? "—"}
                                </p>
                              </div>
                            </div>

                            {/* Actions - Both Contact and View Details */}
                            <div className="flex items-center justify-between gap-2 px-5 py-4">
                              {/* <a
                                target="_blank"
                                rel="noreferrer"
                                href="#contact"
                                className="group flex cursor-pointer items-center gap-3"
                                aria-label={contactLabel}
                              >
                                <div className="rounded-[1.875rem] bg-[#F4EEEA] p-[0.875rem] transition-all group-hover:[background-image:linear-gradient(97deg,var(--primary)_-3.86%,var(--accent)_117.18%)]">
                                  <Phone className="size-5 text-[color:var(--accent)] group-hover:text-white transition-colors" />
                                </div>
                                <p className="hidden text-[0.95rem] font-medium text-[#3F2214] transition-colors sm:block">
                                  {contactLabel}
                                </p>
                              </a> */}

                              <Button variant="goldMorph" size="lg" asChild>
                                <Link
                                  href="#contact"
                                  aria-label={contactLabel}
                                  className="inline-flex items-center gap-2"
                                >
                                  {/* same two inner fills as above */}
                                  <div className="pointer-events-none absolute inset-[2px] rounded-[inherit] z-[5] bg-[linear-gradient(135deg,#fff,#f9f9f9,#f0f0f0)] shadow-[inset_0_2px_5px_rgba(255,255,255,0.8),inset_0_-1px_2px_rgba(0,0,0,0.15),0_1px_0_rgba(255,255,255,0.7)] transition-opacity duration-300 group-hover:opacity-0" />
                                  <div className="pointer-events-none absolute inset-[2px] rounded-[inherit] z-[6] opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[linear-gradient(135deg,#000,#111,#000)] shadow-[inset_0_3px_6px_rgba(0,0,0,0.9),inset_0_-1px_3px_rgrgba(255,255,255,0.08),0_1px_0_rgba(255,255,255,0.08)]" />
                                  <Phone className="relative z-20 size-5 transition-colors duration-300 text-[#3F2214] group-hover:text-white" />
                                  <span className="relative z-20 hidden text-[0.95rem] font-medium sm:block transition-colors duration-300 text-[#3F2214] group-hover:text-white">
                                    {contactLabel}
                                  </span>
                                </Link>
                              </Button>

                              <Button variant="goldBlack" size="lg" asChild>
                                <a
                                  href={program.href}
                                  className="inline-flex items-center gap-2 xsm:flex-1 xsm:justify-center"
                                >
                                  <div className="pointer-events-none absolute inset-[2px] rounded-[inherit] bg-[linear-gradient(135deg,#000,#111,#000)] shadow-[inset_0_3px_6px_rgba(0,0,0,0.9),inset_0_-1px_3px_rgba(255,255,255,0.08),0_1px_0_rgba(255,255,255,0.08)] z-[5]" />
                                  <span className="relative z-20 text-[0.95rem] font-medium">
                                    {viewDetailsLabel}
                                  </span>
                                  <ArrowRight className="size-5 relative z-20" />
                                </a>
                              </Button>
                            </div>
                          </CardSticky>
                        ))}
                      </ContainerScroll>
                    </div>
                  );
                } else {
                  // Show collapsed province card
                  return (
                    <ProvinceStackCard
                      key={province.id}
                      province={province}
                      isExpanded={false}
                      onToggle={() => handleProvinceToggle(province.id)}
                      budgetLabel={budgetLabel}
                      timelineLabel={timelineLabel}
                      contactLabel={contactLabel}
                      viewDetailsLabel={viewDetailsLabel}
                    />
                  );
                }
              })}
          </div>
        </div>
      </div>
    </section>
  );
}
