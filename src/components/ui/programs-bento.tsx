"use client";

import * as React from "react";
import {
  Search as SearchIcon,
  ChevronDown,
  Phone,
  ArrowRight,
} from "lucide-react";

/** tiny cn helper */
const cn = (...c: Array<string | false | null | undefined>) =>
  c.filter(Boolean).join(" ");

export type ProgramCard = {
  id: string;
  title: string;
  href: string;
  image: string;
  badge?: string;
  budgetText?: string; // free text so we don't hardcode numbers
  prText?: string; // free text for timeline
};

export type ProgramsBentoProps = {
  title?: string;
  items?: ProgramCard[];
  className?: string;
  searchPlaceholder?: string;
  budgetLabel?: string;
  timelineLabel?: string;
  contactLabel?: string;
  viewDetailsLabel?: string;
};

/* -------------------- UI helpers -------------------- */
const SORT_OPTIONS = [
  { id: "all", label: "All" },
  { id: "az", label: "A–Z" },
  { id: "za", label: "Z–A" },
] as const;
type SortId = (typeof SORT_OPTIONS)[number]["id"];

/* -------------------- Card -------------------- */
function ProgramBentoCard({ 
  item, 
  budgetLabel = "Typical budget / funds",
  timelineLabel = "Pathway / timeline",
  contactLabel = "Contact advisor",
  viewDetailsLabel = "View details"
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

      {/* Metrics row (hidden on very small like the ref) */}
      <div className="hidden items-center justify-between px-6 py-5 sm:flex">
        <div>
          <p className="text-[0.95rem] text-neutral-500">
            {budgetLabel}
          </p>
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
        <a
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
        </a>

        <a
          href={item.href}
          className="flex items-center gap-2 rounded-[0.5rem] px-4 py-2 text-white xsm:flex-1 xsm:justify-center"
          style={{
            backgroundImage:
              "linear-gradient(97deg, var(--primary) -3.86%, var(--accent) 117.18%)",
          }}
        >
          <span className="text-[0.95rem] font-medium">{viewDetailsLabel}</span>
          <ArrowRight className="size-5" />
        </a>
      </div>
    </div>
  );
}

/* -------------------- Sticky left panel -------------------- */
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

/* -------------------- Main section -------------------- */
export function ProgramsBento({
  title = "Region",
  items = [],
  className = "",
  searchPlaceholder = "Search programs",
  budgetLabel = "Typical budget / funds",
  timelineLabel = "Pathway / timeline",
  contactLabel = "Contact advisor",
  viewDetailsLabel = "View details",
}: ProgramsBentoProps) {
  const [query, setQuery] = React.useState("");
  const [sort, setSort] = React.useState<SortId>("all");
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onDoc = () => setOpen(false);
    if (open) document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, [open]);

  const filtered = React.useMemo(() => {
    const list = items.filter((i) =>
      i.title.toLowerCase().includes(query.toLowerCase().trim())
    );
    switch (sort) {
      case "az":
        list.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "za":
        list.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }
    return list;
  }, [items, query, sort]);

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

        {/* Right grid */}
        <div className="flex flex-1 flex-col items-center pb-[9.5rem] xsm:mt-4 xsm:w-full">
          <div className="grid w-full grid-cols-2 gap-6 pb-24 xsm:grid-cols-1 xsm:pb-0">
            {filtered.map((item) => (
              <ProgramBentoCard 
                key={item.id} 
                item={item}
                budgetLabel={budgetLabel}
                timelineLabel={timelineLabel}
                contactLabel={contactLabel}
                viewDetailsLabel={viewDetailsLabel}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
