"use client";
// ImageWithFallback.tsx
import * as React from "react";

export function ImageWithFallback(
  props: React.ImgHTMLAttributes<HTMLImageElement> & { fallback?: string }
) {
  const { fallback = "/placeholder.svg", ...rest } = props;
  const [src, setSrc] = React.useState(rest.src);
  return (
    <img
      {...rest}
      src={src}
      onError={() => setSrc(fallback)}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      alt={rest.alt || "image"}
    />
  );
}
