"use client";

import { Mail, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      toast.success("Welcome to the SafariNova community!");
      setEmail("");
    }, 1500);
  };

  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto bg-zinc-900 dark:bg-primary rounded-[3rem] p-8 md:p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-primary/20">
        {/* Decorative Circles */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="bg-white/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 backdrop-blur-sm border border-white/10">
            {isSubscribed ? (
              <CheckCircle2 className="w-10 h-10 text-white animate-in zoom-in duration-500" />
            ) : (
              <Mail className="w-10 h-10 text-white opacity-80" />
            )}
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6 tracking-tight">
            {isSubscribed ? "You're on the list!" : "Join Our Newsletter"}
          </h2>
          <p className="text-white/70 text-lg mb-10 leading-relaxed">
            {isSubscribed 
              ? "Thank you for joining us. Watch your inbox for exclusive deals and travel inspiration coming your way soon."
              : "Subscribe to receive curated travel inspiration, exclusive package deals, and expert travel tips directly in your inbox."
            }
          </p>

          {!isSubscribed && (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4 bg-white/5 backdrop-blur-xl p-2 rounded-2xl md:rounded-full border border-white/10">
              <Input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address" 
                required
                className="bg-transparent border-none text-white placeholder:text-white/40 focus-visible:ring-0 h-12 flex-1 px-6 font-medium"
              />
              <Button 
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-white text-zinc-900 hover:bg-slate-100 rounded-full h-12 px-10 font-black shadow-xl transition-all active:scale-95"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Subscribe Now"}
              </Button>
            </form>
          )}

          <p className="text-white/30 text-[10px] mt-8 uppercase font-bold tracking-widest">
            Privacy First • No Spam • One-Click Unsubscribe
          </p>
        </div>
      </div>
    </section>
  );
};

