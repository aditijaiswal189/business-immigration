"use client";

import * as React from "react";
import dynamic from "next/dynamic";

// ↓ JSON imports
import canadaOutline from "@/data/canada-outline.geo.json";
import canadaProvinces from "@/data/canada-provinces.geo.json";

// Dynamic import to prevent SSR issues
const RegionMapPanel = dynamic(() => import("./region-map-panel"), {
  ssr: false,
  loading: () => (
    <section className="flex space-x-[6.69rem] pt-[4rem] section-container xsm:flex-col-reverse xsm:space-x-0 my-16">
      <div className="w-[41.5rem] xsm:mt-[2.56rem] xsm:w-full">
        <span className="mb-[0.38rem] text-[1rem] font-semibold uppercase leading-[1.5] opacity-70 xsm:text-[0.75rem] xsm:font-medium">
          WHY CHOOSE CANADA?
        </span>
        <h2 className="mb-[1.5rem] font-optima text-[3rem] font-semibold leading-[1.2] tracking-[-0.06rem] xsm:text-[1.5rem] xsm:tracking-[-0.045rem]">
          Canada is a top choice for newcomers
        </h2>
        <p className="text-[1rem] leading-[1.55] xsm:text-[0.875rem]">
          Canada is renowned for a strong economy, quality of life, and welcoming communities.
        </p>
      </div>
      <div className="relative h-[36.25rem] w-[27.86819rem] xsm:h-[22.125rem] xsm:w-full flex items-center justify-center bg-gray-50">
        <div className="text-sm text-gray-500">Loading interactive map...</div>
      </div>
    </section>
  ),
});

type Region = {
  id: string;
  name: string;
  labelPosition: [number, number];
  geojson?: any;
  style?: any;
};

// A tiny helper to safely pull a readable name from various datasets
function getFeatureName(props: any) {
  return (
    props?.name ||
    props?.NAME ||
    props?.NAME_EN ||
    props?.name_en ||
    props?.province ||
    props?.PROV_NAME ||
    props?.PRENAME ||
    props?.ENGTYPE_1 || // sometimes contains "Quebec", etc.
    props?.GN_ENG ||
    null
  );
}

export default function CanadaSection() {
  // Dynamically load Leaflet to avoid SSR issues and compute regions once available
  const [leaflet, setLeaflet] = React.useState<any>(null);
  React.useEffect(() => {
    let mounted = true;
    import("leaflet").then((mod) => {
      if (mounted) setLeaflet(mod);
    });
    return () => {
      mounted = false;
    };
  }, []);

  // Build Region[] once Leaflet is available on the client
  const regions = React.useMemo<Region[]>(() => {
    if (!leaflet) return [];
    const L = leaflet as typeof import("leaflet");
    const fc = canadaProvinces as unknown as GeoJSON.FeatureCollection;

    // group by name
    const groups = new Map<
      string,
      { features: GeoJSON.Feature[]; bounds: import("leaflet").LatLngBounds }
    >();

    for (const f of fc.features) {
      // only polygons (avoid points that create pins)
      const t = f.geometry?.type;
      if (!t || (t !== "Polygon" && t !== "MultiPolygon")) continue;

      const name = getFeatureName(f.properties);
      if (!name || name.toLowerCase() === "unknown") continue;

      const layer = L.geoJSON(f as any);
      const b = layer.getBounds();

      if (!groups.has(name)) {
        groups.set(name, { features: [f], bounds: b });
      } else {
        const g = groups.get(name)!;
        g.features.push(f);
        g.bounds.extend(b);
      }
    }

    // turn each group into one Region
    return Array.from(groups.entries()).map(([name, g]) => {
      const center = g.bounds.getCenter();
      return {
        id: name.toLowerCase().replace(/\s+/g, "-"),
        name,
        labelPosition: [center.lat, center.lng],
        // keep all parts as one FeatureCollection (renders as a single region)
        geojson: {
          type: "FeatureCollection",
          features: g.features,
        } as any,
        style: { fillOpacity: 1 },
      } satisfies Region;
    });
  }, [leaflet]);

  return (
    <RegionMapPanel
      base="geojson"
      baseGeojson={canadaOutline} // ← country outline
      regions={regions} // ← provinces/territories
      eyebrow="WHY CHOOSE CANADA?"
      title="Canada is a top choice for newcomers"
      blurb="Canada is renowned for a strong economy, quality of life, and welcoming communities."
      className="my-16"
    />
  );
}
