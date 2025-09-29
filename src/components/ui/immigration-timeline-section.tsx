"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Timeline } from "@/components/ui/timeline";
import { ChevronLeft, ChevronRight } from "lucide-react";

/** tiny cn utility to avoid extra dep */
const cn = (...c: Array<string | false | null | undefined>) =>
  c.filter(Boolean).join(" ");

type CardItem = {
  id: number;
  title: string;
  description: string;
  image: string;
  badge?: string;
  chips?: string[];
};

function CardRail({
  items,
  autoPlayMs = 3500,
  cardWidth = 384, // w-96
  gap = 24, // gap-6
}: {
  items: CardItem[];
  autoPlayMs?: number;
  cardWidth?: number;
  gap?: number;
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const [hovering, setHovering] = useState(false);
  const step = cardWidth + gap;

  // Observe when this timeline section is visible to start/stop autoplay
  useEffect(() => {
    if (!wrapRef.current) return;
    const io = new IntersectionObserver(
      ([entry]) =>
        setInView(entry.isIntersecting && entry.intersectionRatio > 0.4),
      { threshold: [0, 0.4, 1] }
    );
    io.observe(wrapRef.current);
    return () => io.disconnect();
  }, []);

  const scrollTo = (i: number) => {
    if (!railRef.current) return;
    const clamped = ((i % items.length) + items.length) % items.length;
    railRef.current.scrollTo({ left: clamped * step, behavior: "smooth" });
    setIndex(clamped);
  };

  // autoplay only when in view and not hovering
  useEffect(() => {
    if (!inView || hovering) return;
    const id = setInterval(() => scrollTo(index + 1), autoPlayMs);
    return () => clearInterval(id);
  }, [inView, hovering, index, autoPlayMs]);

  const onWheelToHorizontal = (e: React.WheelEvent) => {
    // natural horizontal scrolling with mouse wheel/trackpad
    if (!railRef.current) return;
    railRef.current.scrollLeft += e.deltaY;
  };

  return (
    <div
      ref={wrapRef}
      className="relative rounded-2xl p-4 md:p-6 bg-card border border-border"
      style={{
        boxShadow:
          "0 8px 32px color-mix(in oklab, var(--foreground) 6%, transparent)",
      }}
    >
      {/* rail */}
      <div
        ref={railRef}
        onWheel={onWheelToHorizontal}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        className="flex gap-6 overflow-x-auto pb-3 scrollbar-hide scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {items.map((card) => (
          <article
            key={card.id}
            className={cn(
              "flex-shrink-0 w-96 rounded-2xl overflow-hidden border border-border bg-card text-card-foreground shadow-lg hover:shadow-2xl transition-all duration-300"
            )}
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, color-mix(in oklab, var(--foreground) 12%, transparent), transparent)",
                }}
              />
              {card.badge && (
                <span
                  className="absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold shadow-lg"
                  style={{
                    color: "var(--primary-foreground)",
                    backgroundImage:
                      "linear-gradient(90deg, var(--primary), var(--accent))",
                  }}
                >
                  {card.badge}
                </span>
              )}
            </div>
            <div className="p-6">
              <h3
                className="text-xl font-bold mb-2"
                style={{ color: "var(--foreground)" }}
              >
                {card.title}
              </h3>
              <p
                className="text-sm mb-4"
                style={{ color: "var(--muted-foreground)" }}
              >
                {card.description}
              </p>
              {!!card.chips?.length && (
                <div className="flex flex-wrap gap-2">
                  {card.chips.map((c, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 rounded-md border"
                      style={{
                        borderColor: "var(--border)",
                        background: "var(--secondary)",
                        color: "var(--secondary-foreground)",
                      }}
                    >
                      {c}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* arrows */}
      <button
        onClick={() => scrollTo(index - 1)}
        className="absolute -left-3 top-1/2 -translate-y-1/2 rounded-full p-2 shadow-lg hover:shadow-xl"
        style={{
          background: "color-mix(in oklab, var(--card) 92%, transparent)",
        }}
        aria-label="Previous"
      >
        <ChevronLeft
          className="w-5 h-5"
          style={{ color: "var(--foreground)" }}
        />
      </button>
      <button
        onClick={() => scrollTo(index + 1)}
        className="absolute -right-3 top-1/2 -translate-y-1/2 rounded-full p-2 shadow-lg hover:shadow-xl"
        style={{
          background: "color-mix(in oklab, var(--card) 92%, transparent)",
        }}
        aria-label="Next"
      >
        <ChevronRight
          className="w-5 h-5"
          style={{ color: "var(--foreground)" }}
        />
      </button>

      {/* hide scrollbar on webkit */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

const expressEntryCards: CardItem[] = [
  {
    id: 1,
    title: "Express Entry",
    description: "Fast federal pathway to Canadian PR via CRS ranking.",
    image:
      "https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=800",
    badge: "Popular",
    chips: ["6–8 months", "No job offer", "Permanent residence"],
  },
  {
    id: 2,
    title: "CRS Boosters",
    description: "Improve score with education, language, spouse points.",
    image:
      "https://images.pexels.com/photos/1181332/pexels-photo-1181332.jpeg?auto=compress&cs=tinysrgb&w=800",
    chips: ["IELTS/CELPIP", "ECA", "Spousal points"],
  },
  {
    id: 3,
    title: "ITA & eAPR",
    description: "Receive Invitation to Apply and submit electronic PR app.",
    image:
      "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=800",
    chips: ["Document set", "Police cert", "Medicals"],
  },
];

const pnpCards: CardItem[] = [
  {
    id: 4,
    title: "PNP Streams",
    description: "Provincial nominations aligned with local labour needs.",
    image:
      "https://images.pexels.com/photos/2422588/pexels-photo-2422588.jpeg?auto=compress&cs=tinysrgb&w=800",
    badge: "Provincial",
    chips: ["OINP", "BC PNP", "AAIP"],
  },
  {
    id: 5,
    title: "Job-Linked Paths",
    description: "Employer support can accelerate your nomination.",
    image:
      "https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=800",
    chips: ["Job offer", "LMIA/LMIA-exempt"],
  },
  {
    id: 6,
    title: "Nomination → PR",
    description: "600-point boost in Express Entry after nomination.",
    image:
      "https://images.pexels.com/photos/3184163/pexels-photo-3184163.jpeg?auto=compress&cs=tinysrgb&w=800",
    chips: ["+600 CRS", "Faster PR"],
  },
];

const studyWorkCards: CardItem[] = [
  {
    id: 7,
    title: "Study Permit",
    description: "Top schools + PGWP for Canadian experience.",
    image:
      "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=800",
    chips: ["PGWP", "Work while studying"],
  },
  {
    id: 8,
    title: "Work Permit",
    description: "Gain valuable experience and support PR pathways.",
    image:
      "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
    chips: ["IEC", "Closed/Open WP"],
  },
  {
    id: 9,
    title: "PR via CEC",
    description: "Canadian Experience Class after skilled work.",
    image:
      "https://images.pexels.com/photos/4344860/pexels-photo-4344860.jpeg?auto=compress&cs=tinysrgb&w=800",
    chips: ["12+ months exp", "Express Entry"],
  },
];

export function ImmigrationTimelineSection() {
  const data = useMemo(
    () => [
      {
        title: "Express Entry",
        content: (
          <div className="space-y-4">
            <p className="text-xs md:text-sm text-muted-foreground">
              Fast federal pathway. While this step is in view, the cards will
              auto-scroll.
            </p>
            <CardRail items={expressEntryCards} />
          </div>
        ),
      },
      {
        title: "Provincial Nominee Programs",
        content: (
          <div className="space-y-4">
            <p className="text-xs md:text-sm text-muted-foreground">
              Align your profile with a province’s labour needs for a
              nomination.
            </p>
            <CardRail items={pnpCards} />
          </div>
        ),
      },
      {
        title: "Study & Work → PR",
        content: (
          <div className="space-y-4">
            <p className="text-xs md:text-sm text-muted-foreground">
              Combine study and work options as a pathway to permanent
              residence.
            </p>
            <CardRail items={studyWorkCards} />
          </div>
        ),
      },
    ],
    []
  );

  return (
    <main
      className="min-h-[calc(100svh-var(--topbar-height))] bg-background text-foreground"
      //   style={{
      //     backgroundImage: 'linear-gradient(to bottom right, var(--muted), var(--primary-light))',
      //   }}
    >
      <section className="max-w-6xl mx-auto px-[var(--section-padding-x)] py-[var(--section-padding-y)]">
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">
            Immigration{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, var(--primary), var(--accent))",
              }}
            >
              Timeline
            </span>
          </h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            A scrollable journey — each step reveals a horizontal carousel of
            program cards.
          </p>
        </div>

        {/* Your existing Timeline component; we just inject CardRail as content */}
        <Timeline data={data} />
      </section>
    </main>
  );
}
