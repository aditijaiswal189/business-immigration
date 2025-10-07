"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { Languages, Map, Star, Users } from "lucide-react";

// Completely client-side map component
const CanadaMapClient = dynamic(
  () => import("./canada-section-client").then((m) => ({ default: m.default })),
  {
    ssr: false,
    loading: () => (
      <section className="flex space-x-[6.69rem] pt-[4rem] section-container xsm:flex-col-reverse xsm:space-x-0 my-16">
        <div className="w-full xl:w-[41.5rem] xl:mt-0 mt-[2.56rem]">
          <span className="mb-[0.38rem] text-[1rem] font-semibold uppercase leading-[1.5] text-gray-600 opacity-70 xl:text-[1rem] xl:font-semibold text-[0.75rem] font-medium">
            WHY CHOOSE CANADA?
          </span>

          <h2 className="mb-[1.5rem] font-serif text-[3rem] font-semibold leading-[1.2] tracking-[-0.06rem] text-[#5C4235] xl:text-[3rem] xl:tracking-[-0.06rem] text-[1.5rem] tracking-[-0.045rem]">
            Canada is always the top choice of immigrants.
          </h2>

          <p className="text-[1rem] leading-[1.55] text-gray-600 xl:text-[1rem] text-[0.875rem]">
            Canada – the second largest country in the world, famous for its
            developed economy, civilized society and is a dream destination for
            millions of people around the world.
          </p>

          <div className="mt-[1.5rem] flex flex-col space-y-[1.5rem] xl:space-y-[1.5rem] space-y-3">
            {/* Capital */}
            <div className="flex items-center space-x-4">
              <div className="flex w-fit items-center justify-center rounded-[0.75rem] bg-gray-100/50 p-[1.25rem] xl:p-[1.25rem] p-4">
                <Star className="w-[1.45831rem] h-[1.45831rem] object-contain text-[#5C4235]" />
              </div>
              <div className="flex flex-col">
                <span className="text-[1.125rem] font-semibold leading-[1.5] text-[#767676] xl:text-[1.125rem] text-[0.875rem]">
                  Capital
                </span>
                <span className="text-[1.5rem] font-bold leading-[1.33] text-[#5C4235] xl:text-[1.5rem] text-[1rem]">
                  Ottawa
                </span>
              </div>
            </div>

            {/* Acreage */}
            <div className="flex items-center space-x-4">
              <div className="flex w-fit items-center justify-center rounded-[0.75rem] bg-gray-100/50 p-[1.25rem] xl:p-[1.25rem] p-4">
                <Map className="w-[1.45831rem] h-[1.45831rem] object-contain text-[#5C4235]" />
              </div>
              <div className="flex flex-col">
                <span className="text-[1.125rem] font-semibold leading-[1.5] text-[#767676] xl:text-[1.125rem] text-[0.875rem]">
                  Acreage
                </span>
                <span className="text-[1.5rem] font-bold leading-[1.33] text-[#5C4235] xl:text-[1.5rem] text-[1rem]">
                  9.98 million km²
                </span>
              </div>
            </div>

            {/* Population */}
            <div className="flex items-center space-x-4">
              <div className="flex w-fit items-center justify-center rounded-[0.75rem] bg-gray-100/50 p-[1.25rem] xl:p-[1.25rem] p-4">
                <Users className="w-[1.45831rem] h-[1.45831rem] object-contain text-[#5C4235]" />
              </div>
              <div className="flex flex-col">
                <span className="text-[1.125rem] font-semibold leading-[1.5] text-[#767676] xl:text-[1.125rem] text-[0.875rem]">
                  Population
                </span>
                <span className="text-[1.5rem] font-bold leading-[1.33] text-[#5C4235] xl:text-[1.5rem] text-[1rem]">
                  38 million people
                </span>
              </div>
            </div>

            {/* Main language */}
            <div className="flex items-center space-x-4">
              <div className="flex w-fit items-center justify-center rounded-[0.75rem] bg-gray-100/50 p-[1.25rem] xl:p-[1.25rem] p-4">
                <Languages className="w-[1.45831rem] h-[1.45831rem] object-contain text-[#5C4235]" />
              </div>
              <div className="flex flex-col">
                <span className="text-[1.125rem] font-semibold leading-[1.5] text-[#767676] xl:text-[1.125rem] text-[0.875rem]">
                  Main language
                </span>
                <span className="text-[1.5rem] font-bold leading-[1.33] text-[#5C4235] xl:text-[1.5rem] text-[1rem]">
                  English, French
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative h-[36.25rem] w-[27.86819rem] xsm:h-[22.125rem] xsm:w-full flex items-center justify-center bg-white">
          <div className="text-sm text-[#767676]">
            Loading interactive map...
          </div>
        </div>
      </section>
    ),
  }
);

export default function CanadaMapWrapper() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section className="flex space-x-[6.69rem] pt-[4rem] section-container xsm:flex-col-reverse xsm:space-x-0 my-16">
        <div className="w-[41.5rem] xsm:mt-[2.56rem] xsm:w-full">
          <span className="mb-[0.38rem] text-[1rem] font-semibold uppercase leading-[1.5] opacity-70 xsm:text-[0.75rem] xsm:font-medium text-[#3F2214]">
            WHY CHOOSE CANADA?
          </span>
          <h2 className="mb-[1.5rem] font-optima text-[3rem] font-semibold leading-[1.2] tracking-[-0.06rem] xsm:text-[1.5rem] xsm:tracking-[-0.045rem] text-[#3F2214]">
            Canada is a top choice for newcomers
          </h2>
          <p className="text-[1rem] leading-[1.55] xsm:text-[0.875rem] text-[#3F2214]">
            Canada is renowned for a strong economy, quality of life, and
            welcoming communities.
          </p>
        </div>
        <div className="relative h-[36.25rem] w-[27.86819rem] xsm:h-[22.125rem] xsm:w-full flex items-center justify-center bg-white">
          <div className="text-sm text-[#767676]">Initializing...</div>
        </div>
      </section>
    );
  }

  return <CanadaMapClient />;
}
