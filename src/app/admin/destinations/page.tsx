"use client";

import { useState, useEffect } from "react";
import { 
  Search, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye, 
  Globe, 
  Loader2,
  MapPin
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
import Image from "next/image";
import { CreateDestinationModal } from "@/components/admin/CreateDestinationModal";
import { getDestinations } from "@/actions/destination";

export default function AdminDestinationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [destinations, setDestinations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const data = await getDestinations();
        setDestinations(data);
      } catch (error) {
        console.error("Failed to fetch destinations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const filteredDestinations = destinations.filter((dest) =>
    dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dest.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading">Destinations</h1>
          <p className="text-muted-foreground">Manage travel regions and countries.</p>
        </div>
        <CreateDestinationModal />
      </div>

      <Card className="rounded-2xl border-border">
        <CardHeader className="border-b border-border p-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search destinations..." 
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
                  <th className="px-6 py-4">Destination</th>
                  <th className="px-6 py-4">Region</th>
                  <th className="px-6 py-4">Packages</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {isLoading ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-10 text-center text-muted-foreground">
                      <div className="flex flex-col items-center gap-2">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        <p>Loading destinations...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredDestinations.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-10 text-center text-muted-foreground">
                      No destinations found. Add your first region!
                    </td>
                  </tr>
                ) : (
                  filteredDestinations.map((dest) => (
                    <tr key={dest.id} className="hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                            <Image 
                              src={dest.mainImage || "/placeholder-destination.jpg"} 
                              alt={dest.name} 
                              fill 
                              sizes="48px" 
                              className="object-cover" 
                            />
                          </div>
                          <div>
                            <p className="font-bold">{dest.name}</p>
                            <p className="text-xs text-muted-foreground">{dest.country}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <Globe className="w-3 h-3 mr-1 text-muted-foreground" />
                          {dest.continent}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium">{dest._count?.packages || 0} packages</span>
                      </td>
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
