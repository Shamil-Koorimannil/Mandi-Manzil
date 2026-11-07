"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DISHES, MANDI_PORTIONS } from "@/data/dishes";

export function MenuClient() {
  return (
    <div className="space-y-16 lg:space-y-24">
      {/* 1. Traditional Portion Sizes Strip */}
      <div className="border-y border-white/[0.08] py-10 lg:py-14 bg-white/[0.01]">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-yellow font-mono block mb-2">
            The Majlis Standard
          </span>
          <h2 className="font-philosopher text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
            Unlimited Rice Available
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-light max-w-xl mx-auto leading-relaxed">
            Every dine-in platter includes complimentary slow-simmered Maraq broth, crushed Salata Hara, whipped garlic Toum, and unlimited basmati rice refills.
          </p>
        </div>

        {/* 3 Portion Cards (Exact Minimal Design) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 max-w-4xl mx-auto">
          {[
            { id: "full", name: "Full Mandi", persons: 4 },
            { id: "half", name: "Half Mandi", persons: 2 },
            { id: "quarter", name: "Quarter Mandi", persons: 1 },
          ].map((portion) => (
            <div
              key={portion.id}
              className="group rounded-2xl bg-[#FCCB1C] py-7 px-6 text-[#141314] flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_30px_rgba(252,203,28,0.25)]"
            >
              <h3 className="text-2xl font-serif font-bold text-[#141314] mb-4 tracking-tight">
                {portion.name}
              </h3>

              <div className="w-18 h-18 py-3 px-4 rounded-2xl bg-[#141314] text-[#FCCB1C] flex flex-col items-center justify-center border-2 border-[#141314] shadow-md transition-transform duration-300 group-hover:scale-105">
                <span className="text-3xl font-serif font-bold leading-none">
                  {portion.persons}
                </span>
                <span className="text-[9px] font-mono tracking-widest uppercase mt-1 text-[#FCCB1C]/90 font-semibold">
                  {portion.persons === 1 ? "PERSON" : "PERSONS"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Unified All Mandi Dishes Collection (No Categories) */}
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-brand-yellow font-bold block mb-1">
              Authentic Selection
            </span>
            <h2 className="font-philosopher text-3xl sm:text-4xl font-bold text-white">
              Our Mandi Collection
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-400">
            {DISHES.length} Signature Creations · Unlimited Rice Refills
          </span>
        </div>

        {/* Unified Responsive Dish Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {DISHES.map((dish) => (
            <article
              key={dish.id}
              className="group flex flex-col justify-between rounded-2xl bg-[#161517] border border-white/[0.07] p-6 transition-all duration-300 hover:border-brand-yellow/40 hover:-translate-y-1.5 hover:shadow-[0_15px_30px_rgba(0,0,0,0.7)]"
            >
              <div>
                {/* Platter with Rice */}
                <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-5 bg-[#121113] flex items-center justify-center p-4 border border-white/[0.04]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(252,203,28,0.1)_0%,transparent_70%)] pointer-events-none" />
                  <div className="relative w-full h-full drop-shadow-[0_20px_25px_rgba(0,0,0,0.9)] transition-transform duration-500 ease-out group-hover:scale-106">
                    <Image
                      src={dish.image}
                      alt={dish.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-contain filter contrast-[1.05]"
                    />
                  </div>
                </div>

                {/* Dish Name */}
                <h3 className="font-philosopher text-2xl font-bold text-white mb-2.5 group-hover:text-brand-yellow transition-colors">
                  {dish.name}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed mb-4">
                  {dish.description}
                </p>

                {/* Flavor Notes */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {dish.flavorNotes.map((note) => (
                    <span
                      key={note}
                      className="text-[11px] text-zinc-300 bg-white/[0.03] px-2.5 py-0.5 rounded-full border border-white/[0.05]"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Meta Footer */}
              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>Quarter • Half • Full</span>
                <span className="text-brand-yellow font-medium">Unlimited Rice</span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* 3. Dining Invitation & Branch Locator Footer */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#100F10] border border-white/[0.08] text-center max-w-4xl mx-auto space-y-4">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-brand-yellow font-bold">
          Dine-In • Takeaway • Banquets
        </span>
        <h3 className="font-philosopher text-2xl sm:text-3xl font-bold text-white">
          Experience Fresh Mandi at Your Nearest Branch
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400 font-light max-w-xl mx-auto leading-relaxed">
          Prepared fresh multiple times daily across all 16 locations in Kerala. Unlimited basmati rice refills for every dine-in table.
        </p>
        <div className="pt-2">
          <Link href="/branches" className="btn-primary group inline-flex">
            <span>Find Nearest Branch</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
