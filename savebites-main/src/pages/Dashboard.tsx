import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  AlertTriangle,
  ArrowRight,
  Bell,
  Brain,
  Calendar,
  CheckCircle2,
  Clock,
  Heart,
  Leaf,
  Package,
  Plus,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for dashboard
const expiringItems = [
  { id: 1, name: "Milk", quantity: "1L", expiresIn: 1, storage: "Fridge", icon: "🥛" },
  { id: 2, name: "Yogurt", quantity: "500g", expiresIn: 2, storage: "Fridge", icon: "🥛" },
  { id: 3, name: "Tomatoes", quantity: "6 pcs", expiresIn: 3, storage: "Pantry", icon: "🍅" },
  { id: 4, name: "Bread", quantity: "1 loaf", expiresIn: 4, storage: "Pantry", icon: "🍞" },
];

const recentActivity = [
  { id: 1, action: "Added", item: "Fresh Vegetables", time: "2 hours ago" },
  { id: 2, action: "Consumed", item: "Chicken Breast", time: "5 hours ago" },
  { id: 3, action: "Donated", item: "Rice (5kg)", time: "Yesterday" },
  { id: 4, action: "Alert", item: "Eggs expiring soon", time: "Yesterday" },
];

const aiRecommendations = [
  {
    title: "Use tomatoes today",
    description: "Your tomatoes are best used within 2 days. Consider making pasta sauce or salad.",
    priority: "high",
  },
  {
    title: "Reduce bread purchase",
    description: "Based on your consumption, you're buying 20% more bread than needed.",
    priority: "medium",
  },
  {
    title: "Weekend cooking prep",
    description: "You have guests coming. Prepare 30% more portions for Saturday dinner.",
    priority: "info",
  },
];

const Dashboard = () => {
  const [totalItems] = useState(24);
  const [expiringSoon] = useState(4);
  const [savedThisMonth] = useState(12);
  const [donatedThisMonth] = useState(8);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold mb-2">Welcome back! 👋</h1>
            <p className="text-muted-foreground">
              Here's your food inventory overview and smart insights.
            </p>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              {
                label: "Total Items",
                value: totalItems,
                icon: Package,
                color: "bg-primary/10 text-primary",
                trend: "+3 this week",
                trendUp: true,
              },
              {
                label: "Expiring Soon",
                value: expiringSoon,
                icon: AlertTriangle,
                color: "bg-warning/10 text-warning",
                trend: "Within 5 days",
                trendUp: false,
              },
              {
                label: "Saved This Month",
                value: `${savedThisMonth} items`,
                icon: Leaf,
                color: "bg-success/10 text-success",
                trend: "+40% vs last month",
                trendUp: true,
              },
              {
                label: "Donated",
                value: `${donatedThisMonth} meals`,
                icon: Heart,
                color: "bg-destructive/10 text-destructive",
                trend: "8 families helped",
                trendUp: true,
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="p-6 shadow-card hover:shadow-elevated transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                    {stat.trendUp ? (
                      <TrendingUp className="w-5 h-5 text-success" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-warning" />
                    )}
                  </div>
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                  <div className="text-xs text-muted-foreground mt-2">{stat.trend}</div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Expiring Soon */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="lg:col-span-2"
            >
              <Card className="p-6 shadow-card">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-warning/10 rounded-xl flex items-center justify-center">
                      <Clock className="w-5 h-5 text-warning" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold">Expiring Soon</h2>
                      <p className="text-sm text-muted-foreground">Items that need attention</p>
                    </div>
                  </div>
                  <Link to="/inventory">
                    <Button variant="ghost" size="sm">
                      View All
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>

                <div className="space-y-4">
                  {expiringItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl"
                    >
                      <div className="text-3xl">{item.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{item.name}</span>
                          <span className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground">
                            {item.storage}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {item.quantity}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-medium ${
                          item.expiresIn <= 2 ? "text-destructive" : "text-warning"
                        }`}>
                          {item.expiresIn === 1 ? "Tomorrow" : `${item.expiresIn} days`}
                        </div>
                        <Progress
                          value={100 - (item.expiresIn * 20)}
                          className="w-20 h-2 mt-1"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* AI Recommendations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Card className="p-6 shadow-card h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 gradient-hero rounded-xl flex items-center justify-center">
                    <Brain className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">AI Insights</h2>
                    <p className="text-sm text-muted-foreground">Smart recommendations</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {aiRecommendations.map((rec, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-xl border ${
                        rec.priority === "high"
                          ? "bg-destructive/5 border-destructive/20"
                          : rec.priority === "medium"
                          ? "bg-warning/5 border-warning/20"
                          : "bg-primary/5 border-primary/20"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          rec.priority === "high"
                            ? "bg-destructive"
                            : rec.priority === "medium"
                            ? "bg-warning"
                            : "bg-primary"
                        }`} />
                        <div>
                          <h4 className="font-medium text-sm mb-1">{rec.title}</h4>
                          <p className="text-xs text-muted-foreground">{rec.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Quick Actions & Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Card className="p-6 shadow-card">
                <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-4">
                  <Link to="/inventory">
                    <Button variant="outline" className="w-full h-20 flex-col gap-2">
                      <Plus className="w-5 h-5" />
                      Add Item
                    </Button>
                  </Link>
                  <Link to="/donate">
                    <Button variant="outline" className="w-full h-20 flex-col gap-2">
                      <Heart className="w-5 h-5" />
                      Donate Surplus
                    </Button>
                  </Link>
                  <Link to="/inventory">
                    <Button variant="outline" className="w-full h-20 flex-col gap-2">
                      <Calendar className="w-5 h-5" />
                      View Calendar
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full h-20 flex-col gap-2">
                    <Bell className="w-5 h-5" />
                    Notifications
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Card className="p-6 shadow-card">
                <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center gap-4 py-2 border-b border-border last:border-0"
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity.action === "Added"
                          ? "bg-success/10 text-success"
                          : activity.action === "Consumed"
                          ? "bg-primary/10 text-primary"
                          : activity.action === "Donated"
                          ? "bg-destructive/10 text-destructive"
                          : "bg-warning/10 text-warning"
                      }`}>
                        {activity.action === "Added" && <Plus className="w-4 h-4" />}
                        {activity.action === "Consumed" && <CheckCircle2 className="w-4 h-4" />}
                        {activity.action === "Donated" && <Heart className="w-4 h-4" />}
                        {activity.action === "Alert" && <Bell className="w-4 h-4" />}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{activity.item}</div>
                        <div className="text-xs text-muted-foreground">{activity.action}</div>
                      </div>
                      <div className="text-xs text-muted-foreground">{activity.time}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
