"use client";
import React, { useState } from "react";

export interface StepItem {
  id: string;
  title: string;
  description: string;
  details: string;
  image: string;
}

interface StepsProcessProps {
  steps: StepItem[];
  sectionTitle?: string;
  sectionDescription?: string;
  className?: string;
}

export const StepsProcess: React.FC<StepsProcessProps> = ({
  steps,
  sectionTitle = "Application Process",
  sectionDescription = "We have developed a simple, flexible, and efficient immigration process to save you both time and cost, ensuring convenience and the best experience for our clients. This process strictly follows the guidelines of U.S. immigration authorities.",
  className = "",
}) => {
  const [hovered, setHovered] = React.useState<number | null>(null);
  return (
    <section
      className={`relative bg-background sm:p-[2.5rem_0_6rem] xsm:px-[1rem] ${className}`}
    >
      <div className="mx-auto flex justify-between sm:max-w-[90rem] xsm:mb-[1.62rem] xsm:flex-col">
        <h2 className="font-optima font-semibold text-brown heading1">
          {sectionTitle}
        </h2>
        <div className="text-bodytext sm:max-w-[37.9375rem] sm:text-greyscaletext-700 sm:body16 xsm:mt-[1rem] xsm:body-14">
          {sectionDescription}
        </div>
      </div>
      <div className="mx-auto mt-[4rem] flex max-w-[90rem] gap-x-8 transition-all duration-700 xsm:hidden">
        {steps.map((step, idx) => {
          const isOdd = idx % 2 === 1;
          return (
            <div
              key={step.id}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
              className={`group flex flex-col items-start transition-all duration-700 min-h-[28rem] bg-white rounded-2xl shadow-sm border border-gray-100 ${isOdd ? 'flex-row-reverse' : ''}
                ${hovered === idx ? 'w-[20rem] z-10 scale-105' : 'w-[12.25rem]'}
                relative`}
              style={isOdd ? { flexDirection: 'column-reverse' } : {}}
            >
              <span
                className="absolute left-1/2 -translate-x-1/2 top-4 min-w-[6.125rem] rounded-[6.96094rem] border border-brown p-[0.4375rem_0.75rem] text-center font-semibold uppercase !leading-none body16 transition-all duration-200 text-white bg-[linear-gradient(90deg,var(--primary),var(--accent))]"
                style={{zIndex: 20, boxShadow: hovered === idx ? '0 2px 16px 0 rgba(100,54,32,0.10)' : undefined}}
              >
                Step {idx + 1}
              </span>
              <div className={`pt-16 px-4 w-full flex flex-col flex-1 justify-between rounded-2xl transition-all duration-500 ${hovered === idx ? 'bg-[linear-gradient(90deg,var(--primary),var(--accent))] border-brown shadow-lg' : ''}`}>
                <h3
                  className={`mt-2 text-[1.2rem] font-bold leading-[1.3] tracking-[-0.03rem] transition-all duration-200 ${isOdd ? 'text-right' : ''} ${hovered === idx ? 'text-white' : 'text-bodytext'}`}
                >
                  {step.title}
                </h3>
                <div
                  className={`mt-[1rem] overflow-hidden transition-all duration-500 ${hovered === idx ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'} ${isOdd ? 'text-right' : ''}`}
                >
                  <p className={`sm:pb-4 text-base leading-relaxed ${hovered === idx ? 'text-white' : 'text-brown'}`}>{step.details}</p>
                </div>
                <div className="flex-1 flex flex-col justify-end pb-4">
                  {step.image ? (
                    <img
                      alt={step.title}
                      draggable={false}
                      loading="lazy"
                      width={1932}
                      height={1087}
                      decoding="async"
                      className={`block h-[12rem] w-full rounded-[1.125rem] object-cover transition-all duration-700 border ${hovered === idx ? 'border-brown' : 'border-transparent'}`}
                      src={step.image}
                      style={{ color: "transparent" }}
                    />
                  ) : (
                    <div className="block h-[12rem] w-full rounded-[1.125rem] bg-gray-200 flex items-center justify-center text-gray-400 border border-dashed">
                      No Image
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Mobile version can be added here if needed */}
    </section>
  );
};

export default StepsProcess;
