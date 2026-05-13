"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Compass, User, Menu, X, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { ClientOnly } from "@/components/ui/ClientOnly";


export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isSignedIn, user, isLoaded } = useUser();
  const isAdmin = isLoaded && user?.publicMetadata?.role === "ADMIN";



  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Destinations", href: "/destinations" },
    { name: "Packages", href: "/packages" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled
          ? "bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
            <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-colors">
              <ClientOnly>
                <Compass className="text-primary w-6 h-6" />
              </ClientOnly>
            </div>
          <span className={cn(
            "text-2xl font-bold tracking-tight transition-colors",
            isScrolled ? "text-foreground" : "text-foreground md:text-white"
          )}>
            SafariNova
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === link.href
                  ? "text-primary"
                  : isScrolled
                  ? "text-muted-foreground"
                  : "text-white/80 hover:text-white"
              )}
            >
              {link.name}
            </Link>
          ))}
          {isAdmin && (
            <Link
              href="/admin"
              className={cn(
                "text-sm font-bold transition-colors hover:text-primary flex items-center gap-1",
                pathname.startsWith("/admin")
                  ? "text-primary"
                  : isScrolled
                  ? "text-muted-foreground"
                  : "text-white/80 hover:text-white"
              )}
            >
              <ClientOnly>
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              </ClientOnly>
              Admin
            </Link>

          )}
        </div>


        <div className="hidden md:flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors",
              isScrolled ? "text-slate-900" : "text-white"
            )}
          >
            <ClientOnly>
              <ShoppingBag className="w-5 h-5" />
            </ClientOnly>
          </Button>
          {!isSignedIn && (
            <>
              <SignInButton mode="modal">
                <Button
                  variant="outline"
                  className={cn(
                    "rounded-full px-6",
                    isScrolled ? "text-foreground" : "text-white border-white/20 hover:bg-white hover:text-black"
                  )}
                >
                  Login
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button
                  className="rounded-full px-6 bg-primary text-white hover:bg-primary/90"
                >
                  Sign Up
                </Button>
              </SignUpButton>
            </>
          )}
          {isSignedIn && (
            <UserButton appearance={{ elements: { avatarBox: "w-10 h-10" } }} />
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 rounded-lg bg-primary/10 text-primary"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white dark:bg-black border-b border-border p-6 flex flex-col space-y-4 md:hidden animate-in slide-in-from-top-5">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "text-lg font-medium",
                pathname === link.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.name}
            </Link>
          ))}
          <hr className="border-border" />
          <div className="flex flex-col space-y-4">
            {!isSignedIn && (
              <>
                <SignInButton mode="modal">
                  <Button variant="outline" className="w-full rounded-full">
                    Login
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button className="w-full rounded-full">
                    Get Started
                  </Button>
                </SignUpButton>
              </>
            )}
            {isSignedIn && (
              <div className="flex justify-center py-2">
                <UserButton appearance={{ elements: { avatarBox: "w-12 h-12" } }} />

              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
