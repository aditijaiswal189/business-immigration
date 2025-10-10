"use client";

export function CountryList({
  countries,
  badgeColor,
  onClickCountry,
}: {
  countries: { name: string }[];
  badgeColor: string; // css var value for the little circle
  onClickCountry?: (name: string) => void;
}) {
  if (!countries?.length) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted grid place-items-center">
          <div className="w-8 h-8 rounded-full bg-card" />
        </div>
        <p className="text-muted-foreground text-sm">
          Select a region to view countries
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {countries.map((c) => (
        <div
          key={c.name}
          className="bg-muted rounded-md p-2 hover:opacity-90 transition cursor-default"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="w-4 h-4 rounded-full grid place-items-center"
                style={{ background: badgeColor }}
              >
                <span className="w-2 h-2 bg-card rounded-full block" />
              </span>
              <span className="font-medium text-foreground text-xs">
                {c.name}
              </span>
            </div>

            {onClickCountry && (
              <button
                onClick={() => onClickCountry(c.name)}
                className="text-blue-500 hover:text-blue-600 text-xs font-medium"
              >
                Details
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
