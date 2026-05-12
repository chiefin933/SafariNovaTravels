import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
  title: "SafariNova Travels | Premium Global Journeys",
  description: "Experience the world with SafariNova Travels. Luxury safaris, beach vacations, and cultural tours tailored for you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>

        <body className={`${inter.variable} ${outfit.variable} font-sans antialiased`} suppressHydrationWarning>

          <Navbar />
          <main>{children}</main>
          <Footer />
          <Toaster position="top-right" />
        </body>
      </html>
    </ClerkProvider>
  );
}
