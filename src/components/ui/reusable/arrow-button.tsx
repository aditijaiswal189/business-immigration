// components/reusable/arrow-button.tsx
import * as React from "react";
import { GoldButton } from "./gold-button";
import { cn } from "@/lib/utils";

type Props = React.ComponentProps<typeof GoldButton>;

export function ArrowButton({ className, ...props }: Props) {
  return (
    <GoldButton
      tone="black"
      className={cn("rounded-xl p-2", className)}
      {...props}
    />
  );
}
