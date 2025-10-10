"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { UIcon } from "@/components/ui/uicon"; // ← new
import { GoldButton } from "./gold-button";

const statsData = [
  {
    icon: "lucide:building-2",
    count: 1962,
    label: "Companies analyzed",
    suffix: "+",
  },
  {
    icon: "mdi:briefcase",
    count: 2566,
    label: "Projects released",
    suffix: "",
  },
  {
    icon: "mdi:lightbulb-on",
    count: 1856,
    label: "Strategies planned",
    suffix: "+",
  },
  {
    icon: "mdi:account-group",
    count: 1862,
    label: "Satisfied clients",
    suffix: "",
  },
];

const skillsData = [
  { name: "Business Analysis", percentage: 68 },
  { name: "Financial Reporting", percentage: 85 },
  { name: "Investment Analysis", percentage: 56 },
];

export default function StatsSection() {
  const [counters, setCounters] = useState(statsData.map(() => 0));
  const [skillsVisible, setSkillsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;

        // counters
        statsData.forEach((stat, idx) => {
          let current = 0;
          const inc = stat.count / 100;
          const t = setInterval(() => {
            current += inc;
            if (current >= stat.count) {
              current = stat.count;
              clearInterval(t);
            }
            setCounters((prev) => {
              const next = [...prev];
              next[idx] = Math.floor(current);
              return next;
            });
          }, 20);
        });

        // skills
        setTimeout(() => setSkillsVisible(true), 500);
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20">
      <div
        className="bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1542626991-cbc4e32524cc?auto=format&fit=crop&w=1920&h=1080')",
        }}
      >
        <div className="bg-gradient-to-br from-[var(--primary)]/95 via-[var(--primary)]/90 to-[var(--accent)]/80">
          <div className="container mx-auto px-6 py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* left copy — unchanged */}
              <div className="text-white">
                <p className="text-[var(--accent)] text-sm uppercase tracking-wider mb-4">
                  WORK
                </p>
                <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                  Have a view of our amazing Workflow
                </h2>
                <p className="text-white/80 mb-8 italic">
                  Our team of seasoned experts delivers innovative solutions
                  that drive business transformation.
                </p>
                <p className="text-white/70 mb-8">
                  At GTR Worldwide Business Immigration, we are a renowned
                  global consulting firm committed to collaborating with
                  business and societal leaders in overcoming their most
                  critical challenges and seizing their greatest opportunities.
                </p>

                <Button variant="goldWhite" className="rounded-xl px-10 py-4">
                  <div className="absolute inset-[2px] rounded-[inherit] z-10 gold-inner--white pointer-events-none" />
                  <span className="relative z-30 font-bold text-black">
                    Get Started
                  </span>
                </Button>
              </div>

              {/* skills — unchanged */}
              <div className="space-y-6">
                {skillsData.map((skill) => (
                  <div key={skill.name} className="text-white">
                    <div className="flex items-center justify-between mb-2">
                      <span>{skill.name}</span>
                      <span className="text-[var(--accent)] font-bold">
                        {skill.percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div
                        className="bg-[linear-gradient(90deg,var(--primary),var(--accent))] h-2 rounded-full progress-bar"
                        style={{
                          width: skillsVisible ? `${skill.percentage}%` : "0%",
                          transition: "width 1.5s ease-out",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* stats — identical structure, just Iconify instead of <stat.icon/> */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
              {statsData.map((stat, index) => (
                <div
                  key={stat.label}
                  className="glass-card rounded-lg p-6 text-center border"
                >
                  <GoldButton
                    tone="white" // or "white"
                    className="rounded-lg size-12 p-0 no-sheen grid place-items-center mx-auto mb-4"
                    aria-label={stat.label}
                  >
                    <UIcon name={stat.icon} size={22} className="text-black" />
                  </GoldButton>

                  <div className="stat-counter text-accent font-bold text-3xl mb-2">
                    {counters[index]}
                    {stat.suffix}
                  </div>
                  <p className="text-white/70">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
