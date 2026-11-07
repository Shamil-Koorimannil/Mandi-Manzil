"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import { DISHES, Dish, MANDI_PORTIONS } from "@/data/dishes";

type CategoryFilter = "all" | "classic" | "specialty" | "fusion";

export function MenuClient() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");

  const filteredDishes =
    activeCategory === "all"
      ? DISHES
      : DISHES.filter((dish) => dish.category === activeCategory);

  return (
    <div className="space-y-16 lg:space-y-24">
      {/* 1. Serving Sizes Strip: Full, Half, Quarter (Clear, Minimal, Architectural) */}
      <div className="border-y border-white/[0.08] py-8 lg:py-12 bg-white/[0.01]">
        <div className="max-w-3xl mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-yellow font-mono">
              The Majlis Standard
            </span>
            <span className="w-6 h-[1px] bg-brand-yellow/60" />
          </div>
          <h2 className="font-philosopher text-2xl sm:text-3xl font-bold text-white">
            Available in Three Traditional Serving Sizes
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-light mt-1.5 leading-relaxed">
            Every dine-in order includes complimentary Maraq broth, crushed Salata Hara, garlic Toum, and unlimited basmati rice refills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {MANDI_PORTIONS.map((portion) => (
            <div
              key={portion.id}
              className="p-5 sm:p-6 rounded-2xl bg-[#181718] border border-white/[0.07] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-brand-yellow font-semibold">
                    {portion.arabicName}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-400 font-medium px-2.5 py-0.5 bg-white/[0.03] rounded-full">
                    {portion.serves}
                  </span>
                </div>

                <h3 className="font-philosopher text-xl font-bold text-white mb-2">
                  {portion.title}
                </h3>

                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  {portion.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span>{portion.platterScale}</span>
                <span className="text-brand-yellow font-medium">Unlimited Rice</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Sticky Category Navigation Sub-bar */}
      <div className="space-y-10">
        <div className="sticky top-[61px] z-20 bg-[#141314]/95 backdrop-blur-md border-y border-white/[0.08] py-3 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {[
              { id: "all", label: `All Dishes (${DISHES.length})` },
              { id: "classic", label: "Authentic Classics" },
              { id: "specialty", label: "Spicy Specialties" },
              { id: "fusion", label: "Grilled & Fusion" },
            ].map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCategory(tab.id as CategoryFilter)}
                  className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] rounded-full transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? "bg-brand-yellow text-[#141314] font-bold"
                      : "text-zinc-400 hover:text-white bg-white/[0.02] hover:bg-white/[0.05]"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider hidden md:inline">
            Showing {filteredDishes.length} Items
          </span>
        </div>

        {/* 3. Selective Visual Treatment: Signatures + Editorial Layout */}
        <div className="space-y-10">
          
          {/* Featured Dishes (Chef's Specials get Hero Visual Treatment) */}
          <div className="space-y-6">
            {filteredDishes
              .filter((d) => d.isChefSpecial)
              .map((dish) => (
                <article
                  key={dish.id}
                  className="p-6 sm:p-8 rounded-3xl bg-[#181718] border border-white/[0.07] hover:border-brand-yellow/30 transition-colors duration-200"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
                    
                    {/* Visual Cut (5 cols) */}
                    <div className="lg:col-span-5 relative aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden border border-white/[0.08] bg-[#141314] flex items-center justify-center p-4 group">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(252,203,28,0.1)_0%,transparent_70%)] pointer-events-none" />
                      <div className="relative w-full h-full drop-shadow-[0_20px_25px_rgba(0,0,0,0.85)]">
                        <Image
                          src={dish.image}
                          alt={dish.name}
                          fill
                          sizes="(max-width: 1024px) 100vw, 40vw"
                          className="object-contain filter contrast-[1.05] transform transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                        />
                      </div>
                      <div className="absolute top-3 left-3 bg-brand-yellow text-[#141314] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1 shadow-md z-10">
                        <Flame className="w-3 h-3 text-[#141314]" />
                        <span>Chef&apos;s Signature</span>
                      </div>
                    </div>

                    {/* Content (7 cols) */}
                    <div className="lg:col-span-7 space-y-3.5">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-brand-yellow font-bold">
                          {dish.category === "classic"
                            ? "Authentic Yemeni Classic"
                            : dish.category === "specialty"
                            ? "Arabic Spice Specialty"
                            : "Wood-Fired Fusion"}
                        </span>
                        <span className="text-xs font-mono text-zinc-400">
                          Quarter • Half • Full
                        </span>
                      </div>

                      <h3 className="font-philosopher text-2xl sm:text-3xl font-bold text-white">
                        {dish.name}
                      </h3>

                      <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                        {dish.description}
                      </p>

                      <div className="pt-1 flex flex-wrap items-center gap-1.5">
                        {dish.flavorNotes.map((note) => (
                          <span
                            key={note}
                            className="text-[11px] font-medium text-zinc-300 bg-white/[0.04] px-3 py-0.5 rounded-full border border-white/[0.06]"
                          >
                            {note}
                          </span>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-400 font-mono">
                        <span>Includes Maraq broth &amp; garlic toum</span>
                        <span className="text-brand-yellow font-medium">Unlimited Rice Refills</span>
                      </div>
                    </div>

                  </div>
                </article>
              ))}
          </div>

          {/* Complementary Menu Roster (Clean, High-Readability Editorial Format) */}
          {filteredDishes.some((d) => !d.isChefSpecial) && (
            <div className="pt-6">
              <h3 className="font-philosopher text-2xl font-bold text-white mb-5">
                Specialty &amp; Fusion Selections
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredDishes
                  .filter((d) => !d.isChefSpecial)
                  .map((dish) => (
                    <article
                      key={dish.id}
                      className="p-5 sm:p-6 rounded-2xl bg-[#181718] border border-white/[0.06] hover:border-brand-yellow/30 transition-all flex flex-col justify-between group"
                    >
                      <div>
                        {/* Dish Product Image Showcase */}
                        <div className="relative w-full h-44 sm:h-48 rounded-xl overflow-hidden mb-4 bg-[#141314] border border-white/[0.04] flex items-center justify-center p-3">
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(252,203,28,0.08)_0%,transparent_70%)] pointer-events-none" />
                          <div className="relative w-full h-full drop-shadow-[0_15px_20px_rgba(0,0,0,0.85)]">
                            <Image
                              src={dish.image}
                              alt={dish.name}
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className="object-contain filter contrast-[1.05] transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                          <span className="absolute top-2.5 right-2.5 text-[10px] font-mono uppercase tracking-widest text-zinc-300 px-2.5 py-0.5 bg-black/70 backdrop-blur-md rounded-full border border-white/10 z-10">
                            {dish.category}
                          </span>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-philosopher text-xl font-bold text-white group-hover:text-brand-yellow transition-colors">
                            {dish.name}
                          </h4>

                          <p className="text-xs text-zinc-400 font-light leading-relaxed">
                            {dish.description}
                          </p>

                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {dish.flavorNotes.map((note) => (
                              <span
                                key={note}
                                className="text-[10px] text-zinc-400 bg-white/[0.03] px-2.5 py-0.5 rounded-full"
                              >
                                {note}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-500 font-mono">
                        <span>Quarter • Half • Full</span>
                        <span className="text-brand-yellow">Unlimited Rice</span>
                      </div>
                    </article>
                  ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* 4. Dining Invitation & Branch Locator Footer */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#100F10] border border-white/[0.08] text-center max-w-4xl mx-auto space-y-4">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-brand-yellow font-bold">
          Dine-In • Takeaway • Banquets
        </span>
        <h3 className="font-philosopher text-2xl sm:text-3xl font-bold text-white">
          Experience Fresh Mandi at Your Local Branch
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400 font-light max-w-xl mx-auto leading-relaxed">
          Prepared fresh multiple times daily across all 16 locations in Kerala. Unlimited basmati rice refills for every table.
        </p>
        <div className="pt-2">
          <Link href="/branches" className="btn-primary group inline-flex">
            <span>Find Nearest Branch &amp; Reserve</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
