"use client";

import * as React from "react";
import type { CSSProperties } from "react";
import dynamic from "next/dynamic";

// ——— dynamic react-leaflet imports (no SSR)
const MapContainer = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false }
);
const Polygon = dynamic(() => import("react-leaflet").then((m) => m.Polygon), {
  ssr: false,
});
const Marker = dynamic(() => import("react-leaflet").then((m) => m.Marker), {
  ssr: false,
});
const GeoJSONComp = dynamic(
  () => import("react-leaflet").then((m) => m.GeoJSON),
  { ssr: false }
);

// ——— Types
export type LatLng = [number, number]; // [lat, lng]

export type StatItem = {
  icon?: string; // image url for the small icon chip (optional)
  label: string; // e.g. "Capital"
  value: string; // e.g. "Ottawa"
};

export type PolygonPath =
  | LatLng[] // single ring
  | LatLng[][]; // multi-ring polygon

export type Region = {
  id: string;
  name: string; // label shown on the map
  labelPosition: LatLng; // where the label sits
  href?: string; // (optional) navigate on click
  polygon?: PolygonPath; // (optional) simple polygon(s)
  geojson?: GeoJSON.Feature | GeoJSON.FeatureCollection; // (optional) full geojson
  style?: {
    stroke?: string; // CSS color or var() for stroke
    strokeWidth?: number; // px
    fill?: string; // CSS color or var() for fill
    fillOpacity?: number; // 0..1
  };
};

export type BaseMode = "none" | "tiles" | "geojson";

export type RegionMapPanelProps = {
  eyebrow?: string; // small uppercase label
  title: string; // big headline
  blurb?: string; // 1–2 sentence paragraph
  stats?: StatItem[]; // list of items
  regions: Region[]; // data for markers + polygons
  center?: LatLng; // initial center (falls back to auto-fit)
  zoom?: number; // initial zoom if no bounds
  className?: string; // outer wrapper override
  base?: BaseMode; // base rendering mode
  tilesUrl?: string; // OSM (or other) tiles URL when base="tiles"
  baseGeojson?: any; // country outline when base="geojson"
};

// ——— CSS variables (with fallbacks)
const css = {
  heading: "var(--heading, #3F2214)",
  body: "var(--body, #3F2214)",
  muted: "var(--muted-foreground, #767676)",
  chipBg: "var(--chip-bg, rgba(117,117,117,0.08))",
  mapBg: "var(--map-bg, var(--card, #FFFFFF))",
  mapStroke: "var(--map-stroke, var(--border, #E5E7EB))",
  mapFill: "var(--map-fill, var(--card, #FFFFFF))",
  mapHoverFill: "var(--map-hover-fill, var(--btn-yellow, #D1A97A))",

  markerTextStart: "var(--marker-text-start, #5C4E47)",
  markerTextEnd: "var(--marker-text-end, #5C4235)",
};
const filterPolygons = (f: GeoJSON.Feature) =>
  f.geometry?.type !== "Point" && f.geometry?.type !== "MultiPoint";

