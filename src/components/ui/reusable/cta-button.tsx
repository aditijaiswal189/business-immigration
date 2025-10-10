// components/header/CTAButton.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GoldInnerSurface } from "./gold-inner-surface";
// import { GoldInnerSurface } from "@/components/ui/GoldInnerSurface";

type CTAButtonProps = {
  href: string;
  label: string;
  tone: "black" | "white";
  size?: "lg" | "sm";
  showWhenScrolled?: boolean; // show only when scrolled (desktop)
  hideWhenScrolled?: boolean; // hide on desktop when scrolled
  isScrolled?: boolean;
};

export function CTAButton({
  href,
  label,
  tone,
  size = "lg",
  showWhenScrolled,
  hideWhenScrolled,
  isScrolled,
}: CTAButtonProps) {
  const basePad = size === "lg" ? "px-6 py-2" : "px-4 py-2";
  const visibility = cn(
    showWhenScrolled && (isScrolled ? "lg:inline-flex" : "hidden"),
    hideWhenScrolled && (isScrolled ? "lg:hidden" : "lg:inline-flex")
  );

  return (
    <Button
      asChild
      variant={tone === "black" ? "goldBlack" : "goldWhite"}
      className={cn("rounded-xl", basePad, visibility)}
    >
      <Link href={href}>
        <GoldInnerSurface tone={tone} />
        <span
          className={cn(
            "relative z-10 font-bold",
            tone === "black" && "text-white"
          )}
        >
          {label}
        </span>
      </Link>
    </Button>
  );
}
