"use client";

import * as React from "react";
import * as L from "leaflet";
// import RegionMapPanel, { Region } from "@/components/RegionMapPanel";

// ↓ JSON imports
import canadaOutline from "@/data/canada-outline.geo.json";
import canadaProvinces from "@/data/canada-provinces.geo.json";
import RegionMapPanel, { Region } from "./region-map-panel";

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
  // Build Region[] once on the client
  // Build exactly 13 regions (group all parts by name)
  const regions = React.useMemo<Region[]>(() => {
    const fc = canadaProvinces as unknown as GeoJSON.FeatureCollection;

    // group by name
    const groups = new Map<
      string,
      { features: GeoJSON.Feature[]; bounds: L.LatLngBounds }
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
  }, []);

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
