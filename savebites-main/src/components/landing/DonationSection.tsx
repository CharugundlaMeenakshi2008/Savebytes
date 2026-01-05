import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Heart, MapPin, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import donationImage from "@/assets/donation-illustration.jpg";

const steps = [
  {
    icon: Heart,
    title: "Mark Surplus",
    description: "Identify and mark food items as available for donation",
  },
  {
    icon: MapPin,
    title: "Find NGOs",
    description: "Discover verified NGOs and food banks near you",
  },
  {
    icon: Truck,
    title: "Schedule Pickup",
    description: "Arrange convenient pickup times with selected NGO",
  },
  {
    icon: CheckCircle2,
    title: "Track Impact",
    description: "Monitor your donations and environmental impact",
  },
];

const DonationSection = () => {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-elevated">
              <img
                src={donationImage}
                alt="Community food donation"
                className="w-full h-auto"
              />
            </div>
            {/* Floating Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute -bottom-6 -right-6 bg-card rounded-2xl p-6 shadow-elevated border border-border"
            >
              <div className="text-3xl font-bold text-primary mb-1">15,000+</div>
              <div className="text-sm text-muted-foreground">Meals Donated</div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-full mb-6">
              <Heart className="w-4 h-4" />
              <span className="text-sm font-medium">Donate Surplus</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Turn Surplus into <span className="text-gradient">Smiles</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8">
              Don't let excess food go to waste. Our dynamic donation matching system connects you with verified NGOs in your area, making it easy to share your surplus with those in need.
            </p>

            <div className="space-y-4 mb-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 gradient-hero rounded-xl flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link to="/donate">
              <Button variant="hero" size="lg">
                Start Donating
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DonationSection;
