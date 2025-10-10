// components/sections/about-section.tsx
"use client";

import { Briefcase } from "lucide-react";
import { ImageBadge } from "./reusable/image-badge";
import { GoldButton } from "./reusable/gold-button";
import { FeatureBox } from "./reusable/feature-box";

export default function AboutSection() {
  return (
    <section className="py-20 bg-background" id="next-section">
      <div className="container mx-auto px-6" data-aos="fade-up">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800"
              alt="Professional team meeting"
              className="rounded-2xl w-full h-160 object-cover shadow-lg"
            />

            {/* Gold badge over image */}
            <ImageBadge tone="white">
              <Briefcase className="w-8 h-8" />
            </ImageBadge>
          </div>

          {/* Text + feature + stat + CTAs */}
          <div>
            <p className="text-[var(--muted-foreground)] text-sm uppercase tracking-wider mb-4">
              ABOUT US
            </p>

            <h2 className="text-4xl lg:text-5xl font-bold text-[var(--foreground)] mb-6 leading-tight">
              We Work with you to Make your{" "}
              <span className="stat-gradient bg-clip-text text-transparent">
                Vision a Reality
              </span>
            </h2>

            <p className="text-[var(--foreground)]/80 mb-8 leading-relaxed">
              At GTR Worldwide Business Immigration, we are a renowned global
              consulting firm committed to collaborating with business and
              societal leaders in overcoming their most critical challenges and
              seizing their greatest opportunities.
            </p>

            {/* Feature */}
            <FeatureBox
              icon={<Briefcase className="w-8 h-8" />}
              title="Business Immigration Services"
              description="Collaborating with business and societal leaders in overcoming."
              className="mb-8"
            />

            {/* Stat */}
            <div className="flex items-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-4xl font-bold stat-gradient bg-clip-text text-transparent mb-2">
                  630K
                </div>
                <p className="text-[var(--muted-foreground)] text-sm">
                  Projects completed in last 5 years
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex gap-4 flex-wrap">
              <GoldButton tone="black" className="rounded-xl px-6 py-3">
                About Us +
              </GoldButton>

              {/* Example alternate:
              <GoldButton tone="white" className="rounded-xl px-6 py-3">
                Contact +
              </GoldButton> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
