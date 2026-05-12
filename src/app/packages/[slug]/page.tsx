"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  MapPin, Calendar, Users, Star, CheckCircle2, 
  Clock, Info, Shield, Loader2, Compass 
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { getPackageBySlug } from "@/actions/package";
import { useUser, SignInButton, SignUpButton } from "@clerk/nextjs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function PackageDetailsPage() {
  const { slug } = useParams();
  const { isSignedIn } = useUser();
  const [pkg, setPkg] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBooking, setIsBooking] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const data = await getPackageBySlug(slug as string);
        setPkg(data);
      } catch (error) {
        console.error("Failed to fetch package:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPackage();
  }, [slug]);

  const handleBooking = () => {
    if (!isSignedIn) {
      setShowLoginPrompt(true);
      return;
    }

    setIsBooking(true);
    // Simulate booking process
    setTimeout(() => {
      setIsBooking(false);
      toast.success("Redirecting to secure payment gateway...");
      setTimeout(() => {
        toast.success("Booking system ready!");
      }, 1500);
    }, 1500);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <h1 className="text-3xl font-bold font-heading">Package Not Found</h1>
        <Button asChild rounded-full>
          <Link href="/packages">Back to All Packages</Link>
        </Button>
      </div>
    );
  }

  // Fallback data for layout if fields are missing in DB
  const itinerary = [
    { day: 1, title: "Arrival & Welcome", description: "Transfer to your luxury accommodation and meet your guides." },
    { day: 2, title: "Adventure Day", description: "Full day of exploration and guided activities." },
    { day: 3, title: "Departure", description: "Final morning activity followed by airport transfer." }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 h-[300px] md:h-[500px]">
          <div className="md:col-span-2 relative h-full rounded-[2rem] overflow-hidden shadow-2xl shadow-primary/10">
            <Image 
              src={pkg.images[0] || "/placeholder-package.jpg"} 
              alt={pkg.title} 
              fill 
              sizes="(max-width: 768px) 100vw, 66vw" 
              className="object-cover" 
            />
          </div>
          <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-primary/10 hidden md:block">
            <Image 
              src={pkg.images[1] || pkg.images[0] || "/placeholder-package.jpg"} 
              alt={pkg.title} 
              fill 
              sizes="33vw" 
              className="object-cover" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 text-primary text-sm font-bold mb-4">
              <MapPin className="w-4 h-4" />
              <span>{pkg.destination?.name}, {pkg.destination?.country}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 tracking-tight leading-tight">
              {pkg.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 mb-8 text-sm text-muted-foreground border-b border-border pb-8">
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-primary" />
                <span className="font-medium text-foreground">{pkg.duration} Days</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-primary" />
                <span className="font-medium text-foreground">Up to {pkg.availability} Slots</span>
              </div>
              <div className="flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-500 fill-yellow-500" />
                <span className="font-bold text-foreground">{pkg.rating || 5.0}</span>
                <span className="ml-1">({pkg.reviews || 0} reviews)</span>
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-4 font-heading">Experience Overview</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {pkg.description}
              </p>
            </div>

            <Tabs defaultValue="itinerary" className="w-full">
              <TabsList className="w-full justify-start rounded-none border-b border-border bg-transparent h-12 p-0 mb-8">
                <TabsTrigger value="itinerary" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent h-full px-8 font-bold">Itinerary</TabsTrigger>
                <TabsTrigger value="highlights" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent h-full px-8 font-bold">What to Expect</TabsTrigger>
              </TabsList>
              
              <TabsContent value="itinerary" className="space-y-8">
                {itinerary.map((item) => (
                  <div key={item.day} className="flex gap-6">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold shrink-0">
                        {item.day}
                      </div>
                      <div className="w-px h-full bg-border mt-2" />
                    </div>
                    <div className="pb-8">
                      <h4 className="text-xl font-bold mb-2">Day {item.day}: {item.title}</h4>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="highlights">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["Professional Guide", "Luxury Transport", "Eco-friendly Lodging", "Safety Guaranteed"].map((h, i) => (
                    <div key={i} className="flex items-start space-x-3 p-6 bg-slate-50 dark:bg-zinc-900 rounded-[1.5rem]">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm font-bold uppercase tracking-wider">{h}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-32 rounded-[2.5rem] border-border shadow-2xl shadow-primary/5 bg-white dark:bg-zinc-900">
              <CardContent className="p-8">
                <div className="flex items-end justify-between mb-8">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-black tracking-widest mb-1">Per Person</p>
                    <p className="text-4xl font-black text-primary">${pkg.price.toLocaleString()}</p>
                  </div>
                  <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-none px-4 py-1.5 rounded-full font-bold">
                    Bookable
                  </Badge>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="p-5 bg-slate-50 dark:bg-zinc-950 rounded-2xl border border-border">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-3" />
                        <span className="font-bold">Next available date</span>
                      </div>
                      <span className="font-medium">Aug 12, 2026</span>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handleBooking}
                  disabled={isBooking}
                  className="w-full h-16 rounded-full text-lg font-black bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white shadow-xl shadow-zinc-900/10 transition-all active:scale-95"
                >
                  {isBooking ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Secure Your Trip"}
                </Button>
                
                <p className="text-center text-[10px] text-muted-foreground mt-6 uppercase font-bold tracking-widest flex items-center justify-center opacity-60">
                  <Shield className="w-3 h-3 mr-2" /> Encrypted Transaction
                </p>
              </CardContent>
            </Card>

            <div className="mt-8 p-8 bg-primary/5 rounded-[2.5rem] border border-primary/10">
              <h4 className="font-bold mb-4 flex items-center text-primary">
                <Info className="w-5 h-5 mr-2" /> Expert Support
              </h4>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Need a custom itinerary or group discount? Our travel experts are available 24/7 to assist.
              </p>
              <Button variant="link" className="w-full text-primary font-bold p-0">
                Contact an Agent
              </Button>
            </div>
          </div>
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
              Please sign up or log in to secure your spot and start planning your unforgettable journey with SafariNova.
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
