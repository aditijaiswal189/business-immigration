"use client";

import { ProvinceStackBento, groupProgramsByProvince } from "./province-stack-bento";
import { canadaPrograms } from "@/data/canada";

export function CanadaProvinceStack() {
  // Group the Canada programs by province
  const provinces = groupProgramsByProvince(canadaPrograms);

  return (
    <ProvinceStackBento
      title="Canada Immigration Programs by Province"
      provinces={provinces}
      phoneHref="tel:+1-888-452-1505"
    />
  );
}
