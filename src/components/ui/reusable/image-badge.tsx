// components/reusable/image-badge.tsx
"use client";

import * as React from "react";
import { GoldButton } from "./gold-button";

type ImageBadgeProps = {
  children: React.ReactNode; // usually an icon
  tone?: "black" | "white";
  className?: string;
};

export function ImageBadge({
  children,
  tone = "white",
  className,
}: ImageBadgeProps) {
  return (
    <div className={"absolute top-4 right-4 shadow-lg " + (className ?? "")}>
      <GoldButton tone={tone}>{children}</GoldButton>
    </div>
  );
}
