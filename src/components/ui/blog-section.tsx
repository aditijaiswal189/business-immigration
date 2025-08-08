const blogPosts = [
  {
    date: "12 March 2025",
    category: "ECONOMICS",
    title: "Tracking Global News and Globalization",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    author: {
      name: "admin",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40",
    },
  },
  {
    date: "12 March 2025",
    category: "INVESTMENT",
    title: "New Horizons and Emerging Markets",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    author: {
      name: "admin",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40",
    },
  },
  {
    date: "10 March 2025",
    category: "MARKETING",
    title: "Understanding behavioral biases and making to the rational way",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    author: {
      name: "admin",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40",
    },
  },
];

export default function BlogSection() {
  return (
    <section className="py-20">
      <div
        data-aos="fade-right"
        className="bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')",
        }}
      >
        <div className="bg-gray-800 bg-opacity-90">
          <div className="container mx-auto px-6 py-20">
            <div className="grid lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <div
                  key={post.title}
                  className="glass-effect rounded-2xl overflow-hidden hover-lift fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-4 text-sm">
                      <span className="text-primary-yellow">{post.date}</span>
                      <span className="bg-primary-yellow text-white px-2 py-1 rounded text-xs">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">
                      {post.title}
                    </h3>
                    <div className="flex items-center space-x-3">
                      <img
                        src={post.author.image}
                        alt={post.author.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-gray-300 text-sm">
                        By {post.author.name}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
