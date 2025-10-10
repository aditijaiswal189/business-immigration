"use client";
import React from "react";
import { cn } from "@/lib/utils";

type SkillBarProps = {
  label: string;
  value: number; // 0..100
  show?: boolean;
  className?: string;
};

export function SkillBar({ label, value, show, className }: SkillBarProps) {
  return (
    <div className={cn("text-white", className)}>
      <div className="flex items-center justify-between mb-2">
        <span>{label}</span>
        <span className="text-[var(--accent)] font-bold">{value}%</span>
      </div>
      <div className="w-full h-2 rounded-full bg-white/20">
        <div
          className="h-2 rounded-full bg-[linear-gradient(90deg,var(--primary),var(--accent))]"
          style={{
            width: show ? `${value}%` : "0%",
            transition: "width 1.5s ease-out",
          }}
        />
      </div>
    </div>
  );
}
