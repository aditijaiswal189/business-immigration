"use client";
import React, { useState, useEffect } from "react";
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

// SVG icon strings
const iconSvgs = {
  globe: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75H18a.75.75 0 000-1.5h-5.25V6z" clipRule="evenodd" /></svg>`,
  mapPin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 11.25a.75.75 0 01.75.75v5.04c0 .358-.328.647-.648.647-.32 0-.647-.289-.647-.647v-5.04a.75.75 0 01.75-.75z" /></svg>`,
  arrowRight: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`,
};

// Canadian provinces data
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

// Regions data
const regions = [
  {
    name: "ALL",
    displayName: "All Regions",
    coords: [20.0, 0.0] as [number, number],
    zoom: 2,
    color: "#56736c",
    iconSvg: iconSvgs.globe,
    countries: [],
    programs: [],
  },
  {
    name: "CANADA",
    displayName: "Canada Provincial Programs",
    coords: [56.1304, -106.3468] as [number, number],
    zoom: 3,
    color: "#e53e3e",
    iconSvg: iconSvgs.mapPin,
    countries: [
      { name: "Canada", coords: [56.1304, -106.3468] as [number, number] },
    ],
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
    coords: [15.0, -90.0] as [number, number],
    zoom: 3,
    color: "#3b82f6",
    iconSvg: iconSvgs.mapPin,
    countries: [
      {
        name: "United States",
        coords: [39.8283, -98.5795] as [number, number],
      },
      { name: "Mexico", coords: [23.6345, -102.5528] as [number, number] },
      { name: "Brazil", coords: [-14.235, -51.9253] as [number, number] },
      { name: "Panama", coords: [8.538, -80.7821] as [number, number] },
      { name: "Paraguay", coords: [-23.4425, -58.4438] as [number, number] },
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
    coords: [54.526, 15.2551] as [number, number],
    zoom: 3,
    color: "#8b5cf6",
    iconSvg: iconSvgs.mapPin,
    countries: [
      // Europe
      { name: "Andorra", coords: [42.5462, 1.6016] as [number, number] },
      { name: "Austria", coords: [47.5162, 14.5501] as [number, number] },
      { name: "Cyprus", coords: [35.1264, 33.4299] as [number, number] },
      { name: "Greece", coords: [39.0742, 21.8243] as [number, number] },
      { name: "Hungary", coords: [47.1625, 19.5033] as [number, number] },
      { name: "Italy", coords: [41.8719, 12.5674] as [number, number] },
      { name: "Latvia", coords: [56.8796, 24.6032] as [number, number] },
      { name: "Malta", coords: [35.9375, 14.3754] as [number, number] },
      { name: "Moldova", coords: [47.4116, 28.3699] as [number, number] },
      {
        name: "North Macedonia",
        coords: [41.6086, 21.7453] as [number, number],
      },
      { name: "Portugal", coords: [39.3999, -8.2245] as [number, number] },
      { name: "Spain", coords: [40.4637, -3.7492] as [number, number] },
      { name: "Serbia", coords: [44.0165, 21.0059] as [number, number] },
      { name: "Switzerland", coords: [46.8182, 8.2275] as [number, number] },
      { name: "United Kingdom", coords: [55.3781, -3.436] as [number, number] },
      // Middle East
      { name: "Jordan", coords: [30.5852, 36.2384] as [number, number] },
      { name: "Oman", coords: [21.4735, 55.9754] as [number, number] },
      { name: "Turkey", coords: [38.9637, 35.2433] as [number, number] },
      {
        name: "United Arab Emirates",
        coords: [23.4241, 53.8478] as [number, number],
      },
      // Africa
      { name: "Egypt", coords: [26.0975, 31.2357] as [number, number] },
      { name: "Namibia", coords: [-22.9576, 18.4904] as [number, number] },
      // Caribbean (Cayman Islands)
      {
        name: "Cayman Islands",
        coords: [19.3133, -81.2546] as [number, number],
      },
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
    coords: [-25.2744, 133.7751] as [number, number],
    zoom: 3,
    color: "#d1a97a",
    iconSvg: iconSvgs.mapPin,
    countries: [
      // North Asia
      { name: "Singapore", coords: [1.3521, 103.8198] as [number, number] },
      { name: "Thailand", coords: [15.87, 100.9925] as [number, number] },
      // South Asia
      { name: "Cambodia", coords: [12.5657, 104.991] as [number, number] },
      // Asia Pacific
      { name: "Australia", coords: [-25.2744, 133.7751] as [number, number] },
      { name: "Fiji", coords: [-16.578, 179.4144] as [number, number] },
      { name: "Nauru", coords: [-0.5228, 166.9315] as [number, number] },
      { name: "New Zealand", coords: [-40.9006, 174.886] as [number, number] },
      { name: "Vanuatu", coords: [-15.3767, 166.9592] as [number, number] },
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
    coords: [21.4691, -78.6569] as [number, number],
    zoom: 4,
    color: "#10b981",
    iconSvg: iconSvgs.mapPin,
    countries: [
      { name: "Anguilla", coords: [18.2206, -63.0686] as [number, number] },
      {
        name: "Antigua and Barbuda",
        coords: [17.0608, -61.7964] as [number, number],
      },
      { name: "Curacao", coords: [12.1696, -68.99] as [number, number] },
      { name: "Dominica", coords: [15.414, -61.371] as [number, number] },
      { name: "Grenada", coords: [12.2628, -61.6043] as [number, number] },
      { name: "Saint Lucia", coords: [13.9094, -60.9789] as [number, number] },
      {
        name: "Saint Kitts and Nevis",
        coords: [17.3578, -62.783] as [number, number],
      },
    ],
    programs: [
      "Citizenship by Investment Programs",
      "Economic Citizenship",
      "Real Estate Investment Visas",
    ],
  },
];

// Map controller component
const MapController = ({
  position,
  zoom,
}: {
  position: [number, number];
  zoom: number;
}) => {
  const map = useMap();

  useEffect(() => {
    map.flyTo(position, zoom, {
      duration: 1.5,
      easeLinearity: 0.25,
    });
  }, [map, position, zoom]);

  return null;
};

// Create custom icon
const createCustomIcon = (
  svgString: string,
  color: string,
  size: number = 24
) => {
  const svgWithColor = svgString.replace(/currentColor/g, color);

  return L.divIcon({
    html: `<div style="color: ${color}; width: ${size}px; height: ${size}px;">${svgWithColor}</div>`,
    className: "custom-div-icon",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};

const MapComponent = () => {
  const [activeRegion, setActiveRegion] = useState("ALL");
  const [activeProvince, setActiveProvince] = useState<string | null>(null);
  const [showProvinces, setShowProvinces] = useState(false);
  const [mapCenter, setMapCenter] = useState([20.0, 0.0] as [number, number]);
  const [mapZoom, setMapZoom] = useState(2);
  const [worldGeoJSON, setWorldGeoJSON] = useState<any>(null);

  // Load world GeoJSON data
  useEffect(() => {
    const loadGeoJSON = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"
        );
        const data = await response.json();
        setWorldGeoJSON(data);
      } catch (error) {
        console.error("Failed to load world GeoJSON:", error);
      }
    };

    loadGeoJSON();
  }, []);

  const handleRegionClick = (region: any) => {
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

  const handleProvinceClick = (province: any) => {
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

    // Show all countries from all regions when "ALL" is selected
    if (activeRegion === "ALL") {
      const allCountries: any[] = [];

      regions
        .filter((r) => r.name !== "ALL" && r.name !== "CARIBBEAN")
        .forEach((region) => {
          region.countries.forEach((country) => {
            const feature = worldGeoJSON.features.find(
              (f: any) => {
                const countryName = country.name.toLowerCase();
                const featureName = (f.properties.NAME || f.properties.name || f.properties.ADMIN || '').toLowerCase();
                
                // Exact match
                if (featureName === countryName) return true;
                
                // Fallback: partial match
                return featureName.includes(countryName) || countryName.includes(featureName);
              }
            );

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

    // Skip GeoJSON polygons for Caribbean - use custom polygons instead
    if (activeRegion === "CARIBBEAN") {
      return [];
    }

    const activeRegionData = regions.find((r) => r.name === activeRegion);
    if (!activeRegionData) return [];

    const filteredCountries: any[] = [];

    activeRegionData.countries.forEach((country) => {
      const feature = worldGeoJSON.features.find(
        (f: any) => {
          const countryName = country.name.toLowerCase();
          const featureName = (f.properties.NAME || f.properties.name || f.properties.ADMIN || '').toLowerCase();
          
          // Exact match
          if (featureName === countryName) return true;
          
          // Fallback: partial match
          return featureName.includes(countryName) || countryName.includes(featureName);
        }
      );

      if (feature) {
        filteredCountries.push({
          ...feature,
          regionColor: activeRegionData.color,
          regionName: activeRegionData.displayName,
        });
      }
    });

    return filteredCountries;
  };

  const getPolygonStyle = (regionColor: string) => ({
    fillColor: regionColor,
    weight: 2,
    opacity: 1,
    color: "#ffffff",
    dashArray: "",
    fillOpacity: 0.7,
  });

  return (
    <>
      <style jsx global>{`
        .country-polygon {
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .country-polygon:hover {
          filter: brightness(1.1);
          transform: scale(1.02);
        }
        .custom-div-icon {
          background: none !important;
          border: none !important;
        }
        .leaflet-popup-content-wrapper {
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        .leaflet-popup-content {
          margin: 12px 16px;
          font-family: system-ui, -apple-system, sans-serif;
        }
        .leaflet-container {
          z-index: 1 !important;
        }
        .leaflet-control-container {
          z-index: 2 !important;
        }
      `}</style>

      <section className="w-full bg-gradient-to-br from-gray-50 to-blue-50 py-8 mt-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[500px]">
            {/* Left Panel - Map and Tabs */}
            <div className="lg:col-span-2 h-[500px]">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col">
                {/* Region Tabs */}
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <div className="flex flex-wrap gap-1">
                    {regions.map((region) => (
                      <button
                        key={region.name}
                        onClick={() => handleRegionClick(region)}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                          activeRegion === region.name
                            ? "text-white shadow-sm"
                            : "bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                        }`}
                        style={{
                          backgroundColor:
                            activeRegion === region.name
                              ? region.color
                              : undefined,
                        }}
                      >
                        <div className="flex items-center space-x-1">
                          <div
                            className="w-3 h-3"
                            dangerouslySetInnerHTML={{ __html: region.iconSvg }}
                          />
                          <span>{region.displayName}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Map Container */}
                <div className="flex-1 relative ">
                  <MapContainer
                    center={mapCenter}
                    zoom={mapZoom}
                    className="w-full h-88"
                    zoomControl={true}
                    scrollWheelZoom={true}
                  >
                    <TileLayer
                      url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    />

                    {/* Render country polygons */}
                    {worldGeoJSON &&
                      getFilteredCountries().map((countryFeature, index) => (
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
                              mouseover: (e) => {
                                const layer = e.target;
                                layer.setStyle({
                                  weight: 3,
                                  color: "#ffffff",
                                  dashArray: "",
                                  fillOpacity: 0.9,
                                });
                              },
                              mouseout: (e) => {
                                const layer = e.target;
                                layer.setStyle(
                                  getPolygonStyle(countryFeature.regionColor)
                                );
                              },
                              click: (e) => {
                                const layer = e.target;
                                const countryName =
                                  feature.properties.NAME ||
                                  feature.properties.name ||
                                  feature.properties.ADMIN;
                                layer
                                  .bindPopup(
                                    `<div class="text-center font-medium">
                                  <div class="font-bold text-lg">${countryName}</div>
                                  <div class="text-sm mt-1" style="color: ${countryFeature.regionColor}">
                                    ${countryFeature.regionName}
                                  </div>
                                </div>`
                                  )
                                  .openPopup();
                              },
                            });
                          }}
                        />
                      ))}

                    {/* Show Canadian provinces when Canada is selected */}
                    {activeRegion === "CANADA" &&
                      showProvinces &&
                      canadianProvinces.map((province) => (
                        <Marker
                          key={`province-${province.code}`}
                          position={province.coords}
                          icon={createCustomIcon(
                            iconSvgs.mapPin,
                            activeProvince === province.code
                              ? "#dc2626"
                              : "#e53e3e",
                            activeProvince === province.code ? 20 : 16
                          )}
                        >
                          <Popup>
                            <div className="text-center">
                              <div className="font-bold">{province.name}</div>
                              <div className="text-sm text-gray-600">
                                {province.code}
                              </div>
                              <div className="text-xs text-blue-600 mt-1">
                                {province.program}
                              </div>
                            </div>
                          </Popup>
                        </Marker>
                      ))}

                    {/* Caribbean Islands polygons - create custom polygons for small islands */}
                    {activeRegion === "CARIBBEAN" &&
                      regions
                        .find((r) => r.name === "CARIBBEAN")
                        ?.countries.map((country) => {
                          // Create small circular polygons for Caribbean islands
                          const [lat, lng] = country.coords;
                          const radius = 0.3; // Adjust size as needed
                          const points = 20;
                          const coordinates = [];
                          
                          for (let i = 0; i < points; i++) {
                            const angle = (i / points) * 2 * Math.PI;
                            const latOffset = radius * Math.cos(angle);
                            const lngOffset = radius * Math.sin(angle) / Math.cos(lat * Math.PI / 180);
                            coordinates.push([lat + latOffset, lng + lngOffset]);
                          }
                          coordinates.push(coordinates[0]); // Close the polygon
                          
                          const polygonGeoJSON = {
                            type: "Feature" as const,
                            properties: { NAME: country.name },
                            geometry: {
                              type: "Polygon" as const,
                              coordinates: [coordinates]
                            }
                          };
                          
                          return (
                            <GeoJSON
                              key={`caribbean-polygon-${country.name}`}
                              data={polygonGeoJSON}
                              style={() => ({
                                fillColor: "#10b981",
                                weight: 2,
                                opacity: 1,
                                color: "#ffffff",
                                dashArray: "",
                                fillOpacity: 0.7,
                              })}
                              onEachFeature={(feature, layer) => {
                                layer.on({
                                  mouseover: (e) => {
                                    const layer = e.target;
                                    layer.setStyle({
                                      weight: 3,
                                      color: "#ffffff",
                                      dashArray: "",
                                      fillOpacity: 0.9,
                                    });
                                  },
                                  mouseout: (e) => {
                                    const layer = e.target;
                                    layer.setStyle({
                                      fillColor: "#10b981",
                                      weight: 2,
                                      opacity: 1,
                                      color: "#ffffff",
                                      dashArray: "",
                                      fillOpacity: 0.7,
                                    });
                                  },
                                  click: (e) => {
                                    const layer = e.target;
                                    layer
                                      .bindPopup(
                                        `<div class="text-center font-medium">
                                          <div class="font-bold text-lg">${country.name}</div>
                                          <div class="text-sm mt-1" style="color: #10b981">
                                            Caribbean Islands
                                          </div>
                                          <div class="text-xs text-gray-600 mt-1">
                                            Citizenship by Investment Programs
                                          </div>
                                        </div>`
                                      )
                                      .openPopup();
                                  },
                                });
                              }}
                            />
                          );
                        })}

                    {/* Fallback markers if GeoJSON fails to load */}
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
                                ?.color || "#56736c",
                              16
                            )}
                          >
                            <Popup>
                              <div className="text-center">
                                <div className="font-bold">{country.name}</div>
                                <div className="text-sm text-gray-600">
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
            </div>

            {/* Right Panel - Country Details */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-4 h-[500px]">
                <div className="h-full flex flex-col">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">
                    {regions.find((r) => r.name === activeRegion)
                      ?.displayName || "All Programs"}
                  </h3>
                  <div className="flex-1 overflow-y-auto pr-2 h-[400px]">
                    {/* All Regions View */}
                    {activeRegion === "ALL" && (
                      <div className="space-y-4">
                        {regions
                          .filter((r) => r.name !== "ALL")
                          .map((region) => (
                            <div
                              key={region.name}
                              className="border rounded-lg p-3"
                              style={{ borderColor: region.color }}
                            >
                              <div className="flex items-center space-x-2 mb-2">
                                <div
                                  className="w-4 h-4 rounded-full"
                                  style={{ backgroundColor: region.color }}
                                />
                                <h4 className="font-semibold text-sm text-gray-800">
                                  {region.displayName}
                                </h4>
                              </div>
                              <p className="text-xs text-gray-600 mb-2">
                                {region.countries.length} countries
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {region.countries
                                  .slice(0, 3)
                                  .map((country, idx) => (
                                    <span
                                      key={idx}
                                      className="text-xs bg-gray-100 px-2 py-1 rounded"
                                    >
                                      {country.name}
                                    </span>
                                  ))}
                                {region.countries.length > 3 && (
                                  <span className="text-xs text-gray-500">
                                    +{region.countries.length - 3} more
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                      </div>
                    )}

                    {/* Canada Provinces Navigation */}
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

                        <h4 className="font-semibold text-gray-700 text-sm mb-3">
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
                                className="w-full bg-red-50 hover:bg-red-100 rounded-md p-2 transition-colors duration-200 text-left"
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-2">
                                    <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                                      <span className="text-white text-xs font-bold">
                                        {province.code}
                                      </span>
                                    </div>
                                    <span className="font-medium text-gray-800 text-xs">
                                      {province.name}
                                    </span>
                                  </div>
                                  <svg
                                    className="w-3 h-3 text-gray-400"
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
                          <div className="bg-red-50 rounded-lg p-4">
                            <div className="flex items-center space-x-3 mb-3">
                              <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
                                <span className="text-white text-sm font-bold">
                                  {activeProvince}
                                </span>
                              </div>
                              <div>
                                <h5 className="font-semibold text-red-800">
                                  {
                                    canadianProvinces.find(
                                      (p) => p.code === activeProvince
                                    )?.name
                                  }
                                </h5>
                                <p className="text-red-600 text-xs">
                                  Provincial Immigration Program
                                </p>
                              </div>
                            </div>
                            <p className="text-red-700 text-sm">
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

                    {/* Countries List for other regions */}
                    {activeRegion !== "CANADA" && activeRegion !== "ALL" && (
                      <div className="space-y-2">
                        {regions
                          .find((r) => r.name === activeRegion)
                          ?.countries?.map((country, index) => (
                            <div
                              key={index}
                              className="bg-gray-50 rounded-md p-2 hover:bg-gray-100 transition-colors duration-200"
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
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                  </div>
                                  <span className="font-medium text-gray-800 text-xs">
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
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                              <div
                                className="w-8 h-8 text-gray-400"
                                dangerouslySetInnerHTML={{
                                  __html: iconSvgs.globe,
                                }}
                              />
                            </div>
                            <p className="text-gray-500 text-sm">
                              Select a region to view countries
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Programs */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-700 text-sm">
                        Available Programs:
                      </h4>
                      {regions
                        .find((r) => r.name === activeRegion)
                        ?.programs?.slice(0, 2)
                        .map((program, index) => (
                          <div
                            key={index}
                            className="bg-blue-50 rounded-lg p-3"
                          >
                            <h5 className="font-medium text-blue-800 text-sm mb-1">
                              {program}
                            </h5>
                            <p className="text-blue-600 text-xs">
                              Immigration program available
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Explore Programs Button */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold text-sm hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                      Explore Programs
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MapComponent;
