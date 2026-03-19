import { PageHeader } from "@/components/shared/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Coffee, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          School Canteen Digital Ordering
        </h1>
        <p className="text-xl text-muted-foreground">
          A fast and simple way for students to order snacks and track expenses.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <Link href="/snacks" className="group">
          <div className="h-full border-2 rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-4 bg-white hover:border-primary hover:shadow-md transition-all">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <Coffee className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold">Order Snacks</h2>
            <p className="text-muted-foreground">Browse the menu and place your orders instantly.</p>
          </div>
        </Link>
        <Link href="/students" className="group">
          <div className="h-full border-2 rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-4 bg-white hover:border-primary hover:shadow-md transition-all">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold">Manage Students</h2>
            <p className="text-muted-foreground">View student profiles, referral codes, and recent orders.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
