"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Map, 
  Package, 
  Users, 
  CalendarCheck, 
  CreditCard, 
  Settings, 
  BarChart3,
  LogOut,
  Compass
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/admin" },
  { icon: Package, label: "Packages", href: "/admin/packages" },
  { icon: Map, label: "Destinations", href: "/admin/destinations" },
  { icon: CalendarCheck, label: "Bookings", href: "/admin/bookings" },
  { icon: Users, label: "Users", href: "/admin/users" },
  { icon: CreditCard, label: "Payments", href: "/admin/payments" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white dark:bg-zinc-950 border-r border-border h-screen flex flex-col sticky top-0">
      <div className="p-6 flex items-center space-x-2 border-b border-border">
        <div className="bg-primary p-2 rounded-lg">
          <Compass className="text-white w-5 h-5" />
        </div>
        <span className="text-xl font-bold tracking-tight">Admin Console</span>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group",
              pathname === item.href
                ? "bg-primary text-white shadow-lg shadow-primary/20"
                : "text-muted-foreground hover:bg-slate-50 dark:hover:bg-zinc-900 hover:text-foreground"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5",
              pathname === item.href ? "text-white" : "text-muted-foreground group-hover:text-primary"
            )} />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl space-x-3 px-4 py-6">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </Button>
      </div>
    </aside>
  );
};
