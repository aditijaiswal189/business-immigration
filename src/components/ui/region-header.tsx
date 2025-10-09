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
          className="block rounded-md p-3 no-underline outline-none transition-colors hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]"
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="text-[var(--muted-foreground)] mt-1 line-clamp-2 text-sm leading-snug">
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

const AMERICAS: Section = {
  label: "AMERICA'S",
  items: [
    {
      title: "Brazil",
      href: "/americas/brazil",
      desc: "Residency and work permits.",
    },
    {
      title: "Mexico",
      href: "/americas/mexico",
      desc: "Temporary & permanent resident options.",
    },
    {
      title: "Panama",
      href: "/americas/panama",
      desc: "Friendly Nations & investment routes.",
    },
    {
      title: "Paraguay",
      href: "/americas/paraguay",
      desc: "Residency via investment.",
    },
    {
      title: "USA - EB5",
      href: "/americas/usa",
      desc: "Capital-led pathways.",
    },
  ],
};
const CANADA: Section = {
  label: "CANADA",
  items: [
    {
      title: "Alberta",
      href: "/canada/alberta",
      desc: "Residency and work permits.",
    },
    {
      title: "British Columbia",
      href: "/canada/br-columbia",
      desc: "Residency and work permits.",
    },
    {
      title: "Manitoba",
      href: "/canada/manitoba",
      desc: "Residency and work permits.",
    },
    {
      title: "New Brunswick",
      href: "/canada/new-brunswick",
      desc: "Residency and work permits.",
    },
    {
      title: "Newfoundland and Labrador",
      href: "/canada/newfoundland-and-labrador",
      desc: "Residency and work permits.",
    },
    {
      title: "Nova Scotia",
      href: "/canada/nova-scotia",
      desc: "Residency and work permits.",
    },
    {
      title: "Ontario",
      href: "/canada/ontario",
      desc: "Residency and work permits.",
    },
    {
      title: "Quebec",
      href: "/canada/quebec",
      desc: "Residency and work permits.",
    },
    {
      title: "Saskatchewan",
      href: "/canada/saskatchewan",
      desc: "Residency and work permits.",
    },
    {
      title: "Prince Edward Island",
      href: "/canada/prince-edward-island",
      desc: "Residency and work permits.",
    },
    {
      title: "Yukon",
      href: "/canada/yukon",
      desc: "Residency and work permits.",
    },

    {
      title: "Northwest Territories",
      href: "/canada/northwest-territories",
      desc: "Residency and work permits.",
    },
  ],
};

const CARIBBEAN: Section = {
  label: "CARIBBEAN ISLANDS",
  items: [
    {
      title: "Antigua & Barbuda",
      href: "/caribbean/antigua-barbuda",
      desc: "Temporary & permanent resident options.",
    },
    {
      title: "Anguilla",
      href: "/caribbean/anguilla",
      desc: "Temporary & permanent resident options.",
    },
    {
      title: "Curacao",
      href: "/caribbean/curacao",
      desc: "Temporary & permanent resident options.",
    },
    {
      title: "Dominica",
      href: "/caribbean/dominica",
      desc: "Temporary & permanent resident options.",
    },
    {
      title: "Grenada",
      href: "/caribbean/grenada",
      desc: "Temporary & permanent resident options.",
    },
    {
      title: "Saint Lucia",
      href: "/caribbean/saint-lucia",
      desc: "Temporary & permanent resident options.",
    },
    {
      title: "St.Kitts & Nevis",
      href: "/caribbean/st-kitts-nevis",
      desc: "Temporary & permanent resident options.",
    },
  ],
};

