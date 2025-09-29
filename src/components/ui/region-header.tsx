"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, CircleHelp, Circle, CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// shadcn NavigationMenu
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

/* ----------------------------- helpers ----------------------------- */

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string; title: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="block rounded-md p-3 no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="text-muted-foreground mt-1 line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

/* ------------------------- submenu data model ------------------------ */

type LinkItem = { title: string; href: string; desc?: string };
type Section = { label: string; items: LinkItem[] };

const ABOUT: Section = {
  label: "ABOUT US",
  items: [
    { title: "Our Story", href: "/about", desc: "Who we are and what we do." },
    { title: "Team", href: "/team", desc: "Meet the experts behind GTR." },
    {
      title: "Why Choose Us",
      href: "/why-us",
      desc: "Transparent process, expert guidance, strong outcomes.",
    },
    // { title: "Careers", href: "/careers", desc: "Come build with us." },
  ],
};

const NORTH_AMERICA: Section = {
  label: "NORTH AMERICA",
  items: [
    {
      title: "Canada – Express Entry",
      href: "/canada/express-entry",
      desc: "FSW, CEC, FST—check eligibility and CRS paths.",
    },
    {
      title: "Canada – PNP by Province",
      href: "/canada/pnp",
      desc: "Ontario, BC, Alberta, Saskatchewan and more.",
    },
    {
      title: "USA – Work Visas",
      href: "/usa/work",
      desc: "H-1B, TN, L-1—find the right route.",
    },
    {
      title: "USA – Investor / EB-5",
      href: "/usa/eb5",
      desc: "Capital-led pathways.",
    },
  ],
};

const LATAM: Section = {
  label: "LATIN AMERICA",
  items: [
    {
      title: "Mexico",
      href: "/latam/mexico",
      desc: "Temporary & permanent resident options.",
    },
    {
      title: "Panama",
      href: "/latam/panama",
      desc: "Friendly Nations & investment routes.",
    },
    {
      title: "Brazil",
      href: "/latam/brazil",
      desc: "Residency and work permits.",
    },
    {
      title: "Paraguay",
      href: "/latam/paraguay",
      desc: "Residency via investment.",
    },
  ],
};

const EMEA: Section = {
  label: "EMEA",
  items: [
    {
      title: "Portugal",
      href: "/emea/portugal",
      desc: "D-visas, work, study and residency.",
    },
    {
      title: "UK",
      href: "/emea/uk",
      desc: "Skilled Worker, Global Talent, Innovator.",
    },
    { title: "UAE", href: "/emea/uae", desc: "Golden Visa & business setup." },
    {
      title: "Malta",
      href: "/emea/malta",
      desc: "Residency by work or investment.",
    },
  ],
};

const APAC: Section = {
  label: "APAC",
  items: [
    {
      title: "Australia",
      href: "/apac/australia",
      desc: "Skilled, study and business routes.",
    },
    {
      title: "New Zealand",
      href: "/apac/new-zealand",
      desc: "Resident & work visas.",
    },
    {
      title: "Singapore",
      href: "/apac/singapore",
      desc: "Employment Pass, EntrePass.",
    },
    {
      title: "Thailand",
      href: "/apac/thailand",
      desc: "LTR, SMART, work permits.",
    },
  ],
};

