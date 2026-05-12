"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, Loader2, MessageSquare, Clock, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Message sent successfully! We'll get back to you soon.");
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background dark:bg-zinc-950 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6">Get in Touch</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Have questions about our packages or need a custom itinerary? Our travel experts are ready to help you plan your next big adventure.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <Card className="rounded-[2.5rem] border-border bg-background dark:bg-zinc-900 border-none shadow-sm">

              <CardContent className="p-8 space-y-8">
                <div className="flex items-start space-x-6">
                  <div className="bg-primary/10 p-4 rounded-2xl">
                    <Mail className="text-primary w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Email Us</h4>
                    <p className="text-muted-foreground text-sm">Our friendly team is here to help.</p>
                    <p className="text-primary font-semibold mt-1">hello@safarinova.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="bg-primary/10 p-4 rounded-2xl">
                    <Phone className="text-primary w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Call Us</h4>
                    <p className="text-muted-foreground text-sm">Mon-Fri from 8am to 6pm.</p>
                    <p className="text-primary font-semibold mt-1">+254 700 000 000</p>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="bg-primary/10 p-4 rounded-2xl">
                    <MapPin className="text-primary w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Visit Us</h4>
                    <p className="text-muted-foreground text-sm">Come say hello at our office.</p>
                    <p className="text-primary font-semibold mt-1">123 Safari Drive, Nairobi, Kenya</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-white dark:bg-zinc-900 rounded-3xl border border-border flex flex-col items-center text-center">
                <MessageSquare className="w-6 h-6 text-primary mb-3" />
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Chat</span>
                <span className="text-sm font-semibold">Live Support</span>
              </div>
              <div className="p-6 bg-white dark:bg-zinc-900 rounded-3xl border border-border flex flex-col items-center text-center">
                <Globe className="w-6 h-6 text-primary mb-3" />
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Global</span>
                <span className="text-sm font-semibold">24/7 Service</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-zinc-950 p-2 md:p-8 rounded-[2.5rem]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" className="h-12 rounded-xl" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" className="h-12 rounded-xl" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="john@example.com" className="h-12 rounded-xl" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="How can we help?" className="h-12 rounded-xl" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Tell us more about your travel plans..." className="min-h-[150px] rounded-xl" required />
              </div>
              <Button type="submit" className="w-full h-14 rounded-full text-lg font-bold shadow-lg shadow-primary/20" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <><Send className="mr-2 w-5 h-5" /> Send Message</>}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
