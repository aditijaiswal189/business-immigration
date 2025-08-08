import { Briefcase } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="py-20 bg-gray-50" id="next-section">
      <div className="container mx-auto px-6" data-aos="fade-up">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
              alt="Professional team meeting"
              className="rounded-2xl w-full h-96 object-cover shadow-lg"
            />
            <div className="absolute top-4 right-4 bg-white rounded-full p-4 shadow-lg">
              <Briefcase className="w-8 h-8 text-primary-yellow" />
            </div>
          </div>

          <div>
            <p className="text-gray-600 text-sm uppercase tracking-wider mb-4">
              ABOUT US
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6 leading-tight">
              We Work with you to Make your{" "}
              <span className="text-primary-yellow">Vision a Reality</span>
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              At GTR Business Immigration, we are a renowned global consulting
              firm committed to collaborating with business and societal leaders
              in overcoming their most critical challenges and seizing their
              greatest opportunities.
            </p>

            <div className="bg-white rounded-lg p-6 shadow-md mb-8">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gray-100 rounded-full">
                  <Briefcase className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Business Insurance
                  </h3>
                  <p className="text-gray-600">
                    Collaborating with business and societal leaders in
                    overcoming.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-8 mb-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-800 mb-2">
                  630K
                </div>
                <p className="text-gray-600 text-sm">
                  Projects completed in last 5 years
                </p>
              </div>
            </div>

            <button className="bg-gray-800 hover:bg-primary-yellow text-white px-8 py-3 rounded-md transition-colors font-semibold">
              About Us +
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
