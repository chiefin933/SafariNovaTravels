"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, MapPin, Calendar, Users, Star, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { getPackages } from "@/actions/package";


export default function PackagesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [packages, setPackages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await getPackages();
        setPackages(data);
      } catch (error) {
        console.error("Failed to fetch packages:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPackages();
  }, []);


  const fallbackPackages = [
    { id: "f1", title: "Annapurna Circuit Trek", slug: "annapurna-circuit", destination: { name: "Annapurna", country: "Nepal" }, price: 850, duration: 12, images: ["https://images.unsplash.com/photo-1544735716-392fe2489ffa"], category: "Adventure", rating: 4.9, reviews: 124 },
    { id: "f11", title: "Cape Town & Garden Route", slug: "cape-town-garden-route", destination: { name: "Cape Town", country: "South Africa" }, price: 1850, duration: 10, images: ["https://images.unsplash.com/photo-1580060839134-75a5edca2e99"], category: "Adventure", rating: 4.9, reviews: 45 },
    { id: "f2", title: "Inca Trail to Machu Picchu", slug: "inca-trail-classic", destination: { name: "Cusco", country: "Peru" }, price: 650, duration: 4, images: ["https://images.unsplash.com/photo-1526392060635-9d6019884377"], category: "History", rating: 4.8, reviews: 89 },

    { id: "f3", title: "Kilimanjaro Expedition", slug: "kilimanjaro-marangu", destination: { name: "Moshi", country: "Tanzania" }, price: 2100, duration: 6, images: ["https://images.unsplash.com/photo-1516026672322-bc52d61a55d5"], category: "Adventure", rating: 5.0, reviews: 56 },
    { id: "f4", title: "Northern Lights & Glaciers", slug: "iceland-northern-lights", destination: { name: "Reykjavik", country: "Iceland" }, price: 1800, duration: 7, images: ["https://images.unsplash.com/photo-1476610182048-b716b8518aae"], category: "Nature", rating: 4.9, reviews: 42 },
    { id: "f5", title: "Patagonia W Trek Expedition", slug: "patagonia-w-trek", destination: { name: "Torres del Paine", country: "Chile" }, price: 1450, duration: 9, images: ["https://images.unsplash.com/photo-1517059224940-d4af9eec41b7"], category: "Trekking", rating: 4.9, reviews: 31 },
    { id: "f6", title: "Sahara Desert Luxury Camp", slug: "morocco-sahara-expedition", destination: { name: "Merzouga", country: "Morocco" }, price: 950, duration: 4, images: ["https://images.unsplash.com/photo-1489749798305-4fea3ae63d43"], category: "Adventure", rating: 4.7, reviews: 67 },
    { id: "f7", title: "Queenstown Adrenaline Rush", slug: "queenstown-adrenaline", destination: { name: "Queenstown", country: "New Zealand" }, price: 1200, duration: 5, images: ["https://images.unsplash.com/photo-1589802829985-817e51171b92"], category: "Extreme", rating: 5.0, reviews: 112 },
    { id: "f8", title: "Costa Rica Jungle Zipline", slug: "costa-rica-jungle", destination: { name: "Monteverde", country: "Costa Rica" }, price: 880, duration: 6, images: ["https://images.unsplash.com/photo-1519922639192-e73293ca430e"], category: "Nature", rating: 4.8, reviews: 45 },
    { id: "f9", title: "Masai Mara Great Migration", slug: "masai-mara-classic", destination: { name: "Masai Mara", country: "Kenya" }, price: 1600, duration: 5, images: ["https://images.unsplash.com/photo-1516426122078-c23e76319801"], category: "Safari", rating: 4.9, reviews: 78 },
    { id: "f10", title: "Zanzibar Spice Island Escape", slug: "zanzibar-beach-guide", destination: { name: "Nungwi", country: "Tanzania" }, price: 750, duration: 5, images: ["https://images.unsplash.com/photo-1586861635167-e5223aadc9fe"], category: "Beach", rating: 4.8, reviews: 92 }
  ];


  const displayPackages = packages.length > 0 ? packages : fallbackPackages;

  const filteredPackages = displayPackages.filter(pkg => 
    (selectedCategory === "All" || pkg.category === selectedCategory) &&
    (pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
     (pkg.destination?.name || "").toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const categories = ["All", "Safari", "Beach", "Luxury", "Adventure", "History", "Culture"];


  return (
    <div className="min-h-screen bg-background dark:bg-zinc-950 pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">Tour Packages</h1>
            <p className="text-muted-foreground text-lg">
              Handpicked travel experiences designed for every kind of explorer. Best value and premium service guaranteed.
            </p>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-2 rounded-full border border-border shadow-sm flex items-center w-full md:max-w-md">
            <Search className="ml-3 w-5 h-5 text-muted-foreground" />
            <Input 
              placeholder="Search packages..." 
              className="border-none focus-visible:ring-0 bg-transparent h-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-6 mb-12 scrollbar-hide">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              className="rounded-full h-11 px-6 whitespace-nowrap font-medium"
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-[500px] bg-slate-100 dark:bg-zinc-900 animate-pulse rounded-[2rem]" />
            ))
          ) : filteredPackages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white dark:bg-zinc-900 rounded-[2rem] border border-border overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative h-64">
                <Image
                  src={pkg.images[0] || "/placeholder-package.jpg"}
                  alt={pkg.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary/90 text-white font-medium border-none px-3 py-1">
                    {pkg.category || "Tour"}
                  </Badge>
                </div>
                <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-black/90 backdrop-blur-md px-3 py-1 rounded-lg text-sm font-bold flex items-center">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 mr-1" />
                  {pkg.rating || 5.0} <span className="text-muted-foreground font-normal ml-1">({pkg.reviews || 0})</span>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center text-muted-foreground text-sm mb-2">
                  <MapPin className="w-4 h-4 mr-1 text-primary" /> {pkg.destination?.name}, {pkg.destination?.country}
                </div>
                <h3 className="text-xl font-bold mb-4 line-clamp-1">{pkg.title}</h3>
                
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-border">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2" />
                    {pkg.duration} Days
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="w-4 h-4 mr-2" />
                    Flexible Groups
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Starts From</p>
                    <p className="text-2xl font-bold text-primary">${pkg.price.toLocaleString()}</p>
                  </div>
                  <Button asChild className="rounded-full px-6 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white">
                    <Link href={`/packages/${pkg.slug}`}>
                      Details <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
