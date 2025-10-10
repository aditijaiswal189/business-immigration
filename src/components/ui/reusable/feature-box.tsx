// components/reusable/feature-box.tsx
"use client";

import * as React from "react";
import { GoldButton } from "./gold-button";

type FeatureBoxProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
};

export function FeatureBox({
  icon,
  title,
  description,
  className,
}: FeatureBoxProps) {
  return (
    <div
      className={
        "glass-card rounded-lg p-6 shadow-md border " + (className ?? "")
      }
    >
      <div className="flex items-start gap-4">
        <GoldButton tone="black">{icon}</GoldButton>

        <div>
          <h3 className="text-xl font-bold text-[var(--card-foreground)] mb-2">
            {title}
          </h3>
          <p className="text-[var(--muted-foreground)]">{description}</p>
        </div>
      </div>
    </div>
  );
}
