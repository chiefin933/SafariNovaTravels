"use client";

import { 
  TrendingUp, 
  Users, 
  Package, 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Total Bookings", value: "1,284", change: "+12%", trend: "up", icon: Package, color: "text-blue-500", bg: "bg-blue-500/10" },
  { label: "Active Users", value: "8,432", change: "+5%", trend: "up", icon: Users, color: "text-green-500", bg: "bg-green-500/10" },
  { label: "Total Revenue", value: "$428,500", change: "+18%", trend: "up", icon: CreditCard, color: "text-purple-500", bg: "bg-purple-500/10" },
  { label: "Conversion Rate", value: "3.2%", change: "-2%", trend: "down", icon: TrendingUp, color: "text-orange-500", bg: "bg-orange-500/10" },
];

const recentBookings = [
  { id: "BK-1024", user: "John Doe", package: "Luxury Masai Mara Safari", date: "2 mins ago", amount: "$2,400", status: "Paid" },
  { id: "BK-1025", user: "Sarah Smith", package: "Zanzibar Beach Escape", date: "15 mins ago", amount: "$850", status: "Pending" },
  { id: "BK-1026", user: "Mike Johnson", package: "Cape Town & Garden Route", date: "1 hour ago", amount: "$3,000", status: "Paid" },
  { id: "BK-1027", user: "Emma Wilson", package: "Victoria Falls Adventure", date: "3 hours ago", amount: "$600", status: "Cancelled" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-heading">Dashboard Overview</h1>
        <p className="text-muted-foreground">Monitor your business performance and recent activities.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="rounded-2xl border-border shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.bg} ${stat.color} p-2 rounded-xl`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className={`flex items-center text-xs font-bold ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                  {stat.change}
                  {stat.trend === "up" ? <ArrowUpRight className="ml-1 w-3 h-3" /> : <ArrowDownRight className="ml-1 w-3 h-3" />}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Bookings */}
        <Card className="lg:col-span-2 rounded-2xl border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>Latest travel reservations across the platform.</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="rounded-lg">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between group cursor-pointer hover:bg-primary/5 dark:hover:bg-zinc-800/50 p-2 rounded-xl transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-background dark:bg-zinc-800 flex items-center justify-center text-xs font-bold">
                      {booking.user.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold">{booking.user}</p>
                      <p className="text-xs text-muted-foreground">{booking.package}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">{booking.amount}</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="w-3 h-3 mr-1" /> {booking.date}
                    </div>
                  </div>
                  <div className="hidden sm:block">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      booking.status === "Paid" ? "bg-green-100 text-green-700" : 
                      booking.status === "Pending" ? "bg-yellow-100 text-yellow-700" : 
                      "bg-red-100 text-red-700"
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Destinations */}
        <Card className="rounded-2xl border-border shadow-sm">
          <CardHeader>
            <CardTitle>Top Destinations</CardTitle>
            <CardDescription>Highest booking volume by region.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {[
              { name: "Kenya", value: 85, color: "bg-blue-500" },
              { name: "Tanzania", value: 70, color: "bg-green-500" },
              { name: "Greece", value: 45, color: "bg-purple-500" },
              { name: "Japan", value: 30, color: "bg-orange-500" },
            ].map((item) => (
              <div key={item.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-muted-foreground">{item.value}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color}`} style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
