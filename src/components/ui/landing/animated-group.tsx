"use client";

import * as React from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type Preset = "slide" | "blur-slide" | "fade";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { when: "beforeChildren", staggerChildren: 0.12 },
  },
};

const childVariants: Record<Preset, Variants> = {
  fade: {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  },
  slide: {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
  },
  "blur-slide": {
    hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: "easeOut" },
    },
  },
};

export function AnimatedGroup({
  children,
  className,
  preset = "slide",
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  preset?: Preset;
  once?: boolean;
}) {
  return (
    <motion.div
      className={cn(className)}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.2 }}
    >
      {React.Children.map(children, (child, i) => (
        <motion.div variants={childVariants[preset]} key={i}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

export default AnimatedGroup;
