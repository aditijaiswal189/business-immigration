// components/region-hero-color.tsx
"use client";

import { ExternalLink } from "lucide-react";
import { RegionHeader } from "./region-header";
import InteractiveGrid from "./interactive-grid";
import { Button } from "./button";
import AnimatedGroup from "./landing/animated-group";
import AnimatedText from "./landing/animated-text";
import Link from "next/link";

type RegionHeroProps = {
  eyebrow?: string;
  title?: string;
  highlight?: string;
  subtitle?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  showHeader?: boolean;
  paddedTop?: boolean;
  className?: string;
};

export function RegionHeroColor({
  eyebrow,
  title = "Your pathway to",
  highlight = "Success",
  subtitle = "Explore immigration opportunities and pathways. We guide you from eligibility to landing.",
  primaryCta = { label: "Check eligibility", href: "#" },
  secondaryCta = { label: "Talk to an expert", href: "#" },
  showHeader = true,
  paddedTop = true,
  className = "",
}: RegionHeroProps) {
  return (
    <div className="relative">
      {showHeader && <RegionHeader />}

      <section
        className={[
          "relative isolate overflow-hidden min-h-[100svh]",
          paddedTop ? "pt-[calc(var(--topbar-height,3rem)+3rem)]" : "",
          className,
        ].join(" ")}
      >
        {/* Hover-only background grid */}
        <InteractiveGrid />

        {/* IMPORTANT: let hovers pass through this whole wrapper */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-48 sm:px-8 lg:px-12 pointer-events-none">
          <AnimatedGroup
            preset="blur-slide"
            className="flex flex-col items-center gap-6 text-center"
          >
            <div className="pointer-events-none">
              {eyebrow && (
                <p className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">
                  {eyebrow}
                </p>
              )}
              <AnimatedText
                as="h1"
                className="mb-6 text-4xl font-extrabold tracking-tight text-pretty lg:text-6xl"
              >
                {title}{" "}
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, var(--primary), var(--accent))",
                  }}
                >
                  {highlight}
                </span>
              </AnimatedText>

              <AnimatedText
                as="p"
                className="text-muted-foreground mx-auto max-w-3xl lg:text-xl"
                delay={0.15}
              >
                {subtitle}
              </AnimatedText>
            </div>

            {/* Buttons stay clickable */}
            <AnimatedGroup
              preset="slide"
              className="mt-6 flex justify-center gap-3 pointer-events-auto"
            >
              <Link href={primaryCta.href}>
                <Button variant="goldBlack" size="lg">
                  <div className="absolute inset-[2px] rounded-[inherit] bg-[linear-gradient(135deg,#000,#111,#000)] shadow-[inset_0_3px_6px_rgba(0,0,0,0.9),inset_0_-1px_3px_rgba(255,255,255,0.08),0_1px_0_rgba(255,255,255,0.08)]" />
                  <span className="relative z-10 text-white font-bold">
                    {primaryCta.label}
                  </span>
                </Button>
              </Link>
              <Link href={secondaryCta.href}>
                <Button variant="goldWhite" size="lg">
                  <div className="absolute inset-[2px] rounded-[inherit] bg-[linear-gradient(135deg,#fff,#f9f9f9,#f0f0f0)] shadow-[inset_0_2px_5px_rgba(255,255,255,0.8),inset_0_-1px_2px_rgba(0,0,0,0.15),0_1px_0_rgba(255,255,255,0.7)]" />
                  <span className="relative z-10 flex flex-row  font-bold">
                    {secondaryCta.label}
                    <ExternalLink className="ml-2 h-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Button>
              </Link>

              {/* <Button variant="whiteGold" asChild className="group">
                <a href={secondaryCta.href}>
                 
                 
                </a>
              </Button> */}
            </AnimatedGroup>
          </AnimatedGroup>
        </div>
      </section>
    </div>
  );
}

export default RegionHeroColor;
