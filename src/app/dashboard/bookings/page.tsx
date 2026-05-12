"use client";

import { ShoppingBag, Calendar, MapPin, CheckCircle2, Clock, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const mockBookings = [
  {
    id: "BK-1024",
    packageTitle: "Luxury Masai Mara Safari",
    destination: "Masai Mara, Kenya",
    startDate: "2024-06-15",
    guests: 2,
    totalPrice: 2400,
    status: "PAID",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1080&auto=format&fit=crop"
  },
  {
    id: "BK-1025",
    packageTitle: "Zanzibar Beach Escape",
    destination: "Zanzibar, Tanzania",
    startDate: "2024-07-20",
    guests: 3,
    totalPrice: 2550,
    status: "PENDING",
    image: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?q=80&w=1080&auto=format&fit=crop"
  }
];

export default function UserBookingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-heading">My Bookings</h1>
        <p className="text-muted-foreground">Manage your upcoming trips and booking history.</p>
      </div>

      <div className="space-y-6">
        {mockBookings.map((booking) => (
          <Card key={booking.id} className="rounded-[2rem] border-border overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="relative w-full md:w-64 h-48 md:h-auto">
                  <Image src={booking.image} alt={booking.packageTitle} fill className="object-cover" />
                </div>
                <div className="flex-1 p-8 flex flex-col justify-between">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center text-primary text-xs font-bold mb-2">
                        <MapPin className="w-3 h-3 mr-1" /> {booking.destination}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{booking.packageTitle}</h3>
                      <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                        <span className="flex items-center"><Calendar className="w-4 h-4 mr-2" /> {booking.startDate}</span>
                        <span className="flex items-center"><ShoppingBag className="w-4 h-4 mr-2" /> {booking.guests} Guests</span>
                      </div>
                    </div>
                    <div className="text-left md:text-right">
                      <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest mb-1">Total Paid</p>
                      <p className="text-2xl font-bold text-primary">${booking.totalPrice}</p>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border">
                    <div className="flex items-center space-x-2">
                      {booking.status === "PAID" ? (
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none px-4 py-1.5 rounded-full flex items-center">
                          <CheckCircle2 className="w-4 h-4 mr-2" /> Confirmed
                        </Badge>
                      ) : booking.status === "PENDING" ? (
                        <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-none px-4 py-1.5 rounded-full flex items-center">
                          <Clock className="w-4 h-4 mr-2" /> Pending Payment
                        </Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-none px-4 py-1.5 rounded-full flex items-center">
                          <XCircle className="w-4 h-4 mr-2" /> Cancelled
                        </Badge>
                      )}
                      <span className="text-xs text-muted-foreground">Booking ID: {booking.id}</span>
                    </div>
                    <div className="flex items-center space-x-2 w-full sm:w-auto">
                      <button className="flex-1 sm:flex-initial px-6 py-2 bg-slate-100 dark:bg-zinc-800 rounded-full text-sm font-semibold hover:bg-slate-200 transition-colors">
                        View Details
                      </button>
                      <button className="flex-1 sm:flex-initial px-6 py-2 border border-border rounded-full text-sm font-semibold hover:bg-slate-50 transition-colors">
                        Get Invoice
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {mockBookings.length === 0 && (
          <div className="text-center py-24 bg-white dark:bg-zinc-950 rounded-[2.5rem] border border-border">
            <ShoppingBag className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">No bookings yet</h3>
            <p className="text-muted-foreground">Your future adventures will appear here.</p>
            <Link href="/packages">
              <Button className="mt-8 rounded-full px-8">Explore Packages</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
