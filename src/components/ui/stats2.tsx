import React from "react";

const Stats2: React.FC = () => {
  return (
    <section className="pb-20">
      <div className="max-w-7xl mx-auto px-[var(--section-padding-x)]">
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "15K+", label: "Successful Applications" },
            { number: "98%", label: "Success Rate" },
            { number: "50+", label: "Countries Served" },
            { number: "24/7", label: "Expert Support" },
          ].map((stat, index) => (
            <div key={index} className="text-center group">
              <div
                className="text-4xl font-bold mb-2 text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, var(--primary), var(--accent))",
                }}
              >
                {stat.number}
              </div>
              <div className="font-medium text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats2;
