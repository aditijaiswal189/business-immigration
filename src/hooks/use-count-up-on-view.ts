"use client";
import { useEffect, useRef, useState } from "react";

export function useCountUpOnView(values: number[], steps = 100, interval = 20) {
  const [counters, setCounters] = useState(values.map(() => 0));
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !visible) setVisible(true);
      },
      { threshold: 0.5 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    const timers: NodeJS.Timeout[] = [];

    values.forEach((target, i) => {
      let current = 0;
      const inc = target / steps;
      const t = setInterval(() => {
        current += inc;
        setCounters((prev) => {
          const next = [...prev];
          next[i] = Math.min(target, Math.floor(current));
          return next;
        });
        if (current >= target) clearInterval(t);
      }, interval);
      timers.push(t);
    });

    return () => timers.forEach(clearInterval);
  }, [visible, values, steps, interval]);

  return { ref, counters, visible };
}
