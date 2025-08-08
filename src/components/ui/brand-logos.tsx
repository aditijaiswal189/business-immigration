export default function BrandLogos() {
  const logos = [
    { name: "Proline", logo: "P" },
    { name: "Nextmove", logo: "★" },
    { name: "Sitemark", logo: "❋" },
    { name: "Penta", logo: "⬟" },
    { name: "Network", logo: "◈" },
  ];

  return (
    <>
      <section className="py-16 bg-gray-100" data-aos="fade-left">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 items-center">
            {logos.map((brand, index) => (
              <div
                key={brand.name}
                className="flex items-center justify-center space-x-3 text-gray-600 hover:text-gray-800 transition-colors cursor-pointer fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="text-2xl font-bold">{brand.logo}</span>
                <span className="text-lg font-semibold">{brand.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
