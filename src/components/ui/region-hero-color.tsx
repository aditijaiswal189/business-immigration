// components/region-hero-color.tsx
"use client";

import { ExternalLink } from "lucide-react";
import { RegionHeader } from "./region-header";
import InteractiveGrid from "./interactive-grid";
import { Button } from "./button";
import AnimatedGroup from "./landing/animated-group";
import AnimatedText from "./landing/animated-text";

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
              <Button variant="gradient" asChild>
                <a href={primaryCta.href}>{primaryCta.label}</a>
              </Button>

              <Button variant="outline" asChild className="group">
                <a href={secondaryCta.href}>
                  {secondaryCta.label}
                  <ExternalLink className="ml-2 h-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </Button>
            </AnimatedGroup>
          </AnimatedGroup>
        </div>
      </section>
    </div>
  );
}

export default RegionHeroColor;
