"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type RegionHeroProps = {
  eyebrow?: string; // e.g., "Canada • Provincial Programs"
  title: string; // e.g., "Immigrate to Canada"
  subtitle?: string; // supporting copy
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  bgImageUrl?: string; // optional background image
  align?: "left" | "center"; // content alignment
};

export function RegionHero({
  eyebrow,
  title,
  subtitle,
  primaryCta = { label: "Get Assessment", href: "#assessment" },
  secondaryCta = { label: "Explore Programs", href: "#programs" },
  bgImageUrl,
  align = "left",
}: RegionHeroProps) {
  return (
    <section
      className="relative w-full"
      style={{
        // offset content from fixed nav; falls back to 3rem if the var isn't set
        paddingTop: "calc(var(--topbar-height, 3rem) + 2rem)",
      }}
    >
      {/* background */}
      <div className="absolute inset-0 -z-10">
        {bgImageUrl && (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${bgImageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.22,
            }}
          />
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, color-mix(in oklab, var(--primary) 10%, var(--background)), var(--background) 40%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        <div
          className={cn(
            "min-h-[60svh] md:min-h-[70svh] grid items-center",
            align === "center"
              ? "text-center justify-items-center"
              : "text-left"
          )}
        >
          <div className="max-w-3xl">
            {eyebrow && (
              <div
                className="mb-3 inline-block rounded-full px-3 py-1 text-xs font-semibold border"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--secondary)",
                  color: "var(--secondary-foreground)",
                }}
              >
                {eyebrow}
              </div>
            )}

            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              {title}
            </h1>

            {subtitle && (
              <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
            )}

            <div
              className={cn(
                "mt-8 flex flex-col gap-3 sm:flex-row",
                align === "center" && "justify-center"
              )}
            >
              {primaryCta && (
                <Button asChild size="lg" className="shadow-xl">
                  <a href={primaryCta.href}>{primaryCta.label}</a>
                </Button>
              )}
              {secondaryCta && (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-border bg-card text-card-foreground"
                >
                  <a href={secondaryCta.href}>{secondaryCta.label}</a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
