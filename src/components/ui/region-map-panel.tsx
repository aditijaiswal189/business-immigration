"use client";

import * as React from "react";
import type { CSSProperties } from "react";
import dynamic from "next/dynamic";
import * as L from "leaflet";

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
  icon: string; // image url for the small icon chip
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
  mapBg: "var(--map-bg, #FFFFFF)",
  mapStroke: "var(--map-stroke, #D7B57899)",
  mapFill: "var(--map-fill, #DED6D2)",

  markerTextStart: "var(--marker-text-start, #5C4E47)",
  markerTextEnd: "var(--marker-text-end, #5C4235)",
};
const filterPolygons = (f: GeoJSON.Feature) =>
  f.geometry?.type !== "Point" && f.geometry?.type !== "MultiPoint";

// ——— DivIcon label
function labelIcon(name: string) {
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
  return L.divIcon({
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
    { icon: "/icons/star.svg", label: "Capital", value: "Ottawa" },
    { icon: "/icons/map.svg", label: "Area", value: "9.98 million km²" },
    { icon: "/icons/human.svg", label: "Population", value: "38 million" },
    {
      icon: "/icons/lang.svg",
      label: "Official languages",
      value: "English, French",
    },
  ],
  regions,
  center,
  zoom = 3,
  className = "",
}: RegionMapPanelProps) {
  // compute bounds from polygons + label positions
  // compute bounds from base outline + regions + label positions
  const bounds = React.useMemo(() => {
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
  }, [regions, base, baseGeojson]);

  const mapStyle: CSSProperties = {
    height: "100%",
    width: "100%",
    background: "transparent",
  };

  const mapRef = React.useRef<L.Map | null>(null);
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

      {/* Right column (map) */}
      <div
        className="relative h-[36.25rem] w-[27.86819rem] xsm:h-[22.125rem] xsm:w-full"
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
            // whenCreated={(map) => {
            //   if (!center && bounds) {
            //     map.fitBounds(bounds, { padding: [20, 20] });
            //   }
            // }}
          >
            {/* Base layer */}
            {base === "tiles" && (
              <TileLayer
                url={
                  tilesUrl ??
                  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                }
                attribution=""
              />
            )}
            {base === "geojson" && baseGeojson && (
              <GeoJSONComp
                data={baseGeojson as any}
                filter={filterPolygons}
                style={() => ({
                  color: css.mapStroke,
                  weight: 0.6, // slightly clearer border
                  fillColor: css.mapFill,
                  fillOpacity: 1,
                })}
              />
            )}

            {/* Regions (polygons + labels) */}
            {regions.map((r) => {
              const pathOpts: L.PathOptions = {
                color: r?.style?.stroke ?? css.mapStroke,
                weight: r?.style?.strokeWidth ?? 0.4,
                fillColor: r?.style?.fill ?? css.mapFill,
                fillOpacity: r?.style?.fillOpacity ?? 1,
              };

              const clickHandler = r.href
                ? { click: () => window.location.assign(r.href!) }
                : undefined;

              const hoverHandlers = {
                mouseover: (e: any) =>
                  e.target.setStyle?.({ fillOpacity: 0.85 }),
                mouseout: (e: any) =>
                  e.target.setStyle?.({ fillOpacity: pathOpts.fillOpacity }),
              };

              const shape = r.geojson ? (
                <GeoJSONComp
                  key={`${r.id}-geo`}
                  data={r.geojson as any}
                  filter={filterPolygons}
                  style={() => pathOpts}
                  eventHandlers={{
                    ...(hoverHandlers as any),
                    ...(clickHandler as any),
                  }}
                />
              ) : r.polygon ? (
                <Polygon
                  key={`${r.id}-poly`}
                  positions={r.polygon as any}
                  pathOptions={pathOpts}
                  eventHandlers={{
                    ...(hoverHandlers as any),
                    ...(clickHandler as any),
                  }}
                />
              ) : null;

              return (
                <React.Fragment key={r.id}>
                  {shape}
                  <Marker
                    position={r.labelPosition}
                    icon={labelIcon(r.name)}
                    eventHandlers={clickHandler as any}
                  />
                </React.Fragment>
              );
            })}
          </MapContainer>
        </div>
      </div>
    </section>
  );
}
