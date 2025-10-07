import React from "react";
import EnhancedCanadaMap from "./enhanced-canada-map";
import { Languages, Map, Star, Users } from "lucide-react";

const FeaturesAndMap: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-48 translate-x-48 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-y-48 -translate-x-48 pointer-events-none"></div>

      <div className="max-w-8xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left side - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide bg-primary/10 text-primary border border-primary/20">
                WHY CHOOSE CANADA?
              </span>
              <h2 className="text-5xl font-bold text-foreground leading-tight">
                Canada is a top choice for
                <span className="text-gradient bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {" "}
                  newcomers
                </span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Canada is renowned for a strong economy, quality of life, and
                welcoming communities that embrace diversity and opportunity.
              </p>
            </div>

            <div className="space-y-4">
              <div className="group flex items-center space-x-5 p-5 rounded-2xl bg-card/60 border border-border/40 backdrop-blur-md hover:bg-card/90 hover:shadow-xl hover:border-primary-yellow/30 transition-all duration-500 hover:-translate-y-1">
                <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center border border-primary/20 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-primary-yellow/30 group-hover:to-primary-yellow/20 group-hover:border-primary-yellow/40 transition-all duration-300">
                  <Star className="w-6 h-6 text-white group-hover:text-primary-yellow transition-colors duration-300" />
                </div>
                <div className="space-y-1">
                  <div className="font-semibold text-foreground text-lg group-hover:text-primary-yellow transition-colors duration-300">
                    Capital
                  </div>
                  <div className="text-muted-foreground text-base">Ottawa</div>
                </div>
              </div>

              <div className="group flex items-center space-x-5 p-5 rounded-2xl bg-card/60 border border-border/40 backdrop-blur-md hover:bg-card/90 hover:shadow-xl hover:border-primary-yellow/30 transition-all duration-500 hover:-translate-y-1">
                <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center border border-primary/20 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-primary-yellow/30 group-hover:to-primary-yellow/20 group-hover:border-primary-yellow/40 transition-all duration-300">
                  <Map className="w-6 h-6 text-primary group-hover:text-primary-yellow transition-colors duration-300" />
                </div>
                <div className="space-y-1">
                  <div className="font-semibold text-foreground text-lg group-hover:text-primary-yellow transition-colors duration-300">
                    Area
                  </div>
                  <div className="text-muted-foreground text-base">
                    9.98 million km²
                  </div>
                </div>
              </div>

              <div className="group flex items-center space-x-5 p-5 rounded-2xl bg-card/60 border border-border/40 backdrop-blur-md hover:bg-card/90 hover:shadow-xl hover:border-primary-yellow/30 transition-all duration-500 hover:-translate-y-1">
                <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center border border-primary/20 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-primary-yellow/30 group-hover:to-primary-yellow/20 group-hover:border-primary-yellow/40 transition-all duration-300">
                  <Users className="w-6 h-6 text-primary group-hover:text-primary-yellow transition-colors duration-300" />
                </div>
                <div className="space-y-1">
                  <div className="font-semibold text-foreground text-lg group-hover:text-primary-yellow transition-colors duration-300">
                    Population
                  </div>
                  <div className="text-muted-foreground text-base">
                    38 million
                  </div>
                </div>
              </div>

              <div className="group flex items-center space-x-5 p-5 rounded-2xl bg-card/60 border border-border/40 backdrop-blur-md hover:bg-card/90 hover:shadow-xl hover:border-primary-yellow/30 transition-all duration-500 hover:-translate-y-1">
                <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center border border-primary/20 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-primary-yellow/30 group-hover:to-primary-yellow/20 group-hover:border-primary-yellow/40 transition-all duration-300">
                  <Languages className="w-6 h-6 text-primary group-hover:text-primary-yellow transition-colors duration-300" />
                </div>
                <div className="space-y-1">
                  <div className="font-semibold text-foreground text-lg group-hover:text-primary-yellow transition-colors duration-300">
                    Languages
                  </div>
                  <div className="text-muted-foreground text-base">
                    English, French
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Map */}
          <div className="lg:pl-8 py-10">
            <EnhancedCanadaMap />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesAndMap;