// ——— DivIcon label
function labelIcon(name: string, leaflet: any) {
  const html = `
    <div class="custom-marker" style="position:absolute;left:0;top:0;">
      <div
        style="
          background: linear-gradient(90deg, ${css.markerTextStart} 0%, ${css.markerTextEnd} 100%);
          -webkit-background-clip: text; background-clip: text; color: transparent;
          font-size: 0.625rem; font-weight: 600; letter-spacing: -0.00625rem;
          line-height: 1.2; text-transform: uppercase; white-space: nowrap;
          position:absolute; bottom:-0.1rem;
        "
      >${name}</div>
    </div>
  `;
  return leaflet.divIcon({
    className: "marker-custom__nation",
    html,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
}

export default function RegionMapPanel({
  base = "none",
  tilesUrl,
  baseGeojson,
  eyebrow = "WHY CHOOSE CANADA?",
  title = "Canada is a top choice for newcomers",
  blurb = "Canada is renowned for a strong economy, quality of life, and welcoming communities.",
  stats = [
    { label: "Capital", value: "Ottawa" },
    { label: "Area", value: "9.98 million km²" },
    { label: "Population", value: "38 million" },
    { label: "Official languages", value: "English, French" },
  ],
  regions,
  center,
  zoom = 3,
  className = "",
}: RegionMapPanelProps) {
  const mapRef = React.useRef<any>(null);
  const [selectedRegion, setSelectedRegion] = React.useState<Region | null>(null);
  const [leaflet, setLeaflet] = React.useState<any>(null);
  const [mounted, setMounted] = React.useState(false);

  // Load Leaflet and CSS on client only
  React.useEffect(() => {
    setMounted(true);
    import("leaflet").then((leafletMod) => {
      setLeaflet(leafletMod);
      // Load CSS dynamically
      if (typeof document !== 'undefined') {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
      }
    }).catch(console.error);
  }, []);

  // Wait for map to be ready before adding layers
  const [mapReady, setMapReady] = React.useState(false);
  React.useEffect(() => {
    const map = mapRef.current;
    if (map && leaflet && !mapReady) {
      map.whenReady(() => {
        setMapReady(true);
      });
    }
  }, [leaflet, mapReady]);
  // compute bounds from polygons + label positions
  // compute bounds from base outline + regions + label positions
  const bounds = React.useMemo(() => {
    if (!leaflet) return null;
    const L = leaflet as typeof import("leaflet");
    const b = new L.LatLngBounds([]);

    // include base outline when using geojson base
    if (base === "geojson" && baseGeojson) {
      L.geoJSON(baseGeojson as any, { filter: filterPolygons }).eachLayer(
        (layer: any) => {
          if (layer.getBounds) b.extend(layer.getBounds());
        }
      );
    }

    // include regions
    regions.forEach((r) => {
      if (r.labelPosition) b.extend(r.labelPosition as any);

      const eat = (p: PolygonPath) => {
        if (Array.isArray(p[0])) {
          (p as LatLng[][]).forEach((ring) =>
            ring.forEach((pt) => b.extend(pt as any))
          );
        } else {
          (p as LatLng[]).forEach((pt) => b.extend(pt as any));
        }
      };

      if (r.polygon) eat(r.polygon);

      if (r.geojson) {
        L.geoJSON(r.geojson as any, { filter: filterPolygons }).eachLayer(
          (layer: any) => {
            if (layer.getBounds) b.extend(layer.getBounds());
            else if (layer.getLatLng) b.extend(layer.getLatLng());
          }
        );
      }
    });

    return b.isValid() ? b : null;
  }, [regions, base, baseGeojson, leaflet]);

  const mapStyle: CSSProperties = {
    height: "100%",
    width: "100%",
    background: "transparent",
  };

  // Fit to bounds on mount/update when bounds are available
  React.useEffect(() => {
    const map = mapRef.current;
    if (mapReady && map && !center && bounds && bounds.isValid()) {
      try {
        map.fitBounds(bounds, { padding: [20, 20] });
      } catch {}
    }
  }, [bounds, center, mapReady]);

  // Create custom panes to control z-order (base below, regions above)
  React.useEffect(() => {
    const map = mapRef.current;
    if (!map || !leaflet) return;
    if (!map.getPane('base-outline')) {
      map.createPane('base-outline');
      const p = map.getPane('base-outline');
      if (p) p.style.zIndex = '300';
    }
    if (!map.getPane('regions')) {
      map.createPane('regions');
      const p = map.getPane('regions');
      if (p) p.style.zIndex = '400';
    }
  }, [leaflet, mapReady]);

  // Optional content map for richer panel details
  const contentMap = React.useMemo(() => {
    const m: Record<string, {
      images?: string[];
      description?: string;
      stats?: { label: string; value: string; icon?: string }[];
      mapUrl?: string;
    }> = {
      // Yukon Territory
      "yukon-territory": {
        images: [
          "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1080&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1080&auto=format&fit=crop",
        ],
        description: "Yukon offers vast wilderness, northern lights, and close-knit communities.",
        stats: [
          { label: "Capital", value: "Whitehorse" },
          { label: "Area", value: "482,443 km²" },
          { label: "Population", value: "≈ 44k" },
        ],
        mapUrl: "https://www.google.com/maps/place/Yukon/",
      },
      // Northwest Territories
      "northwest-territories": {
        images: [
          "https://images.unsplash.com/photo-1508264165352-258a6a1b1425?q=80&w=1080&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1080&auto=format&fit=crop",
        ],
        description: "Home to pristine lakes, northern wildlife, and cultural heritage.",
        stats: [
          { label: "Capital", value: "Yellowknife" },
          { label: "Area", value: "1,346,106 km²" },
          { label: "Population", value: "≈ 45k" },
        ],
        mapUrl: "https://www.google.com/maps/place/Northwest+Territories/",
      },
      // Nunavut
      nunavut: {
        images: [
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1080&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1080&auto=format&fit=crop",
        ],
        description: "Canada's largest territory with Inuit culture and arctic landscapes.",
        stats: [
          { label: "Capital", value: "Iqaluit" },
          { label: "Area", value: "2,093,190 km²" },
          { label: "Population", value: "≈ 40k" },
        ],
        mapUrl: "https://www.google.com/maps/place/Nunavut/",
      },
      // British Columbia
      "british-columbia": {
        images: [
          "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1080&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?q=80&w=1080&auto=format&fit=crop",
        ],
        description: "Mountains, ocean, and thriving tech hubs in Vancouver and beyond.",
        stats: [
          { label: "Capital", value: "Victoria" },
          { label: "Area", value: "944,735 km²" },
          { label: "Population", value: "≈ 5.5M" },
        ],
        mapUrl: "https://www.google.com/maps/place/British+Columbia/",
      },
      // Alberta
      alberta: {
        images: [
          "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1080&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1080&auto=format&fit=crop",
        ],
        description: "Rockies, energy sector, and vibrant cities like Calgary and Edmonton.",
        stats: [
          { label: "Capital", value: "Edmonton" },
          { label: "Area", value: "661,848 km²" },
          { label: "Population", value: "≈ 4.7M" },
        ],
        mapUrl: "https://www.google.com/maps/place/Alberta/",
      },
      // Saskatchewan
      saskatchewan: {
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1080&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1526483360412-f4dbaf036963?q=80&w=1080&auto=format&fit=crop",
        ],
        description: "Known for prairies, agriculture, and expanding immigration streams.",
        stats: [
          { label: "Capital", value: "Regina" },
          { label: "Area", value: "651,900 km²" },
          { label: "Population", value: "≈ 1.2M" },
        ],
        mapUrl: "https://www.google.com/maps/place/Saskatchewan/",
      },
      // Manitoba
      manitoba: {
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1080&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1080&auto=format&fit=crop",
        ],
        description: "Friendly communities, lakes, and strong newcomer support.",
        stats: [
          { label: "Capital", value: "Winnipeg" },
          { label: "Area", value: "647,797 km²" },
          { label: "Population", value: "≈ 1.4M" },
        ],
        mapUrl: "https://www.google.com/maps/place/Manitoba/",
      },
      // Ontario
      ontario: {
        images: [
          "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1080&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1080&auto=format&fit=crop",
        ],
        description: "Economic engine of Canada with Toronto, Ottawa, and tech corridors.",
        stats: [
          { label: "Capital", value: "Toronto" },
          { label: "Area", value: "1,076,395 km²" },
          { label: "Population", value: "≈ 15M" },
        ],
        mapUrl: "https://www.google.com/maps/place/Ontario/",
      },
      // Quebec
      quebec: {
        images: [
          "https://images.unsplash.com/photo-1526481280698-8fcc13fd6041?q=80&w=1080&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1080&auto=format&fit=crop",
        ],
        description: "Francophone culture, Québec City charm, and Montreal innovation.",
        stats: [
          { label: "Capital", value: "Quebec City" },
          { label: "Area", value: "1,542,056 km²" },
          { label: "Population", value: "≈ 8.9M" },
        ],
        mapUrl: "https://www.google.com/maps/place/Quebec/",
      },
      // Newfoundland and Labrador (handle both names)
      "newfoundland-and-labrador": {
        images: [
          "https://images.unsplash.com/photo-1526481280698-8fcc13fd6041?q=80&w=1080&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1080&auto=format&fit=crop",
        ],
        description: "Dramatic coastlines, maritime culture, and welcoming communities.",
        stats: [
          { label: "Capital", value: "St. John's" },
          { label: "Area", value: "405,212 km²" },
          { label: "Population", value: "≈ 0.5M" },
        ],
        mapUrl: "https://www.google.com/maps/place/Newfoundland+and+Labrador/",
      },
      newfoundland: {
        images: [
          "https://images.unsplash.com/photo-1526481280698-8fcc13fd6041?q=80&w=1080&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1080&auto=format&fit=crop",
        ],
        description: "Part of Newfoundland and Labrador; rugged coasts and fishing heritage.",
        stats: [
          { label: "Capital", value: "St. John's" },
          { label: "Area", value: "~373,872 km²" },
          { label: "Population", value: "≈ 0.4M" },
        ],
        mapUrl: "https://www.google.com/maps/place/Newfoundland+and+Labrador/",
      },
      // New Brunswick
      "new-brunswick": {
        images: [
          "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1080&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1526481280698-8fcc13fd6041?q=80&w=1080&auto=format&fit=crop",
        ],
        description: "Bilingual province with nature, coastline, and family-friendly towns.",
        stats: [
          { label: "Capital", value: "Fredericton" },
          { label: "Area", value: "72,908 km²" },
          { label: "Population", value: "≈ 0.8M" },
        ],
        mapUrl: "https://www.google.com/maps/place/New+Brunswick/",
      },
      // Nova Scotia
      "nova-scotia": {
        images: [
          "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1080&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=1080&auto=format&fit=crop",
        ],
        description: "Coastal living, universities, and booming Halifax region.",
        stats: [
          { label: "Capital", value: "Halifax" },
          { label: "Area", value: "55,284 km²" },
          { label: "Population", value: "≈ 1.1M" },
        ],
        mapUrl: "https://www.google.com/maps/place/Nova+Scotia/",
      },
      // Prince Edward Island
      "prince-edward-island": {
        images: [
          "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=1080&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1080&auto=format&fit=crop",
        ],
        description: "Smallest province with red-sand beaches and agriculture.",
        stats: [
          { label: "Capital", value: "Charlottetown" },
          { label: "Area", value: "5,660 km²" },
          { label: "Population", value: "≈ 0.17M" },
        ],
        mapUrl: "https://www.google.com/maps/place/Prince+Edward+Island/",
      },
    };
    return m;
  }, []);

  // Don't render until mounted and Leaflet is loaded
  if (!mounted || !leaflet) {
    return (
      <section
        className={`flex space-x-[6.69rem] pt-[4rem] section-container xsm:flex-col-reverse xsm:space-x-0 ${className}`}
      >
        {/* Left column */}
        <div className="w-[41.5rem] xsm:mt-[2.56rem] xsm:w-full">
          <span
            className="mb-[0.38rem] text-[1rem] font-semibold uppercase leading-[1.5] opacity-70 xsm:text-[0.75rem] xsm:font-medium"
            style={{ color: css.body }}
          >
            {eyebrow}
          </span>
          <h2
            className="mb-[1.5rem] font-optima text-[3rem] font-semibold leading-[1.2] tracking-[-0.06rem] xsm:text-[1.5rem] xsm:tracking-[-0.045rem]"
            style={{ color: css.heading }}
          >
            {title}
          </h2>
          {blurb && (
            <p
              className="text-[1rem] leading-[1.55] xsm:text-[0.875rem]"
              style={{ color: css.body }}
            >
              {blurb}
            </p>
          )}
          <div className="mt-[1.5rem] flex flex-col space-y-[1.5rem] xsm:space-y-3">
            {stats.map((s, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div
                  className="flex w-fit items-center justify-center rounded-[0.75rem] p-[1.25rem] xsm:p-4"
                  style={{ background: css.chipBg }}
                >
                  <img
                    src={s.icon}
                    alt=""
                    width={50}
                    height={50}
                    className="size-[1.45831rem] object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span
                    className="text-[1.125rem] font-semibold leading-[1.5] xsm:text-[0.875rem]"
                    style={{ color: css.muted }}
                  >
                    {s.label}
                  </span>
                  <span
                    className="text-[1.5rem] font-bold leading-[1.33] xsm:text-[1rem]"
                    style={{ color: css.heading }}
                  >
                    {s.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Right column (loading) */}
        <div
          className="relative h-[36.25rem] w-[27.86819rem] xsm:h-[22.125rem] xsm:w-full flex items-center justify-center"
          style={{ background: css.mapBg }}
        >
          <div className="text-sm" style={{ color: css.muted }}>Loading map...</div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`flex space-x-[6.69rem] pt-[4rem] section-container xsm:flex-col-reverse xsm:space-x-0 ${className}`}
    >
      {/* Left column */}
      <div className="w-[41.5rem] xsm:mt-[2.56rem] xsm:w-full">
        <span
          className="mb-[0.38rem] text-[1rem] font-semibold uppercase leading-[1.5] opacity-70 xsm:text-[0.75rem] xsm:font-medium"
          style={{ color: css.body }}
        >
          {eyebrow}
        </span>

        <h2
          className="mb-[1.5rem] font-optima text-[3rem] font-semibold leading-[1.2] tracking-[-0.06rem] xsm:text-[1.5rem] xsm:tracking-[-0.045rem]"
          style={{ color: css.heading }}
        >
          {title}
        </h2>

        {blurb && (
          <p
            className="text-[1rem] leading-[1.55] xsm:text-[0.875rem]"
            style={{ color: css.body }}
          >
            {blurb}
          </p>
        )}

        <div className="mt-[1.5rem] flex flex-col space-y-[1.5rem] xsm:space-y-3">
          {stats.map((s, i) => (
            <div key={i} className="flex items-center space-x-4">
              <div
                className="flex w-fit items-center justify-center rounded-[0.75rem] p-[1.25rem] xsm:p-4"
                style={{ background: css.chipBg }}
              >
                <div className="size-[1.45831rem] rounded bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-xs font-bold text-blue-600">
                  {s.label.charAt(0)}
                </div>
              </div>
              <div className="flex flex-col">
                <span
                  className="text-[1.125rem] font-semibold leading-[1.5] xsm:text-[0.875rem]"
                  style={{ color: css.muted }}
                >
                  {s.label}
                </span>
                <span
                  className="text-[1.5rem] font-bold leading-[1.33] xsm:text-[1rem]"
                  style={{ color: css.heading }}
                >
                  {s.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right column (map) */}
      <div
        className="relative h-[55rem] w-[50rem] xsm:h-[35rem] xsm:w-full"
        style={{ background: css.mapBg }}
      >
        <div className="absolute inset-0 w-">
          <MapContainer
            ref={mapRef as any}
            style={mapStyle}
            center={center ?? [61, -97]} // Canada-ish fallback
            zoom={zoom}
            zoomControl={false}
            scrollWheelZoom={false}
            dragging={true}
            attributionControl={false}
            whenReady={() => setMapReady(true)}
          >
            {/* Base layer */}
            {mapReady && base === "tiles" && (
              <TileLayer
                url={
                  tilesUrl ??
                  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                }
              />
            )}
            {mapReady && base === "geojson" && baseGeojson && (
              <GeoJSONComp
                data={baseGeojson as any}
                filter={filterPolygons}
                style={() => ({
                  color: css.mapStroke,
                  weight: 0.6, // slightly clearer border
                  fillColor: css.mapFill,
                  fillOpacity: 1,
                })}
                pane="base-outline"
                interactive={false}
              />
            )}

            {/* Regions (polygons + labels) */}
            {mapReady && regions.map((r) => {
              const pathOpts: L.PathOptions = {
                color: r?.style?.stroke ?? css.mapStroke,
                weight: r?.style?.strokeWidth ?? 0.4,
                fillColor: r?.style?.fill ?? css.mapFill,
                fillOpacity: r?.style?.fillOpacity ?? 0.95,
              };

              const handleClick = () => {
                if (r.href) {
                  window.location.assign(r.href!);
                } else {
                  setSelectedRegion(r);
                }
              };

              const hoverHandlers = {
                mouseover: (e: any) => {
                  const target = e.target;
                  target?.bringToFront?.();
                  target?.setStyle?.({
                    weight: (r?.style?.strokeWidth ?? 0.4) + 1.6,
                    color: css.markerTextEnd,
                    fillColor: css.mapHoverFill,
                    fillOpacity: Math.max(0.55, (r?.style?.fillOpacity ?? 0.95) * 0.7),
                  });
                },
                mouseout: (e: any) => {
                  const target = e.target;
                  target?.setStyle?.({
                    weight: r?.style?.strokeWidth ?? 0.4,
                    color: r?.style?.stroke ?? css.mapStroke,
                    fillColor: r?.style?.fill ?? css.mapFill,
                    fillOpacity: r?.style?.fillOpacity ?? 0.95,
                  });
                },
              };

              const shape = r.geojson ? (
                <GeoJSONComp
                  key={`${r.id}-geo`}
                  data={r.geojson as any}
                  filter={filterPolygons}
                  style={() => ({ ...pathOpts } as any)}
                  pane="regions"
                  onEachFeature={(_feature, layer: any) => {
                    // set pointer cursor when the SVG path is available
                    layer.on('add', () => {
                      try {
                        layer.getElement()?.setAttribute('style', (layer.getElement()?.getAttribute('style') || '') + ';cursor:pointer;');
                      } catch {}
                    });
                    layer.on({
                      mouseover: hoverHandlers.mouseover,
                      mouseout: hoverHandlers.mouseout,
                      click: handleClick,
                    });
                  }}
                />
              ) : r.polygon ? (
                <Polygon
                  key={`${r.id}-poly`}
                  positions={r.polygon as any}
                  pathOptions={pathOpts}
                  pane="regions"
                  eventHandlers={{
                    ...(hoverHandlers as any),
                    click: handleClick as any,
                  }}
                />
              ) : null;

              return (
                <React.Fragment key={r.id}>
                  {shape}
                  <Marker
                    position={r.labelPosition}
                    icon={labelIcon(r.name, leaflet)}
                    eventHandlers={{ click: handleClick } as any}
                  />
                </React.Fragment>
              );
            })}
          </MapContainer>
        </div>
        {/* Inline info panel (no blackout) */}
        <div
          className={`absolute bottom-3 left-3 right-3 z-[55] sm:left-auto sm:right-3 sm:w-[25rem] ${
            selectedRegion ? "" : "hidden"
          }`}
        >
          <div className="rounded-[0.75rem] border border-[rgba(18,18,18,0.16)] bg-white/95 backdrop-blur-sm p-4 shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-[0.95rem] font-semibold" style={{ color: css.body }}>
                  {selectedRegion?.name}
                </span>
              </div>
              <button
                className="flex size-[1.5rem] items-center justify-center rounded hover:bg-black/5"
                onClick={() => setSelectedRegion(null)}
                aria-label="Close details"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" className="size-[0.75rem]">
                  <path d="M13 13L7.00002 7.00002M7.00002 7.00002L1 1M7.00002 7.00002L13 1M7.00002 7.00002L1 13" stroke="#5D6065" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </button>
            </div>

            {/* Images (always show at least one) */}
            {(() => {
              const key = selectedRegion?.id || selectedRegion?.name?.toLowerCase().replace(/\s+/g, "-") || "";
              const c = (contentMap as any)[key] || (contentMap as any)[(selectedRegion?.name || "").toLowerCase()];
              
              // Default images for regions without specific images
              const defaultImages = [
                "https://images.unsplash.com/photo-1503614472-8c93d56cd601?q=80&w=1080&auto=format&fit=crop", // Canada landscape
                "https://images.unsplash.com/photo-1519832064-6b8e1d1e7b6a?q=80&w=1080&auto=format&fit=crop", // Canadian nature
              ];
              
              const images = c?.images || defaultImages;
              
              return (
                <div className="mt-3 w-full overflow-hidden rounded-md">
                  <div className="flex w-full space-x-2 overflow-x-auto">
                    {images.map((src: string, idx: number) => (
                      <img key={idx} src={src} alt="" className="h-40 w-64 flex-shrink-0 rounded object-cover" />
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* Description & stats */}
            {(() => {
              const key = selectedRegion?.id || selectedRegion?.name?.toLowerCase().replace(/\s+/g, "-") || "";
              const c = (contentMap as any)[key] || (contentMap as any)[(selectedRegion?.name || "").toLowerCase()];
              if (!c) return (
                <div className="mt-3 text-[0.9rem] leading-normal" style={{ color: css.body }}>
                  Explore programs and details for {selectedRegion?.name}.
                </div>
              );
              return (
                <div className="mt-3">
                  {c.description && (
                    <p className="text-[0.9rem] leading-normal" style={{ color: css.body }}>
                      {c.description}
                    </p>
                  )}
                  {c.stats && (
                    <div className="mt-3 space-y-2">
                      {c.stats.map((s: { label: string; value: string; icon?: string }, i: number) => (
                        <div key={i} className="flex items-center space-x-2">
                          <span className="text-sm" style={{ color: css.muted }}>{s.label}:</span>
                          <span className="text-sm font-medium" style={{ color: css.body }}>{s.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="mt-3">
                    <a
                      href={(c.mapUrl || "#")}
                      target="_blank"
                      className="group flex h-10 w-full items-center justify-center rounded border border-[rgba(18,18,18,0.16)] transition-all duration-200 hover:bg-[linear-gradient(97deg,#5C321E_-3.86%,#95502F_51.97%,#F5C178_117.18%)]"
                    >
                      <span className="text-sm font-medium text-[color:var(--foreground)] group-hover:text-white">View on Google Maps</span>
                    </a>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </section>
  );
}
