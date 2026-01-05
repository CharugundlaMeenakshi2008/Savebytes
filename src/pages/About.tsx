import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  Brain,
  Cloud,
  Database,
  Globe,
  Heart,
  Leaf,
  Linkedin,
  Mail,
  MapPin,
  Scan,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

const teamMembers = [
  {
    name: "Charugundla Meenakshi",
    role: "Project Lead",
    bio: "Passionate about sustainability and leveraging technology to solve real-world problems. Leading SaveBite's mission to reduce food waste.",
  },
];

const values = [
  {
    icon: Leaf,
    title: "Sustainability First",
    description: "Every feature we build is designed with environmental impact in mind.",
  },
  {
    icon: Heart,
    title: "Community Impact",
    description: "We believe in connecting surplus food with those who need it most.",
  },
  {
    icon: Brain,
    title: "AI for Good",
    description: "Leveraging artificial intelligence to make smarter food decisions.",
  },
  {
    icon: Users,
    title: "Inclusive Design",
    description: "Building accessible tools for everyone, regardless of technical expertise.",
  },
];

const techStack = [
  {
    icon: Cloud,
    name: "Firebase & Cloud Firestore",
    description: "Real-time database and authentication for seamless user experience.",
  },
  {
    icon: MapPin,
    name: "Google Maps API",
    description: "Location-based NGO discovery and distance-based matching.",
  },
  {
    icon: Scan,
    name: "ML Kit",
    description: "Barcode scanning and text recognition for easy food entry.",
  },
  {
    icon: Sparkles,
    name: "Gemini & NLP",
    description: "Advanced AI for consumption predictions and smart recommendations.",
  },
  {
    icon: Database,
    name: "Cloud Storage",
    description: "Secure file storage for receipts and donation records.",
  },
  {
    icon: Globe,
    name: "Multi-language NLP",
    description: "Supporting English and Indian regional languages.",
  },
];

const impactStats = [
  { value: "40%", label: "Average waste reduction" },
  { value: "25x", label: "Methane reduction vs CO₂" },
  { value: "10K+", label: "Families impacted" },
  { value: "₹40L+", label: "Food value saved" },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
                <Target className="w-4 h-4" />
                <span className="text-sm font-medium">Our Mission</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                Fighting Climate Change,{" "}
                <span className="text-gradient">One Meal at a Time</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                SaveBite is an AI-powered food management platform designed to reduce food wastage in homes and restaurants. By proactively tracking food inventory, predicting consumption, and connecting surplus with those in need, we're working to eliminate food waste and its devastating environmental impact.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/dashboard">
                  <Button variant="hero" size="xl">
                    Join the Movement
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Problem Statement */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-3xl font-bold mb-8 text-center">Why This Matters</h2>
              
              <div className="bg-gradient-to-r from-destructive/10 to-warning/10 rounded-3xl p-8 md:p-12 mb-8">
                <div className="prose prose-lg max-w-none text-foreground">
                  <p className="text-lg leading-relaxed mb-4">
                    <strong>1.3 billion tons of food is wasted globally every year.</strong> When this food ends up in landfills, it decomposes and releases methane—a greenhouse gas that is <strong>25 times more potent than CO₂</strong> in trapping heat in our atmosphere.
                  </p>
                  <p className="text-lg leading-relaxed mb-4">
                    Food waste contributes to <strong>8-10% of global greenhouse gas emissions</strong>. If food waste were a country, it would be the third-largest emitter of greenhouse gases after China and the United States.
                  </p>
                  <p className="text-lg leading-relaxed">
                    At SaveBite, we believe the solution isn't reactive waste management—it's <strong>proactive prevention</strong>. By helping people track their food, plan better, and share surplus, we can dramatically reduce waste at the source.
                  </p>
                </div>
              </div>

              {/* Impact Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {impactStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <Card className="p-6 text-center shadow-card">
                      <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These principles guide everything we build at SaveBite.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card className="p-6 text-center h-full shadow-card hover:shadow-elevated transition-shadow">
                    <div className="w-14 h-14 gradient-hero rounded-xl flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Meet the Team</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Passionate individuals working to make food waste a thing of the past.
              </p>
            </motion.div>

            <div className="max-w-md mx-auto">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card className="p-8 text-center shadow-card">
                    <div className="w-24 h-24 gradient-hero rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-4xl font-bold text-primary-foreground">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                    <h3 className="font-bold text-xl mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-4">{member.role}</p>
                    <p className="text-muted-foreground text-sm mb-6">{member.bio}</p>
                    <div className="flex justify-center gap-4">
                      <Button variant="ghost" size="icon">
                        <Linkedin className="w-5 h-5" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Mail className="w-5 h-5" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Technology & Architecture</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Built on modern, scalable technologies to deliver a seamless experience.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card className="p-6 shadow-card hover:shadow-elevated transition-shadow h-full">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                      <tech.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{tech.name}</h3>
                    <p className="text-sm text-muted-foreground">{tech.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="gradient-hero rounded-3xl p-12 text-center"
            >
              <h2 className="text-3xl font-bold text-primary-foreground mb-4">
                Ready to Make a Difference?
              </h2>
              <p className="text-primary-foreground/90 mb-8 max-w-xl mx-auto">
                Join thousands of users already reducing food waste and fighting climate change with SaveBite.
              </p>
              <Link to="/dashboard">
                <Button
                  size="xl"
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                >
                  Start Your Journey
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
