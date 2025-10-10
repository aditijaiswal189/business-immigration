// components/header/NavTriggerGold.tsx
import { NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

type Size = "xs" | "sm" | "md";

export function NavTriggerGold({
  className,
  children,
  tone = "black",
  size = "sm",
  ...props
}: {
  className?: string;
  children: React.ReactNode;
  tone?: "black" | "white";
  size?: Size;
} & React.ComponentPropsWithoutRef<typeof NavigationMenuTrigger>) {
  const sizeCls: Record<Size, string> = {
    xs: "px-3 py-1.5 text-xs [&>svg]:size-3 rounded-lg",
    sm: "px-4 py-2 text-sm [&>svg]:size-3.5 rounded-xl",
    md: "px-5 py-2.5 text-base [&>svg]:size-4 rounded-xl",
  };

  return (
    <NavigationMenuTrigger
      {...props}
      className={cn(
        "nav-trigger-gold relative isolate group font-medium transition-all duration-300 flex items-center gap-2",
        sizeCls[size],

        // chevron styling + rotate on open
        tone === "black"
          ? "[&>svg]:relative [&>svg]:z-20 [&>svg]:text-white/90"
          : "[&>svg]:relative [&>svg]:z-20 [&>svg]:text-black/80",
        "[&[data-state=open]>svg]:rotate-180",
        className
      )}
    >
      {/* inner surface (no rgba; from global.css) */}
      <div
        className={cn(
          "absolute rounded-[inherit] pointer-events-none z-[5] inset-2px",
          tone === "black" ? "gold-inner--black" : "gold-inner--white"
        )}
      />

      {/* label */}
      <span
        className={cn(
          "relative z-20 leading-tight",
          tone === "black" ? "text-white" : "text-black"
        )}
      >
        {children}
      </span>

      {/* sheen (below text/icon) */}
      <span aria-hidden className="nav-sheen-gold" />
    </NavigationMenuTrigger>
  );
}
