"use client";
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, GeoJSON } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// A single source of truth for SVG icon strings with correct React attributes
const iconSvgs = {
  globe: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75H18a.75.75 0 000-1.5h-5.25V6z" clipRule="evenodd" /></svg>`,
  mapPin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 11.25a.75.75 0 01.75.75v5.04c0 .358-.328.647-.648.647-.32 0-.647-.289-.647-.647v-5.04a.75.75 0 01.75-.75zM12 21.75a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5zM12 2.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0V2.25zM2.25 12a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5h-1.5zM20.25 12a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5h-1.5zM6.621 5.621a.75.75 0 00-1.06 1.06l1.06 1.06a.75.75 0 001.06-1.06l-1.06-1.06zM18.379 17.379a.75.75 0 00-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM20.324 3.676a.75.75 0 00-1.06 1.06l.391.39a.75.75 0 001.06-1.06l-.39-.39zM3.676 20.324a.75.75 0 00-1.06 1.06l.39.39a.75.75 0 001.06-1.06l-.39-.39zM5.621 18.379a.75.75 0 00-1.06 1.06l1.06 1.06a.75.75 0 001.06-1.06l-1.06-1.06zM17.379 5.621a.75.75 0 00-1.06 1.06l1.06 1.06a.75.75 0 001.06-1.06l-1.06-1.06z" /></svg>`,
  plane: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M11.77 2.053a.75.75 0 011.46 0l2.553 4.595c.57.102.997.608.997 1.157v3.033c0 .549-.427 1.055-.997 1.157L13.23 15.012a.75.75 0 01-1.46 0L9.217 12.005c-.57-.102-.997-.608-.997-1.157V7.805c0-.549.427-1.055.997-1.157L11.77 2.053zM9.75 14.898V20c0 .414-.336.75-.75.75H6c-.414 0-.75-.336-.75-.75v-5.102c0-.395.19-.773.512-1.002L8.51 12.63c.273.197.49.467.68.775.14.227.247.472.327.73zM14.25 14.898V20c0 .414.336.75.75.75h3c.414 0 .75-.336.75-.75v-5.102c0-.395-.19-.773-.512-1.002l-2.752-1.996c-.273-.197-.49-.467-.68-.775-.14-.227-.247-.472-.327-.73z" /></svg>`,
  user: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M12.983 2.651c.324-.951 1.76-.951 2.084 0l.377 1.109a1.5 1.5 0 001.011.758l1.192.171c1.037.149 1.456 1.488.665 2.227l-.865.82c-.41.389-.593.986-.47 1.54l.24 1.192c.215 1.067-.714 1.96-1.745 1.716l-1.124-.27c-.506-.123-1.042.062-1.321.493l-.693 1.035a1.5 1.5 0 01-1.285.735h-1.583a1.5 1.5 0 01-1.285-.735l-.693-1.035c-.28-.43-.815-.615-1.32-.492l-1.125.27c-1.03.244-1.944-.648-1.745-1.715l.24-1.193c.123-.554-.06-1.149-.47-1.54l-.865-.82c-.79-.738-.371-2.077.665-2.226l1.192-.171a1.5 1.5 0 001.01-.758l.378-1.11c.324-.95 1.76-.95 2.084 0l.135.397a.75.75 0 00.704.475h1.272a.75.75 0 00.704-.475l.135-.397z" clipRule="evenodd" /></svg>`,
  compass: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M10.788 3.212a.75.75 0 010 1.06L7.66 7.404a.75.75 0 11-1.06-1.06l3.129-3.13a.75.75 0 011.06 0zm-4.512 4.512a.75.75 0 011.06 0l3.13 3.129a.75.75 0 11-1.06 1.06l-3.129-3.13a.75.75 0 010-1.06zM9.75 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75-4.365-9.75-9.75-9.75zM15 12a3 3 0 11-6 0 3 3 0 016 0z" clipRule="evenodd" /></svg>`,
  arrow: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clipRule="evenodd" /></svg>`,
  arrowRight: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`,
};

