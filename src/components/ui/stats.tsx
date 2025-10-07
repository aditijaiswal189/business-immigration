import React from "react";

export interface StatItem {
  number: string;
  label: string;
}

interface StatsProps {
  stats: StatItem[];
  className?: string;
  columns?: 2 | 3 | 4;
}

const Stats: React.FC<StatsProps> = ({ 
  stats, 
  className = "",
  columns = 4 
}) => {
  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-3 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4"
  };

  return (
    <section className={`pb-20 ${className}`}>
      <div className="max-w-7xl mx-auto px-[var(--section-padding-x)]">
        <div className={`mt-20 grid ${gridCols[columns]} gap-8`}>
          {stats.map((stat, index) => (
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

export default Stats;
