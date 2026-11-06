"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Flame, Users, Clock, ShieldCheck, Check } from "lucide-react";
import gsap from "gsap";

interface PlatterTier {
  id: string;
  name: string;
  tagline: string;
  price: string;
  serves: string;
  weight: string;
  image: string;
  spiceLevel: "Gentle" | "Aromatic" | "Bold" | "Fiery";
  sides: string[];
}

const PLATTER_TIERS: PlatterTier[] = [
  {
    id: "quarter",
    name: "Quarter Mandi",
    tagline: "The Solo Connoisseur",
    price: "₹240",
    serves: "1 Person",
    weight: "350g tender cut + rice",
    image: "/images/mandi/quarter-mandi.png",
    spiceLevel: "Gentle",
    sides: ["Simmering Maraq Broth", "House Garlic Toum", "Dakous Tomato Relish"],
  },
  {
    id: "half",
    name: "Half Mandi Platter",
    tagline: "The Duo Experience",
    price: "₹460",
    serves: "2 Persons",
    weight: "700g meat cut + double rice",
    image: "/images/mandi/half-mandi.png",
    spiceLevel: "Aromatic",
    sides: ["Unlimited Basmati Refill", "Double Toum & Dakous", "2x Maraq Broth bowls"],
  },
  {
    id: "full",
    name: "Grand Full Platter",
    tagline: "The Royal Majlis Feast",
    price: "₹880",
    serves: "4-5 Persons",
    weight: "1.4kg pit-roasted chicken/mutton",
    image: "/images/mandi/full-mandi.png",
    spiceLevel: "Aromatic",
    sides: ["Unlimited Basmati Refill", "Family Platter Garnish", "Full Sides Collection", "Caramelized dry fruits"],
  },
  {
    id: "spicy",
    name: "Special Spicy Mandi",
    tagline: "Smoked Peri-Peri Ember Roast",
    price: "₹490",
    serves: "2-3 Persons",
    weight: "800g marinated cuts",
    image: "/images/dishes/spicy-mandi.png",
    spiceLevel: "Fiery",
    sides: ["Charred Green Chilly Emulsion", "Cooling Mint Raita", "House Garlic Toum", "Hot Maraq"],
  },
];

export function InteractiveFeastSelector() {
  const [selectedId, setSelectedId] = useState("full");
  const platterRef = useRef<HTMLDivElement>(null);
  const currentPlatter = PLATTER_TIERS.find((p) => p.id === selectedId) || PLATTER_TIERS[2];

  const handleSelect = (tier: PlatterTier) => {
    if (tier.id === selectedId) return;

    // Smooth GSAP 3D switch transition
    if (platterRef.current) {
      gsap.timeline()
        .to(platterRef.current, {
          scale: 0.8,
          opacity: 0.3,
          rotateY: -45,
          duration: 0.25,
          ease: "power2.in",
          onComplete: () => {
            setSelectedId(tier.id);
          },
        })
        .to(platterRef.current, {
          scale: 1,
          opacity: 1,
          rotateY: 0,
          duration: 0.45,
          ease: "back.out(1.4)",
        });
    } else {
      setSelectedId(tier.id);
    }
  };

  return (
    <section className="py-24 lg:py-32 bg-[#0C0B0C] border-t border-white/[0.07] relative overflow-hidden">
      {/* Subtle background glow */}
      <div
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-10 blur-[130px]"
        style={{
          background: "radial-gradient(circle, #FCCB1C 0%, #FF8A00 50%, transparent 70%)",
        }}
      />

      <div className="site-container relative z-10">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <span className="text-[11px] font-medium tracking-[0.25em] text-[#FCCB1C] uppercase block mb-2">
            The Communal Scale
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-white mb-4">
            Choose Your Portion
          </h2>
          <p className="text-sm sm:text-base text-[#EDECEE]/70 font-light">
            Every platter is cooked with aged long-grain basmati, Yemeni spices,
            and served with slow-simmered maraq broth.
          </p>
        </div>

        {/* Tab Controls (Sleek Minimal Pills) */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-full bg-white/[0.03] border border-white/10 w-fit mb-12">
          {PLATTER_TIERS.map((tier) => {
            const isActive = tier.id === selectedId;
            return (
              <button
                key={tier.id}
                onClick={() => handleSelect(tier)}
                className={`relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-[#FCCB1C] text-[#141314] shadow-lg shadow-[#FCCB1C]/20"
                    : "text-white/70 hover:text-white hover:bg-white/[0.05]"
                }`}
              >
                {tier.name}
              </button>
            );
          })}
        </div>

        {/* Dynamic Display Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white/[0.02] border border-white/[0.07] rounded-3xl p-8 sm:p-12 backdrop-blur-md">
          {/* Left Column: 3D Interactive Platter Presentation */}
          <div className="lg:col-span-6 flex items-center justify-center relative min-h-[340px] sm:min-h-[420px]" style={{ perspective: "1000px" }}>
            {/* Ambient circular halo */}
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-white/[0.07] bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />

            <div
              ref={platterRef}
              className="relative w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] drop-shadow-[0_30px_50px_rgba(0,0,0,0.9)] will-change-transform"
            >
              <Image
                src={currentPlatter.image}
                alt={currentPlatter.name}
                fill
                sizes="(max-width: 640px) 280px, 380px"
                className="object-contain filter contrast-[1.05]"
              />
            </div>
          </div>

          {/* Right Column: Detailed Specifications */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-xs uppercase tracking-widest text-[#FCCB1C] font-mono">
                  {currentPlatter.tagline}
                </span>
                <span className="text-3xl sm:text-4xl font-serif text-white font-normal">
                  {currentPlatter.price}
                </span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-serif text-white mb-6">
                {currentPlatter.name}
              </h3>

              {/* Quick Spec Pills */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                  <div className="flex items-center gap-2 text-white/50 text-xs mb-1">
                    <Users className="w-3.5 h-3.5 text-[#FCCB1C]" />
                    <span>Serving Scale</span>
                  </div>
                  <p className="text-sm font-medium text-white">{currentPlatter.serves}</p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                  <div className="flex items-center gap-2 text-white/50 text-xs mb-1">
                    <Flame className="w-3.5 h-3.5 text-[#FCCB1C]" />
                    <span>Spice Profile</span>
                  </div>
                  <p className="text-sm font-medium text-white">{currentPlatter.spiceLevel}</p>
                </div>
              </div>

              {/* Included Sides */}
              <div className="mb-8">
                <p className="text-xs uppercase tracking-widest text-white/50 mb-3 font-medium">
                  Included in this Platter:
                </p>
                <div className="space-y-2">
                  {currentPlatter.sides.map((side, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#EDECEE]/80">
                      <div className="w-4 h-4 rounded-full bg-[#FCCB1C]/20 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 text-[#FCCB1C]" />
                      </div>
                      <span>{side}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-white/[0.07]">
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#FCCB1C] text-[#141314] font-medium text-xs tracking-wider uppercase transition-all duration-300 hover:bg-[#FFD84D] hover:shadow-[0_0_20px_rgba(252,203,28,0.3)]"
              >
                <span>View In Menu</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <Link
                href="/branches"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/15 text-white/90 text-xs tracking-wider uppercase hover:border-white/30 transition-all duration-300"
              >
                <span>Order at Nearest Branch</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

