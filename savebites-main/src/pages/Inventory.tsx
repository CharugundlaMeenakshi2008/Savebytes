import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertTriangle,
  Apple,
  Beef,
  Carrot,
  Edit2,
  Filter,
  Milk,
  Plus,
  Scan,
  Search,
  Trash2,
  Wheat,
} from "lucide-react";

// Mock inventory data
const initialInventory = [
  { id: 1, name: "Milk", category: "Dairy", quantity: "1L", purchaseDate: "2025-01-02", expiryDate: "2025-01-10", storage: "Fridge", icon: "🥛" },
  { id: 2, name: "Yogurt", category: "Dairy", quantity: "500g", purchaseDate: "2025-01-03", expiryDate: "2025-01-08", storage: "Fridge", icon: "🥛" },
  { id: 3, name: "Tomatoes", category: "Vegetables", quantity: "6 pcs", purchaseDate: "2025-01-03", expiryDate: "2025-01-09", storage: "Pantry", icon: "🍅" },
  { id: 4, name: "Bread", category: "Bakery", quantity: "1 loaf", purchaseDate: "2025-01-04", expiryDate: "2025-01-11", storage: "Pantry", icon: "🍞" },
  { id: 5, name: "Chicken Breast", category: "Meat", quantity: "500g", purchaseDate: "2025-01-01", expiryDate: "2025-01-06", storage: "Freezer", icon: "🍗" },
  { id: 6, name: "Eggs", category: "Dairy", quantity: "12 pcs", purchaseDate: "2025-01-02", expiryDate: "2025-01-20", storage: "Fridge", icon: "🥚" },
  { id: 7, name: "Spinach", category: "Vegetables", quantity: "200g", purchaseDate: "2025-01-04", expiryDate: "2025-01-07", storage: "Fridge", icon: "🥬" },
  { id: 8, name: "Rice", category: "Grains", quantity: "2kg", purchaseDate: "2024-12-15", expiryDate: "2025-06-15", storage: "Pantry", icon: "🍚" },
  { id: 9, name: "Apples", category: "Fruits", quantity: "4 pcs", purchaseDate: "2025-01-02", expiryDate: "2025-01-12", storage: "Fridge", icon: "🍎" },
  { id: 10, name: "Cheese", category: "Dairy", quantity: "250g", purchaseDate: "2025-01-01", expiryDate: "2025-01-15", storage: "Fridge", icon: "🧀" },
];

const categories = [
  { name: "All", icon: Filter },
  { name: "Dairy", icon: Milk },
  { name: "Vegetables", icon: Carrot },
  { name: "Fruits", icon: Apple },
  { name: "Meat", icon: Beef },
  { name: "Grains", icon: Wheat },
];

const storageTypes = ["Fridge", "Freezer", "Pantry"];

type InventoryItem = {
  id: number;
  name: string;
  category: string;
  quantity: string;
  purchaseDate: string;
  expiryDate: string;
  storage: string;
  icon: string;
};

