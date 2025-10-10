// components/ui/uicon.tsx
"use client";
import { Icon } from "@iconify/react";

type UIconProps = {
  name: string; // e.g. "mdi:home"
  size?: number | string; // e.g. 24 or "1.5rem"
  className?: string;
};

export function UIcon({ name, size = 24, className }: UIconProps) {
  return <Icon icon={name} width={size} height={size} className={className} />;
}
