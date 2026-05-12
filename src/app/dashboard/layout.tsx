import Link from "next/link";
import { 
  User, 
  MapPin, 
  Calendar, 
  Heart, 
  Settings, 
  LogOut,
  Compass,
  ShoppingBag
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const menuItems = [
  { icon: ShoppingBag, label: "My Bookings", href: "/dashboard/bookings" },
  { icon: Heart, label: "Wishlist", href: "/dashboard/wishlist" },
  { icon: MapPin, label: "Saved Destinations", href: "/dashboard/saved" },
  { icon: User, label: "Profile", href: "/dashboard/profile" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-zinc-900 pt-20">
      <aside className="w-64 bg-white dark:bg-zinc-950 border-r border-border hidden md:flex flex-col h-[calc(100vh-80px)] sticky top-20">
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center space-x-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-slate-50 dark:hover:bg-zinc-900 hover:text-primary transition-all duration-200"
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-border">
          <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl space-x-3">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </Button>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
