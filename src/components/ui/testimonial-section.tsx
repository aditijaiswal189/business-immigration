"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";

const testimonials = [
  {
    id: 1,
    quote:
      "Streamlined our recruitment process, helped develop clear HR policies made onboarding a seamless experience hires.",
    author: "Robert Robinson",
    title: "Chief Designer",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
  },
  {
    id: 2,
    quote:
      "Exceptional financial planning services that transformed our business operations and strategic decision-making processes.",
    author: "Sarah Johnson",
    title: "CEO",
    image:
      "https://images.unsplash.com/photo-1494790108755-2616b612b577?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
  },
  {
    id: 3,
    quote:
      "Outstanding consulting expertise that delivered measurable results and exceeded our business growth expectations.",
    author: "Michael Chen",
    title: "CTO",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
  },
];

export default function TestimonialSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const current = testimonials[currentTestimonial];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[var(--muted-foreground)] text-sm uppercase tracking-wider mb-4">
            OUR CLIENT SAY
          </p>
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <img
              src={current.image}
              alt={current.author}
              className="w-16 h-16 rounded-full mx-auto mb-6 object-cover"
            />
          </div>

          <blockquote className="text-3xl lg:text-4xl font-bold text-[var(--foreground)] mb-8 leading-relaxed">
            "{current.quote}"
          </blockquote>

          <div className="flex justify-center mb-8">
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="text-[var(--accent)] text-xl">
                  ★
                </span>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <p className="text-lg font-semibold text-[var(--foreground)]">
              {current.author}
            </p>
            <p className="text-[var(--muted-foreground)]">{current.title}</p>
          </div>

          <div className="flex justify-center space-x-4">
            <Button variant="goldBlack" onClick={prevTestimonial}>
              <div className="absolute inset-[2px] rounded-[inherit] bg-[linear-gradient(135deg,#000,#111,#000)] shadow-[inset_0_3px_6px_rgba(0,0,0,0.9),inset_0_-1px_3px_rgba(255,255,255,0.08),0_1px_0_rgba(255,255,255,0.08)]" />
              <span className="relative z-10 text-white font-bold">
                <ChevronLeft className="w-5 h-5" />
              </span>
            </Button>

            <Button variant="goldWhite" onClick={nextTestimonial}>
              <div className="absolute inset-[2px] rounded-[inherit] bg-[linear-gradient(135deg,#fff,#f9f9f9,#f0f0f0)] shadow-[inset_0_2px_5px_rgba(255,255,255,0.8),inset_0_-1px_2px_rgba(0,0,0,0.15),0_1px_0_rgba(255,255,255,0.7)]" />
              <span className="relative z-10 font-bold ">
                {" "}
                <ChevronRight className="w-5 h-5" />
              </span>
            </Button>
            {/* <button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full border-2 border-[#F5C178]/30 flex items-center justify-center hover:bg-gradient-to-r hover:from-[#95502F] hover:to-[#F5C178] hover:border-[#F5C178] hover:text-white transition-all duration-300"
            >
              
            </button>
            <button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full border-2 border-[#F5C178]/30 flex items-center justify-center hover:bg-gradient-to-r hover:from-[#95502F] hover:to-[#F5C178] hover:border-[#F5C178] hover:text-white transition-all duration-300"
            >
             
            </button> */}
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentTestimonial
                    ? "bg-[linear-gradient(90deg,var(--primary),var(--accent))]"
                    : "bg-[var(--muted)]/50"
                }`}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
