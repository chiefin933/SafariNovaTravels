import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background dark:bg-zinc-900">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <header className="h-16 bg-background dark:bg-zinc-950 border-b border-border px-8 flex items-center justify-between sticky top-0 z-40">

          <h2 className="font-bold text-lg">Dashboard</h2>
          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold">Admin User</p>
              <p className="text-xs text-muted-foreground">admin@safarinova.com</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-zinc-800 border border-border" />
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
