"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, Calendar, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getPackages } from "@/actions/package";

export const FeaturedPackages = () => {
  const [packages, setPackages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await getPackages();
        // Show only the top 3 packages on home page
        setPackages(data.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch packages:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPackages();
  }, []);

  const fallbackPackages = [
    {
      id: "fallback-1",
      title: "Annapurna Circuit Trek",
      slug: "annapurna-circuit",
      destination: { name: "Annapurna", country: "Nepal" },
      price: 850,
      duration: 12,
      images: ["https://images.unsplash.com/photo-1544735716-392fe2489ffa"],
      category: "Adventure",
      rating: 4.9,
    },
    {
      id: "fallback-2",
      title: "Inca Trail to Machu Picchu",
      slug: "inca-trail-classic",
      destination: { name: "Cusco", country: "Peru" },
      price: 650,
      duration: 4,
      images: ["https://images.unsplash.com/photo-1526392060635-9d6019884377"],
      category: "History",
      rating: 4.8,
    },
    {
      id: "fallback-3",
      title: "Kilimanjaro Expedition",
      slug: "kilimanjaro-marangu",
      destination: { name: "Moshi", country: "Tanzania" },
      price: 2100,
      duration: 6,
      images: ["https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1080&auto=format&fit=crop"],
      category: "Adventure",
      rating: 5.0,
    },
    {
      id: "fallback-4",
      title: "Northern Lights & Glaciers",
      slug: "iceland-northern-lights",
      destination: { name: "Reykjavik", country: "Iceland" },
      price: 1800,
      duration: 7,
      images: ["https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=1080&auto=format&fit=crop"],
      category: "Nature",
      rating: 4.9,
    },
    {
      id: "fallback-5",
      title: "Patagonia W Trek",
      slug: "patagonia-w-trek",
      destination: { name: "Torres del Paine", country: "Chile" },
      price: 1450,
      duration: 9,
      images: ["https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?q=80&w=1080&auto=format&fit=crop"],
      category: "Trekking",
      rating: 4.9,
    }
  ];


  const displayPackages = packages.length > 0 ? packages : fallbackPackages;

  return (
    <section className="py-24 px-6 bg-background dark:bg-zinc-900/30">

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4">Trending Adventures</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our most loved travel experiences, handpicked for quality and unforgettable moments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-[500px] bg-slate-200 dark:bg-zinc-800 animate-pulse rounded-[2.5rem]" />
            ))
          ) : (
            displayPackages.map((pkg, index) => (

              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-border overflow-hidden hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={pkg.images[0] || "/placeholder-package.jpg"}
                    alt={pkg.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary/90 text-white border-none px-3 py-1">
                      {pkg.category || "Tour"}
                    </Badge>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center text-muted-foreground text-sm mb-2">
                    <MapPin className="w-4 h-4 mr-1 text-primary" /> 
                    {pkg.destination?.name}, {pkg.destination?.country}
                  </div>
                  <h3 className="text-xl font-bold mb-4 line-clamp-1">{pkg.title}</h3>
                  
                  <div className="flex items-center justify-between mb-6 pb-6 border-b border-border">
                    <div className="flex items-center text-sm text-muted-foreground font-medium">
                      <Calendar className="w-4 h-4 mr-2 text-primary" />
                      {pkg.duration} Days
                    </div>
                    <div className="flex items-center text-sm font-bold text-yellow-500">
                      <Star className="w-4 h-4 mr-1 fill-yellow-500" />
                      {pkg.rating || 5.0}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Starts From</p>
                      <p className="text-2xl font-bold text-primary">${pkg.price.toLocaleString()}</p>
                    </div>
                    <Button asChild variant="outline" className="rounded-full px-6 hover:bg-primary hover:text-white transition-colors">
                      <Link href={`/packages/${pkg.slug}`}>
                        Details
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        <div className="text-center">
          <Button asChild variant="link" className="text-primary font-bold text-lg group">
            <Link href="/packages" className="flex items-center">
              Explore all packages <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
