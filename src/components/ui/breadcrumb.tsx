import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav className={`flex ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {/* Home Link */}
        <li>
          <Link
            href="/"
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <Home className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>

        {/* Breadcrumb Items */}
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight className="h-4 w-4 text-gray-300 mx-2" />
            {item.href && !item.current ? (
              <Link
                href={item.href}
                className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={`text-sm font-medium ${
                  item.current
                    ? "text-gray-900"
                    : "text-gray-500"
                }`}
                aria-current={item.current ? "page" : undefined}
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Helper function to generate breadcrumbs based on pathname
export function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [];

  // Map of path segments to display names
  const segmentMap: Record<string, string> = {
    'americas': 'Americas',
    'emea': 'EMEA',
    'apac': 'APAC',
    'caribbean': 'Caribbean',
    'canada': 'Canada',
    'malta': 'Malta',
    'cambodia': 'Cambodia',
    'second-home': 'Second Home Program',
    'citizenship': 'Citizenship Program',
    'golden-visa': 'Golden Visa',
    'usa': 'United States',
    'paraguay': 'Paraguay',
    'panama': 'Panama',
    'brazil': 'Brazil',
    'mexico': 'Mexico',
    'cyprus': 'Cyprus',
    'greece': 'Greece',
    'portugal': 'Portugal',
    'italy': 'Italy',
    'austria': 'Austria',
    'vanuatu': 'Vanuatu',
    'thailand': 'Thailand',
    'singapore': 'Singapore',
    'australia': 'Australia',
    'new-zealand': 'New Zealand',
  };

  let currentPath = '';
  
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === segments.length - 1;
    
    breadcrumbs.push({
      label: segmentMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1),
      href: isLast ? undefined : currentPath,
      current: isLast,
    });
  });

  return breadcrumbs;
}
