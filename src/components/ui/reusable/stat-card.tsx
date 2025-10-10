"use client";
import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type StatCardProps = {
  icon: LucideIcon;
  value: number | string;
  suffix?: string;
  label: string;
  className?: string;
};

export function StatCard({
  icon: Icon,
  value,
  suffix = "",
  label,
  className,
}: StatCardProps) {
  return (
    <div className={cn("glass-card rounded-lg p-6 text-center", className)}>
      <div className="flex items-center justify-center mb-4">
        <Icon className="text-[var(--accent)] w-7 h-7" />
      </div>
      <div className="stat-counter text-white text-4xl font-bold">
        {value}
        {suffix}
      </div>
      <p className="text-white/70">{label}</p>
    </div>
  );
}
