import { Link } from "react-router-dom";
import { Leaf, Heart, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary-foreground/20 rounded-xl flex items-center justify-center">
                <Leaf className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold">SaveBite</span>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              AI-powered food management solution reducing food wastage in homes and restaurants while fighting climate change.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "Dashboard", "Inventory", "Donate", "About"].map((item) => (
                <li key={item}>
                  <Link
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-primary-foreground/80">
                <Mail className="w-4 h-4" />
                hello@savebite.app
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/80">
                <Phone className="w-4 h-4" />
                +91 98765 43210
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/80">
                <MapPin className="w-4 h-4" />
                Hyderabad, India
              </li>
            </ul>
          </div>

          {/* Mission */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Our Mission</h4>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Every bite saved is a step towards a sustainable future. Join us in reducing methane emissions and fighting climate change through smarter food management.
            </p>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/70">
            © 2025 SaveBite. All rights reserved.
          </p>
          <p className="flex items-center gap-1 text-sm text-primary-foreground/70">
            Made with <Heart className="w-4 h-4 text-destructive fill-destructive" /> by Team SaveBite
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
