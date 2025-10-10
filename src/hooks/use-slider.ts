// components/reusable/use-slider.ts
import * as React from "react";

export function useSlider(total: number, slideMs = 5000, transitionMs = 1500) {
  const [current, setCurrent] = React.useState(0);
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const [nextIndex, setNextIndex] = React.useState(0);

  const goTo = React.useCallback(
    (index: number) => {
      if (isTransitioning || index === current) return;
      setNextIndex(index);
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent(index);
        setIsTransitioning(false);
      }, transitionMs);
    },
    [isTransitioning, current, transitionMs]
  );

  const next = React.useCallback(
    () => goTo((current + 1) % total),
    [current, total, goTo]
  );
  const prev = React.useCallback(
    () => goTo((current - 1 + total) % total),
    [current, total, goTo]
  );

  React.useEffect(() => {
    const id = setInterval(() => {
      if (!isTransitioning) {
        goTo((current + 1) % total);
      }
    }, slideMs);
    return () => clearInterval(id);
  }, [current, total, slideMs, isTransitioning, goTo]);

  return { current, isTransitioning, nextIndex, next, prev, goTo };
}
