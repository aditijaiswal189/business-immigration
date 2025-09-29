"use client";

import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("@/components/ui/map-component"), {
  ssr: false,
});

export default function MapClient() {
  return <MapComponent />;
}
