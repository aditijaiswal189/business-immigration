// components/header/nav-menu-section.tsx
import Link from "next/link";
import {
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

type LinkItem = { title: string; href: string; desc?: string };
type Section = { label: string; items: LinkItem[] };

type TriggerLike = React.FunctionComponent<
  Partial<{
    className?: string;
    children?: React.ReactNode;
    tone?: "black" | "white";
    size?: "small" | "medium" | "large";
  }> &
    Omit<NavMenuSectionProps & React.RefAttributes<HTMLButtonElement>, "ref">
>;
type NavMenuSectionProps = {
  section: Section;
  cols?: number;
  width?: number;
  TriggerComp?: React.FunctionComponent<
    {
      className?: string;
      children: React.ReactNode;
      tone?: "black" | "white";
      size?: string;
    } & Omit<any, "ref">
  >;
  triggerSize?: "xs" | "sm" | "md" | "lg";
  triggerTone?: "black" | "white";
};

export function NavMenuSection({
  section,
  cols = 2,
  width = 600,
  TriggerComp = NavigationMenuTrigger,
  triggerTone = undefined as unknown as "black" | "white" | undefined, // optional for NavTriggerGold
}: {
  section: Section;
  cols?: 2 | 3;
  width?: number;
  TriggerComp?: TriggerLike;
  triggerTone?: "black" | "white";
}) {
  const colsClass = cols === 3 ? "md:grid-cols-3" : "md:grid-cols-2";
  return (
    <NavigationMenuItem>
      <TriggerComp
        section={section}
        {...(triggerTone ? { tone: triggerTone } : {})}
      >
        {section.label}
      </TriggerComp>

      <NavigationMenuContent>
        <ul className={`grid gap-2 ${colsClass}`} style={{ width }}>
          {section.items.map((it) => (
            <li key={it.title}>
              <NavigationMenuLink asChild>
                <Link
                  href={it.href}
                  className="block rounded-md p-3 no-underline outline-none transition-colors hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]"
                >
                  <div className="text-sm font-medium leading-none">
                    {it.title}
                  </div>
                  {it.desc && (
                    <p className="text-[var(--muted-foreground)] mt-1 line-clamp-2 text-sm leading-snug">
                      {it.desc}
                    </p>
                  )}
                </Link>
              </NavigationMenuLink>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
