"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, Globe, MapPin } from "lucide-react";

interface RegionNavItem {
  name: string;
  href: string;
  countries?: CountryNavItem[];
}

interface CountryNavItem {
  name: string;
  href: string;
  flag?: string;
}

const regions: RegionNavItem[] = [
  {
    name: "Americas",
    href: "/americas",
    countries: [
      { name: "Canada", href: "/canada", flag: "🇨🇦" },
      { name: "USA", href: "/americas/usa", flag: "🇺🇸" },
      { name: "Paraguay", href: "/americas/paraguay", flag: "🇵🇾" },
      { name: "Panama", href: "/americas/panama", flag: "🇵🇦" },
      { name: "Brazil", href: "/americas/brazil", flag: "🇧🇷" },
      { name: "Mexico", href: "/americas/mexico", flag: "🇲🇽" },
    ]
  },
  {
    name: "EMEA",
    href: "/emea",
    countries: [
      { name: "Malta", href: "/emea/malta", flag: "🇲🇹" },
      { name: "Cyprus", href: "/emea/cyprus", flag: "🇨🇾" },
      { name: "Greece", href: "/emea/greece", flag: "🇬🇷" },
      { name: "Portugal", href: "/emea/portugal", flag: "🇵🇹" },
      { name: "Italy", href: "/emea/italy", flag: "🇮🇹" },
      { name: "Austria", href: "/emea/austria", flag: "🇦🇹" },
    ]
  },
  {
    name: "APAC",
    href: "/apac",
    countries: [
      { name: "Cambodia", href: "/apac/cambodia/second-home", flag: "🇰🇭" },
      { name: "Vanuatu", href: "/apac/vanuatu", flag: "🇻🇺" },
      { name: "Thailand", href: "/apac/thailand", flag: "🇹🇭" },
      { name: "Singapore", href: "/apac/singapore", flag: "🇸🇬" },
      { name: "Australia", href: "/apac/australia", flag: "🇦🇺" },
      { name: "New Zealand", href: "/apac/new-zealand", flag: "🇳🇿" },
    ]
  },
  {
    name: "Caribbean",
    href: "/caribbean",
    countries: [
      { name: "St. Kitts & Nevis", href: "/caribbean/st-kitts-nevis", flag: "🇰🇳" },
      { name: "Dominica", href: "/caribbean/dominica", flag: "🇩🇲" },
      { name: "Grenada", href: "/caribbean/grenada", flag: "🇬🇩" },
      { name: "Antigua & Barbuda", href: "/caribbean/antigua-barbuda", flag: "🇦🇬" },
      { name: "St. Lucia", href: "/caribbean/st-lucia", flag: "🇱🇨" },
      { name: "Barbados", href: "/caribbean/barbados", flag: "🇧🇧" },
    ]
  }
];

interface RegionNavigationProps {
  currentRegion?: string;
  currentCountry?: string;
  className?: string;
}

export function RegionNavigation({ 
  currentRegion, 
  currentCountry, 
  className = "" 
}: RegionNavigationProps) {
  const [openRegion, setOpenRegion] = useState<string | null>(null);

  const toggleRegion = (regionName: string) => {
    setOpenRegion(openRegion === regionName ? null : regionName);
  };

  return (
    <nav className={`bg-white border-b border-gray-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Globe className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl text-gray-900">Immigration Hub</span>
            </Link>
          </div>

          {/* Navigation Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {regions.map((region) => (
                <div key={region.name} className="relative group">
                  <button
                    onClick={() => toggleRegion(region.name)}
                    className={`px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1 transition-colors ${
                      currentRegion === region.name.toLowerCase()
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <span>{region.name}</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  {/* Dropdown Menu */}
                  <div className={`absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 transition-all duration-200 ${
                    openRegion === region.name ? 'opacity-100 visible' : 'opacity-0 invisible'
                  }`}>
                    <div className="py-1">
                      {/* Region Overview Link */}
                      <Link
                        href={region.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-b border-gray-100"
                        onClick={() => setOpenRegion(null)}
                      >
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span className="font-medium">{region.name} Overview</span>
                        </div>
                      </Link>

                      {/* Country Links */}
                      {region.countries?.map((country) => (
                        <Link
                          key={country.name}
                          href={country.href}
                          className={`block px-4 py-2 text-sm transition-colors ${
                            currentCountry === country.name.toLowerCase()
                              ? 'bg-primary text-white'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                          onClick={() => setOpenRegion(null)}
                        >
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">{country.flag}</span>
                            <span>{country.name}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setOpenRegion(openRegion ? null : 'mobile')}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <span className="sr-only">Open main menu</span>
              <ChevronDown className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {openRegion === 'mobile' && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 rounded-lg mt-2">
              {regions.map((region) => (
                <div key={region.name} className="space-y-1">
                  <Link
                    href={region.href}
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={() => setOpenRegion(null)}
                  >
                    {region.name} Overview
                  </Link>
                  {region.countries?.map((country) => (
                    <Link
                      key={country.name}
                      href={country.href}
                      className="block px-6 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
                      onClick={() => setOpenRegion(null)}
                    >
                      <div className="flex items-center space-x-2">
                        <span>{country.flag}</span>
                        <span>{country.name}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Overlay for mobile */}
      {openRegion && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 z-40"
          onClick={() => setOpenRegion(null)}
        />
      )}
    </nav>
  );
}
