"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  GeoJSON,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "./button";

/* =========================================================
   Theme tokens (read from your global.css variables)
   =======================================================*/
const tokens = {
  red: "var(--btn-red)",
  blue: "var(--btn-blue)",
  green: "var(--btn-green)",
  yellow: "var(--btn-yellow)",
  primary: "var(--primary)",
  accent: "var(--accent)",
  card: "var(--card)",
  border: "var(--border)",
};

/* =========================================================
   SVG icon strings (keep fill="currentColor")
   =======================================================*/
const iconSvgs = {
  globe: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75H18a.75.75 0 000-1.5h-5.25V6z" clip-rule="evenodd"/></svg>`,
  mapPin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 11.25a.75.75 0 01.75.75v5.04c0 .358-.328.647-.648.647-.32 0-.647-.289-.647-.647v-5.04a.75.75 0 01.75-.75z"/></svg>`,
  arrowRight: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`,
};

/* =========================================================
   Data
   =======================================================*/
const canadianProvinces = [
  {
    name: "Alberta",
    coords: [53.9333, -116.5765] as [number, number],
    code: "AB",
    program: "Alberta Advantage Immigration Program (AAIP)",
  },
  {
    name: "British Columbia",
    coords: [53.7267, -127.6476] as [number, number],
    code: "BC",
    program: "BC Provincial Nominee Program (BC PNP)",
  },
  {
    name: "Manitoba",
    coords: [53.7609, -98.8139] as [number, number],
    code: "MB",
    program: "Manitoba Provincial Nominee Program (MPNP)",
  },
  {
    name: "New Brunswick",
    coords: [46.5653, -66.4619] as [number, number],
    code: "NB",
    program: "New Brunswick Provincial Nominee Program (NBPNP)",
  },
  {
    name: "Newfoundland and Labrador",
    coords: [53.1355, -57.6604] as [number, number],
    code: "NL",
    program: "Newfoundland and Labrador Provincial Nominee Program (NLPNP)",
  },
  {
    name: "Northwest Territories",
    coords: [61.2181, -113.5034] as [number, number],
    code: "NT",
    program: "Northwest Territories Nominee Program (NTNP)",
  },
  {
    name: "Nova Scotia",
    coords: [44.682, -63.7443] as [number, number],
    code: "NS",
    program: "Nova Scotia Provincial Nominee Program (NSNP)",
  },
  {
    name: "Ontario",
    coords: [51.2538, -85.3232] as [number, number],
    code: "ON",
    program: "Ontario Immigrant Nominee Program (OINP)",
  },
  {
    name: "Prince Edward Island",
    coords: [46.5107, -63.4168] as [number, number],
    code: "PE",
    program: "Prince Edward Island Provincial Nominee Program (PEI PNP)",
  },
  {
    name: "Quebec",
    coords: [53.9214, -72.7665] as [number, number],
    code: "QC",
    program: "Quebec Immigration Program",
  },
  {
    name: "Saskatchewan",
    coords: [52.9399, -106.4509] as [number, number],
    code: "SK",
    program: "Saskatchewan Immigrant Nominee Program (SINP)",
  },
  {
    name: "Yukon",
    coords: [64.0685, -139.0686] as [number, number],
    code: "YT",
    program: "Yukon Nominee Program (YNP)",
  },
];

const nationalities = [
  {
    name: "Canada",
    flag: "/flags/canada.png",
    active: true,
    coords: [56.1304, -106.3468] as [number, number],
    zoom: 3,
    color: tokens.red,
  },
  {
    name: "Europe",
    flag: "/flags/eu.png",
    active: false,
    coords: [54.526, 15.2551] as [number, number],
    zoom: 3,
    color: "var(--chart-4)",
  },
  {
    name: "USA",
    flag: "/flags/usa.png",
    active: false,
    coords: [39.8283, -98.5795] as [number, number],
    zoom: 3,
    color: tokens.blue,
  },
  {
    name: "New Zealand",
    flag: "/flags/newzealand.png",
    active: false,
    coords: [-40.9006, 174.886] as [number, number],
    zoom: 4,
    color: tokens.green,
  },
  {
    name: "Australia",
    flag: "/flags/australia.png",
    active: false,
    coords: [-25.2744, 133.7751] as [number, number],
    zoom: 3,
    color: tokens.yellow,
  },
  {
    name: "Caribbean",
    flag: "/flags/caribbean.png",
    active: false,
    coords: [21.4691, -78.6569] as [number, number],
    zoom: 4,
    color: tokens.green,
  },
];

type Region = {
  name: "ALL" | "CANADA" | "AMERICAS" | "EMEA" | "APAC" | "CARIBBEAN";
  displayName: string;
  coords: [number, number];
  zoom: number;
  color: string;
  iconSvg: string;
  countries: { name: string; coords: [number, number] }[];
  provinces?: typeof canadianProvinces;
  programs: string[];
};

const regions: Region[] = [
  {
    name: "ALL",
    displayName: "All Regions",
    coords: [20.0, 0.0],
    zoom: 2,
    color: tokens.primary,
    iconSvg: iconSvgs.globe,
    countries: [],
    programs: [],
  },
  {
    name: "CANADA",
    displayName: "Canada Provincial Programs",
    coords: [56.1304, -106.3468],
    zoom: 3,
    color: tokens.red,
    iconSvg: iconSvgs.mapPin,
    countries: [{ name: "Canada", coords: [56.1304, -106.3468] }],
    provinces: canadianProvinces,
    programs: [
      "Provincial Nominee Program (PNP)",
      "Express Entry - Provincial Nomination",
      "Start-up Visa Program",
      "Self-employed Persons Program",
    ],
  },
  {
    name: "AMERICAS",
    displayName: "Americas",
    coords: [15.0, -90.0],
    zoom: 3,
    color: tokens.blue,
    iconSvg: iconSvgs.mapPin,
    countries: [
      { name: "United States", coords: [39.8283, -98.5795] },
      { name: "Mexico", coords: [23.6345, -102.5528] },
      { name: "Brazil", coords: [-14.235, -51.9253] },
      { name: "Panama", coords: [8.538, -80.7821] },
      { name: "Paraguay", coords: [-23.4425, -58.4438] },
    ],
    programs: [
      "Investor Visa Programs",
      "Work Permit Programs",
      "Family Sponsorship",
    ],
  },
  {
    name: "EMEA",
    displayName: "Europe, Middle East & Africa",
    coords: [54.526, 15.2551],
    zoom: 3,
    color: "var(--chart-4)",
    iconSvg: iconSvgs.mapPin,
    countries: [
      { name: "Andorra", coords: [42.5462, 1.6016] },
      { name: "Austria", coords: [47.5162, 14.5501] },
      { name: "Cyprus", coords: [35.1264, 33.4299] },
      { name: "Greece", coords: [39.0742, 21.8243] },
      { name: "Hungary", coords: [47.1625, 19.5033] },
      { name: "Italy", coords: [41.8719, 12.5674] },
      { name: "Latvia", coords: [56.8796, 24.6032] },
      { name: "Malta", coords: [35.9375, 14.3754] },
      { name: "Moldova", coords: [47.4116, 28.3699] },
      { name: "North Macedonia", coords: [41.6086, 21.7453] },
      { name: "Portugal", coords: [39.3999, -8.2245] },
      { name: "Spain", coords: [40.4637, -3.7492] },
      { name: "Serbia", coords: [44.0165, 21.0059] },
      { name: "Switzerland", coords: [46.8182, 8.2275] },
      { name: "United Kingdom", coords: [55.3781, -3.436] },
      { name: "Jordan", coords: [30.5852, 36.2384] },
      { name: "Oman", coords: [21.4735, 55.9754] },
      { name: "Turkey", coords: [38.9637, 35.2433] },
      { name: "United Arab Emirates", coords: [23.4241, 53.8478] },
      { name: "Egypt", coords: [26.0975, 31.2357] },
      { name: "Namibia", coords: [-22.9576, 18.4904] },
      { name: "Cayman Islands", coords: [19.3133, -81.2546] },
    ],
    programs: [
      "Skilled Worker Programs",
      "Business Immigration",
      "Student Visa Programs",
      "Golden Visa Programs",
    ],
  },
  {
    name: "APAC",
    displayName: "Asia Pacific",
    coords: [-25.2744, 133.7751],
    zoom: 3,
    color: tokens.yellow,
    iconSvg: iconSvgs.mapPin,
    countries: [
      { name: "Singapore", coords: [1.3521, 103.8198] },
      { name: "Thailand", coords: [15.87, 100.9925] },
      { name: "Cambodia", coords: [12.5657, 104.991] },
      { name: "Australia", coords: [-25.2744, 133.7751] },
      { name: "Fiji", coords: [-16.578, 179.4144] },
      { name: "Nauru", coords: [-0.5228, 166.9315] },
      { name: "New Zealand", coords: [-40.9006, 174.886] },
      { name: "Vanuatu", coords: [-15.3767, 166.9592] },
    ],
    programs: [
      "Skilled Migration Programs",
      "Business Investment Visas",
      "Working Holiday Visas",
      "Citizenship by Investment",
    ],
  },
  {
    name: "CARIBBEAN",
    displayName: "Caribbean Islands",
    coords: [21.4691, -78.6569],
    zoom: 4,
    color: tokens.green,
    iconSvg: iconSvgs.mapPin,
    countries: [
      { name: "Anguilla", coords: [18.2206, -63.0686] },
      { name: "Antigua and Barbuda", coords: [17.0608, -61.7964] },
      { name: "Curacao", coords: [12.1696, -68.99] },
      { name: "Dominica", coords: [15.414, -61.371] },
      { name: "Grenada", coords: [12.2628, -61.6043] },
      { name: "Saint Lucia", coords: [13.9094, -60.9789] },
      { name: "Saint Kitts and Nevis", coords: [17.3578, -62.783] },
    ],
    programs: [
      "Citizenship by Investment Programs",
      "Economic Citizenship",
      "Real Estate Investment Visas",
    ],
  },
];

/* =========================================================
   Helpers / Components
   =======================================================*/
const MapController = ({
  position,
  zoom,
}: {
  position: [number, number];
  zoom: number;
}) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(position, zoom, { duration: 1.5, easeLinearity: 0.25 });
  }, [map, position, zoom]);
  return null;
};

const createCustomIcon = (
  svgString: string,
  cssVar: string = tokens.primary,
  size = 24
) => {
  return L.divIcon({
    html: `
      <div style="color:${cssVar};width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center;">
        ${svgString}
      </div>
    `,
    className: "custom-div-icon",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};

const getPolygonStyle = (regionColor: string) => ({
  fillColor: regionColor,
  weight: 2,
  opacity: 1,
  color: tokens.card, // outline matches theme card color
  dashArray: "",
  fillOpacity: 0.7,
});

/* =========================================================
   Main component
   =======================================================*/
const MapComponent: React.FC = () => {
  const [activeRegion, setActiveRegion] = useState<Region["name"]>("ALL");
  const [activeNationality, setActiveNationality] = useState("Canada");
  const [activeProvince, setActiveProvince] = useState<string | null>(null);
  const [showProvinces, setShowProvinces] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number]>([
    56.1304, -106.3468,
  ]);
  const [mapZoom, setMapZoom] = useState(3);
  const [worldGeoJSON, setWorldGeoJSON] = useState<any>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Load world GeoJSON data
  useEffect(() => {
    const loadGeoJSON = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson",
          {
            cache: "force-cache",
          }
        );
        const data = await response.json();
        setWorldGeoJSON(data);
      } catch (error) {
        console.error("Failed to load world GeoJSON:", error);
      }
    };
    loadGeoJSON();
  }, []);

  const handleNationalityClick = (
    nationality: (typeof nationalities)[number]
  ) => {
    setActiveNationality(nationality.name);
    if (nationality.name === "Canada") {
      setActiveRegion("CANADA");
      setShowProvinces(true);
      setActiveProvince(null);
    } else {
      setShowProvinces(false);
      setActiveProvince(null);
      const regionMap: Record<string, Region["name"]> = {
        Europe: "EMEA",
        USA: "AMERICAS",
        "New Zealand": "APAC",
        Australia: "APAC",
        Caribbean: "CARIBBEAN",
      };
      setActiveRegion(regionMap[nationality.name] || "ALL");
    }
    setMapCenter(nationality.coords);
    setMapZoom(nationality.zoom);
  };

  const handleRegionClick = (region: Region) => {
    if (region.name === "CANADA") {
      setShowProvinces(true);
      setActiveProvince(null);
    } else {
      setShowProvinces(false);
      setActiveProvince(null);
    }
    setActiveRegion(region.name);
    setMapCenter(region.coords);
    setMapZoom(region.zoom);
  };

  const handleProvinceClick = (
    province: (typeof canadianProvinces)[number]
  ) => {
    setActiveProvince(province.code);
    setMapCenter(province.coords);
    setMapZoom(5);
  };

  const handleBackToCanada = () => {
    setActiveProvince(null);
    setMapCenter([56.1304, -106.3468]);
    setMapZoom(3);
  };

  const getFilteredCountries = () => {
    if (!worldGeoJSON) return [];

    // ALL = union of region countries (skip CARIBBEAN geojson; we draw custom)
    if (activeRegion === "ALL") {
      const allCountries: any[] = [];
      regions
        .filter((r) => r.name !== "ALL" && r.name !== "CARIBBEAN")
        .forEach((region) => {
          region.countries.forEach((country) => {
            const feature = worldGeoJSON.features.find((f: any) => {
              const countryName = country.name.toLowerCase();
              const featureName = (
                f.properties.NAME ||
                f.properties.name ||
                f.properties.ADMIN ||
                ""
              ).toLowerCase();
              if (featureName === countryName) return true;
              return (
                featureName.includes(countryName) ||
                countryName.includes(featureName)
              );
            });
            if (feature) {
              allCountries.push({
                ...feature,
                regionColor: region.color,
                regionName: region.displayName,
              });
            }
          });
        });
      return allCountries;
    }

    if (activeRegion === "CARIBBEAN") return [];

    const activeRegionData = regions.find((r) => r.name === activeRegion);
    if (!activeRegionData) return [];

    const filtered: any[] = [];
    activeRegionData.countries.forEach((country) => {
      const feature = worldGeoJSON.features.find((f: any) => {
        const countryName = country.name.toLowerCase();
        const featureName = (
          f.properties.NAME ||
          f.properties.name ||
          f.properties.ADMIN ||
          ""
        ).toLowerCase();
        if (featureName === countryName) return true;
        return (
          featureName.includes(countryName) || countryName.includes(featureName)
        );
      });
      if (feature) {
        filtered.push({
          ...feature,
          regionColor: activeRegionData.color,
          regionName: activeRegionData.displayName,
        });
      }
    });
    return filtered;
  };

  return (
    <section className="w-full bg-background py-8 mt-20 relative z-10">
      <style jsx global>{`
        .country-polygon {
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .country-polygon:hover {
          filter: brightness(1.04);
          transform: scale(1.01);
        }
        .custom-div-icon {
          background: none !important;
          border: none !important;
        }
        .leaflet-popup-content-wrapper {
          border-radius: 8px;
          background: var(--card);
          color: var(--foreground);
          border: 1px solid var(--border);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        .leaflet-popup-content {
          margin: 12px 16px;
          font-family: system-ui, -apple-system, Segoe UI, Roboto, Inter,
            sans-serif;
        }
        .leaflet-container {
          z-index: 1 !important;
          background: var(--card);
        }
        .leaflet-control-container {
          z-index: 2 !important;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Discover Immigration Opportunities Worldwide
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore immigration programs and opportunities across different
            countries and regions. Click on any country to learn more.
          </p>
        </div>

        <div className="bg-card rounded-2xl shadow-xl overflow-hidden relative border border-border">
          {/* Edges glow/gradients */}
          <div
            className="absolute top-0 left-0  h-24 pointer-events-none z-10 hidden lg:block"
            style={{
              background:
                "linear-gradient(to bottom, var(--card), rgba(255,255,255,0))",
            }}
          />
          <div
            className="absolute bottom-0 left-0  h-20 pointer-events-none z-10 hidden lg:block"
            style={{
              background:
                "linear-gradient(to top, var(--card), rgba(255,255,255,0))",
            }}
          />
          <div
            className="absolute top-0 bottom-0 left-0 w-20 pointer-events-none z-10 hidden lg:block"
            style={{
              background:
                "linear-gradient(to right, var(--card), rgba(255,255,255,0))",
            }}
          />
          <div
            className="absolute top-0 bottom-0 right-0 w-28 pointer-events-none z-10 hidden lg:block"
            style={{
              background:
                "linear-gradient(to left, var(--card), rgba(255,255,255,0))",
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 min-h-[600px]">
            {/* Left: Map */}
            <div className="lg:col-span-2 relative">
              {/* Nationality slider */}
              <div className="absolute top-4 left-4 right-4 z-20">
                <div className="bg-card/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-border">
                  <div
                    className="flex items-center space-x-4 overflow-x-auto pb-2"
                    ref={sliderRef}
                  >
                    {nationalities.map((n) => (
                      <button
                        key={n.name}
                        onClick={() => handleNationalityClick(n)}
                        className={`flex items-center space-x-3 px-4 py-2 rounded-lg border transition-all duration-300 whitespace-nowrap ${
                          activeNationality === n.name
                            ? "bg-primary border-primary text-primary-foreground shadow-lg"
                            : "bg-card border-border text-foreground hover:border-border/80 hover:shadow-md"
                        }`}
                      >
                        <div className="relative w-7 h-7 rounded-full overflow-hidden shadow-md bg-card flex-shrink-0 border border-border">
                          <div
                            className="absolute inset-0"
                            style={{
                              background:
                                "linear-gradient(to bottom, transparent, rgba(255,255,255,.6))",
                            }}
                          />
                          <div className="w-6 h-6 rounded-full bg-muted m-0.5 flex items-center justify-center text-xs font-bold">
                            {n.name.charAt(0)}
                          </div>
                        </div>
                        <span
                          className={`text-sm font-medium uppercase tracking-wide`}
                        >
                          {n.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Zoom controls (optional wiring to map via window.leaflet?) */}
              <div className="absolute bottom-6 left-6 z-20 flex flex-col space-y-2">
                <button
                  className="w-10 h-10 bg-[color:var(--primary-light)] backdrop-blur-sm rounded-lg flex items-center justify-center hover:opacity-90 transition-opacity"
                  onClick={() => setMapZoom((z) => Math.min(z + 1, 10))}
                  aria-label="Zoom in"
                >
                  <svg
                    className="w-4 h-4 text-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v12M6 12h12"
                    />
                  </svg>
                </button>
                <button
                  className="w-10 h-10 bg-[color:var(--primary-light)] backdrop-blur-sm rounded-lg flex items-center justify-center hover:opacity-90 transition-opacity"
                  onClick={() => setMapZoom((z) => Math.max(z - 1, 1))}
                  aria-label="Zoom out"
                >
                  <svg
                    className="w-4 h-4 text-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 12h12"
                    />
                  </svg>
                </button>
              </div>

              {/* Map */}
              <div className="h-[600px] relative">
                <MapContainer
                  center={mapCenter}
                  zoom={mapZoom}
                  className="w-full h-full"
                  zoomControl={false}
                  scrollWheelZoom
                >
                  <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                  />

                  {/* Regions as country polygons */}
                  {worldGeoJSON &&
                    getFilteredCountries().map(
                      (countryFeature: any, index: number) => (
                        <GeoJSON
                          key={`${activeRegion}-${
                            countryFeature.properties.NAME ||
                            countryFeature.properties.name ||
                            index
                          }`}
                          data={countryFeature}
                          style={() =>
                            getPolygonStyle(countryFeature.regionColor)
                          }
                          onEachFeature={(feature, layer) => {
                            layer.on({
                              mouseover: (e: any) => {
                                const ll = e.target;
                                ll.setStyle({
                                  weight: 3,
                                  color: tokens.card,
                                  dashArray: "",
                                  fillOpacity: 0.9,
                                });
                              },
                              mouseout: (e: any) => {
                                const ll = e.target;
                                ll.setStyle(
                                  getPolygonStyle(countryFeature.regionColor)
                                );
                              },
                              click: () => {
                                const countryName =
                                  feature.properties.NAME ||
                                  feature.properties.name ||
                                  feature.properties.ADMIN;
                                layer
                                  .bindPopup(
                                    `<div class="text-center font-medium">
                                    <div class="font-bold text-lg">${countryName}</div>
                                    <div class="text-sm mt-1" style="color:${countryFeature.regionColor}">${countryFeature.regionName}</div>
                                  </div>`
                                  )
                                  .openPopup();
                              },
                            });
                          }}
                        />
                      )
                    )}

                  {/* Canada province markers */}
                  {activeRegion === "CANADA" &&
                    showProvinces &&
                    canadianProvinces.map((province) => (
                      <Marker
                        key={`province-${province.code}`}
                        position={province.coords}
                        icon={createCustomIcon(
                          iconSvgs.mapPin,
                          tokens.red,
                          activeProvince === province.code ? 20 : 16
                        )}
                      >
                        <Popup>
                          <div className="text-center">
                            <div className="font-bold">{province.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {province.code}
                            </div>
                            <div
                              className="text-xs mt-1"
                              style={{ color: tokens.red }}
                            >
                              {province.program}
                            </div>
                          </div>
                        </Popup>
                      </Marker>
                    ))}

                  {/* Caribbean as custom small polygons */}
                  {activeRegion === "CARIBBEAN" &&
                    regions
                      .find((r) => r.name === "CARIBBEAN")
                      ?.countries.map((country) => {
                        const [lat, lng] = country.coords;
                        const radius = 0.3;
                        const points = 20;
                        const coordinates: [number, number][] = [];
                        for (let i = 0; i < points; i++) {
                          const angle = (i / points) * 2 * Math.PI;
                          const latOffset = radius * Math.cos(angle);
                          const lngOffset =
                            (radius * Math.sin(angle)) /
                            Math.cos((lat * Math.PI) / 180);
                          coordinates.push([lat + latOffset, lng + lngOffset]);
                        }
                        coordinates.push(coordinates[0]);
                        const polygonGeoJSON = {
                          type: "Feature" as const,
                          properties: { NAME: country.name },
                          geometry: {
                            type: "Polygon" as const,
                            coordinates: [coordinates],
                          },
                        };

                        return (
                          <GeoJSON
                            key={`caribbean-polygon-${country.name}`}
                            data={polygonGeoJSON}
                            style={() => ({
                              fillColor: tokens.green,
                              weight: 2,
                              opacity: 1,
                              color: tokens.card,
                              dashArray: "",
                              fillOpacity: 0.7,
                            })}
                            onEachFeature={(_, layer) => {
                              layer.on({
                                mouseover: (e: any) => {
                                  const ll = e.target;
                                  ll.setStyle({
                                    weight: 3,
                                    color: tokens.card,
                                    dashArray: "",
                                    fillOpacity: 0.9,
                                  });
                                },
                                mouseout: (e: any) => {
                                  const ll = e.target;
                                  ll.setStyle({
                                    fillColor: tokens.green,
                                    weight: 2,
                                    opacity: 1,
                                    color: tokens.card,
                                    dashArray: "",
                                    fillOpacity: 0.7,
                                  });
                                },
                                click: () => {
                                  layer
                                    .bindPopup(
                                      `<div class="text-center font-medium">
                                        <div class="font-bold text-lg">${country.name}</div>
                                        <div class="text-sm mt-1" style="color:${tokens.green}">Caribbean Islands</div>
                                        <div class="text-xs text-muted-foreground mt-1">Citizenship by Investment Programs</div>
                                      </div>`
                                    )
                                    .openPopup();
                                },
                              });
                            }}
                          />
                        );
                      })}

                  {/* Fallback markers if GeoJSON not loaded */}
                  {!worldGeoJSON &&
                    activeRegion !== "ALL" &&
                    activeRegion !== "CARIBBEAN" &&
                    regions
                      .find((r) => r.name === activeRegion)
                      ?.countries.map((country) => (
                        <Marker
                          key={`fallback-${activeRegion}-${country.name}`}
                          position={country.coords}
                          icon={createCustomIcon(
                            iconSvgs.mapPin,
                            regions.find((r) => r.name === activeRegion)
                              ?.color || tokens.primary,
                            16
                          )}
                        >
                          <Popup>
                            <div className="text-center">
                              <div className="font-bold">{country.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {
                                  regions.find((r) => r.name === activeRegion)
                                    ?.displayName
                                }
                              </div>
                            </div>
                          </Popup>
                        </Marker>
                      ))}

                  <MapController position={mapCenter} zoom={mapZoom} />
                </MapContainer>
              </div>
            </div>

            {/* Right: Sidebar */}
            <div className="lg:col-span-1 bg-muted">
              <div className="p-6 h-[600px]">
                <div className="h-full flex flex-col">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {activeNationality} Immigration Programs
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Explore available immigration pathways and opportunities
                    </p>
                  </div>

                  <div className="flex-1 overflow-y-auto pr-2">
                    {/* ALL view */}
                    {activeRegion === "ALL" && (
                      <div className="space-y-4">
                        {regions
                          .filter((r) => r.name !== "ALL")
                          .map((region) => (
                            <button
                              key={region.name}
                              onClick={() => handleRegionClick(region)}
                              className="w-full text-left border rounded-lg p-3 bg-card hover:bg-muted transition-colors"
                              style={{ borderColor: "var(--border)" }}
                            >
                              <div className="flex items-center space-x-2 mb-2">
                                <div
                                  className="w-4 h-4 rounded-full"
                                  style={{ backgroundColor: region.color }}
                                />
                                <h4 className="font-semibold text-sm text-foreground">
                                  {region.displayName}
                                </h4>
                              </div>
                              <p className="text-xs text-muted-foreground mb-2">
                                {region.countries.length} countries
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {region.countries.slice(0, 3).map((c, idx) => (
                                  <span
                                    key={idx}
                                    className="text-xs bg-muted px-2 py-1 rounded"
                                  >
                                    {c.name}
                                  </span>
                                ))}
                                {region.countries.length > 3 && (
                                  <span className="text-xs text-muted-foreground">
                                    +{region.countries.length - 3} more
                                  </span>
                                )}
                              </div>
                            </button>
                          ))}
                      </div>
                    )}

                    {/* Canada province navigation */}
                    {activeRegion === "CANADA" && showProvinces && (
                      <div className="mb-6">
                        {activeProvince && (
                          <button
                            onClick={handleBackToCanada}
                            className="mb-3 text-blue-500 hover:text-blue-600 text-sm font-medium flex items-center space-x-1"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>Back to Canada</span>
                          </button>
                        )}

                        <h4 className="font-semibold text-foreground text-sm mb-3">
                          {activeProvince
                            ? canadianProvinces.find(
                                (p) => p.code === activeProvince
                              )?.name
                            : "Canadian Provinces & Territories"}
                        </h4>

                        {!activeProvince ? (
                          <div className="space-y-1">
                            {canadianProvinces.map((province, index) => (
                              <button
                                key={index}
                                onClick={() => handleProvinceClick(province)}
                                className="w-full rounded-md p-2 transition-colors duration-200 text-left bg-[color:var(--primary-light)] hover:opacity-90"
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-2">
                                    <div
                                      className="w-5 h-5 rounded-full flex items-center justify-center"
                                      style={{ background: tokens.red }}
                                    >
                                      <span className="text-primary-foreground text-xs font-bold">
                                        {province.code}
                                      </span>
                                    </div>
                                    <span className="font-medium text-foreground text-xs">
                                      {province.name}
                                    </span>
                                  </div>
                                  <svg
                                    className="w-3 h-3 text-muted-foreground"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                              </button>
                            ))}
                          </div>
                        ) : (
                          <div
                            className="rounded-lg p-4"
                            style={{
                              background:
                                "color-mix(in oklab, var(--btn-red) 12%, transparent)",
                            }}
                          >
                            <div className="flex items-center space-x-3 mb-3">
                              <div
                                className="w-8 h-8 rounded-full flex items-center justify-center"
                                style={{ background: tokens.red }}
                              >
                                <span className="text-primary-foreground text-sm font-bold">
                                  {activeProvince}
                                </span>
                              </div>
                              <div>
                                <h5
                                  className="font-semibold"
                                  style={{ color: tokens.red }}
                                >
                                  {
                                    canadianProvinces.find(
                                      (p) => p.code === activeProvince
                                    )?.name
                                  }
                                </h5>
                                <p
                                  className="text-xs"
                                  style={{ color: tokens.red }}
                                >
                                  Provincial Immigration Program
                                </p>
                              </div>
                            </div>
                            <p
                              className="text-sm"
                              style={{ color: tokens.red }}
                            >
                              {
                                canadianProvinces.find(
                                  (p) => p.code === activeProvince
                                )?.program
                              }
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Countries list for other regions */}
                    {activeRegion !== "CANADA" && activeRegion !== "ALL" && (
                      <div className="space-y-2">
                        {regions
                          .find((r) => r.name === activeRegion)
                          ?.countries?.map((country, i) => (
                            <div
                              key={i}
                              className="bg-muted rounded-md p-2 hover:opacity-90 transition"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <div
                                    className="w-4 h-4 rounded-full flex items-center justify-center"
                                    style={{
                                      backgroundColor: regions.find(
                                        (r) => r.name === activeRegion
                                      )?.color,
                                    }}
                                  >
                                    <div className="w-2 h-2 bg-card rounded-full" />
                                  </div>
                                  <span className="font-medium text-foreground text-xs">
                                    {country.name}
                                  </span>
                                </div>
                                <button className="text-blue-500 hover:text-blue-600 text-xs font-medium">
                                  Details
                                </button>
                              </div>
                            </div>
                          )) || (
                          <div className="text-center py-8">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                              <div
                                className="w-8 h-8 text-muted-foreground"
                                dangerouslySetInnerHTML={{
                                  __html: iconSvgs.globe,
                                }}
                              />
                            </div>
                            <p className="text-muted-foreground text-sm">
                              Select a region to view countries
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Programs */}
                    <div className="space-y-3 mt-4">
                      <h4 className="font-semibold text-foreground text-sm">
                        Available Programs:
                      </h4>
                      {regions
                        .find((r) => r.name === activeRegion)
                        ?.programs?.slice(0, 2)
                        .map((program, index) => (
                          <div
                            key={index}
                            className="rounded-lg p-3 border border-border bg-card"
                          >
                            <h5
                              className="font-medium text-sm mb-1"
                              style={{ color: tokens.accent }}
                            >
                              {program}
                            </h5>
                            <p className="text-xs text-muted-foreground">
                              Immigration program available
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-6 pt-4 border-t border-border">
                    {/* <button className="w-full bg-primary text-primary-foreground py-4 px-6 rounded-xl font-semibold text-sm hover:opacity-90 transition shadow-lg">
                      <div className="flex items-center justify-center space-x-2"> */}
                    <Button
                      variant="goldBlack"
                      className="w-full bg-primary text-primary-foreground py-6 px-8 rounded-xl font-semibold text-sm hover:opacity-90 transition shadow-lg"
                    >
                      <div className="absolute inset-[3px] rounded-[inherit] bg-[linear-gradient(135deg,#000,#111,#000)] shadow-[inset_0_3px_6px_rgba(0,0,0,0.9),inset_0_-1px_3px_rgba(255,255,255,0.08),0_1px_0_rgba(255,255,255,0.08)]" />
                      <span className="relative z-10 text-white font-bold">
                        Explore {activeNationality} Programs
                      </span>
                    </Button>
                    {/* </div>
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
            {/* /Right */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapComponent;