const EMEA: Section = {
  label: "EMEA",
  items: [
    {
      title: "Andorra",
      href: "/emea/andorra",
      desc: "D-visas, work, study and residency.",
    },
    {
      title: "Austria",
      href: "/emea/austria",
      desc: "D-visas, work, study and residency.",
    },
    {
      title: "Cyprus",
      href: "/emea/cyprus",
      desc: "D-visas, work, study and residency.",
    },
    {
      title: "Cayman Islands",
      href: "/emea/cayman-islands",
      desc: "D-visas, work, study and residency.",
    },
    {
      title: "Greece",
      href: "/emea/greece",
      desc: "D-visas, work, study and residency.",
    },
    {
      title: "Hungary",
      href: "/emea/hungary",
      desc: "D-visas, work, study and residency.",
    },
    {
      title: "Italy",
      href: "/emea/italy",
      desc: "D-visas, work, study and residency.",
    },
    {
      title: "Latvia",
      href: "/emea/latvia",
      desc: "D-visas, work, study and residency.",
    },
    {
      title: "Moldova",
      href: "/emea/moldova",
      desc: "D-visas, work, study and residency.",
    },
    {
      title: "North Macedonia",
      href: "/emea/north-macedonia",
      desc: "D-visas, work, study and residency.",
    },
    {
      title: "Portugal",
      href: "/emea/portugal",
      desc: "D-visas, work, study and residency.",
    },
    {
      title: "Spain",
      href: "/emea/spain",
      desc: "D-visas, work, study and residency.",
    },
    {
      title: "Serbia",
      href: "/emea/serbia",
      desc: "D-visas, work, study and residency.",
    },
    {
      title: "Switzerland",
      href: "/emea/switzerland",
      desc: "D-visas, work, study and residency.",
    },
    {
      title: "UK",
      href: "/emea/uk",
      desc: "D-visas, work, study and residency.",
    },
    {
      title: "Jordan",
      href: "/emea/jordan",
      desc: "D-visas, work, study and residency.",
    },
    {
      title: "Oman",
      href: "/emea/oman",
      desc: "D-visas, work, study and residency.",
    },
    {
      title: "Turkey",
      href: "/emea/turkey",
      desc: "D-visas, work, study and residency.",
    },
    {
      title: "Egypt",
      href: "/emea/egypt",
      desc: "D-visas, work, study and residency.",
    },
    {
      title: "Namibia",
      href: "/emea/namibia",
      desc: "D-visas, work, study and residency.",
    },
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
    {
      title: "Cambodia",
      href: "/apac/cambodia",
      desc: "LTR, SMART, work permits.",
    },
    {
      title: "Fiji",
      href: "/apac/fiji",
      desc: "LTR, SMART, work permits.",
    },
    {
      title: "Nauru",
      href: "/apac/nauru",
      desc: "LTR, SMART, work permits.",
    },
    {
      title: "Vanuatu",
      href: "/apac/vanuatu",
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
            "mx-auto mt-2 max-w-8xl px-6 transition-all duration-300 lg:px-12",
            isScrolled &&
              "bg-[var(--background)]/50 max-w-7xl rounded-2xl border backdrop-blur-lg lg:px-5"
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
                <span className="font-bold text-sm">
                  GTR Worldwide Business Immigration
                </span>
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
                              <p className="text-[var(--muted-foreground)] text-sm leading-tight">
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

                  {/* Americas */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>
                      {AMERICAS.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[600px] gap-2 md:grid-cols-2">
                        {AMERICAS.items.map((it) => (
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

                  {/* Caribbean */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>
                      {CARIBBEAN.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[600px] gap-2 md:grid-cols-2">
                        {CARIBBEAN.items.map((it) => (
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

                  {/* canada */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>
                      {CANADA.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[520px] gap-2 md:grid-cols-2">
                        {CANADA.items.map((it) => (
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
                      <ul className="grid w-[520px] gap-2 md:grid-cols-3">
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
            <div className=" in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none">
              {/* Mobile menu list (simple) */}
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {[ABOUT, AMERICAS, CANADA, CARIBBEAN, EMEA, APAC].map(
                    (section) => (
                      <li key={section.label}>
                        <div className="mb-1 font-semibold">
                          {section.label}
                        </div>
                        <ul className="ml-3 space-y-2">
                          {section.items.slice(0, 3).map((it) => (
                            <li key={it.title}>
                              <Link
                                href={it.href}
                                className="text-[var(--muted-foreground)] hover:text-accent-foreground block"
                              >
                                {it.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    )
                  )}
                  {SIMPLE_LINKS.map((it) => (
                    <li key={it.label}>
                      <Link
                        href={it.href}
                        className="text-[var(--muted-foreground)] hover:text-accent-foreground block"
                      >
                        {it.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTAs */}
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                {/* Big White (hide on desktop when scrolled) */}
                <Button
                  asChild
                  variant="goldWhite"
                  className={cn(
                    "rounded-xl px-10 py-4",
                    isScrolled ? "lg:hidden" : "lg:inline-flex"
                  )}
                >
                  <Link href={ctaLogin.href}>
                    <div className="absolute inset-[2px] rounded-[inherit] bg-[linear-gradient(135deg,#fff,#f9f9f9,#f0f0f0)] shadow-[inset_0_2px_5px_rgba(255,255,255,0.8),inset_0_-1px_2px_rgba(0,0,0,0.15),0_1px_0_rgba(255,255,255,0.7)]" />
                    <span className="relative z-10 font-bold">
                      {ctaLogin.label}
                    </span>
                  </Link>
                </Button>

                {/* Big Black (hide on desktop when scrolled) */}
                <Button
                  asChild
                  variant="goldBlack"
                  className={cn(
                    "rounded-xl px-10 py-4",
                    isScrolled ? "lg:hidden" : "lg:inline-flex"
                  )}
                >
                  <Link href={ctaSignup.href}>
                    <div className="absolute inset-[2px] rounded-[inherit] bg-[linear-gradient(135deg,#000,#111,#000)] shadow-[inset_0_3px_6px_rgba(0,0,0,0.9),inset_0_-1px_3px_rgba(255,255,255,0.08),0_1px_0_rgba(255,255,255,0.08)]" />
                    <span className="relative z-10 text-white font-bold">
                      {ctaSignup.label}
                    </span>
                  </Link>
                </Button>

                {/* Compact CTA (show on desktop only when scrolled) */}
                <Button
                  asChild
                  variant="goldBlack"
                  className={cn(
                    isScrolled ? "lg:inline-flex" : "hidden",
                    "rounded-xl px-4 py-2"
                  )}
                >
                  <Link href={ctaPrimary.href}>
                    <div className="absolute inset-[2px] rounded-[inherit] bg-[linear-gradient(135deg,#000,#111,#000)] shadow-[inset_0_3px_6px_rgba(0,0,0,0.9),inset_0_-1px_3px_rgba(255,255,255,0.08),0_1px_0_rgba(255,255,255,0.08)]" />
                    <span className="relative z-10 text-white font-bold">
                      {ctaPrimary.label}
                    </span>
                  </Link>
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