// Country GeoJSON data - simplified country boundaries
const countryBoundaries = {
  canada: {
    type: "Feature",
    properties: { NAME: "Canada", name: "Canada" },
    geometry: {
      type: "Polygon",
      coordinates: [[
        [-141.0, 60.0], [-141.0, 69.0], [-95.0, 69.0], [-95.0, 49.0], 
        [-125.0, 49.0], [-125.0, 60.0], [-141.0, 60.0]
      ]]
    }
  },
  usa: {
    type: "Feature", 
    properties: { NAME: "United States", name: "United States" },
    geometry: {
      type: "Polygon",
      coordinates: [[
        [-125.0, 32.0], [-125.0, 49.0], [-66.0, 49.0], [-66.0, 25.0],
        [-80.0, 25.0], [-80.0, 32.0], [-125.0, 32.0]
      ]]
    }
  },
  "Mexico": {
    "type": "Feature",
    "properties": { "name": "Mexico" },
    "geometry": {
      "type": "Polygon",
      "coordinates": [[[-117.0, 14.0], [-117.0, 32.0], [-86.0, 32.0], [-86.0, 14.0], [-117.0, 14.0]]]
    }
  },
  "Brazil": {
    "type": "Feature",
    "properties": { "name": "Brazil" },
    "geometry": {
      "type": "Polygon",
      "coordinates": [[[-74.0, -34.0], [-74.0, 5.0], [-34.0, 5.0], [-34.0, -34.0], [-74.0, -34.0]]]
    }
  },
  "United Kingdom": {
    "type": "Feature",
    "properties": { "name": "United Kingdom" },
    "geometry": {
      "type": "Polygon",
      "coordinates": [[[-8.0, 49.0], [-8.0, 61.0], [2.0, 61.0], [2.0, 49.0], [-8.0, 49.0]]]
    }
  },
  "Spain": {
    "type": "Feature",
    "properties": { "name": "Spain" },
    "geometry": {
      "type": "Polygon",
      "coordinates": [[[-9.0, 36.0], [-9.0, 44.0], [4.0, 44.0], [4.0, 36.0], [-9.0, 36.0]]]
    }
  },
  "Italy": {
    "type": "Feature",
    "properties": { "name": "Italy" },
    "geometry": {
      "type": "Polygon",
      "coordinates": [[[6.0, 36.0], [6.0, 47.0], [19.0, 47.0], [19.0, 36.0], [6.0, 36.0]]]
    }
  },
  "Australia": {
    "type": "Feature",
    "properties": { "name": "Australia" },
    "geometry": {
      "type": "Polygon",
      "coordinates": [[[113.0, -44.0], [113.0, -10.0], [154.0, -10.0], [154.0, -44.0], [113.0, -44.0]]]
    }
  },
  "New Zealand": {
    "type": "Feature",
    "properties": { "name": "New Zealand" },
    "geometry": {
      "type": "Polygon",
      "coordinates": [[[166.0, -47.0], [166.0, -34.0], [179.0, -34.0], [179.0, -47.0], [166.0, -47.0]]]
    }
  }
};

