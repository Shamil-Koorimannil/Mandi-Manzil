"use client";

import { useState } from "react";
import { Search, MapPin, Phone, Navigation, X } from "lucide-react";
import { BRANCHES, Branch } from "@/data/branches";
import { CONTACT_INFO } from "@/data/navigation";

export function BranchFinderClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("all");

  const districts = [
    { id: "all", label: "All Outlets (16)" },
    { id: "Kozhikode", label: "Kozhikode (Flagship)" },
    { id: "Thiruvananthapuram", label: "Thiruvananthapuram (6)" },
    { id: "Thrissur", label: "Thrissur (3)" },
    { id: "Kollam", label: "Kollam (4)" },
  ];

  const filteredBranches = BRANCHES.filter((branch) => {
    const matchesDistrict =
      selectedDistrict === "all" ||
      branch.district.toLowerCase().includes(selectedDistrict.toLowerCase());

    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      query === "" ||
      branch.name.toLowerCase().includes(query) ||
      branch.city.toLowerCase().includes(query) ||
      branch.address.toLowerCase().includes(query) ||
      branch.district.toLowerCase().includes(query);

    return matchesDistrict && matchesSearch;
  });

  // Group filtered branches by district for structured reading
  const groupedBranches = filteredBranches.reduce<Record<string, Branch[]>>((acc, branch) => {
    const groupKey = branch.district.includes("Kozhikode")
      ? "Kozhikode District"
      : branch.district.includes("Thiruvananthapuram")
      ? "Thiruvananthapuram District"
      : branch.district.includes("Thrissur")
      ? "Thrissur District"
      : "Kollam District";

    if (!acc[groupKey]) acc[groupKey] = [];
    acc[groupKey].push(branch);
    return acc;
  }, {});

  return (
    <div className="space-y-12 lg:space-y-16">
      
      {/* 1. Straightforward Filter & Search Bar */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#181718] border border-white/[0.08] space-y-5">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" strokeWidth={1.5} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by branch name, locality, or landmark..."
              className="w-full bg-[#141314] border border-white/[0.1] rounded-full pl-11 pr-10 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-brand-yellow transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="text-xs text-zinc-400 font-mono">
            Showing <strong className="text-brand-yellow font-bold">{filteredBranches.length}</strong> of {BRANCHES.length} locations
          </div>
        </div>

        {/* District Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-4 border-t border-white/[0.06]">
          {districts.map((d) => {
            const isActive = selectedDistrict === d.id;
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => setSelectedDistrict(d.id)}
                className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full transition-colors cursor-pointer ${
                  isActive
                    ? "bg-brand-yellow text-[#141314] font-bold"
                    : "bg-white/[0.03] text-zinc-400 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                {d.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Structured Grouped Directory */}
      <div className="space-y-12 lg:space-y-14">
        {Object.entries(groupedBranches).map(([districtTitle, branches]) => (
          <div key={districtTitle} className="space-y-5">
            <div className="flex items-center gap-4">
              <h2 className="font-philosopher text-2xl sm:text-3xl font-bold text-white">
                {districtTitle}
              </h2>
              <span className="text-xs font-mono text-zinc-500">
                ({branches.length} {branches.length === 1 ? "branch" : "branches"})
              </span>
              <div className="flex-1 h-[1px] bg-white/[0.08]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {branches.map((branch) => {
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
          </div>
        ))}
      </div>

      {/* No Results Fallback */}
      {filteredBranches.length === 0 && (
        <div className="text-center py-16 bg-[#181718] border border-white/[0.08] rounded-2xl p-8 space-y-3">
          <p className="text-base text-zinc-300 font-medium">No branches match your query</p>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            Try searching for a different area or reset your district filter to view all 16 locations.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedDistrict("all");
              }}
              className="btn-secondary text-xs"
            >
              Reset Filters
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
