// components/reusable/pixelated-transition.tsx
import * as React from "react";

export function PixelatedTransitionOverlay({
  running,
  nextImage,
  rows = 30,
  cols = 40,
}: {
  running: boolean;
  nextImage: string;
  rows?: number;
  cols?: number;
}) {
  if (!running) return null;

  const total = rows * cols;
  const centerCol = cols / 2;
  const centerRow = rows / 2;
  const maxDistance = Math.hypot(centerCol, centerRow);

  return (
    <div className="absolute inset-0 pixelated-grid-container">
      <div
        className="pixelated-grid"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          width: "100%",
          height: "100%",
        }}
      >
        {Array.from({ length: total }).map((_, i) => {
          const row = Math.floor(i / cols);
          const col = i % cols;
          const normalized =
            Math.hypot(col - centerCol, row - centerRow) / maxDistance;

          return (
            <div
              key={i}
              className="pixel-square"
              style={{
                animationDelay: `${normalized * 0.6 + Math.random() * 0.3}s`,
                backgroundImage: `url(${nextImage})`,
                backgroundSize: "100vw 100vh",
                backgroundPosition: `${-(col * 2.5)}vw ${-(row * 3.33)}vh`,
              }}
            />
          );
        })}
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/65 via-[var(--primary)]/60 to-[var(--accent)]/50" />
    </div>
  );
}
