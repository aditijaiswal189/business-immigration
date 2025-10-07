import React from "react";
import { BorderBeam } from "@/components/ui/border-beam";
import Image from "next/image";

export interface ExpandableFeature {
  id: string;
  icon: string; // image url
  title: string;
  description: string | React.ReactNode;
}

interface ExpandableFeaturesProps {
  features: ExpandableFeature[];
  className?: string;
}

export const ExpandableFeatures: React.FC<ExpandableFeaturesProps> = ({
  features,
  className = "",
}) => {
  return (
    <div
      className={`relative z-[10] xsm:!hidden flex sm:w-[68rem] sm:space-x-[1.25rem] xsm:mt-[1.62rem] xsm:w-full xsm:flex-col xsm:space-y-[0.88rem] xsm:pr-[0] ${className}`}
    >
      {features.map((feature) => (
        <div
          key={feature.id}
          className="group max-w-[15rem] self-end rounded-[1.25rem] p-[1.5rem] transition-all duration-500 sm:min-h-[16rem] sm:w-full bg-[var(--brown)] sm:p-[2.25rem_1rem_2.25rem_1.63rem] xsm:bg-[var(--primary)] xsm:shadow-[0px_1.203px_4.812px_0px_rgba(0,0,0,0.10)] sm:hover:bg-[linear-gradient(90deg,var(--primary),var(--accent))] sm:hover:text-white text-white"
          style={{
            transitionTimingFunction: "cubic-bezier(0.69, -0.02, 0, 0.99)",
          }}
        >
          <img
            src={feature.icon}
            alt=""
            width={46}
            height={46}
            className="sm:group-hover:program-eligibility__icon-filter xsm:program-eligibility__icon-filter size-[2.875rem] !object-contain"
            draggable={false}
          />
          <h3 className="mb-[0.5rem] mt-[1rem] text-[1.25rem] font-semibold transition-all duration-500 sm:mt-[1.2rem] text-[var(--primary)] group-hover:text-white drop-shadow-md">
            {feature.title}
          </h3>
          <div className="overflow-hidden transition-all duration-500 max-h-0 group-hover:max-h-[300px] group-hover:pb-4">
            <p className="transition-all duration-500 body-14 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 text-[var(--primary)] group-hover:text-white drop-shadow-md">
              {feature.description}
            </p>
          </div>
          {/* Magic Beam Border */}
          {/* <BorderBeam
            duration={8}
            size={100}
            colorFrom="var(--primary)"
            colorTo="var(--accent)"
          /> */}
        </div>
      ))}
    </div>
  );
};

export default ExpandableFeatures;
