"use client";
import Tilt from "react-parallax-tilt";
import {
  BriefcaseBusiness,
  Banknote,
  Globe,
  FileSignature,
  Building2,
} from "lucide-react";

const processes = [
  {
    id: "01",
    title: "Business Assessment",
    description:
      "Evaluate your business profile and determine eligibility under various immigration streams.",
    icon: BriefcaseBusiness,
  },
  {
    id: "02",
    title: "Financial Planning",
    description:
      "Plan your investment structure and funds to meet government program requirements.",
    icon: Banknote,
  },
  {
    id: "03",
    title: "Market Research",
    description:
      "Understand target regions and industries to align your business idea with provincial needs.",
    icon: Globe,
  },
  {
    id: "04",
    title: "Document Preparation",
    description:
      "We assist in preparing business plans, investment documents, and supporting immigration files.",
    icon: FileSignature,
  },
  {
    id: "05",
    title: "Business Setup & Support",
    description:
      "End-to-end help with company incorporation, local hiring, and post-arrival compliance.",
    icon: Building2,
  },
];

export default function ProcessSection() {
  return (
    <section className="py-20 bg-gray-50" id="process-section">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16" data-aos="fade-up">
          <p className="text-gray-600 text-sm uppercase tracking-wider mb-4">
            STEP-BY-STEP SUPPORT
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            Our Business Immigration Approach
          </h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {processes.map((process, index) => (
            <Tilt
              glareEnable
              glareMaxOpacity={0.4}
              scale={1.05}
              glareBorderRadius="10px"
              glareColor="#d1a97a"
              tiltEnable
              key={process.id}
              className="process-card rounded-2xl p-8 text-center relative hover-lift shadow-lg"
              style={{
                backgroundColor: "white",
              }}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <div>
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 bg-primary-yellow-10">
                  <process.icon className="text-2xl text-primary-yellow" />
                </div>
                <span className="absolute top-4 right-4 font-bold text-lg text-primary-yellow">
                  {process.id}
                </span>
                <h3
                  className="text-xl font-bold mb-4"
                  style={{ color: "var(--primary)" }}
                >
                  {process.title}
                </h3>
                <p className="text-gray-600">{process.description}</p>
              </div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}
