"use client";

import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  Globe,
  ArrowUpRight,
  ArrowDownRight,
  Activity
} from "lucide-react";

export default function AdminAnalyticsPage() {
  const stats = [
    {
      title: "Total Bookings",
      value: "1,284",
      change: "+12.5%",
      isPositive: true,
      icon: ShoppingBag,
    },
    {
      title: "New Users",
      value: "452",
      change: "+8.2%",
      isPositive: true,
      icon: Users,
    },
    {
      title: "Conversion Rate",
      value: "3.24%",
      change: "-1.1%",
      isPositive: false,
      icon: Activity,
    },
    {
      title: "Active Countries",
      value: "12",
      change: "0%",
      isPositive: true,
      icon: Globe,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-heading">Analytics</h1>
        <p className="text-muted-foreground">Insight into your platform performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="rounded-2xl border-border overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs mt-1">
                {stat.isPositive ? (
                  <span className="text-green-500 flex items-center">
                    <ArrowUpRight className="w-3 h-3 mr-1" /> {stat.change}
                  </span>
                ) : (
                  <span className="text-red-500 flex items-center">
                    <ArrowDownRight className="w-3 h-3 mr-1" /> {stat.change}
                  </span>
                )}
                <span className="text-muted-foreground ml-1">vs last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="rounded-2xl border-border">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue growth and projections.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center border-t border-dashed border-border mt-4">
            <p className="text-muted-foreground text-sm italic">Chart visualization would be integrated here.</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-border">
          <CardHeader>
            <CardTitle>Popular Destinations</CardTitle>
            <CardDescription>Top 5 locations by booking volume.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center border-t border-dashed border-border mt-4">
            <p className="text-muted-foreground text-sm italic">Destination analytics would be integrated here.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
