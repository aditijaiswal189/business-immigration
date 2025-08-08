"use client";
import { useEffect, useRef, useState } from "react";
import { Building, Briefcase, Lightbulb, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const statsData = [
  { icon: Building, count: 1962, label: "Companies analyzed", suffix: "+" },
  { icon: Briefcase, count: 2566, label: "Projects released", suffix: "" },
  { icon: Lightbulb, count: 1856, label: "Strategies planned", suffix: "+" },
  { icon: Users, count: 1862, label: "Satisfied clients", suffix: "" },
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
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Animate counters
          statsData.forEach((stat, index) => {
            let current = 0;
            const increment = stat.count / 100;
            const timer = setInterval(() => {
              current += increment;
              if (current >= stat.count) {
                current = stat.count;
                clearInterval(timer);
              }
              setCounters((prev) => {
                const newCounters = [...prev];
                newCounters[index] = Math.floor(current);
                return newCounters;
              });
            }, 20);
          });

          // Show skills bars
          setTimeout(() => setSkillsVisible(true), 500);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20">
      <div
        className="bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1542626991-cbc4e32524cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')",
        }}
      >
        <div className="bg-gray-800 bg-opacity-90">
          <div className="container mx-auto px-6 py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <p className="text-primary-yellow text-sm uppercase tracking-wider mb-4">
                  WORK
                </p>
                <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                  Have a view of our amazing Workflow
                </h2>
                <p className="text-gray-300 mb-8 italic">
                  Our team of seasoned experts delivers innovative solutions
                  that drive business transformation.
                </p>
                <p className="text-gray-300 mb-8">
                  At GTR Business Immigration, we are a renowned global
                  consulting firm committed to collaborating with business and
                  societal leaders in overcoming their most critical challenges
                  and seizing their greatest opportunities.
                </p>
                <Button className="bg-primary-yellow text-white px-8 py-4 rounded-md hover:bg-yellow-600 transition-colors font-semibold">
                  Get Started +
                </Button>
              </div>

              <div className="space-y-6">
                {skillsData.map((skill, index) => (
                  <div key={skill.name} className="text-white">
                    <div className="flex items-center justify-between mb-2">
                      <span>{skill.name}</span>
                      <span className="text-primary-yellow font-bold">
                        {skill.percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className={`bg-primary-yellow h-2 rounded-full progress-bar ${
                          skillsVisible ? `w-[${skill.percentage}%]` : "w-0"
                        }`}
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

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
              {statsData.map((stat, index) => (
                <div
                  key={stat.label}
                  className="glass-effect rounded-lg p-6 text-center"
                >
                  <div className="flex items-center justify-center mb-4">
                    <stat.icon className="text-primary-yellow text-3xl" />
                  </div>
                  <div className="stat-counter text-white">
                    {counters[index]}
                    {stat.suffix}
                  </div>
                  <p className="text-gray-300">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
