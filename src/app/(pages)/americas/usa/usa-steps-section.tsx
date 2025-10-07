import React from "react";
import StepsProcess, { StepItem } from "@/components/ui/steps-process";

const usaSteps: StepItem[] = [
  {
    id: "1",
    title: "Initial Consultation & Eligibility Assessment",
    description: "Discuss goals, review background, and determine the best U.S. immigration pathway.",
    details: "Meet with our immigration experts to review your profile, business experience, and investment capacity. We'll help you select the most suitable U.S. visa program (EB-5, E-2, L-1, etc.) and outline the requirements.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=compress&w=1200&q=80",
  },
  {
    id: "2",
    title: "Business/Investment Structuring",
    description: "Prepare the business plan and structure your investment or company.",
    details: "We assist you in preparing a compliant business plan, selecting the investment vehicle, and ensuring all documents meet USCIS or consular requirements.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=compress&w=1200&q=80",
  },
  {
    id: "3",
    title: "Application Preparation & Submission",
    description: "Gather documents and submit your visa application.",
    details: "Our legal team helps you collect all necessary documents, complete USCIS forms, and submit your application package for review.",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=compress&w=1200&q=80",
  },
  {
    id: "4",
    title: "Interview & Adjudication",
    description: "Attend interview and respond to requests for evidence.",
    details: "Prepare for your consular or USCIS interview. We provide mock interviews and help you respond to any requests for additional evidence (RFEs).",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=compress&w=1200&q=80",
  },
  {
    id: "5",
    title: "Visa Approval & Entry to the U.S.",
    description: "Receive your visa and move to the United States.",
    details: "Upon approval, receive your visa and make arrangements for your move. We offer relocation support and guidance for your first steps in the U.S.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=compress&w=1200&q=80",
  },
  {
    id: "6",
    title: "Business Operation & Compliance",
    description: "Operate your business and maintain compliance.",
    details: "Start or acquire your business, create jobs (if required), and maintain compliance with U.S. immigration rules to preserve your status and progress to permanent residency.",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=compress&w=1200&q=80",
  },
  {
    id: "7",
    title: "Apply for Permanent Residency (Green Card)",
    description: "Transition to permanent residency if eligible.",
    details: "After meeting the requirements, apply for a green card for yourself and your family. We guide you through the adjustment of status or consular processing.",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=compress&w=1200&q=80",
  },
];

const USAStepsSection: React.FC = () => (
  <StepsProcess
    steps={usaSteps}
    sectionTitle="USA Business Immigration Application Process"
    sectionDescription="Our streamlined process helps you achieve your American dream efficiently and with expert guidance at every stage."
  />
);

export default USAStepsSection;
