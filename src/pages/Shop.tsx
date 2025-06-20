import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Gem, Zap, Snowflake, Lightbulb, Crown, Moon, TreePine } from "lucide-react";
import { motion } from "framer-motion";
import MetricsBar from "@/components/MetricsBar";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

const Shop = () => {
  const shopItems = [
    {
      id: 1,
      name: "Streak Freeze",
      description: "Protect your streak for one day",
      price: 50,
      icon: Snowflake,
      category: "Power-ups"
    },
    {
      id: 2,
      name: "Double XP",
      description: "Earn 2x XP for 24 hours",
      price: 100,
      icon: Zap,
      category: "Power-ups"
    },
    {
      id: 3,
      name: "Hint Boost",
      description: "Get hints on quiz questions",
      price: 25,
      icon: Lightbulb,
      category: "Power-ups"
    },
    {
      id: 4,
      name: "Golden Theme",
      description: "Unlock premium golden theme",
      price: 500,
      icon: Crown,
      category: "Themes"
    },
    {
      id: 5,
      name: "Night Owl Theme",
      description: "Beautiful dark purple theme",
      price: 300,
      icon: Moon,
      category: "Themes"
    },
    {
      id: 6,
      name: "Forest Theme",
      description: "Calming green nature theme",
      price: 300,
      icon: TreePine,
      category: "Themes"
    }
  ];

  const categories = ["All", "Power-ups", "Themes"];

  return (
    <>
      <MetricsBar xp={150} streak={0} lessons={"0/5"} />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="min-h-screen bg-background text-foreground p-3 sm:p-6 space-y-8 max-w-3xl mx-auto w-full"
      >
        <motion.div variants={itemVariants} className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Shop</h1>
          <p className="text-xl text-muted-foreground">
            Spend your XP on power-ups and customizations
          </p>
        </motion.div>

        {/* XP Balance */}
        <motion.div variants={itemVariants}>
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Gem className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Your Balance</p>
                    <p className="text-2xl font-bold text-primary">150 XP</p>
                  </div>
                </div>
                <Button variant="outline">
                  Earn More XP
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Categories */}
        <motion.div variants={itemVariants} className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === "All" ? "default" : "outline"}
              size="sm"
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Shop Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {shopItems.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="cursor-pointer hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center text-2xl">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <Badge variant="secondary">{item.category}</Badge>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {item.name}
                  </CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-primary" />
                      <span className="font-semibold text-primary">{item.price} XP</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full" 
                    variant={item.price <= 150 ? "default" : "secondary"}
                    disabled={item.price > 150}
                  >
                    {item.price <= 150 ? "Purchase" : "Not Enough XP"}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Deals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Featured Deals
            </CardTitle>
            <CardDescription>
              Limited time offers and bundles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border-2 border-dashed border-primary/30 bg-primary/5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">Study Bundle</h3>
                  <Badge className="bg-red-100 text-red-700">50% OFF</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Double XP + Streak Freeze + 3 Hint Boosts
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-primary">125 XP</span>
                    <span className="text-sm text-muted-foreground line-through ml-2">250 XP</span>
                  </div>
                  <Button size="sm">Get Bundle</Button>
                </div>
              </div>

              <div className="p-4 rounded-lg border-2 border-dashed border-orange-300 bg-orange-50 dark:bg-orange-950/20">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">Theme Pack</h3>
                  <Badge className="bg-orange-100 text-orange-700">NEW</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  All 3 premium themes at a special price
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-orange-600">800 XP</span>
                    <span className="text-sm text-muted-foreground line-through ml-2">1100 XP</span>
                  </div>
                  <Button size="sm" variant="outline">Coming Soon</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default Shop;
