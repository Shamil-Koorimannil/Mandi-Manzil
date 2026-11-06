"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, ArrowUpRight, Compass } from "lucide-react";
import { BRANCHES } from "@/data/branches";

const DISTRICT_FILTERS = ["All", "Thrissur", "Trivandrum", "Kollam", "Kozhikode"];

export function SleekLocations() {
  const [activeDistrict, setActiveDistrict] = useState("All");

  const filteredBranches = BRANCHES.filter((b) => {
    if (activeDistrict === "All") return true;
    return b.district.toLowerCase().includes(activeDistrict.toLowerCase());
  }).slice(0, 6);

  return (
    <section className="py-24 bg-[#0A090A] border-t border-white/[0.07] relative overflow-hidden">
      <div className="site-container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] mb-3">
              <Compass className="w-3 h-3 text-[#FCCB1C]" />
              <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/70">
                16 Outlets in Kerala
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-white">
              Find Your Nearest Hearth
            </h2>
          </div>

          <Link
            href="/branches"
            className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#FCCB1C] hover:text-[#FFD84D]"
          >
            <span>All 16 Locations & Timings</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* District Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {DISTRICT_FILTERS.map((dist) => (
            <button
              key={dist}
              onClick={() => setActiveDistrict(dist)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                activeDistrict === dist
                  ? "bg-[#FCCB1C] text-[#141314]"
                  : "bg-white/[0.03] border border-white/10 text-white/70 hover:text-white hover:border-white/20"
              }`}
            >
              {dist}
            </button>
          ))}
        </div>

        {/* Minimal Branch Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBranches.map((branch) => (
            <div
              key={branch.id}
              className="group relative rounded-2xl bg-[#141314] border border-white/10 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-[#FCCB1C]/40 hover:-translate-y-1 hover:shadow-2xl"
            >
              {/* Branch Image if available */}
              <div className="relative w-full h-44 bg-[#1C1B1C] overflow-hidden">
                <Image
                  src={branch.image || "/images/shop-front.jpg"}
                  alt={`Mandi Manzil ${branch.name}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141314] via-transparent to-transparent" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-black/60 backdrop-blur-md text-[#FCCB1C] border border-white/10">
                  {branch.district}
                </span>
              </div>

              {/* Branch Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-serif text-white mb-2 group-hover:text-[#FCCB1C] transition-colors">
                    {branch.name}
                  </h3>
                  <p className="text-xs text-white/60 font-light leading-relaxed mb-6 line-clamp-2">
                    {branch.address}
                  </p>
                </div>

                {/* Contact and Direction Actions */}
                <div className="pt-4 border-t border-white/[0.07] flex items-center justify-between">
                  {branch.phoneLink && (
                    <a
                      href={branch.phoneLink}
                      className="inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-[#FCCB1C] transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#FCCB1C]" />
                      <span>{branch.phone}</span>
                    </a>
                  )}

                  {branch.googleMapsUrl && (
                    <a
                      href={branch.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-[#FCCB1C] font-medium hover:underline"
                    >
                      <span>Map</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

