// components/reusable/dot-indicators.tsx
import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  count: number;
  activeIndex: number;
  onSelect: (i: number) => void;
  disabled?: boolean;
  className?: string;
};

export function DotIndicators({
  count,
  activeIndex,
  onSelect,
  disabled,
  className,
}: Props) {
  return (
    <div
      className={cn("dots-shell flex gap-3 rounded-full px-4 py-2", className)}
      role="tablist"
      aria-label="Slide indicators"
    >
      {Array.from({ length: count }).map((_, i) => {
        const active = i === activeIndex;
        return (
          <Button
            key={i}
            role="tab"
            aria-selected={active}
            aria-label={`Go to slide ${i + 1}`}
            disabled={disabled}
            onClick={() => onSelect(i)}
            variant="goldBlack"
            className={cn(
              "dot p-0 no-sheen", // reusable dot + hide shimmer
              active ? "scale-110" : "opacity-80 hover:opacity-100"
            )}
          >
            <div
              className={cn(
                "dot-fill", // idle fill
                active && "dot-fill--active" // active gradient fill
              )}
            />
            <span className="sr-only">Slide {i + 1}</span>
          </Button>
        );
      })}
    </div>
  );
}
