import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { BranchFinderClient } from "@/components/branches/BranchFinderClient";

export const metadata: Metadata = generatePageMetadata({
  title: "Branches — 16 Locations in Kerala",
  description:
    "Find your nearest Mandi Manzil restaurant across 16 locations in Kerala including Kozhikode, Thiruvananthapuram, Thrissur, and Kollam.",
  path: "/branches",
  image: "/images/branches/kaipamangalam.jpg",
});

export default function BranchesPage() {
  return (
    <div className="pt-28 pb-24 lg:pt-36 lg:pb-32 bg-[#141314] min-h-screen">
      <div className="site-container">
        
        {/* Refined Minimal Introduction */}
        <div className="max-w-3xl mb-12 lg:mb-14">
          <div className="flex items-center gap-3 mb-2.5">
            <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-brand-yellow font-semibold">
              Statewide Network &bull; 16 Outlets
            </span>
            <span className="w-8 h-[1px] bg-brand-yellow/60" />
          </div>
          <h1 className="font-philosopher text-4xl sm:text-6xl lg:text-[4.25rem] font-bold text-white tracking-tight leading-[1.06]">
            16 Locations in Kerala.
          </h1>
          <p className="text-base sm:text-lg text-zinc-300 font-light mt-4 leading-relaxed max-w-xl">
            Locate your nearest Mandi Manzil for traditional majlis dine-in seating, takeaway, and direct local orders.
          </p>
        </div>

        {/* Location Directory Component */}
        <BranchFinderClient />
      </div>
    </div>
  );
}