const SIMPLE_LINKS: { label: string; href: string }[] = [
  { label: "Blog", href: "/blog" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

/* ---------------------------- component ----------------------------- */

type CTA = { label: string; href: string };

type RegionHeaderProps = {
  ctaLogin?: CTA;
  ctaSignup?: CTA;
  ctaPrimary?: CTA; // shows when scrolled (desktop)
};

export function RegionHeader({
  ctaLogin = { label: "Book an Appointment", href: "#" },
  ctaSignup = { label: "Contact Us", href: "#" },
  ctaPrimary = { label: "Book an Appointment", href: "#" },
}: RegionHeaderProps) {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header>
      <nav
        data-state={menuState && "active"}
        className="fixed z-20 w-full px-2"
      >
        <div
          className={cn(
            "mx-auto mt-2 max-w-7xl px-6 transition-all duration-300 lg:px-12",
            isScrolled &&
              "bg-background/50 max-w-5xl rounded-2xl border backdrop-blur-lg lg:px-5"
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            {/* Brand + mobile trigger */}
            <div className="flex w-full justify-between lg:w-auto">
              <Link
                href="/"
                aria-label="home"
                className="flex items-center space-x-2"
              >
                <span className="font-bold">GTR Business Immigration</span>
              </Link>

              <button
                onClick={() => setMenuState((s) => !s)}
                aria-label={menuState ? "Close Menu" : "Open Menu"}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>
            </div>

            {/* Desktop menu (center) – replaced with NavigationMenu */}
            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <NavigationMenu viewport={false}>
                <NavigationMenuList>
                  {/* About */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>{ABOUT.label}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-2 md:w-[380px] lg:w-[520px] lg:grid-cols-[.75fr_1fr]">
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <Link
                              href="/about"
                              className="from-muted/50 to-muted flex h-full w-full select-none flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-none focus:shadow-md"
                            >
                              <div className="mt-4 mb-2 text-lg font-medium">
                                About GTR
                              </div>
                              <p className="text-muted-foreground text-sm leading-tight">
                                Transparent process, expert guidance, strong
                                outcomes.
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        {ABOUT.items.map((it) => (
                          <ListItem
                            key={it.title}
                            href={it.href}
                            title={it.title}
                          >
                            {it.desc ?? ""}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* North America */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>
                      {NORTH_AMERICA.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[600px] gap-2 md:grid-cols-2">
                        {NORTH_AMERICA.items.map((it) => (
                          <ListItem
                            key={it.title}
                            href={it.href}
                            title={it.title}
                          >
                            {it.desc ?? ""}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* LATAM */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>{LATAM.label}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[520px] gap-2 md:grid-cols-2">
                        {LATAM.items.map((it) => (
                          <ListItem
                            key={it.title}
                            href={it.href}
                            title={it.title}
                          >
                            {it.desc ?? ""}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* EMEA */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>{EMEA.label}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[520px] gap-2 md:grid-cols-2">
                        {EMEA.items.map((it) => (
                          <ListItem
                            key={it.title}
                            href={it.href}
                            title={it.title}
                          >
                            {it.desc ?? ""}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* APAC */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>{APAC.label}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[520px] gap-2 md:grid-cols-2">
                        {APAC.items.map((it) => (
                          <ListItem
                            key={it.title}
                            href={it.href}
                            title={it.title}
                          >
                            {it.desc ?? ""}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Right cluster (mobile sheet + desktop CTAs) */}
            <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none">
              {/* Mobile menu list (simple) */}
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {[ABOUT, NORTH_AMERICA, LATAM, EMEA, APAC].map((section) => (
                    <li key={section.label}>
                      <div className="mb-1 font-semibold">{section.label}</div>
                      <ul className="ml-3 space-y-2">
                        {section.items.slice(0, 3).map((it) => (
                          <li key={it.title}>
                            <Link
                              href={it.href}
                              className="text-muted-foreground hover:text-accent-foreground block"
                            >
                              {it.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                  {SIMPLE_LINKS.map((it) => (
                    <li key={it.label}>
                      <Link
                        href={it.href}
                        className="text-muted-foreground hover:text-accent-foreground block"
                      >
                        {it.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTAs */}
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className={cn(isScrolled && "lg:hidden")}
                >
                  <Link href={ctaLogin.href}>{ctaLogin.label}</Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  variant="gradient"
                  className={cn(isScrolled && "lg:hidden")}
                >
                  <Link href={ctaSignup.href}>{ctaSignup.label}</Link>
                </Button>

                {/* Shows only when scrolled (desktop) */}
                <Button
                  asChild
                  variant="gradient"
                  size="sm"
                  className={cn(isScrolled ? "lg:inline-flex" : "hidden")}
                >
                  <Link href={ctaPrimary.href}>{ctaPrimary.label}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default RegionHeader;
