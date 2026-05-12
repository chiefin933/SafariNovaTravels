"use client";

import { motion } from "framer-motion";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Hero = () => {
  return (
    <section className="relative h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-10000 scale-105"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1080&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 w-full max-w-5xl px-6 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase bg-white/10 backdrop-blur-md rounded-full border border-white/20">
            Adventure Awaits
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-heading leading-tight">
            Discover the World&apos;s <br />
            <span className="text-primary italic">Hidden Gems</span>
          </h1>
          <p className="text-lg md:text-xl mb-10 text-white/90 max-w-2xl mx-auto leading-relaxed">
            Curated travel experiences for the modern explorer. From the heart of the savannah to crystal clear beaches.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 p-4 md:p-2 rounded-2xl md:rounded-full shadow-2xl flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-2"
        >
          <div className="flex-1 flex items-center px-4 w-full">
            <MapPin className="text-primary mr-3 w-5 h-5 shrink-0" />
            <Input 
              placeholder="Where to?" 
              className="bg-transparent border-none text-white placeholder:text-white/60 focus-visible:ring-0 h-12 w-full"
            />
          </div>
          <div className="w-px h-8 bg-white/20 hidden md:block" />
          <div className="flex-1 flex items-center px-4 w-full">
            <Calendar className="text-primary mr-3 w-5 h-5 shrink-0" />
            <Input 
              placeholder="When?" 
              className="bg-transparent border-none text-white placeholder:text-white/60 focus-visible:ring-0 h-12 w-full"
            />
          </div>
          <div className="w-px h-8 bg-white/20 hidden md:block" />
          <div className="flex-1 flex items-center px-4 w-full">
            <Users className="text-primary mr-3 w-5 h-5 shrink-0" />
            <Input 
              placeholder="Guests" 
              className="bg-transparent border-none text-white placeholder:text-white/60 focus-visible:ring-0 h-12 w-full"
            />
          </div>
          <Button className="w-full md:w-auto rounded-full h-12 px-8 font-semibold text-base shadow-lg shadow-primary/20">
            <Search className="mr-2 w-5 h-5" /> Search
          </Button>
        </motion.div>
      </div>

      {/* Floating Badges or Decorative Elements */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center space-x-8 text-white/60 text-sm hidden md:flex">
        <span className="flex items-center"><span className="w-2 h-2 bg-primary rounded-full mr-2" /> 500+ Destinations</span>
        <span className="flex items-center"><span className="w-2 h-2 bg-primary rounded-full mr-2" /> 10k+ Travelers</span>
        <span className="flex items-center"><span className="w-2 h-2 bg-primary rounded-full mr-2" /> 24/7 Support</span>
      </div>
    </section>
  );
};
