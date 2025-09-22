import {
  Box,
  TrendingUp,
  Users,
  Megaphone,
  Lightbulb,
  ClipboardList,
  Info,
  Briefcase,
  Smartphone,
  Mail,
  BookOpen,
  ArrowRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const services = [
  { name: "Visa Consultation", icon: TrendingUp },
  { name: "Business Setup", icon: Users },
  { name: "Legal Documentation", icon: Megaphone },
  { name: "Investment Advisory", icon: Lightbulb },
  { name: "Compliance Support", icon: ClipboardList },
];

const pages = [
  { name: "About", icon: Info },
  { name: "Career", icon: Briefcase },
  { name: "Applications", icon: Smartphone },
  { name: "Contact Us", icon: Mail },
  { name: "Case Studies", icon: BookOpen },
];

export default function Footer() {
  return (
    <footer className="bg-card py-16">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Box className="text-primary-yellow text-2xl" />
              <span className="text-2xl font-bold text-card-foreground">
                GTR Business Immigration
              </span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Professional & modern, a theme designed to help your business
              stand out from the rest.
            </p>
            <p className="text-muted-foreground">
              We understand that business can be chaotic. That's where we come
              in. We're focused on adding calm to your chaos.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold text-card-foreground mb-6">Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary-yellow transition-colors flex items-center"
                  >
                    <service.icon className="w-4 h-4 mr-2" />
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-card-foreground mb-6">Pages</h4>
            <ul className="space-y-3">
              {pages.map((page) => (
                <li key={page.name}>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary-yellow transition-colors flex items-center"
                  >
                    <page.icon className="w-4 h-4 mr-2" />
                    {page.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-card-foreground mb-6">Newsletter</h4>
            <p className="text-muted-foreground mb-4">Enter your email</p>
            <div className="flex">
              <Input
                type="email"
                className="flex-1 rounded-r-none"
                placeholder="Your email"
              />
              <Button className="bg-primary-yellow hover:bg-primary-yellow/90 text-primary rounded-l-none">
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex space-x-4 mt-6">
              <a
                href="#"
                className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary-yellow hover:text-primary transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary-yellow hover:text-primary transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary-yellow hover:text-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary-yellow hover:text-primary transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col lg:flex-row items-center justify-between">
          <p className="text-muted-foreground text-sm">
            © Copyright GTR Business Immigration All rights reserved
          </p>
          <div className="flex items-center space-x-6 mt-4 lg:mt-0">
            <a
              href="#"
              className="text-muted-foreground hover:text-primary-yellow text-sm transition-colors"
            >
              Terms and conditions
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary-yellow text-sm transition-colors"
            >
              Privacy policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
