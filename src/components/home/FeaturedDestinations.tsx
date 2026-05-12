"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getDestinations } from "@/actions/destination";
import { useState, useEffect } from "react";


export const FeaturedDestinations = () => {
  const [destinations, setDestinations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const data = await getDestinations();
        // Just show the first 4 for the home page
        setDestinations(data.slice(0, 4));
      } catch (error) {
        console.error("Failed to fetch destinations:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDestinations();
  }, []);

  const fallbackDestinations = [
    {
      id: "fallback-d1",
      name: "Nepal",
      slug: "nepal",
      country: "Nepal",
      mainImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1080&auto=format&fit=crop",
      _count: { packages: 3 }
    },
    {
      id: "fallback-d2",
      name: "Peru",
      slug: "peru",
      country: "Peru",
      mainImage: "https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1080&auto=format&fit=crop",
      _count: { packages: 2 }
    },
    {
      id: "fallback-d3",
      name: "Iceland",
      slug: "iceland",
      country: "Iceland",
      mainImage: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=1080&auto=format&fit=crop",
      _count: { packages: 4 }
    },
    {
      id: "fallback-d4",
      name: "Patagonia",
      slug: "patagonia",
      country: "Chile",
      mainImage: "https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?q=80&w=1080&auto=format&fit=crop",
      _count: { packages: 2 }
    }
  ];

  const displayDestinations = destinations.length > 0 ? destinations : fallbackDestinations;

  return (
    <section className="py-24 px-6 bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-4 md:space-y-0">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Explore Top Destinations</h2>
            <p className="text-muted-foreground max-w-lg">
              Check out our most popular destinations chosen by thousands of travelers each month.
            </p>
          </div>
          <Link href="/destinations" className="flex items-center text-primary font-semibold hover:underline group">
            View all destinations <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-[400px] bg-slate-100 dark:bg-zinc-900 animate-pulse rounded-3xl" />
            ))
          ) : (
            displayDestinations.map((dest, index) => (

            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer"
            >
              <Image
                src={dest.mainImage || dest.image || "/placeholder-destination.jpg"}
                alt={dest.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <Badge className="mb-3 bg-white/20 backdrop-blur-md border-none text-white font-medium">
                  {dest._count?.packages || 0} Packages
                </Badge>
                <div className="flex items-center text-white/70 text-sm mb-1">
                  <MapPin className="w-3 h-3 mr-1" /> {dest.country}
                </div>
                <h3 className="text-2xl font-bold text-white">{dest.name}</h3>
              </div>
            </motion.div>
            ))
          )}
        </div>

      </div>
    </section>
  );
};
