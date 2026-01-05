import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Heart,
  MapPin,
  Package,
  Phone,
  Search,
  Star,
  Truck,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type NGO = {
  id: number;
  name: string;
  distance: string;
  rating: number;
  verified: boolean;
  meals: string;
  address: string;
  phone: string;
  available: boolean;
  nextPickup: string;
};

// Mock NGO data
const ngos: NGO[] = [
  {
    id: 1,
    name: "Akshaya Patra Foundation",
    distance: "2.3 km",
    rating: 4.8,
    verified: true,
    meals: "50,000+ meals served",
    address: "Jubilee Hills, Hyderabad",
    phone: "+91 98765 43210",
    available: true,
    nextPickup: "Today, 5:00 PM",
  },
  {
    id: 2,
    name: "Feeding India",
    distance: "3.5 km",
    rating: 4.6,
    verified: true,
    meals: "30,000+ meals served",
    address: "Banjara Hills, Hyderabad",
    phone: "+91 98765 43211",
    available: true,
    nextPickup: "Tomorrow, 10:00 AM",
  },
  {
    id: 3,
    name: "Robin Hood Army",
    distance: "4.1 km",
    rating: 4.9,
    verified: true,
    meals: "100,000+ meals served",
    address: "Madhapur, Hyderabad",
    phone: "+91 98765 43212",
    available: true,
    nextPickup: "Today, 7:00 PM",
  },
  {
    id: 4,
    name: "No Food Waste NGO",
    distance: "5.8 km",
    rating: 4.5,
    verified: true,
    meals: "20,000+ meals served",
    address: "Gachibowli, Hyderabad",
    phone: "+91 98765 43213",
    available: false,
    nextPickup: "Wednesday, 9:00 AM",
  },
];

// Mock donation history
const initialDonationHistory = [
  {
    id: 1,
    date: "2025-01-04",
    items: "Rice (5kg), Vegetables (2kg)",
    ngo: "Akshaya Patra Foundation",
    status: "Delivered",
    meals: 25,
  },
  {
    id: 2,
    date: "2025-01-01",
    items: "Cooked Food (10 portions)",
    ngo: "Robin Hood Army",
    status: "Delivered",
    meals: 10,
  },
  {
    id: 3,
    date: "2024-12-28",
    items: "Bread (5 loaves), Milk (2L)",
    ngo: "Feeding India",
    status: "Delivered",
    meals: 15,
  },
];

// Mock surplus items
const initialSurplusItems = [
  { id: 1, name: "Rice", quantity: "3kg", icon: "🍚" },
  { id: 2, name: "Dal", quantity: "1kg", icon: "🫘" },
  { id: 3, name: "Vegetables", quantity: "2kg", icon: "🥗" },
];

