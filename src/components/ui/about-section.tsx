import { Briefcase } from "lucide-react";
import { Button } from "./button";

export default function AboutSection() {
  return (
    <section className="py-20 bg-background" id="next-section">
      <div className="container mx-auto px-6" data-aos="fade-up">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image section */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800"
              alt="Professional team meeting"
              className="rounded-2xl w-full h-160 object-cover shadow-lg"
            />
            {/* <div className="absolute top-4 right-4 bg-[linear-gradient(90deg,var(--primary),var(--accent))] rounded-full p-4 shadow-lg">
              <Briefcase className="w-8 h-8 text-white" />
            </div> */}

            <div className="absolute top-4 right-4  shadow-lg">
              <Button variant="goldWhite">
                <div className="absolute  inset-[2px] rounded-[inherit] bg-[linear-gradient(135deg,#fff,#f9f9f9,#f0f0f0)] shadow-[inset_0_2px_5px_rgba(255,255,255,0.8),inset_0_-1px_2px_rgba(0,0,0,0.15),0_1px_0_rgba(255,255,255,0.7)]" />
                <span className="relative z-10 font-bold ">
                  <Briefcase className="w-8 h-8 " />
                </span>
              </Button>
            </div>
          </div>

          {/* Text section */}
          <div>
            <p className="text-[var(--muted-foreground)] text-sm uppercase tracking-wider mb-4">
              ABOUT US
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-[var(--foreground)] mb-6 leading-tight">
              We Work with you to Make your{" "}
              <span className="bg-[linear-gradient(90deg,var(--primary),var(--accent))] bg-clip-text text-transparent">
                Vision a Reality
              </span>
            </h2>
            <p className="text-[var(--foreground)]/80 mb-8 leading-relaxed">
              At GTR Worldwide Business Immigration, we are a renowned global
              consulting firm committed to collaborating with business and
              societal leaders in overcoming their most critical challenges and
              seizing their greatest opportunities.
            </p>

            {/* Feature box */}
            <div className="bg-[var(--card)]/50 backdrop-blur-sm border border-[var(--accent)]/20 rounded-lg p-6 shadow-md mb-8">
              <div className="flex items-start space-x-4">
                <Button variant="goldBlack">
                  <div className="absolute inset-[2px] rounded-[inherit] bg-[linear-gradient(135deg,#000,#111,#000)] shadow-[inset_0_3px_6px_rgba(0,0,0,0.9),inset_0_-1px_3px_rgba(255,255,255,0.08),0_1px_0_rgba(255,255,255,0.08)]" />
                  <span className="relative z-10 text-white font-bold">
                    <Briefcase className="w-8 h-8" />
                  </span>
                </Button>

                <div>
                  <h3 className="text-xl font-bold text-[var(--card-foreground)] mb-2">
                    Business Immigration Services
                  </h3>
                  <p className="text-[var(--muted-foreground)]">
                    Collaborating with business and societal leaders in
                    overcoming.
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-8 mb-8">
              <div className="text-center">
                <div className="text-4xl font-bold bg-[linear-gradient(90deg,var(--primary),var(--accent))] bg-clip-text text-transparent mb-2">
                  630K
                </div>
                <p className="text-[var(--muted-foreground)] text-sm">
                  Projects completed in last 5 years
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4 flex-wrap">
              {/* <button className="bg-[linear-gradient(90deg,var(--primary),var(--accent))] hover:bg-[linear-gradient(90deg,var(--accent),var(--primary))] text-white px-8 py-3 rounded-md transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105">
               
              </button> */}

              <Button variant="goldBlack">
                <div className="absolute inset-[2px] rounded-[inherit] bg-[linear-gradient(135deg,#000,#111,#000)] shadow-[inset_0_3px_6px_rgba(0,0,0,0.9),inset_0_-1px_3px_rgba(255,255,255,0.08),0_1px_0_rgba(255,255,255,0.08)]" />
                <span className="relative z-10 text-white font-bold">
                  About Us +
                </span>
              </Button>

              {/* <Button variant="goldWhite">
                <div className="absolute inset-[2px] rounded-[inherit] bg-[linear-gradient(135deg,#fff,#f9f9f9,#f0f0f0)] shadow-[inset_0_2px_5px_rgba(255,255,255,0.8),inset_0_-1px_2px_rgba(0,0,0,0.15),0_1px_0_rgba(255,255,255,0.7)]" />
                <span className="relative z-10 font-bold">Contact +</span>
              </Button> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
