import React from "react";
import ExpandableFeatures, { ExpandableFeature } from "@/components/ui/expandable-features";

const usaFeatures: ExpandableFeature[] = [
  {
    id: "management-experience",
    icon: "https://cms.icanfield.vn/wp-content/uploads/2025/01/icon-Kinh-nghiem-1-2.png",
    title: "Management experience",
    description: (
      <>
        Within the last 10 years, the Applicant must have: <br />
        - At least 3 years of experience directly managing a business; or <br />
        - At least 4 years of senior management experience.
      </>
    ),
  },
  {
    id: "invest",
    icon: "https://cms.icanfield.vn/wp-content/uploads/2025/01/d-icon-1.svg",
    title: "Invest",
    description: (
      <>
        - Invest at least $900,000 to acquire or establish a business in the US. <br />
        - Create at least 10 full-time jobs for US workers.
      </>
    ),
  },
  {
    id: "net-worth",
    icon: "https://cms.icanfield.vn/wp-content/uploads/2025/01/d-icon3-1.svg",
    title: "Net worth",
    description: (
      <>Applicants should have a net worth of at least $1 million from legitimate sources of income.</>
    ),
  },
  {
    id: "age",
    icon: "https://cms.icanfield.vn/wp-content/uploads/2025/04/icon-do-tuoi.png",
    title: "Age",
    description: (
      <>There is no age limit, but applicants between 21 and 49 years old may have an advantage.</>
    ),
  },
  {
    id: "language",
    icon: "https://cms.icanfield.vn/wp-content/uploads/2025/02/icon-ngoai-ngu.png",
    title: "English proficiency",
    description: (
      <>English proficiency is required for most investor visa categories.</>
    ),
  },
];

const USAFeaturesSection: React.FC = () => (
  <ExpandableFeatures features={usaFeatures} />
);

export default USAFeaturesSection;
