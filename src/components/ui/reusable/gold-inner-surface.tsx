// components/ui/GoldInnerSurface.tsx
import React from "react";
import { cn } from "@/lib/utils";

type Props = {
  tone: "black" | "white";
  inset?: string; // e.g. "2px" | "1px"
  className?: string;
};

export function GoldInnerSurface({ tone, inset = "2px", className }: Props) {
  return (
    <div
      className={cn(
        "absolute rounded-[inherit] pointer-events-none",
        tone === "black" ? "gold-inner--black" : "gold-inner--white",
        className
      )}
      style={{ inset }}
    />
  );
}
