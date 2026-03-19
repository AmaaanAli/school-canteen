import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CanteenProvider } from "@/components/providers/canteen-provider";
import { Toaster } from "@/components/ui/sonner";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "School Canteen Ordering",
  description: "Digital ordering system for school canteen",
};

function Navigation() {
  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl text-primary">
          Canteen System
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/snacks" className="text-sm font-medium hover:text-primary transition-colors">
            Snacks
          </Link>
          <Link href="/students" className="text-sm font-medium hover:text-primary transition-colors">
            Students
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50">
        <CanteenProvider>
          <Navigation />
          <main className="flex-1 container mx-auto px-4 py-8">
            {children}
          </main>
          <Toaster position="bottom-right" />
        </CanteenProvider>
      </body>
    </html>
  );
}
