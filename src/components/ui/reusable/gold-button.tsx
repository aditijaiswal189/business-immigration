// components/reusable/gold-button.tsx
import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type GoldButtonProps = React.ComponentProps<typeof Button> & {
  tone?: "black" | "white";
  inset?: string; // inner surface inset, default '2px'
  weight?: "regular" | "bold";
  round?: "md" | "xl"; // quick rounding control
};

export function GoldButton({
  className,
  children,
  tone = "black",
  inset = "2px",
  weight = "bold",
  round = "xl",
  variant, // let caller override if needed
  ...props
}: GoldButtonProps) {
  const pickedVariant =
    variant ?? (tone === "black" ? "goldBlack" : "goldWhite");

  return (
    <Button
      variant={pickedVariant}
      className={cn(round === "xl" ? "rounded-xl" : "rounded-md", className)}
      {...props}
    >
      {/* inner surface (no rgba; uses global.css vars) */}
      <div
        className={cn(
          "absolute rounded-[inherit] pointer-events-none",
          tone === "black" ? "gold-inner--black" : "gold-inner--white"
        )}
        style={{ inset }}
      />
      <span
        className={cn(
          "relative z-10",
          tone === "black" ? "text-white" : "text-black",
          weight === "bold" ? "font-bold" : "font-medium"
        )}
      >
        {children}
      </span>
    </Button>
  );
}
