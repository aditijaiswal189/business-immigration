"use client";
import Tilt from "react-parallax-tilt";
import {
  Users,
  TrendingUp,
  BarChart3,
  Handshake,
  PieChart,
} from "lucide-react";

const processes = [
  {
    id: "01",
    title: "People",
    description:
      "We guarantee to provide affordable business consulting solutions that help you grow.",
    icon: Users,
  },
  {
    id: "02",
    title: "Strategic",
    description:
      "Our solutions are designed to align with your business goals to get the most value.",
    icon: TrendingUp,
  },
  {
    id: "03",
    title: "Analysis",
    description:
      "We specialize in strategic consulting for complex industries, such as healthcare, finance, or manufacturing.",
    icon: BarChart3,
  },
  {
    id: "04",
    title: "Cooperation",
    description:
      "We embarked on creating a distinct approach following our cooperative principles.",
    icon: Handshake,
  },
  {
    id: "05",
    title: "Statistics",
    description:
      "We guarantee to provide affordable business consulting solutions that help you reduce costs.",
    icon: PieChart,
  },
];

export default function ProcessSection() {
  return (
    <section className="py-20 bg-gray-50" datas-aos="fade-up">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-gray-600 text-sm uppercase tracking-wider mb-4">
            PROCESS
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            How does it Work?
          </h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {processes.map((process, index) => (
            <Tilt
              glareEnable={true}
              glareMaxOpacity={0.4}
              scale={1.05}
              glareBorderRadius="10px"
              glareColor="#f59e0b"
              tiltEnable={true}
              key={process.id}
              className="process-card bg-white rounded-2xl p-8 text-center relative hover-lift  bg-white p-8 shadow-lg rounded-lg"
            >
              <div className="" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-16 h-16 bg-yellow-100 rounded-full  animated-icon flex items-center justify-center mx-auto mb-6">
                  <process.icon className="text-primary-yellow text-2xl " />
                </div>
                <span className="absolute top-4 right-4 text-primary-yellow font-bold text-lg">
                  {process.id}
                </span>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
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
