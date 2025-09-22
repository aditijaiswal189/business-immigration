import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { ImageWithFallback } from "./image-with-fallback";
// import { ImageWithFallback } from "@/components/ImageWithFallback";

export function ImmigrationServicesTimeline() {
  const data = [
    {
      title: "European Investment Immigration",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            GTR Business Immigration is proud to be a trusted partner,
            accompanying clients on their journey of real estate investment and
            immigration to Europe…
          </p>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Let GTR Business Immigration help you realize your dream of
            investing in Europe…
          </p>

          <div className="grid grid-cols-2 gap-4">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80"
              alt="European investment opportunities"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=1200&q=80"
              alt="European real estate"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[...] md:h-44 lg:h-60"
            />
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80"
              alt="Golden visa programs"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[...] md:h-44 lg:h-60"
            />
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=1200&q=80"
              alt="European citizenship"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[...] md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: "EB-5 Project Investment",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            GTR Business Immigration is proud to introduce prestigious EB-5
            investment projects…
          </p>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            By participating in GTR Business Immigration's EB-5 projects…
          </p>

          <div className="mb-8 space-y-2 text-xs md:text-sm text-neutral-700 dark:text-neutral-300">
            <div>
              ✅ Minimum $800,000 investment in targeted employment areas
            </div>
            <div>✅ Path to permanent residency for investor and family</div>
            <div>
              ✅ Job creation requirements fulfilled through our projects
            </div>
            <div>✅ Comprehensive due diligence and project vetting</div>
            <div>
              ✅ Full legal and immigration support throughout the process
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1200&q=80"
              alt="USA flag"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[...] md:h-44 lg:h-60"
            />
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1487730116645-74489c95b41b?auto=format&fit=crop&w=1200&q=80"
              alt="US investment opportunities"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[...] md:h-44 lg:h-60"
            />
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1517263904808-5dc91e3e7044?auto=format&fit=crop&w=1200&q=80"
              alt="US green card concept"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[...] md:h-44 lg:h-60"
            />
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80"
              alt="American family life"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[...] md:h-44 lg:h-60"
            />
          </div>

          <div className="mt-6">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
              Learn More
            </button>
          </div>
        </div>
      ),
    },
    {
      title: "Canada Immigration Consulting",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            GTR Business Immigration is proud to provide Canadian immigration
            consulting services…
          </p>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Let GTR Business Immigration be your trusted companion…
          </p>

          <div className="mb-8 space-y-2 text-xs md:text-sm text-neutral-700 dark:text-neutral-300">
            <div>✅ Start-up Visa Program for entrepreneurs</div>
            <div>✅ Provincial Nominee Programs (PNP) across all provinces</div>
            <div>✅ Express Entry system for skilled workers</div>
            <div>✅ Family sponsorship and reunification programs</div>
            <div>
              ✅ Comprehensive application preparation and document support
            </div>
            <div>✅ Post-landing settlement services and guidance</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&q=80"
              alt="Canada immigration"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[...] md:h-44 lg:h-60"
            />
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1200&q=80"
              alt="Canadian lifestyle"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[...] md:h-44 lg:h-60"
            />
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80"
              alt="Provincial programs"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[...] md:h-44 lg:h-60"
            />
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80"
              alt="Canadian education"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[...] md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="relative w-full overflow-clip bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Immigration Services
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            GTR Business Immigration provides comprehensive immigration
            solutions across multiple countries, helping you and your family
            achieve your dreams of international residency and citizenship.
          </p>
        </div>
        <Timeline data={data} />
      </div>
    </div>
  );
}
