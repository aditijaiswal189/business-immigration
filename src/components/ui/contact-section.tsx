"use client";
import { useState } from "react";
import { MapPin, Mail, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
// import { useToast } from "@/hooks/use-toast";
// import { useMutation } from "@tanstack/react-query";
// import { apiRequest } from "@/lib/queryClient";
// import { useToast } from "@/hooks/use-toast";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  //   const { toast } = useToast();

  //   const contactMutation = useMutation({
  //     mutationFn: async (data: typeof formData) => {
  //       const response = await apiRequest("POST", "/api/contact", data);
  //       return response.json();
  //     },
  //     onSuccess: () => {
  //       toast({
  //         title: "Message sent!",
  //         description: "Thank you for contacting us. We'll get back to you soon.",
  //       });
  //       setFormData({ name: "", email: "", message: "" });
  //     },
  //     onError: (error: any) => {
  //       toast({
  //         title: "Error",
  //         description:
  //           error.message || "Failed to send message. Please try again.",
  //         variant: "destructive",
  //       });
  //     },
  //   });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      // TODO: Add toast notification when toast hook is available
      console.log("Please fill in all required fields.");
      return;
    }
    // contactMutation.mutate(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[var(--muted-foreground)] text-sm uppercase tracking-wider mb-4">
              CONTACT
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-[var(--foreground)] mb-8 leading-tight">
              Get free business consultation Today
            </h2>
            <p className="text-[var(--muted-foreground)] mb-12">
              At GTR Worldwide Business Immigration, we are a renowned global
              consulting firm committed to helping businesses overcome
              challenges.
            </p>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <MapPin className="text-[var(--accent)] text-xl" />
                <span className="text-[var(--foreground)]">
                  Old Westbury 256, New York 11201, United States
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <Mail className="text-[var(--accent)] text-xl" />
                <span className="text-[var(--foreground)]">
                  gtrbusinessimmigration@example.com
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <Phone className="text-[var(--accent)] text-xl" />
                <span className="text-[var(--foreground)]">1-888-452-1505</span>
              </div>
            </div>
          </div>

          <div className="bg-[var(--card)]/80 backdrop-blur-sm border border-[var(--accent)]/20 rounded-2xl p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--card-foreground)] mb-2">
                    Name
                  </label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Your name"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--card-foreground)] mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Your email"
                    className="w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--card-foreground)] mb-2">
                  Message
                </label>
                <Textarea
                  rows={6}
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Your message"
                  className="w-full"
                />
              </div>

              <Button variant="goldBlack" type="submit">
                <div className="absolute inset-[2px] rounded-[inherit] bg-[linear-gradient(135deg,#000,#111,#000)] shadow-[inset_0_3px_6px_rgba(0,0,0,0.9),inset_0_-1px_3px_rgba(255,255,255,0.08),0_1px_0_rgba(255,255,255,0.08)]" />
                <span className="relative z-10 text-white font-bold">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Button>
              {/* <Button
                type="submit"
                // disabled={contactMutation.isPending}
                variant="blackGold" className="px-8 py-4 rounded-lg font-semibold w-full lg:w-auto"
              > */}
              {/* {contactMutation.isPending ? "Sending..." : "Send"}{" "} */}

              {/* </Button> */}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
