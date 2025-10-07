import { Briefcase } from "lucide-react";

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
            <div className="absolute top-4 right-4 bg-[linear-gradient(90deg,var(--primary),var(--accent))] rounded-full p-4 shadow-lg">
              <Briefcase className="w-8 h-8 text-white" />
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
                <div className="p-3 bg-[linear-gradient(90deg,var(--primary),var(--accent))] rounded-full">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
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
              <button className="bg-[linear-gradient(90deg,var(--primary),var(--accent))] hover:bg-[linear-gradient(90deg,var(--accent),var(--primary))] text-white px-8 py-3 rounded-md transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105">
                About Us +
              </button>

              {/* Black Background with Premium Gradient Gold Border */}
              <button className="relative font-semibold transition-all duration-300 group overflow-hidden hover:scale-105" 
                      style={{
                        padding: '0px',
                        background: 'conic-gradient(from 0deg, #8B4513, #CD853F, #FFD700, #FFFACD, #FFD700, #DAA520, #B8860B, #654321, #8B4513)',
                        borderRadius: '16px',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.4), 0 0 40px rgba(255,215,0,0.3), inset 0 2px 4px rgba(255,248,220,0.8), inset 0 -2px 4px rgba(101,67,33,0.9)'
                      }}>
                
                {/* Outer golden gradient ring */}
                <div className="absolute inset-[2px] rounded-xl" style={{
                  background: 'radial-gradient(ellipse at top, #FFD700, #DAA520, #B8860B)',
                  boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.6), inset 0 -1px 2px rgba(139,69,19,0.4)'
                }}></div>
                
                {/* Inner premium gradient ring */}
                <div className="absolute inset-[4px] rounded-xl" style={{
                  background: 'linear-gradient(45deg, #B8860B 0%, #DAA520 25%, #FFD700 50%, #FFFACD 75%, #FFD700 100%)',
                  boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.5), inset 0 -1px 1px rgba(184,134,11,0.5)'
                }}></div>
                
                {/* Black interior with padding */}
                <div className="px-8 py-3 rounded-xl relative m-[6px]" style={{
                  background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)',
                  boxShadow: 'inset 0 3px 6px rgba(0,0,0,0.9), inset 0 -1px 3px rgba(255,255,255,0.1), 0 1px 0 rgba(255,255,255,0.1)'
                }}>

                  {/* 3D White Text Effect */}
                  <span className="relative text-white font-bold transition-all duration-300 group-hover:text-gray-200"
                        style={{
                          textShadow: '0 1px 0 rgba(255,255,255,0.3), 0 -1px 0 rgba(0,0,0,1), 0 0 10px rgba(255,215,0,0.4)'
                        }}>
                    Premium +
                  </span>

                  {/* Golden shine sweep */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFD700]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] duration-800"></div>
                </div>
              </button>

              {/* White Background with Premium Gradient Gold Border */}
              <button className="relative font-semibold transition-all duration-300 group overflow-hidden hover:scale-105" 
                      style={{
                        padding: '0px',
                        background: 'conic-gradient(from 0deg, #8B4513, #CD853F, #FFD700, #FFFACD, #FFD700, #DAA520, #B8860B, #654321, #8B4513)',
                        borderRadius: '16px',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.4), 0 0 40px rgba(255,215,0,0.3), inset 0 2px 4px rgba(255,248,220,0.8), inset 0 -2px 4px rgba(101,67,33,0.9)'
                      }}>
                
                {/* Outer golden gradient ring */}
                <div className="absolute inset-[2px] rounded-xl" style={{
                  background: 'radial-gradient(ellipse at top, #FFD700, #DAA520, #B8860B)',
                  boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.6), inset 0 -1px 2px rgba(139,69,19,0.4)'
                }}></div>
                
                {/* Inner premium gradient ring */}
                <div className="absolute inset-[4px] rounded-xl" style={{
                  background: 'linear-gradient(45deg, #B8860B 0%, #DAA520 25%, #FFD700 50%, #FFFACD 75%, #FFD700 100%)',
                  boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.5), inset 0 -1px 1px rgba(184,134,11,0.5)'
                }}></div>
                
                {/* White interior with padding */}
                <div className="px-8 py-3 rounded-xl relative m-[6px]" style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8f8f8 50%, #f0f0f0 100%)',
                  boxShadow: 'inset 0 3px 6px rgba(255,255,255,0.9), inset 0 -1px 3px rgba(0,0,0,0.1), 0 1px 0 rgba(255,255,255,0.8)'
                }}>

                  {/* 3D Black Text Effect */}
                  <span className="relative text-black font-bold transition-all duration-300 group-hover:text-gray-800"
                        style={{
                          textShadow: '0 1px 0 rgba(255,255,255,1), 0 2px 4px rgba(0,0,0,0.2), 0 0 8px rgba(255,215,0,0.3)'
                        }}>
                    Contact +
                  </span>

                  {/* Golden shine sweep */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFD700]/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] duration-800"></div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
