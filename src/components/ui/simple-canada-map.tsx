"use client";

import * as React from "react";
import dynamic from "next/dynamic";

// Dynamic imports to prevent SSR issues
const MapContainer = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false }
);

export default function SimpleCanadaMap() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    // Load Leaflet CSS
    if (typeof document !== 'undefined') {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }
  }, []);

  if (!mounted) {
    return (
      <div className="h-[600px] w-full flex items-center justify-center bg-card rounded-xl border border-border shadow-lg backdrop-blur-sm">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          <div className="text-muted-foreground font-medium">Loading interactive map...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group">
      {/* Premium container with glass effect */}
      <div className="h-[600px] w-full rounded-xl overflow-hidden shadow-2xl border border-border/50 backdrop-blur-sm bg-card/95 hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
        {/* Gradient overlay for premium look */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none z-10 rounded-xl"></div>
        
        {/* Map container */}
        <div className="relative h-full w-full">
          <MapContainer
            center={[56.1304, -106.3468]} // Center of Canada
            zoom={4} // Good zoom level to see all of Canada
            style={{ 
              height: "100%", 
              width: "100%",
              borderRadius: "0.75rem"
            }}
            zoomControl={true}
            scrollWheelZoom={true}
            dragging={true}
            attributionControl={true}
            className="rounded-xl"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
          </MapContainer>
        </div>

        {/* Premium corner accent */}
        <div className="absolute top-4 right-4 w-3 h-3 bg-primary rounded-full opacity-60 z-20"></div>
        <div className="absolute top-4 right-4 w-3 h-3 bg-primary rounded-full animate-ping opacity-30 z-20"></div>
      </div>

      {/* Floating label */}
      <div className="absolute bottom-4 left-4 z-30">
        <div className="bg-card/90 backdrop-blur-md border border-border/50 rounded-lg px-3 py-2 shadow-lg">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-foreground">Interactive Canada Map</span>
          </div>
        </div>
      </div>
    </div>
  );
}
