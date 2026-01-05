import { motion } from "framer-motion";
import { 
  Bell, 
  Brain, 
  Scan, 
  Heart, 
  MapPin, 
  Mic, 
  Globe, 
  Clock 
} from "lucide-react";
import aiCookingImage from "@/assets/ai-cooking.jpg";

const features = [
  {
    icon: Scan,
    title: "Smart Inventory Tracking",
    description: "Add food items via barcode scanning or manual entry. Track purchase dates, expiry dates, and storage locations.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Bell,
    title: "Proactive Alerts",
    description: "Receive notifications before food expires—3 days, 1 day, or custom alerts to minimize waste.",
    color: "bg-warning/10 text-warning",
  },
  {
    icon: Brain,
    title: "AI Cooking Insights",
    description: "Get personalized cooking recommendations based on your inventory and consumption patterns.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Clock,
    title: "Expiry Timeline",
    description: "Visual timeline of expiring items helps you plan meals and prioritize consumption.",
    color: "bg-success/10 text-success",
  },
  {
    icon: Heart,
    title: "Donation Matching",
    description: "Connect surplus food with nearby NGOs through our intelligent matching system.",
    color: "bg-destructive/10 text-destructive",
  },
  {
    icon: MapPin,
    title: "NGO Locator",
    description: "Find and connect with verified food banks and NGOs in your area for quick donations.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Mic,
    title: "Voice Interface",
    description: "Add items hands-free using voice commands—perfect for busy kitchens.",
    color: "bg-warning/10 text-warning",
  },
  {
    icon: Globe,
    title: "Multi-Language",
    description: "Available in English and major Indian languages for wider accessibility.",
    color: "bg-accent/10 text-accent",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <Brain className="w-4 h-4" />
            <span className="text-sm font-medium">Powered by AI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Smart Features for Smarter Food Management
          </h2>
          <p className="text-lg text-muted-foreground">
            SaveBite combines cutting-edge AI with intuitive design to help you reduce waste, save money, and make a positive environmental impact.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className="group bg-card rounded-2xl p-6 shadow-soft border border-border hover:shadow-card hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${feature.color}`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* AI Feature Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl overflow-hidden"
        >
          <div className="absolute inset-0">
            <img
              src={aiCookingImage}
              alt="AI-powered food management"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/70" />
          </div>
          
          <div className="relative z-10 p-8 md:p-16">
            <div className="max-w-xl">
              <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
                Predictive Cooking Assistant
              </h3>
              <p className="text-primary-foreground/90 text-lg leading-relaxed mb-6">
                Our AI analyzes your food usage patterns, upcoming events, and even weather conditions to suggest optimal cooking quantities. Avoid overcooking and reduce waste with intelligent recommendations.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Usage Patterns", "Event Planning", "Weather Integration", "Smart Alerts"].map((tag) => (
                  <span
                    key={tag}
                    className="bg-primary-foreground/20 text-primary-foreground px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
