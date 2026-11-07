"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, MapPin, Phone, Navigation, X } from "lucide-react";
import { BRANCHES } from "@/data/branches";
import { CONTACT_INFO } from "@/data/navigation";

export function BranchFinderClient() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBranches = BRANCHES.filter((branch) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      branch.name.toLowerCase().includes(query) ||
      branch.city.toLowerCase().includes(query) ||
      branch.address.toLowerCase().includes(query) ||
      branch.district.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-12 lg:space-y-16">
      
      {/* 1. Straightforward Search Bar (Location Category Pills Removed) */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#181718] border border-white/[0.08]">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" strokeWidth={1.5} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by branch name, locality, city, or landmark..."
              className="w-full bg-[#141314] border border-white/[0.1] rounded-full pl-11 pr-10 py-3 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-brand-yellow transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="text-xs text-zinc-400 font-mono self-start sm:self-center">
            Showing <strong className="text-brand-yellow font-bold">{filteredBranches.length}</strong> of {BRANCHES.length} locations
          </div>
        </div>
      </div>

      {/* 2. Unified Branches Grid */}
      {filteredBranches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredBranches.map((branch) => {
            const isComingSoon = branch.isComingSoon;

            return (
              <article
                key={branch.id}
                className={`p-5 sm:p-6 rounded-2xl border flex flex-col justify-between transition-colors duration-200 ${
                  isComingSoon
                    ? "bg-[#141314] border-white/[0.05] opacity-75"
                    : "bg-[#181718] border-white/[0.07] hover:border-brand-yellow/30"
                }`}
              >
                <div>
                  {/* Branch Shop Building Image */}
                  {branch.image && (
                    <div className="relative w-full h-44 sm:h-48 rounded-xl overflow-hidden mb-4 bg-[#141314] border border-white/[0.06] group/img">
                      <Image
                        src={branch.image}
                        alt={`Mandi Manzil ${branch.name}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover/img:scale-105 filter brightness-95 group-hover/img:brightness-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#181718]/80 via-transparent to-transparent pointer-events-none" />
                    </div>
                  )}

                  {/* Top Badges */}
                  <div className="flex items-center justify-between mb-2.5 text-[10px] font-mono uppercase tracking-wider">
                    <span className="text-brand-yellow font-bold">
                      {branch.city || branch.district}
                    </span>
                    {isComingSoon ? (
                      <span className="text-zinc-400 bg-white/[0.05] px-2.5 py-0.5 rounded-full italic">
                        Coming Soon
                      </span>
                    ) : (
                      <span className="text-emerald-400/90 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>Dine-in &bull; Takeaway</span>
                      </span>
                    )}
                  </div>

                  {/* Branch Name */}
                  <h3 className="font-philosopher text-xl sm:text-2xl font-bold text-white mb-2">
                    {branch.name}
                  </h3>

                  {/* Address */}
                  <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed mb-5 flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-brand-yellow shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span>
                      {branch.address}
                      {branch.pincode && ` — PIN ${branch.pincode}`}
                    </span>
                  </p>
                </div>

                {/* Actions or Coming Soon Status */}
                <div className="pt-3.5 border-t border-white/[0.06]">
                  {isComingSoon ? (
                    <div className="py-2 px-3 bg-white/[0.02] border border-white/[0.05] rounded-xl text-center text-xs text-zinc-500 font-light italic">
                      Opening soon to serve authentic Yemeni Mandi
                    </div>
                  ) : (
                    <div className="flex items-center gap-2.5">
                      {branch.phoneLink && (
                        <a
                          href={branch.phoneLink}
                          className="btn-primary flex-1 text-center py-2 px-3 text-xs"
                          title={`Call ${branch.name}`}
                        >
                          <Phone className="w-3.5 h-3.5" strokeWidth={1.5} />
                          <span className="font-mono text-[11px]">{branch.phone}</span>
                        </a>
                      )}

                      {branch.googleMapsUrl && (
                        <a
                          href={branch.googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary py-2 px-3 text-xs"
                          title={`Directions to ${branch.name}`}
                        >
                          <Navigation className="w-3.5 h-3.5" strokeWidth={1.5} />
                          <span className="text-[11px]">Map</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        /* No Results Fallback */
        <div className="text-center py-16 bg-[#181718] border border-white/[0.08] rounded-2xl p-8 space-y-3">
          <p className="text-base text-zinc-300 font-medium">No branches match your query</p>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            Try searching for a different branch name, locality, or landmark.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="btn-secondary text-xs"
            >
              Clear Search
            </button>
          </div>
        </div>
      )}

      {/* 3. Central Customer Care Strip */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#100F10] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-5 text-sm">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-yellow font-bold block">
            Central Hospitality Desk
          </span>
          <p className="text-xs sm:text-sm text-zinc-300 font-light">
            Need catering for a family gathering, wedding banquet, or corporate event?
          </p>
        </div>

        <a
          href={CONTACT_INFO.telLink}
          className="btn-primary text-xs py-2.5 px-5 whitespace-nowrap"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Call Customer Care: {CONTACT_INFO.centralCustomerCare}</span>
        </a>
      </div>

    </div>
  );
}
