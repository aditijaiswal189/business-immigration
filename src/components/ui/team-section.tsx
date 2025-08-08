import { Facebook, Instagram, Twitter } from "lucide-react";

const teamMembers = [
  {
    name: "Sarah Charlotte",
    title: "Chief Advisor",
    image:
      "https://images.unsplash.com/photo-1494790108755-2616b612b577?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    size: "large",
  },
  {
    name: "Richard Divas",
    title: "Chief Executive",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    size: "large",
  },
  {
    name: "Monalis",
    title: "Chief Manager",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    size: "large",
  },
  {
    name: "Hendry David",
    title: "Chief Support Provider",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    size: "small",
  },
  {
    name: "Alex Jason",
    title: "HR Consulting",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    size: "small",
  },
  {
    name: "Alex Jasnon",
    title: "HR Consulting",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    size: "small",
  },
];

export default function TeamSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-gray-600 text-sm uppercase tracking-wider mb-4">
            TEAM
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            Our Team of Dedicated
            <br />
            Digital Professionals
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {teamMembers.slice(0, 3).map((member, index) => (
            <div
              key={member.name}
              className="team-card bg-white rounded-2xl overflow-hidden hover-lift fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {member.name}
                </h3>
                <p className="text-gray-600 mb-4">{member.title}</p>
                <div className="flex space-x-3">
                  <a
                    href="#"
                    className="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-primary-yellow transition-colors"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-primary-yellow transition-colors"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-primary-yellow transition-colors"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {teamMembers.slice(3).map((member, index) => (
            <div
              key={member.name}
              className="team-card bg-white rounded-2xl overflow-hidden hover-lift fade-in-up"
              style={{ animationDelay: `${(index + 3) * 0.1}s` }}
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {member.name}
                </h3>
                <p className="text-gray-600">{member.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
