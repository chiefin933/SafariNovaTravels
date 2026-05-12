"use client";

import { useState, useEffect } from "react";
import { 
  Search, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye, 
  MapPin, 
  Loader2
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { CreatePackageModal } from "@/components/admin/CreatePackageModal";
import { getPackages } from "@/actions/package";

export default function AdminPackagesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [packages, setPackages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await getPackages();
        setPackages(data);
      } catch (error) {
        console.error("Failed to fetch packages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const filteredPackages = packages.filter((pkg) =>
    pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pkg.destination?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading">Packages</h1>
          <p className="text-muted-foreground">Manage your travel packages and itineraries.</p>
        </div>
        <CreatePackageModal />

      </div>

      <Card className="rounded-2xl border-border">
        <CardHeader className="border-b border-border p-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search packages..." 
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
                  <th className="px-6 py-4">Package</th>
                  <th className="px-6 py-4">Destination</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Bookings</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-muted-foreground">
                      <div className="flex flex-col items-center gap-2">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        <p>Loading packages...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredPackages.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-muted-foreground">
                      No packages found. Create your first package!
                    </td>
                  </tr>
                ) : (
                  filteredPackages.map((pkg) => (
                    <tr key={pkg.id} className="hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                            <Image 
                              src={pkg.images?.[0] || pkg.image || "/placeholder-package.jpg"} 
                              alt={pkg.title} 
                              fill 
                              sizes="48px" 
                              className="object-cover" 
                            />
                          </div>
                          <span className="font-bold">{pkg.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1 text-muted-foreground" />
                          {pkg.destination?.name || pkg.destination}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-bold text-primary">${pkg.price}</td>
                      <td className="px-6 py-4">
                        <Badge variant={pkg.status === "PUBLISHED" ? "default" : "secondary"} className="rounded-full px-3 py-0.5 text-[10px] font-bold">
                          {pkg.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{pkg.bookings?.length || 0}</td>
                      <td className="px-6 py-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40 rounded-xl">
                            <DropdownMenuItem className="cursor-pointer">
                              <Eye className="w-4 h-4 mr-2" /> View
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <Edit className="w-4 h-4 mr-2" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer text-red-500 hover:text-red-600">
                              <Trash2 className="w-4 h-4 mr-2" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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