const Inventory = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    quantity: "",
    storage: "",
    expiryDate: "",
  });

  const today = new Date();

  const getDaysUntilExpiry = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getExpiryStatus = (days: number) => {
    if (days <= 0) return "expired";
    if (days <= 3) return "critical";
    if (days <= 7) return "warning";
    return "safe";
  };

  const filteredInventory = inventory
    .filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => getDaysUntilExpiry(a.expiryDate) - getDaysUntilExpiry(b.expiryDate));

  const handleAddItem = () => {
    if (newItem.name && newItem.expiryDate) {
      const item: InventoryItem = {
        id: Date.now(),
        ...newItem,
        purchaseDate: today.toISOString().split("T")[0],
        icon: "📦",
      };
      setInventory([...inventory, item]);
      setNewItem({ name: "", category: "", quantity: "", storage: "", expiryDate: "" });
      setIsAddDialogOpen(false);
    }
  };

  const handleEditItem = (item: InventoryItem) => {
    setEditingItem({ ...item });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (editingItem && editingItem.name && editingItem.expiryDate) {
      setInventory(inventory.map((item) => 
        item.id === editingItem.id ? editingItem : item
      ));
      setIsEditDialogOpen(false);
      setEditingItem(null);
    }
  };

  const handleDeleteItem = (id: number) => {
    setInventory(inventory.filter((item) => item.id !== id));
  };

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
            className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
          >
            <div>
              <h1 className="text-3xl font-bold mb-2">Food Inventory</h1>
              <p className="text-muted-foreground">
                Track and manage your food items to reduce waste
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <Scan className="w-4 h-4" />
                Scan Barcode
              </Button>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="hero" className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add Item
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Food Item</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Item Name</Label>
                      <Input
                        placeholder="e.g., Milk, Bread, Tomatoes"
                        value={newItem.name}
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Category</Label>
                        <Select
                          value={newItem.category}
                          onValueChange={(value) => setNewItem({ ...newItem, category: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.slice(1).map((cat) => (
                              <SelectItem key={cat.name} value={cat.name}>
                                {cat.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Storage</Label>
                        <Select
                          value={newItem.storage}
                          onValueChange={(value) => setNewItem({ ...newItem, storage: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select storage" />
                          </SelectTrigger>
                          <SelectContent>
                            {storageTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Quantity</Label>
                        <Input
                          placeholder="e.g., 1L, 500g, 6 pcs"
                          value={newItem.quantity}
                          onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Expiry Date</Label>
                        <Input
                          type="date"
                          value={newItem.expiryDate}
                          onChange={(e) => setNewItem({ ...newItem, expiryDate: e.target.value })}
                        />
                      </div>
                    </div>
                    <Button className="w-full" variant="hero" onClick={handleAddItem}>
                      Add to Inventory
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </motion.div>

          {/* Search & Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search items..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat.name}
                  variant={selectedCategory === cat.name ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat.name)}
                  className="gap-2"
                >
                  <cat.icon className="w-4 h-4" />
                  {cat.name}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Inventory Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredInventory.map((item, index) => {
              const daysLeft = getDaysUntilExpiry(item.expiryDate);
              const status = getExpiryStatus(daysLeft);

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                >
                  <Card className={`p-4 shadow-card hover:shadow-elevated transition-all ${
                    status === "expired" ? "border-destructive/50 bg-destructive/5" :
                    status === "critical" ? "border-warning/50 bg-warning/5" :
                    status === "warning" ? "border-warning/30" : ""
                  }`}>
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{item.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold">{item.name}</h3>
                          <div className="flex gap-1">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => handleEditItem(item)}
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive"
                              onClick={() => handleDeleteItem(item.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                            {item.category}
                          </span>
                          <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                            {item.storage}
                          </span>
                          <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                            {item.quantity}
                          </span>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Expires:</span>
                            <span className={`font-medium ${
                              status === "expired" ? "text-destructive" :
                              status === "critical" ? "text-destructive" :
                              status === "warning" ? "text-warning" : "text-success"
                            }`}>
                              {status === "expired" ? "Expired!" :
                               daysLeft === 0 ? "Today" :
                               daysLeft === 1 ? "Tomorrow" :
                               `${daysLeft} days left`}
                            </span>
                          </div>
                          <Progress
                            value={status === "expired" ? 100 : Math.max(0, 100 - daysLeft * 5)}
                            className={`h-2 ${
                              status === "expired" || status === "critical" ? "[&>div]:bg-destructive" :
                              status === "warning" ? "[&>div]:bg-warning" : "[&>div]:bg-success"
                            }`}
                          />
                        </div>

                        {status === "critical" && (
                          <div className="mt-3 flex items-center gap-2 text-xs text-destructive">
                            <AlertTriangle className="w-3 h-3" />
                            Use soon or consider donating
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {filteredInventory.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-xl font-semibold mb-2">No items found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery ? "Try adjusting your search" : "Start by adding items to your inventory"}
              </p>
              <Button variant="hero" onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add First Item
              </Button>
            </div>
          )}

          {/* Edit Item Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Food Item</DialogTitle>
              </DialogHeader>
              {editingItem && (
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Item Name</Label>
                    <Input
                      placeholder="e.g., Milk, Bread, Tomatoes"
                      value={editingItem.name}
                      onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select
                        value={editingItem.category}
                        onValueChange={(value) => setEditingItem({ ...editingItem, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.slice(1).map((cat) => (
                            <SelectItem key={cat.name} value={cat.name}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Storage</Label>
                      <Select
                        value={editingItem.storage}
                        onValueChange={(value) => setEditingItem({ ...editingItem, storage: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select storage" />
                        </SelectTrigger>
                        <SelectContent>
                          {storageTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Quantity</Label>
                      <Input
                        placeholder="e.g., 1L, 500g, 6 pcs"
                        value={editingItem.quantity}
                        onChange={(e) => setEditingItem({ ...editingItem, quantity: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Expiry Date</Label>
                      <Input
                        type="date"
                        value={editingItem.expiryDate}
                        onChange={(e) => setEditingItem({ ...editingItem, expiryDate: e.target.value })}
                      />
                    </div>
                  </div>
                  <Button className="w-full" variant="hero" onClick={handleSaveEdit}>
                    Save Changes
                  </Button>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Inventory;
