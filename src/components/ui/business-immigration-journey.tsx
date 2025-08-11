"use client";

import React from "react";
import { Building2, BadgeCheck, UserCheck, Briefcase } from "lucide-react";

const features = [
  {
    icon: <UserCheck className="w-8 h-8 text-primary" />,
    title: "Eligibility Assessment",
    description:
      "We evaluate your profile to determine the best business immigration program suited for you.",
  },
  {
    icon: <BadgeCheck className="w-8 h-8 text-primary" />,
    title: "Business Plan Guidance",
    description:
      "Our experts help craft a compelling business plan aligned with visa requirements.",
  },
  {
    icon: <Building2 className="w-8 h-8 text-primary" />,
    title: "Government Liaison",
    description:
      "We handle interactions with government bodies to ensure smooth application processing.",
  },
  {
    icon: <Briefcase className="w-8 h-8 text-primary" />,
    title: "Post-Arrival Support",
    description:
      "From business setup to local compliance, we support your journey after immigration.",
  },
];

export function BusinessImmigrationJourney() {
  return (
    <section className="w-full py-16 md:py-20 lg:py-24 bg-muted/50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="mx-auto mb-12 text-center max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-primary">
            Your Business Immigration Journey
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Navigate your path to success with our end-to-end assistance
            tailored for entrepreneurs and investors.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-md hover:shadow-xl transition duration-300 group relative z-0 hover:z-10"
            >
              <div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 p-3">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
