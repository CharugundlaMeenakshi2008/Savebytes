import { motion } from "framer-motion";
import { AlertTriangle, Factory, ShoppingCart, Utensils } from "lucide-react";

const problems = [
  {
    icon: ShoppingCart,
    title: "Overbuying",
    description: "Poor planning leads to purchasing more food than needed, resulting in spoilage and waste.",
  },
  {
    icon: Utensils,
    title: "Overcooking",
    description: "Without consumption insights, restaurants and homes prepare excess food that goes uneaten.",
  },
  {
    icon: AlertTriangle,
    title: "No Visibility",
    description: "Lack of inventory tracking means food expires unnoticed in fridges and pantries.",
  },
  {
    icon: Factory,
    title: "Landfill Impact",
    description: "Food waste in landfills releases methane, a greenhouse gas 25x more potent than CO₂.",
  },
];

const ProblemSection = () => {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-full mb-6">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm font-medium">The Problem</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            1.3 Billion Tons of Food Wasted Every Year
          </h2>
          <p className="text-lg text-muted-foreground">
            Food waste contributes to 8-10% of global greenhouse gas emissions. When food rots in landfills, it produces methane—a powerful driver of climate change.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-card rounded-2xl p-6 shadow-card border border-border hover:shadow-elevated transition-shadow"
            >
              <div className="w-14 h-14 gradient-danger rounded-xl flex items-center justify-center mb-4">
                <problem.icon className="w-7 h-7 text-destructive-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{problem.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Impact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-16 bg-gradient-to-r from-destructive/10 to-warning/10 rounded-3xl p-8 md:p-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-destructive mb-2">8-10%</div>
              <div className="text-muted-foreground">of global emissions from food waste</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-warning mb-2">₹100L Cr</div>
              <div className="text-muted-foreground">economic cost annually</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">25x</div>
              <div className="text-muted-foreground">methane's impact vs CO₂</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
