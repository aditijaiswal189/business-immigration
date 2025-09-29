// components/interactive-grid.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./hero-grid.module.css";

const CELL_SIZE = 120;
const COLORS = ["var(--primary)", "var(--accent)"];
const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

function SubGrid() {
  const [cellColors, setCellColors] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const leaveTimeouts = useRef<(NodeJS.Timeout | null)[]>([
    null,
    null,
    null,
    null,
  ]);

  function handleHover(cellIdx: number) {
    const t = leaveTimeouts.current[cellIdx];
    if (t) {
      clearTimeout(t);
      leaveTimeouts.current[cellIdx] = null;
    }
    setCellColors((prev) =>
      prev.map((c, i) => (i === cellIdx ? pick(COLORS) : c))
    );
  }

  function handleLeave(cellIdx: number) {
    leaveTimeouts.current[cellIdx] = setTimeout(() => {
      setCellColors((prev) => prev.map((c, i) => (i === cellIdx ? null : c)));
      leaveTimeouts.current[cellIdx] = null;
    }, 150);
  }

  useEffect(() => {
    return () => leaveTimeouts.current.forEach((t) => t && clearTimeout(t));
  }, []);

  return (
    <div className={styles.subgrid} style={{ pointerEvents: "auto" }}>
      {[0, 1, 2, 3].map((idx) => (
        <button
          key={idx}
          type="button"
          className={styles.cell}
          style={{ background: cellColors[idx] || "transparent" }}
          onMouseEnter={() => handleHover(idx)}
          onMouseLeave={() => handleLeave(idx)}
        />
      ))}
    </div>
  );
}

export default function InteractiveGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [grid, setGrid] = useState({ columns: 0, rows: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;

    const ro = new ResizeObserver((entries) => {
      const rect = entries[0].contentRect;
      const width = rect.width || el.clientWidth;
      const height = rect.height || el.clientHeight;
      setGrid({
        columns: Math.max(1, Math.ceil(width / CELL_SIZE)),
        rows: Math.max(1, Math.ceil(height / CELL_SIZE)),
      });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const total = grid.columns * grid.rows;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0"
      style={{ width: "100%", height: "100%", pointerEvents: "auto" }}
      aria-hidden="true"
    >
      <div
        className={styles.mainGrid}
        style={
          {
            gridTemplateColumns: `repeat(${grid.columns}, 1fr)`,
            gridTemplateRows: `repeat(${grid.rows}, 1fr)`,
            "--grid-cell-size": `${CELL_SIZE}px`,
            width: "100%",
            height: "100%",
          } as React.CSSProperties
        }
      >
        {Array.from({ length: total }, (_, i) => (
          <SubGrid key={`sg-${grid.columns}-${grid.rows}-${i}`} />
        ))}
      </div>
    </div>
  );
}
