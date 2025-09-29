"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type As =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "p"
  | "span"
  | "div"
  | "label"
  | "blockquote";

export function AnimatedText({
  as = "p",
  className,
  delay = 0,
  children,
}: {
  as?: As;
  className?: string;
  delay?: number;
  children: React.ReactNode;
}) {
  const Comp = motion[as as keyof typeof motion] as any;

  return (
    <Comp
      className={cn(className)}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
      viewport={{ once: true, amount: 0.25 }}
    >
      {children}
    </Comp>
  );
}

export default AnimatedText;
