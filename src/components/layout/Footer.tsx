import Link from "next/link";
import { Compass, Share2, Camera, Globe, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-background dark:bg-zinc-950 border-t border-border pt-16 pb-8 px-6">

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="space-y-6">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-primary p-2 rounded-lg">
              <Compass className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight">SafariNova</span>
          </Link>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Crafting unforgettable journeys across the globe. From luxury safaris to serene beach escapes, we bring your travel dreams to life.
          </p>
          <div className="flex items-center space-x-4">
            <Link href="#" className="p-2 bg-white dark:bg-zinc-900 rounded-full border border-border hover:text-primary transition-colors">
              <Share2 className="w-4 h-4" />
            </Link>
            <Link href="#" className="p-2 bg-white dark:bg-zinc-900 rounded-full border border-border hover:text-primary transition-colors">
              <Camera className="w-4 h-4" />
            </Link>
            <Link href="#" className="p-2 bg-white dark:bg-zinc-900 rounded-full border border-border hover:text-primary transition-colors">
              <Globe className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-6">Quick Links</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li><Link href="/destinations" className="hover:text-primary transition-colors">Destinations</Link></li>
            <li><Link href="/packages" className="hover:text-primary transition-colors">Tour Packages</Link></li>
            <li><Link href="/about" className="hover:text-primary transition-colors">Our Story</Link></li>
            <li><Link href="/blog" className="hover:text-primary transition-colors">Travel Blog</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-6">Support</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li><Link href="/faq" className="hover:text-primary transition-colors">FAQs</Link></li>
            <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            <li><Link href="/refund" className="hover:text-primary transition-colors">Refund Policy</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-6">Contact Info</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-primary shrink-0" />
              <span>123 Safari Drive, Nairobi, Kenya</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-primary shrink-0" />
              <span>+254 700 000 000</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-primary shrink-0" />
              <span>hello@safarinova.com</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto border-t border-border pt-8 flex flex-col md:row items-center justify-between text-xs text-muted-foreground space-y-4 md:space-y-0">
        <p>© {new Date().getFullYear()} SafariNova Travels. All rights reserved.</p>
        <div className="flex items-center space-x-6">
          <Link href="#" className="hover:text-primary">Sitemap</Link>
          <Link href="#" className="hover:text-primary">Cookies</Link>
        </div>
      </div>
    </footer>
  );
};
