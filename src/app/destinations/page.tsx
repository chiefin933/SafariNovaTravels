"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, MapPin, Filter, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { getDestinations } from "@/actions/destination";


export default function DestinationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContinent, setSelectedContinent] = useState("All");
  const [destinations, setDestinations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const data = await getDestinations();
        setDestinations(data);
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
      continent: "Asia",
      description: "The ultimate budget trekking paradise in the Himalayas.",
      mainImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa"
    },
    {
      id: "fallback-d2",
      name: "Peru",
      slug: "peru",
      country: "Peru",
      continent: "Americas",
      description: "Ancient trails and Andean adventures. Home to Machu Picchu.",
      mainImage: "https://images.unsplash.com/photo-1526392060635-9d6019884377"
    },
    {
      id: "fallback-d3",
      name: "Tanzania",
      slug: "tanzania",
      country: "Tanzania",
      continent: "Africa",
      description: "Beyond safaris—home to Mount Kilimanjaro and Mount Meru.",
      mainImage: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1080&auto=format&fit=crop"
    },
    {
      id: "fallback-d4",
      name: "South Africa",
      slug: "south-africa",
      country: "South Africa",
      continent: "Africa",
      description: "Vibrant cities and the stunning Cape Mountain ranges.",
      mainImage: "https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8e?q=80&w=1080&auto=format&fit=crop"
    }
  ];

  const displayDestinations = destinations.length > 0 ? destinations : fallbackDestinations;

  const filteredDestinations = displayDestinations.filter(dest => 
    (selectedContinent === "All" || dest.continent === selectedContinent) &&
    (dest.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     dest.country.toLowerCase().includes(searchQuery.toLowerCase()))
  );


  const continents = ["All", "Africa", "Europe", "Asia", "Americas", "Oceania"];

  return (
    <div className="min-h-screen bg-background dark:bg-zinc-950 pt-32 pb-24 px-6">

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6">Explore Destinations</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Find the perfect place for your next adventure. From the savannahs of Africa to the historic cities of Europe.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
              placeholder="Search by city or country..." 
              className="pl-10 h-12 rounded-full border-border bg-slate-50 dark:bg-zinc-900 focus-visible:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 w-full md:w-auto scrollbar-hide">
            {continents.map((continent) => (
              <Button
                key={continent}
                variant={selectedContinent === continent ? "default" : "outline"}
                className="rounded-full h-10 whitespace-nowrap"
                onClick={() => setSelectedContinent(continent)}
              >
                {continent}
              </Button>
            ))}
          </div>

          <Button variant="outline" size="icon" className="rounded-full h-12 w-12 hidden md:flex shrink-0">
            <SlidersHorizontal className="w-5 h-5" />
          </Button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-[500px] bg-slate-100 dark:bg-zinc-900 animate-pulse rounded-[2.5rem]" />
            ))
          ) : filteredDestinations.map((dest, index) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="group flex flex-col bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-border overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
            >
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={dest.mainImage || dest.image || "/placeholder-destination.jpg"}
                  alt={dest.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/90 dark:bg-black/90 backdrop-blur-md text-foreground font-medium border-none shadow-sm">
                    {dest._count?.packages || 0} Packages
                  </Badge>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center text-primary text-sm font-semibold mb-3">
                  <MapPin className="w-3 h-3 mr-1" /> {dest.country}
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{dest.name}</h3>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-6">
                  {dest.description}
                </p>
                <div className="mt-auto">
                  <Button asChild className="w-full rounded-full h-12 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white font-semibold shadow-xl shadow-zinc-900/10">
                    <Link href={`/destinations/${dest.slug}`}>Explore More</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>


        {filteredDestinations.length === 0 && (
          <div className="text-center py-24">
            <h3 className="text-2xl font-bold mb-2">No destinations found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
