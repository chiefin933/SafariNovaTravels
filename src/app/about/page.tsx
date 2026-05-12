"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Compass, Users, Map, Heart } from "lucide-react";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background dark:bg-zinc-950 pt-32 pb-24">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 mb-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6">About SafariNova</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            We are passionate explorers dedicated to creating unforgettable journeys across the globe. Our mission is to connect you with the world's most extraordinary destinations.
          </p>
        </div>

        <div className="relative h-[400px] md:h-[600px] rounded-[3rem] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1080&auto=format&fit=crop"
            alt="Original Safari Experience"
            fill
            sizes="100vw"
            className="object-cover"
          />


          <div className="absolute inset-0 bg-black/20" />
        </div>
      </div>

      {/* Our Story & Mission */}
      <div className="max-w-7xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">Our Story</h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              Founded in 2024, SafariNova was born out of a deep love for adventure and a desire to share the beauty of our planet. What started as a small team of travel enthusiasts has grown into a premier travel agency.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We believe that travel is not just about visiting new places, but about immersing yourself in different cultures, connecting with nature, and creating memories that last a lifetime. Every itinerary we design is crafted with care, ensuring that your journey is as unique as you are.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-slate-50 dark:bg-zinc-900 p-8 rounded-3xl text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-2">10k+</h3>
              <p className="text-muted-foreground text-sm font-medium">Happy Travelers</p>
            </div>
            <div className="bg-slate-50 dark:bg-zinc-900 p-8 rounded-3xl text-center mt-12">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Map className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-2">500+</h3>
              <p className="text-muted-foreground text-sm font-medium">Destinations</p>
            </div>
            <div className="bg-slate-50 dark:bg-zinc-900 p-8 rounded-3xl text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Compass className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-2">150+</h3>
              <p className="text-muted-foreground text-sm font-medium">Expert Guides</p>
            </div>
            <div className="bg-slate-50 dark:bg-zinc-900 p-8 rounded-3xl text-center mt-12">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-2">100%</h3>
              <p className="text-muted-foreground text-sm font-medium">Passion</p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us component */}
      <WhyChooseUs />
    </div>
  );
}
