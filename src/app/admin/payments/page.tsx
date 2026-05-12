"use client";

import { useState, useEffect } from "react";
import { 
  Search, 
  Download,
  CreditCard,
  Calendar,
  User,
  Loader2,
  CheckCircle2,
  XCircle,
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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { getBookings } from "@/actions/booking";

export default function AdminPaymentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getBookings();
        setBookings(data);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter((booking) =>
    booking.user?.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    booking.package?.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalRevenue = bookings
    .filter(b => b.status === "CONFIRMED")
    .reduce((acc, b) => acc + b.totalPrice, 0);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading">Payments & Bookings</h1>
          <p className="text-muted-foreground">Monitor revenue and booking status.</p>
        </div>
        <Button variant="outline" className="rounded-xl">
          <Download className="w-4 h-4 mr-2" /> Export CSV
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-2xl bg-primary text-primary-foreground border-none">
          <CardHeader className="pb-2">
            <CardDescription className="text-primary-foreground/80">Total Revenue</CardDescription>
            <CardTitle className="text-4xl font-bold">${totalRevenue.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm opacity-80">+12% from last month</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-border">
          <CardHeader className="pb-2">
            <CardDescription>Pending Payments</CardDescription>
            <CardTitle className="text-4xl font-bold">
              {bookings.filter(b => b.status === "PENDING").length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-border">
          <CardHeader className="pb-2">
            <CardDescription>Success Rate</CardDescription>
            <CardTitle className="text-4xl font-bold">98.5%</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Excellent performance</p>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-2xl border-border">
        <CardHeader className="border-b border-border p-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search by user or package..." 
              className="pl-10 h-10 rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 dark:bg-zinc-900 text-muted-foreground uppercase text-xs font-bold">
                <tr>
                  <th className="px-6 py-4">Booking</th>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center">
                      <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
                    </td>
                  </tr>
                ) : filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-20 text-center text-muted-foreground">
                      No payments found.
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold">{booking.package?.title}</div>
                        <div className="text-xs text-muted-foreground">{booking.guests} guests</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span>{booking.user?.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-bold text-primary">
                        ${booking.totalPrice.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {booking.status === "CONFIRMED" && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                          {booking.status === "PENDING" && <Clock className="w-4 h-4 text-amber-500" />}
                          {booking.status === "CANCELLED" && <XCircle className="w-4 h-4 text-red-500" />}
                          <span className="capitalize">{booking.status.toLowerCase()}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