const Donate = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNGO, setSelectedNGO] = useState<NGO | null>(null);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [donationStep, setDonationStep] = useState<"confirm" | "success">("confirm");
  const [donationHistory, setDonationHistory] = useState(initialDonationHistory);
  const [surplusItems, setSurplusItems] = useState(initialSurplusItems);
  const [totalMealsDonated, setTotalMealsDonated] = useState(50);
  const [totalNGOsConnected, setTotalNGOsConnected] = useState(3);

  const filteredNGOs = ngos.filter((ngo) =>
    ngo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleItemSelection = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleOpenDonationDialog = () => {
    if (!selectedNGO) {
      toast({
        title: "Select an NGO",
        description: "Please select an NGO from the list to donate to.",
        variant: "destructive",
      });
      return;
    }
    if (selectedItems.length === 0) {
      toast({
        title: "Select items",
        description: "Please select at least one item to donate.",
        variant: "destructive",
      });
      return;
    }
    setDonationStep("confirm");
    setIsDialogOpen(true);
  };

  const handleConfirmDonation = () => {
    // Calculate estimated meals
    const estimatedMeals = selectedItems.length * 5;
    
    // Create new donation record
    const newDonation = {
      id: Date.now(),
      date: new Date().toISOString().split("T")[0],
      items: surplusItems
        .filter((i) => selectedItems.includes(i.id))
        .map((i) => `${i.name} (${i.quantity})`)
        .join(", "),
      ngo: selectedNGO!.name,
      status: "Pending Pickup",
      meals: estimatedMeals,
    };

    // Update donation history
    setDonationHistory([newDonation, ...donationHistory]);
    
    // Update stats
    setTotalMealsDonated((prev) => prev + estimatedMeals);
    
    // Check if this is a new NGO
    const existingNGOs = donationHistory.map((d) => d.ngo);
    if (!existingNGOs.includes(selectedNGO!.name)) {
      setTotalNGOsConnected((prev) => prev + 1);
    }

    // Remove donated items from surplus
    setSurplusItems((prev) => prev.filter((item) => !selectedItems.includes(item.id)));

    // Show success state
    setDonationStep("success");

    // Show toast
    toast({
      title: "Donation Scheduled! 🎉",
      description: `${selectedNGO!.name} will pick up your donation soon.`,
    });
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    // Reset after dialog closes
    setTimeout(() => {
      if (donationStep === "success") {
        setSelectedNGO(null);
        setSelectedItems([]);
        setDonationStep("confirm");
      }
    }, 200);
  };

  const canDonate = selectedNGO && selectedItems.length > 0;

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
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-full mb-6">
              <Heart className="w-4 h-4" />
              <span className="text-sm font-medium">Share the Love</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              Donate Surplus Food
            </h1>
            <p className="text-lg text-muted-foreground">
              Connect with verified NGOs near you and turn your excess food into meals for those in need.
            </p>
          </motion.div>

          {/* Impact Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12"
          >
            {[
              { label: "Meals Donated", value: totalMealsDonated.toString(), icon: Package },
              { label: "NGOs Connected", value: totalNGOsConnected.toString(), icon: Heart },
              { label: "CO₂ Saved", value: `${Math.round(totalMealsDonated * 0.5)}kg`, icon: MapPin },
            ].map((stat) => (
              <Card key={stat.label} className="p-6 text-center shadow-card">
                <div className="w-12 h-12 gradient-hero rounded-xl flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* NGO List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="lg:col-span-2"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Nearby NGOs</h2>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search NGOs..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Map Placeholder */}
              <Card className="h-48 mb-6 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-primary mx-auto mb-2" />
                    <p className="text-muted-foreground">
                      Interactive map with NGO locations
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Connect Google Maps API for live view
                    </p>
                  </div>
                </div>
              </Card>

              {/* NGO Cards */}
              <div className="space-y-4">
                {filteredNGOs.map((ngo) => (
                  <Card
                    key={ngo.id}
                    className={`p-4 shadow-card hover:shadow-elevated transition-all cursor-pointer ${
                      selectedNGO?.id === ngo.id ? "ring-2 ring-primary bg-primary/5" : ""
                    }`}
                    onClick={() => {
                      setSelectedNGO(ngo);
                      toast({
                        title: `Selected: ${ngo.name}`,
                        description: `Next pickup: ${ngo.nextPickup}`,
                      });
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 gradient-hero rounded-xl flex items-center justify-center flex-shrink-0">
                        <Heart className="w-7 h-7 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{ngo.name}</h3>
                          {ngo.verified && (
                            <Badge variant="secondary" className="text-xs">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-2">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {ngo.distance}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-warning fill-warning" />
                            {ngo.rating}
                          </span>
                          <span>{ngo.meals}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {ngo.address}
                          </span>
                          <Badge
                            variant={ngo.available ? "default" : "secondary"}
                            className={ngo.available ? "bg-success" : ""}
                          >
                            {ngo.available ? "Available Now" : "Scheduled Only"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* Donation Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Card className="p-6 shadow-card sticky top-24">
                <h2 className="text-lg font-semibold mb-4">Quick Donate</h2>

                {/* Surplus Items */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-3 text-muted-foreground">
                    Your Surplus Items
                  </h3>
                  {surplusItems.length > 0 ? (
                    <div className="space-y-2">
                      {surplusItems.map((item) => (
                        <div
                          key={item.id}
                          className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                            selectedItems.includes(item.id)
                              ? "bg-primary/10 border-2 border-primary"
                              : "bg-muted/50 border-2 border-transparent hover:border-muted"
                          }`}
                          onClick={() => toggleItemSelection(item.id)}
                        >
                          <span className="text-2xl">{item.icon}</span>
                          <div className="flex-1">
                            <div className="font-medium text-sm">{item.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {item.quantity}
                            </div>
                          </div>
                          {selectedItems.includes(item.id) && (
                            <CheckCircle2 className="w-5 h-5 text-primary" />
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No surplus items available</p>
                      <p className="text-xs">Add items from your inventory</p>
                    </div>
                  )}
                </div>

                {/* Selected NGO */}
                {selectedNGO && (
                  <div className="mb-6 p-4 bg-primary/5 rounded-xl border border-primary/20">
                    <h3 className="text-sm font-medium mb-2">Donating to:</h3>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 gradient-hero rounded-lg flex items-center justify-center">
                        <Heart className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{selectedNGO.name}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {selectedNGO.nextPickup}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Instruction text when nothing selected */}
                {!selectedNGO && !selectedItems.length && (
                  <div className="mb-6 p-4 bg-muted/50 rounded-xl text-center">
                    <p className="text-sm text-muted-foreground">
                      👆 Select an NGO from the list and choose items to donate
                    </p>
                  </div>
                )}

                {/* Donate Button */}
                <Button
                  variant="hero"
                  className="w-full"
                  onClick={handleOpenDonationDialog}
                  disabled={surplusItems.length === 0}
                >
                  {canDonate ? "Schedule Pickup" : "Select NGO & Items"}
                  <ArrowRight className="w-4 h-4" />
                </Button>

                {/* Donation Dialog */}
                <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {donationStep === "success" ? "Donation Scheduled! 🎉" : "Confirm Donation"}
                      </DialogTitle>
                    </DialogHeader>
                    {donationStep === "success" ? (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                          <CheckCircle2 className="w-8 h-8 text-primary-foreground" />
                        </div>
                        <p className="text-lg font-medium mb-2">Thank you!</p>
                        <p className="text-muted-foreground mb-4">
                          Your donation has been scheduled. {selectedNGO?.name} will contact you shortly for pickup.
                        </p>
                        <Button variant="outline" onClick={handleCloseDialog}>
                          Close
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4 py-4">
                        <div className="p-4 bg-muted/50 rounded-xl">
                          <h4 className="font-medium mb-2">Items to Donate</h4>
                          <div className="space-y-1">
                            {surplusItems
                              .filter((i) => selectedItems.includes(i.id))
                              .map((item) => (
                                <div key={item.id} className="text-sm flex justify-between">
                                  <span>{item.icon} {item.name}</span>
                                  <span className="text-muted-foreground">{item.quantity}</span>
                                </div>
                              ))}
                          </div>
                        </div>

                        {selectedNGO && (
                          <div className="p-4 bg-muted/50 rounded-xl">
                            <h4 className="font-medium mb-2">NGO Details</h4>
                            <div className="text-sm space-y-1">
                              <div className="flex items-center gap-2">
                                <Heart className="w-4 h-4 text-primary" />
                                {selectedNGO.name}
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <MapPin className="w-4 h-4" />
                                {selectedNGO.address}
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Phone className="w-4 h-4" />
                                {selectedNGO.phone}
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Truck className="w-4 h-4" />
                                Pickup: {selectedNGO.nextPickup}
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="flex gap-3">
                          <Button variant="outline" className="flex-1" onClick={handleCloseDialog}>
                            Cancel
                          </Button>
                          <Button variant="hero" className="flex-1" onClick={handleConfirmDonation}>
                            Confirm Donation
                          </Button>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>

                {/* Donation History */}
                <div className="mt-8">
                  <h3 className="text-sm font-medium mb-3 text-muted-foreground">
                    Recent Donations
                  </h3>
                  <div className="space-y-3">
                    {donationHistory.slice(0, 3).map((donation) => (
                      <div
                        key={donation.id}
                        className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl"
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          donation.status === "Delivered" ? "bg-success/10" : "bg-warning/10"
                        }`}>
                          <CheckCircle2 className={`w-5 h-5 ${
                            donation.status === "Delivered" ? "text-success" : "text-warning"
                          }`} />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium">{donation.ngo}</div>
                          <div className="text-xs text-muted-foreground">
                            {donation.meals} meals • {donation.date}
                          </div>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {donation.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
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

export default Donate;