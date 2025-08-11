import { Megaphone, Users, BarChart3, TrendingUp } from "lucide-react";

const services = [
  {
    icon: Megaphone,
    title: "Innovation space",
    description:
      "Our solutions are scalable and can grow with your business, the most value out of your investment.",
    color: "bg-orange-100 text-orange-600",
  },
  {
    icon: Users,
    title: "Work organization",
    description:
      "We specialize in serving such as healthcare, finance, or manufacturing, and offer tailored solutions.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    description:
      "We specialize in serving specific industries, such as healthcare, finance, or manufacturing solutions.",
    color: "bg-primary-yellow text-yellow-600",
  },
  {
    icon: BarChart3,
    title: "Financial Analysis",
    description:
      "We guarantee to provide affordable business consulting solutions that help you reduce costs and your profits.",
    color: "bg-purple-100 text-purple-600",
  },
];

export default function ServicesGrid() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-gray-600 text-sm uppercase tracking-wider mb-4">
              SERVICES
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-8 leading-tight">
              We Always Provide
              <br />
              Best Business Services
              <br />
              to Our Customers
            </h2>
            <p className="text-gray-600 mb-8">
              Leverage agile frameworks to provide a robust synopsis for high
              level overviews. Iterative approaches to collaborative.
            </p>
            <button className="bg-gray-800 hover:bg-primary-yellow text-white px-8 py-3 rounded-md transition-colors font-semibold">
              More Services +
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="bg-white rounded-lg p-6 shadow-lg hover-lift fade-in-up border border-gray-100 hover:shadow-xl transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start space-x-4">
                  <div
                    className={`p-3 rounded-full ${service.color} animated-icon`}
                  >
                    <service.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                    <button className="text-primary-yellow hover:text-yellow-600 font-semibold mt-3 inline-flex items-center">
                      →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
