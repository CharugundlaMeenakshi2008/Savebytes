import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative gradient-hero rounded-3xl p-12 md:p-20 text-center overflow-hidden"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-primary-foreground/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center justify-center w-16 h-16 bg-primary-foreground/20 rounded-2xl mb-8"
            >
              <Leaf className="w-8 h-8 text-primary-foreground" />
            </motion.div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 max-w-3xl mx-auto">
              Join the Movement to End Food Waste
            </h2>
            
            <p className="text-lg text-primary-foreground/90 mb-10 max-w-2xl mx-auto">
              Every meal saved is a step towards a sustainable future. Start your journey with SaveBite today and make a real difference.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/dashboard">
                <Button 
                  size="xl" 
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button 
                  variant="outline" 
                  size="xl"
                  className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