// Function to get country boundary data
const getCountryGeoJSON = async (countryName: string) => {
  // For production, you would fetch from a GeoJSON API like:
  // https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson
  // For now,};

// Canadian provinces and territories data
const canadianProvinces = [
  { name: "Alberta", coords: [53.9333, -116.5765] as [number, number], code: "AB", program: "Alberta Advantage Immigration Program (AAIP)" },
  { name: "British Columbia", coords: [53.7267, -127.6476] as [number, number], code: "BC", program: "BC Provincial Nominee Program (BC PNP)" },
  { name: "Manitoba", coords: [53.7609, -98.8139] as [number, number], code: "MB", program: "Manitoba Provincial Nominee Program (MPNP)" },
  { name: "New Brunswick", coords: [46.5653, -66.4619] as [number, number], code: "NB", program: "New Brunswick Provincial Nominee Program (NBPNP)" },
  { name: "Newfoundland and Labrador", coords: [53.1355, -57.6604] as [number, number], code: "NL", program: "Newfoundland and Labrador Provincial Nominee Program (NLPNP)" },
  { name: "Northwest Territories", coords: [61.2181, -113.5170] as [number, number], code: "NT", program: "Northwest Territories Nominee Program (NTNP)" },
  { name: "Nova Scotia", coords: [44.6820, -63.7443] as [number, number], code: "NS", program: "Nova Scotia Nominee Program (NSNP)" },
  { name: "Nunavut", coords: [70.2998, -83.1076] as [number, number], code: "NU", program: "Nunavut Immigration Program" },
  { name: "Ontario", coords: [51.2538, -85.3232] as [number, number], code: "ON", program: "Ontario Immigrant Nominee Program (OINP)" },
  { name: "Prince Edward Island", coords: [46.5107, -63.4168] as [number, number], code: "PE", program: "Prince Edward Island Provincial Nominee Program (PEI PNP)" },
  { name: "Quebec", coords: [53.9214, -73.2187] as [number, number], code: "QC", program: "Quebec Skilled Worker Program (QSWP)" },
  { name: "Saskatchewan", coords: [52.9399, -106.4509] as [number, number], code: "SK", program: "Saskatchewan Immigrant Nominee Program (SINP)" },
  { name: "Yukon", coords: [64.0685, -139.0686] as [number, number], code: "YT", program: "Yukon Nominee Program (YNP)" }
];

// Regions data with comprehensive country lists
const regions = [
  {
    name: "ALL",
    displayName: "All Countries",
    coords: [20.0, 0.0] as [number, number],
    zoom: 2,
    color: "#56736c",
    iconSvg: iconSvgs.globe,
    countries: [],
    programs: []
  },
  {
    name: "CANADA",
    displayName: "Canada Provincial Programs",
    coords: [56.1304, -106.3468] as [number, number],
    zoom: 3,
    color: "#e53e3e",
    iconSvg: iconSvgs.mapPin,
    countries: [
      { name: "Canada", coords: [56.1304, -106.3468] as [number, number] }
    ],
    provinces: canadianProvinces,
    programs: [
      "Provincial Nominee Program (PNP)",
      "Quebec Skilled Worker Program",
      "Atlantic Immigration Program",
      "Rural and Northern Immigration Pilot"
    ]
  },
  {
    name: "AMERICAS",
    displayName: "Americas Programs",
    coords: [15.0, -90.0] as [number, number],
    zoom: 2,
    color: "#82c91e",
    iconSvg: iconSvgs.mapPin,
    countries: [
      { name: "Mexico", coords: [23.6345, -102.5528] as [number, number] },
      { name: "USA", coords: [39.8283, -98.5795] as [number, number] },
      { name: "Brazil", coords: [-14.2350, -51.9253] as [number, number] },
      { name: "Panama", coords: [8.5380, -80.7821] as [number, number] },
      { name: "Paraguay", coords: [-23.4425, -58.4438] as [number, number] }
    ]
  },
  {
    name: "EMEA",
    displayName: "Europe, Middle East & Africa",
    coords: [50.0, 10.0] as [number, number],
    zoom: 2,
    color: "#3b82f6",
    iconSvg: iconSvgs.compass,
    countries: [
      // Europe
      { name: "Andorra", coords: [42.5063, 1.5218] as [number, number] },
      { name: "Austria", coords: [47.5162, 14.5501] as [number, number] },
      { name: "Cyprus", coords: [35.1264, 33.4299] as [number, number] },
      { name: "Greece", coords: [39.0742, 21.8243] as [number, number] },
      { name: "Hungary", coords: [47.1625, 19.5033] as [number, number] },
      { name: "Italy", coords: [41.8719, 12.5674] as [number, number] },
      { name: "Latvia", coords: [56.8796, 24.6032] as [number, number] },
      { name: "Malta", coords: [35.9375, 14.3754] as [number, number] },
      { name: "Moldova", coords: [47.4116, 28.3699] as [number, number] },
      { name: "North Macedonia", coords: [41.6086, 21.7453] as [number, number] },
      { name: "Portugal", coords: [39.3999, -8.2245] as [number, number] },
      { name: "Spain", coords: [40.4637, -3.7492] as [number, number] },
      { name: "Serbia", coords: [44.0165, 21.0059] as [number, number] },
      { name: "Switzerland", coords: [46.8182, 8.2275] as [number, number] },
      { name: "United Kingdom", coords: [55.3781, -3.4360] as [number, number] },
      // Middle East
      { name: "Jordan", coords: [30.5852, 36.2384] as [number, number] },
      { name: "Oman", coords: [21.4735, 55.9754] as [number, number] },
      { name: "Turkey", coords: [38.9637, 35.2433] as [number, number] },
      { name: "UAE", coords: [23.4241, 53.8478] as [number, number] },
      // Africa
      { name: "Egypt", coords: [26.0975, 31.2357] as [number, number] },
      { name: "Namibia", coords: [-22.9576, 18.4904] as [number, number] }
    ]
  },
  {
    name: "APAC",
    displayName: "Asia Pacific Programs",
    coords: [-10.0, 140.0] as [number, number],
    zoom: 2,
    color: "#e0a45c",
    iconSvg: iconSvgs.arrow,
    countries: [
      // North Asia
      { name: "Singapore", coords: [1.3521, 103.8198] as [number, number] },
      { name: "Thailand", coords: [15.8700, 100.9925] as [number, number] },
      // South Asia
      { name: "Cambodia", coords: [12.5657, 104.9910] as [number, number] },
      // Asia Pacific
      { name: "Australia", coords: [-25.2744, 133.7751] as [number, number] },
      { name: "Fiji", coords: [-16.7784, 179.4144] as [number, number] },
      { name: "Nauru", coords: [-0.5228, 166.9315] as [number, number] },
      { name: "New Zealand", coords: [-40.9006, 174.886] as [number, number] },
      { name: "Vanuatu", coords: [-15.3767, 166.9592] as [number, number] }
    ]
  },
  {
    name: "CARIBBEAN",
    displayName: "Caribbean Islands Programs",
    coords: [18.0, -66.0] as [number, number],
    zoom: 4,
    color: "#56736c",
    iconSvg: iconSvgs.plane,
    countries: [
      { name: "Anguilla", coords: [18.2206, -63.0686] as [number, number] },
      { name: "Antigua Barbuda", coords: [17.0608, -61.7964] as [number, number] },
      { name: "Curacao", coords: [12.1696, -68.9900] as [number, number] },
      { name: "Dominica", coords: [15.4150, -61.3710] as [number, number] },
      { name: "Grenada", coords: [12.1165, -61.6790] as [number, number] },
      { name: "Saint Lucia", coords: [13.9094, -60.9789] as [number, number] },
      { name: "St. Kitts and Nevis", coords: [17.3578, -62.7830] as [number, number] }
    ]
  },
  {
    name: "ALL",
    displayName: "All Countries",
    coords: [20.0, 0.0] as [number, number],
    zoom: 1,
    color: "#8b5cf6",
    iconSvg: iconSvgs.globe,
    countries: []
  }
];

const createCustomIcon = (iconSvg: string, color: string, size = 24) =>
  L.divIcon({
    html: `<div style="color: ${color}; font-size: ${size}px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">${iconSvg}</div>`,
    className: "custom-icon",
    iconSize: [size, size],
    iconAnchor: [size/2, size],
  });

// Polygon styling function
const getPolygonStyle = (color: string, isActive: boolean = false) => ({
  fillColor: color,
  weight: 2,
  opacity: 1,
  color: '#ffffff',
  dashArray: '',
  fillOpacity: isActive ? 0.8 : 0.6
});

// Enhanced polygon style with hover effects
const getPolygonStyleWithHover = (color: string, isActive: boolean = false) => ({
  fillColor: color,
  weight: 2,
  opacity: 1,
  color: '#ffffff',
  dashArray: '',
  fillOpacity: isActive ? 0.8 : 0.6,
  className: 'country-polygon'
});

function MapController({ position, zoom }: { position: [number, number], zoom: number }) {
  const map = useMap();
  
  useEffect(() => {
    if (map) {
      map.flyTo(position, zoom, {
        duration: 1.5,
      });
    }
  }, [map, position, zoom]);
  
  return null;
}

const MapComponent = () => {
  const [activeRegion, setActiveRegion] = useState("ALL");
  const [activeProvince, setActiveProvince] = useState<string | null>(null);
  const [showProvinces, setShowProvinces] = useState(false);
  const [mapCenter, setMapCenter] = useState([20.0, 0.0] as [number, number]);
  const [mapZoom, setMapZoom] = useState(2);
  const [countryPolygons, setCountryPolygons] = useState<any[]>([]);
  const [worldGeoJSON, setWorldGeoJSON] = useState<any>(null);

  // Load world GeoJSON data
  useEffect(() => {
    const loadWorldData = async () => {
      try {
        // Try multiple GeoJSON sources
        const sources = [
          'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson',
          'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson'
        ];
        
        let data = null;
        for (const source of sources) {
          try {
            const response = await fetch(source);
            data = await response.json();
            console.log('Loaded GeoJSON data from:', source);
            break;
          } catch (err) {
            console.log('Failed to load from:', source);
          }
        }
        
        if (data) {
          setWorldGeoJSON(data);
          console.log('GeoJSON features loaded:', data.features?.length);
        } else {
          console.log('All external sources failed, using fallback polygons');
          // Create fallback GeoJSON from our simplified boundaries
          const fallbackGeoJSON = {
            type: 'FeatureCollection',
            features: Object.values(countryBoundaries)
          };
          setWorldGeoJSON(fallbackGeoJSON);
        }
      } catch (error) {
        console.error('Error loading world data:', error);
        // Use fallback data
        const fallbackGeoJSON = {
          type: 'FeatureCollection',
          features: Object.values(countryBoundaries)
        };
        setWorldGeoJSON(fallbackGeoJSON);
      }
    };
    loadWorldData();
  }, []);

  // Filter countries based on active region
  const getFilteredCountries = (): any[] => {
    if (!worldGeoJSON || !worldGeoJSON.features) {
      console.log('No GeoJSON data available');
      return [];
    }
    
    console.log('Active region:', activeRegion);
    console.log('Available features:', worldGeoJSON.features.length);
    
    if (activeRegion === 'ALL') {
      const allCountries: any[] = [];
      regions.filter(r => r.name !== 'ALL').forEach(region => {
        region.countries.forEach(country => {
          const feature = worldGeoJSON.features.find((f: any) => {
            const name = f.properties.NAME || f.properties.NAME_EN || f.properties.name || f.properties.ADMIN;
            return name && (
              name.toLowerCase().includes(country.name.toLowerCase()) ||
              country.name.toLowerCase().includes(name.toLowerCase()) ||
              name.toLowerCase() === country.name.toLowerCase()
            );
          });
          if (feature) {
            console.log('Found feature for:', country.name, 'with color:', region.color);
            allCountries.push({ ...feature, regionColor: region.color, regionName: region.displayName });
          } else {
            console.log('No feature found for:', country.name);
          }
        });
      });
      console.log('Total countries found:', allCountries.length);
      return allCountries;
    }
    
    const activeRegionData = regions.find(r => r.name === activeRegion);
    if (!activeRegionData) return [];
    
    const filteredCountries: any[] = [];
    activeRegionData.countries.forEach(country => {
      const feature = worldGeoJSON.features.find((f: any) => {
        const name = f.properties.NAME || f.properties.NAME_EN || f.properties.name || f.properties.ADMIN;
        return name && (
          name.toLowerCase().includes(country.name.toLowerCase()) ||
          country.name.toLowerCase().includes(name.toLowerCase()) ||
          name.toLowerCase() === country.name.toLowerCase()
        );
      });
      if (feature) {
        console.log('Found feature for:', country.name, 'with color:', activeRegionData.color);
        filteredCountries.push({ ...feature, regionColor: activeRegionData.color, regionName: activeRegionData.displayName });
      } else {
        console.log('No feature found for:', country.name);
      }
    });
    console.log('Filtered countries found:', filteredCountries.length);
    return filteredCountries;
  };

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
        .leaflet-popup-content-wrapper {
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }
        .leaflet-popup-content {
          margin: 12px 16px;
          font-family: 'Inter', sans-serif;
        }
        .leaflet-popup-tip {
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
      `}</style>
      <div className="w-full h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <div className="max-w-7xl mx-auto h-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
            {/* Left Panel - Tabs + Map */}
            <div className="lg:col-span-2 space-y-4">
              {/* Region Tabs */}
              <div className="bg-white rounded-xl shadow-lg p-4">
                <div className="flex flex-wrap gap-2">
                  {regions.map((region) => (
                    <button
                      key={region.name}
                      onClick={() => handleRegionClick(region)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        activeRegion === region.name
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-4 h-4"
                          style={{ color: activeRegion === region.name ? "white" : region.color }}
                          dangerouslySetInnerHTML={{ __html: region.iconSvg }}
                        />
                        <span>{region.displayName}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden flex-1">
                <div className="h-full relative">
                  <MapContainer
                    center={mapCenter}
                    zoom={mapZoom}
                    scrollWheelZoom={true}
                    style={{ height: "100%", width: "100%" }}
                    className="rounded-xl"
                    worldCopyJump={true}
                  >
                  <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                  />

                  {/* Render country polygons */}
                  {worldGeoJSON && getFilteredCountries().map((countryFeature, index) => {
                    console.log('Rendering polygon for:', countryFeature.properties.NAME || countryFeature.properties.name, 'with color:', countryFeature.regionColor);
                    return (
                      <GeoJSON
                        key={`${activeRegion}-${countryFeature.properties.NAME || countryFeature.properties.name || index}`}
                        data={countryFeature}
                        style={() => {
                          const style = {
                            fillColor: countryFeature.regionColor,
                            weight: 2,
                            opacity: 1,
                            color: '#ffffff',
                            dashArray: '',
                            fillOpacity: 0.7
                          };
                          console.log('Applying style:', style);
                          return style;
                        }}
                        onEachFeature={(feature, layer) => {
                          layer.on({
                            mouseover: (e) => {
                              const layer = e.target;
                              layer.setStyle({
                                weight: 3,
                                color: '#ffffff',
                                dashArray: '',
                                fillOpacity: 0.9
                              });
                            },
                            mouseout: (e) => {
                              const layer = e.target;
                              layer.setStyle({
                                fillColor: countryFeature.regionColor,
                                weight: 2,
                                opacity: 1,
                                color: '#ffffff',
                                dashArray: '',
                                fillOpacity: 0.7
                              });
                            },
                            click: (e) => {
                              const layer = e.target;
                              const countryName = feature.properties.NAME || feature.properties.name || feature.properties.ADMIN;
                              layer.bindPopup(
                                `<div class="text-center font-medium">
                                  <div class="font-bold text-lg">${countryName}</div>
                                  <div class="text-sm mt-1" style="color: ${countryFeature.regionColor}">
                                    ${countryFeature.regionName}
                                  </div>
                                </div>`
                              ).openPopup();
                            }
                          });
                        }}
                      />
                    );
                  })}

                  {/* Fallback markers if GeoJSON fails to load */}
                  {!worldGeoJSON && activeRegion !== "ALL" && regions.find(r => r.name === activeRegion)?.countries.map((country) => (
                    <Marker
                      key={`fallback-${activeRegion}-${country.name}`}
                      position={country.coords}
                      icon={createCustomIcon(
                        iconSvgs.mapPin,
                        regions.find(r => r.name === activeRegion)?.color || "#56736c",
                        16
                      )}
                    >
                      <Popup>
                        <div className="text-center">
                          <div className="font-bold">{country.name}</div>
                          <div className="text-sm text-gray-600">
                            {regions.find(r => r.name === activeRegion)?.displayName}
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  ))}

                  {/* Show all countries when ALL is selected */}
                  {!worldGeoJSON && activeRegion === "ALL" && regions.filter(r => r.name !== 'ALL').map(region => 
                    region.countries.map((country) => (
                      <Marker
                        key={`all-${region.name}-${country.name}`}
                        position={country.coords}
                        icon={createCustomIcon(
                          iconSvgs.mapPin,
                          region.color,
                          12
                        )}
                      >
                        <Popup>
                          <div className="text-center">
                            <div className="font-bold">{country.name}</div>
                            <div className="text-sm text-gray-600">{region.displayName}</div>
                          </div>
                        </Popup>
                      </Marker>
                    ))
                  )}

                  {/* Show Canadian provinces when Canada is selected and provinces view is active */}
                  {activeRegion === "CANADA" && showProvinces && canadianProvinces.map((province) => (
                    <Marker
                      key={`province-${province.code}`}
                      position={province.coords}
                      icon={createCustomIcon(
                        iconSvgs.mapPin,
                        activeProvince === province.code ? "#dc2626" : "#e53e3e",
                        activeProvince === province.code ? 20 : 16
                      )}
                    >
                      <Popup>
                        <div className="text-center">
                          <div className="font-bold">{province.name}</div>
                          <div className="text-sm text-gray-600">{province.code}</div>
                          <div className="text-xs text-blue-600 mt-1">{province.program}</div>
                        </div>
                      </Popup>
                    </Marker>
                  ))}

                  <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                  />

                  {/* Render country polygons */}
                  {worldGeoJSON && getFilteredCountries().map((countryFeature, index) => {
                    console.log('Rendering polygon for:', countryFeature.properties.NAME || countryFeature.properties.name, 'with color:', countryFeature.regionColor);
                    return (
                      <GeoJSON
                        key={`${activeRegion}-${countryFeature.properties.NAME || countryFeature.properties.name || index}`}
                        data={countryFeature}
                        style={() => {
                          const style = {
                            fillColor: countryFeature.regionColor,
                            weight: 2,
                            opacity: 1,
                            color: '#ffffff',
                            dashArray: '',
                            fillOpacity: 0.7
                          };
                          console.log('Applying style:', style);
                          return style;
                        }}
                        onEachFeature={(feature, layer) => {
                          layer.on({
                            mouseover: (e) => {
                              const layer = e.target;
                              layer.setStyle({
                                weight: 3,
                                color: '#ffffff',
                                dashArray: '',
                                fillOpacity: 0.9
                              });
                            },
                            mouseout: (e) => {
                              const layer = e.target;
                              layer.setStyle({
                                fillColor: countryFeature.regionColor,
                                weight: 2,
                                opacity: 1,
                                color: '#ffffff',
                                dashArray: '',
                                fillOpacity: 0.7
                              });
                            },
                            click: (e) => {
                              const layer = e.target;
                              const countryName = feature.properties.NAME || feature.properties.name || feature.properties.ADMIN;
                              layer.bindPopup(
                                `<div class="text-center font-medium">
                                  <div class="font-bold text-lg">${countryName}</div>
                                  <div class="text-sm mt-1" style="color: ${countryFeature.regionColor}">
                                    ${countryFeature.regionName}
                                  </div>
                                </div>`
                              ).openPopup();
                            }
                          });
                        }}
                      />
                    );
                  })}

                  {/* Fallback markers if GeoJSON fails to load */}
                  {!worldGeoJSON && activeRegion !== "ALL" && regions.find(r => r.name === activeRegion)?.countries.map((country) => (
                    <Marker
                      key={`fallback-${activeRegion}-${country.name}`}
                      position={country.coords}
                      icon={createCustomIcon(
                        iconSvgs.mapPin,
                        regions.find(r => r.name === activeRegion)?.color || "#56736c",
                        16
                      )}
                    >
                      <Popup>
                        <div className="text-center">
                          <div className="font-bold">{country.name}</div>
                          <div className="text-sm text-gray-600">{regions.find(r => r.name === activeRegion)?.displayName}</div>
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
            <div className="bg-white rounded-xl shadow-lg p-6 h-full">
              <div className="h-full flex flex-col">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    {regions.find(r => r.name === activeRegion)?.displayName || 'All Programs'}
                  </h3>
                  
                  {/* Canada Provinces Navigation */}
                  {activeRegion === "CANADA" && showProvinces && (
                    <div className="mb-6">
                      {activeProvince && (
                        <button 
                          onClick={handleBackToCanada}
                          className="mb-3 text-blue-500 hover:text-blue-600 text-sm font-medium flex items-center space-x-1"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>Back to Canada</span>
                        </button>
                      )}
                      
                      <h4 className="font-semibold text-gray-700 text-sm mb-3">
                        {activeProvince ? 
                          canadianProvinces.find(p => p.code === activeProvince)?.name : 
                          "Canadian Provinces & Territories"
                        }
                      </h4>
                      
                      {!activeProvince ? (
                        <div className="space-y-2">
                          {canadianProvinces.map((province, index) => (
                            <button
                              key={index}
                              onClick={() => handleProvinceClick(province)}
                              className="w-full bg-red-50 hover:bg-red-100 rounded-lg p-3 transition-colors duration-200 text-left"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">{province.code}</span>
                                  </div>
                                  <span className="font-medium text-gray-800 text-sm">{province.name}</span>
                                </div>
                                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-red-50 rounded-lg p-4">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
                              <span className="text-white text-sm font-bold">{activeProvince}</span>
                            </div>
                            <div>
                              <h5 className="font-semibold text-red-800">
                                {canadianProvinces.find(p => p.code === activeProvince)?.name}
                              </h5>
                              <p className="text-red-600 text-xs">Provincial Immigration Program</p>
                            </div>
                          </div>
                          <p className="text-red-700 text-sm">
                            {canadianProvinces.find(p => p.code === activeProvince)?.program}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Countries List for other regions */}
                  {activeRegion !== "CANADA" && (
                    <div className="space-y-3 mb-6">
                      {regions.find(r => r.name === activeRegion)?.countries?.map((country, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors duration-200">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div 
                                className="w-6 h-6 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: regions.find(r => r.name === activeRegion)?.color }}
                              >
                                <div className="w-3 h-3 bg-white rounded-full"></div>
                              </div>
                              <span className="font-medium text-gray-800 text-sm">{country.name}</span>
                            </div>
                            <button className="text-blue-500 hover:text-blue-600 text-xs font-medium">
                              View Details
                            </button>
                          </div>
                        </div>
                      )) || (
                        <div className="text-center py-8">
                          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                            <div className="w-8 h-8 text-gray-400" dangerouslySetInnerHTML={{ __html: iconSvgs.globe }} />
                          </div>
                          <p className="text-gray-500 text-sm">Select a region to view countries</p>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Programs */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-700 text-sm">Available Programs:</h4>
                    {regions.find(r => r.name === activeRegion)?.programs?.slice(0, 2).map((program, index) => (
                      <div key={index} className="bg-blue-50 rounded-lg p-3">
                        <h5 className="font-medium text-blue-800 text-sm mb-1">{program}</h5>
                        <p className="text-blue-600 text-xs">Immigration program available</p>
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
    </>
  );
};

export default MapComponent;
                      <div key={index} className="bg-blue-50 rounded-lg p-3">
                        <h5 className="font-medium text-blue-800 text-sm mb-1">{typeof program === 'string' ? program : program.name}</h5>
                        <p className="text-blue-600 text-xs">{typeof program === 'string' ? 'Immigration program available' : program.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group">
                    <div className="flex items-center justify-center space-x-2">
                      <span>Explore Programs</span>
                      <div className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                        </svg>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Panel - Country Details */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 h-full">
                <div className="h-full flex flex-col">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      {regions.find(r => r.name === activeRegion)?.displayName || 'All Programs'}
                    </h3>
                    
                    {/* Canada Provinces Navigation */}
                    {activeRegion === "CANADA" && showProvinces && (
                      <div className="mb-6">
                        {activeProvince && (
                          <button 
                            onClick={handleBackToCanada}
                            className="mb-3 text-blue-500 hover:text-blue-600 text-sm font-medium flex items-center space-x-1"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>Back to Canada</span>
                          </button>
                        )}
                        
                        <h4 className="font-semibold text-gray-700 text-sm mb-3">
                          {activeProvince ? 
                            canadianProvinces.find(p => p.code === activeProvince)?.name : 
                            "Canadian Provinces & Territories"
                          }
                        </h4>
                        
                        {!activeProvince ? (
                          <div className="space-y-2">
                            {canadianProvinces.map((province, index) => (
                              <button
                                key={index}
                                onClick={() => handleProvinceClick(province)}
                                className="w-full bg-red-50 hover:bg-red-100 rounded-lg p-3 transition-colors duration-200 text-left"
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-3">
                                    <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                                      <span className="text-white text-xs font-bold">{province.code}</span>
                                    </div>
                                    <span className="font-medium text-gray-800 text-sm">{province.name}</span>
                                  </div>
                                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                  </svg>
                                </div>
                              </button>
                            ))}
                          </div>
                        ) : (
                          <div className="bg-red-50 rounded-lg p-4">
                            <div className="flex items-center space-x-3 mb-3">
                              <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
                                <span className="text-white text-sm font-bold">{activeProvince}</span>
                              </div>
                              <div>
                                <h5 className="font-semibold text-red-800">
                                  {canadianProvinces.find(p => p.code === activeProvince)?.name}
                                </h5>
                                <p className="text-red-600 text-xs">Provincial Immigration Program</p>
                              </div>
                            </div>
                            <p className="text-red-700 text-sm">
                              {canadianProvinces.find(p => p.code === activeProvince)?.program}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Countries List for other regions */}
                    {activeRegion !== "CANADA" && (
                      <div className="space-y-3 mb-6">
                        {regions.find(r => r.name === activeRegion)?.countries?.map((country, index) => (
                          <div key={index} className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors duration-200">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div 
                                  className="w-6 h-6 rounded-full flex items-center justify-center"
                                  style={{ backgroundColor: regions.find(r => r.name === activeRegion)?.color }}
                                >
                                  <div className="w-3 h-3 bg-white rounded-full"></div>
                                </div>
                                <span className="font-medium text-gray-800 text-sm">{country.name}</span>
                              </div>
                              <button className="text-blue-500 hover:text-blue-600 text-xs font-medium">
                                View Details
                              </button>
                            </div>
                          </div>
                        )) || (
                          <div className="text-center py-8">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                              <div className="w-8 h-8 text-gray-400" dangerouslySetInnerHTML={{ __html: iconSvgs.globe }} />
                            </div>
                            <p className="text-gray-500 text-sm">Select a region to view countries</p>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Programs */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-700 text-sm">Available Programs:</h4>
                      {regions.find(r => r.name === activeRegion)?.programs?.slice(0, 2).map((program, index) => (
                        <div key={index} className="bg-blue-50 rounded-lg p-3">
                          <h5 className="font-medium text-blue-800 text-sm mb-1">{program}</h5>
                          <p className="text-blue-600 text-xs">Immigration program available</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group">
                      <div className="flex items-center justify-center space-x-2">
                        <span>Explore Programs</span>
                        <div className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300">
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                          </svg>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MapComponent;
