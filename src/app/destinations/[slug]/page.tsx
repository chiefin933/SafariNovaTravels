"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowLeft, Star, Calendar, ArrowRight, Loader2, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { db } from "@/lib/db";
import { getDestinations } from "@/actions/destination";
import { getPackages } from "@/actions/package";
import { useUser, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Compass } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function DestinationDetailPage() {
  const { slug } = useParams();
  const { isSignedIn } = useUser();
  const [destination, setDestination] = useState<any>(null);
  const [packages, setPackages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allDestinations = await getDestinations();
        const foundDest = allDestinations.find((d: any) => d.slug === slug);
        setDestination(foundDest);

        if (foundDest) {
          const allPackages = await getPackages();
          const destPackages = allPackages.filter((p: any) => p.destinationId === foundDest.id);
          setPackages(destPackages);
        }
      } catch (error) {
        console.error("Failed to fetch destination data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <h1 className="text-3xl font-bold font-heading">Destination Not Found</h1>
        <Button asChild className="rounded-full">
          <Link href="/destinations">Back to All Destinations</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Hero Header */}
      <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
        <Image 
          src={destination.mainImage || "/placeholder-destination.jpg"} 
          alt={destination.name} 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-12 left-0 right-0 px-6">
          <div className="max-w-7xl mx-auto">
            <Link href="/destinations" className="inline-flex items-center text-white/80 hover:text-white mb-6 font-bold transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" /> Back to Destinations
            </Link>
            <div className="flex items-center space-x-2 text-primary font-black uppercase tracking-widest text-sm mb-2">
              <Globe className="w-4 h-4" />
              <span>{destination.continent}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white font-heading tracking-tight mb-4">
              {destination.name}
            </h1>
            <div className="flex items-center text-white/90 text-xl font-medium">
              <MapPin className="w-6 h-6 mr-2 text-primary" /> {destination.country}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* About Section */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold font-heading mb-8">About {destination.name}</h2>
            <p className="text-muted-foreground text-xl leading-relaxed mb-12">
              {destination.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div className="p-8 bg-slate-50 dark:bg-zinc-900 rounded-[2.5rem] border border-border">
                <h4 className="font-bold text-lg mb-2">Best Time to Visit</h4>
                <p className="text-muted-foreground">The weather is most favorable from April to October for outdoor adventures.</p>
              </div>
              <div className="p-8 bg-slate-50 dark:bg-zinc-900 rounded-[2.5rem] border border-border">
                <h4 className="font-bold text-lg mb-2">Local Currency</h4>
                <p className="text-muted-foreground">Most local vendors accept local currency and major credit cards in tourist hubs.</p>
              </div>
            </div>
          </div>

          {/* Sidebar / Quick Facts */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-900 text-white p-10 rounded-[3rem] sticky top-32">
              <h3 className="text-2xl font-bold mb-6">Experience {destination.name}</h3>
              <ul className="space-y-6">
                <li className="flex items-start space-x-4">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                  <p className="text-white/80">Tailored adventure itineraries</p>
                </li>
                <li className="flex items-start space-x-4">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                  <p className="text-white/80">Expert local guides with deep knowledge</p>
                </li>
                <li className="flex items-start space-x-4">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                  <p className="text-white/80">Sustainable & eco-friendly travel options</p>
                </li>
              </ul>
              <Button 
                size="lg" 
                className="rounded-full px-10 h-14 text-lg font-bold shadow-xl shadow-primary/20 w-full mt-10"
                onClick={() => {
                  if (!isSignedIn) {
                    setShowLoginPrompt(true);
                  } else {
                    const el = document.getElementById('packages');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Plan My Trip
              </Button>
            </div>
          </div>
        </div>

        {/* Packages in this destination */}
        <div id="packages" className="mt-24 pt-24 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4">Available Packages</h2>
              <p className="text-muted-foreground">The best travel deals currently available in {destination.name}.</p>
            </div>
          </div>

          {packages.length === 0 ? (
            <div className="bg-slate-50 dark:bg-zinc-900 p-16 rounded-[3rem] text-center">
              <h3 className="text-xl font-bold mb-2">No packages available yet</h3>
              <p className="text-muted-foreground mb-6">We're currently crafting new adventures for {destination.name}.</p>
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/packages">Explore Other Destinations</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-border overflow-hidden hover:shadow-2xl transition-all duration-500"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image src={pkg.images[0] || "/placeholder-package.jpg"} alt={pkg.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-bold mb-4 line-clamp-1">{pkg.title}</h3>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center text-sm font-bold text-primary">
                        <Calendar className="w-4 h-4 mr-2" /> {pkg.duration} Days
                      </div>
                      <div className="text-2xl font-black text-primary">${pkg.price.toLocaleString()}</div>
                    </div>
                    <Button asChild className="w-full rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-bold border-none">
                      <Link href={`/packages/${pkg.slug}`}>View Details</Link>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Login Prompt Dialog */}
      <Dialog open={showLoginPrompt} onOpenChange={setShowLoginPrompt}>
        <DialogContent className="rounded-[2.5rem] max-w-md p-8">
          <DialogHeader className="items-center text-center">
            <div className="bg-primary/10 p-4 rounded-3xl mb-4">
              <Compass className="w-8 h-8 text-primary" />
            </div>
            <DialogTitle className="text-2xl font-bold font-heading">Join the Adventure</DialogTitle>
            <DialogDescription className="text-lg mt-2">
              Please sign up or log in to start planning your custom journey to {destination.name} with our expert guides.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-4 mt-8">
            <Button asChild className="h-14 rounded-full font-bold text-lg bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20">
              <SignUpButton mode="modal">
                <span>Create an Account</span>
              </SignUpButton>
            </Button>
            <Button asChild variant="outline" className="h-14 rounded-full font-bold text-lg border-primary text-primary hover:bg-primary/5">
              <SignInButton mode="modal">
                <span>Sign In to Your Account</span>
              </SignInButton>
            </Button>
          </div>
          <p className="text-center text-[10px] text-muted-foreground mt-6 uppercase font-bold tracking-widest">
            Takes less than 30 seconds
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
