import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        outline2:
          "border  shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",

        // 🚀 New gradient variant (uses your CSS variables)
        gradient:
          "rounded-xl font-semibold text-white bg-[linear-gradient(90deg,var(--primary),var(--accent))] shadow-md hover:shadow-lg will-change-transform hover:scale-105 active:scale-100",
        gold: "rounded-xl font-semibold text-[var(--primary-foreground)] bg-[var(--gold)] shadow-md hover:shadow-lg will-change-transform hover:scale-105 active:scale-100",
        blackGold:
          "bg-[var(--btn-black)] border-2 border-[var(--btn-gold-border)] text-[var(--btn-gold-border)] hover:bg-[var(--btn-gold-border)] hover:text-[var(--btn-black)]",
        whiteGold:
          "bg-[var(--btn-white)] border-2 border-[var(--btn-gold-border)] text-[var(--btn-black)] hover:text-[var(--btn-gold-border)]",
        goldMorph:
          "relative isolate overflow-hidden group text-white " +
          "inline-flex items-center justify-center font-semibold transition-all duration-300 " +
          "hover:scale-[1.03] " +
          // gold border via ::before (below content)
          "before:absolute before:inset-0 before:rounded-[inherit] before:p-[2px] " +
          "before:bg-[conic-gradient(from_0deg,#8B4513,#CD853F,#FFD700,#FFFACD,#FFD700,#DAA520,#B8860B,#654321,#8B4513)] " +
          "before:shadow-[0_4px_15px_rgba(0,0,0,0.4),0_0_25px_rgba(255,215,0,0.3)] before:content-[''] before:z-0 " +
          // subtle moving sheen
          "after:absolute after:inset-0 after:rounded-[inherit] after:bg-gradient-to-r after:from-transparent after:via-[#FFD700]/20 after:to-transparent " +
          "after:opacity-0 group-hover:after:opacity-100 after:transition-all after:duration-700 after:-skew-x-12 after:-translate-x-full group-hover:after:translate-x-full after:z-10",
        goldBlack:
          "relative isolate overflow-hidden text-white " +
          "relative group inline-flex items-center justify-center font-semibold transition-all duration-300 overflow-hidden hover:scale-[1.03]" +
          " before:absolute before:inset-0 before:rounded-[inherit] before:p-[1.5px] before:bg-[conic-gradient(from_0deg,#8B4513,#CD853F,#FFD700,#FFFACD,#FFD700,#DAA520,#B8860B,#654321,#8B4513)] before:shadow-[0_4px_15px_rgba(0,0,0,0.4),0_0_25px_rgba(255,215,0,0.3)] before:content-['']" +
          " after:absolute after:inset-0 after:rounded-[inherit] after:bg-gradient-to-r after:from-transparent after:via-[#FFD700]/20 after:to-transparent after:opacity-0 group-hover:after:opacity-100 after:transition-all after:duration-700 after:-skew-x-12 after:-translate-x-full group-hover:after:translate-x-full",

        goldWhite:
          "relative isolate group inline-flex items-center justify-center font-semibold transition-all duration-300 overflow-hidden hover:scale-[1.03]" +
          " before:absolute before:inset-0 before:rounded-[inherit] before:p-[2px] before:bg-[conic-gradient(from_0deg,#8B4513,#CD853F,#FFD700,#FFFACD,#FFD700,#DAA520,#B8860B,#654321,#8B4513)] before:shadow-[0_4px_15px_rgba(0,0,0,0.4),0_0_25px_rgba(255,215,0,0.3)] before:content-[''] before:z-0" +
          " after:absolute after:inset-0 after:rounded-[inherit] after:bg-gradient-to-r after:from-transparent after:via-[#FFD700]/25 after:to-transparent after:opacity-0 group-hover:after:opacity-100 after:transition-all after:duration-700 after:-skew-x-12 after:-translate-x-full group-hover:after:translate-x-full after:z-20",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
