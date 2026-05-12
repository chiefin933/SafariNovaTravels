"use client";

import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, User, Bell, Shield } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-heading">Settings</h1>
        <p className="text-muted-foreground">Configure your platform preferences.</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="bg-slate-100 dark:bg-zinc-900 p-1 rounded-xl h-auto flex-wrap md:flex-nowrap">
          <TabsTrigger value="general" className="rounded-lg py-2 px-4 flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 shadow-none border-none">
            <Settings className="w-4 h-4" /> General
          </TabsTrigger>
          <TabsTrigger value="profile" className="rounded-lg py-2 px-4 flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 shadow-none border-none">
            <User className="w-4 h-4" /> Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-lg py-2 px-4 flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 shadow-none border-none">
            <Bell className="w-4 h-4" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="rounded-lg py-2 px-4 flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 shadow-none border-none">
            <Shield className="w-4 h-4" /> Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6">
          <Card className="rounded-2xl border-border">
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Update your platform name and contact details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-2">
                <Label htmlFor="site-name">Platform Name</Label>
                <Input id="site-name" defaultValue="SafariNova Travels" className="rounded-xl" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact-email">Contact Email</Label>
                <Input id="contact-email" defaultValue="hello@safarinova.com" className="rounded-xl" />
              </div>
              <Button className="rounded-xl px-8">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="mt-6">
           <Card className="rounded-2xl border-border">
            <CardHeader>
              <CardTitle>Admin Profile</CardTitle>
              <CardDescription>Manage your administrative identity.</CardDescription>
            </CardHeader>
            <CardContent className="p-10 text-center text-muted-foreground italic">
              Profile management is handled via Clerk dashboard.
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
