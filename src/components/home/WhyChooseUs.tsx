import { ShieldCheck, Globe, Clock, CreditCard } from "lucide-react";
import Image from "next/image";

const features = [
  {
    icon: <ShieldCheck className="w-6 h-6 text-primary" />,
    title: "Secure Bookings",
    description: "Encrypted payments and safe travel protocols.",
  },
  {
    icon: <Globe className="w-6 h-6 text-primary" />,
    title: "Global Reach",
    description: "Exclusive access to remote world destinations.",
  },
  {
    icon: <Clock className="w-6 h-6 text-primary" />,
    title: "24/7 Support",
    description: "Our experts are available round the clock.",
  },
  {
    icon: <CreditCard className="w-6 h-6 text-primary" />,
    title: "Best Price",
    description: "Competitive pricing with no hidden fees.",
  },
];

export const WhyChooseUs = () => {
  return (
    <section className="py-24 px-6 bg-white dark:bg-zinc-950 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Image Side */}
          <div className="relative w-full lg:w-1/2 aspect-square md:aspect-video lg:aspect-square">
            <div className="absolute -inset-4 bg-primary/10 rounded-[3rem] -rotate-3" />
            <div className="relative h-full w-full rounded-[3rem] overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1080&auto=format&fit=crop"
                alt="Adventure Traveler"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl">
                <p className="text-white font-bold text-lg mb-1">"The best journey of my life"</p>
                <p className="text-white/80 text-sm italic">— Sarah M., Luxury Explorer</p>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-1/2">
            <div className="mb-12">
              <span className="text-primary font-bold uppercase tracking-widest text-xs mb-4 block">The SafariNova Advantage</span>
              <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 leading-tight">
                Crafting Memories <br />
                <span className="text-muted-foreground">That Last a Lifetime</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We don't just book trips; we architect experiences. Every detail is curated to ensure your journey is seamless, safe, and truly unforgettable.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="flex flex-col space-y-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

