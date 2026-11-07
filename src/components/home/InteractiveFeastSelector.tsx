"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface Portion {
  id: string;
  name: string;
  persons: number;
}

const PORTIONS: Portion[] = [
  {
    id: "full",
    name: "Full Mandi",
    persons: 4,
  },
  {
    id: "half",
    name: "Half Mandi",
    persons: 2,
  },
  {
    id: "quarter",
    name: "Quarter Mandi",
    persons: 1,
  },
];

interface ChefPick {
  id: string;
  name: string;
  image: string;
  description: string;
}

const CHEF_PICKS: ChefPick[] = [
  {
    id: "chicken-mandi",
    name: "Chicken Mandi",
    image: "/images/dishes/normal mandi full with rice.png",
    description:
      "A fragrant Arabian rice dish with tender spiced chicken and smoky flavors, served with traditional flair.",
  },
  {
    id: "spicy-mandi",
    name: "Spicy Mandi",
    image: "/images/dishes/Spicy half with rice.png",
    description:
      "A bold twist on the classic, featuring tender meat, aromatic rice, and an extra kick of fiery Arabic spices.",
  },
  {
    id: "mutton-mandi",
    name: "Mutton Mandi",
    image: "/images/dishes/mutton half with rice.png",
    description:
      "A flavorful rice dish with juicy, slow-cooked mutton and rich Arabic spices, served with an authentic smoky touch.",
  },
  {
    id: "beef-mandi",
    name: "Beef Mandi",
    image: "/images/dishes/Beef half with rice.png",
    description:
      "A hearty Arabic rice dish with tender, spiced beef slow-cooked to perfection and served with smoky, fragrant rice.",
  },
  {
    id: "alfaham-mandi",
    name: "Alfaham Mandi",
    image: "/images/dishes/alfaham with rice.png",
    description:
      "A delicious fusion of juicy grilled chicken and fragrant spiced rice, our Alfaham Mandi is a smoky, flavorful twist.",
  },
  {
    id: "peri-peri-mandi",
    name: "Peri Peri Mandi",
    image: "/images/dishes/peri peri with rice.png",
    description:
      "A spicy fusion of Arabic rice and tender meat tossed in zesty Peri Peri sauce for a bold, fiery flavor.",
  },
  {
    id: "honey-chilly-mandi",
    name: "Honey Chilly Mandi",
    image: "/images/dishes/Honey with rice.png",
    description:
      "Blends sweet and spicy flavors with tender meat, aromatic rice, and a drizzle of honey chili glaze for a bold twist.",
  },
  {
    id: "green-chilly-mandi",
    name: "Green Chilly Mandi",
    image: "/images/dishes/Green chilie with rice.png",
    description:
      "A fiery blend of tender meat, aromatic rice, and bold green chilli spice, crafted for those who crave real flavor.",
  },
];

export function InteractiveFeastSelector() {
  return (
    <section className="py-24 lg:py-32 bg-[#1B1A1C] border-t border-white/[0.08] relative overflow-hidden">
      <div className="site-container relative z-10">
        {/* ========================================================= */}
        {/* PART 1: UNLIMITED RICE AVAILABLE (PORTIONS)               */}
        {/* ========================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#FCCB1C] tracking-tight mb-3">
            Unlimited rice available
          </h2>
          <p className="text-sm text-zinc-400 font-light">
            Every dine-in platter includes complimentary Maraq broth, garlic Toum, and unlimited basmati rice refills.
          </p>
        </div>

        {/* 3 Portion Cards (Exact Reference Design without Images) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto mb-28">
          {PORTIONS.map((portion) => (
            <div
              key={portion.id}
              className="group relative rounded-2xl bg-[#FCCB1C] py-8 px-6 text-[#141314] flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_30px_rgba(252,203,28,0.3)] cursor-pointer"
            >
              {/* Title */}
              <h3 className="text-2xl sm:text-[26px] font-serif font-bold text-[#141314] mb-5 tracking-tight">
                {portion.name}
              </h3>

              {/* Distinctive Ornate Arabian Badge */}
              <div className="relative w-20 h-20 rounded-2xl bg-[#141314] text-[#FCCB1C] flex flex-col items-center justify-center border-2 border-[#141314] shadow-md transition-transform duration-300 group-hover:scale-105">
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

        {/* ========================================================= */}
        {/* PART 2: CHEF'S SPECIAL MANDI PICKS                        */}
        {/* ========================================================= */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#FCCB1C] tracking-tight mb-3">
            Chef’s special mandi picks
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed max-w-xl mx-auto">
            Explore our handpicked selection of premium Mandi dishes, crafted with signature spices, rich flavors, and authentic Arabian flair. Perfect for those craving something truly special.
          </p>
        </div>

        {/* 8 Dishes Grid (2 Rows of 4 Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 mb-16">
          {CHEF_PICKS.map((dish) => (
            <div
              key={dish.id}
              className="group flex flex-col justify-between rounded-2xl bg-[#151416] border border-white/[0.06] p-5 transition-all duration-300 hover:border-[#FCCB1C]/40 hover:-translate-y-1.5 hover:shadow-[0_15px_30px_rgba(0,0,0,0.7)]"
            >
              <div>
                {/* Authentic Top-Shot Platter with Rice */}
                <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-4 bg-[#111012] flex items-center justify-center p-2.5">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(252,203,28,0.08)_0%,transparent_70%)] pointer-events-none" />
                  <div className="relative w-full h-full drop-shadow-[0_15px_20px_rgba(0,0,0,0.9)] transition-transform duration-500 group-hover:scale-105">
                    <Image
                      src={dish.image}
                      alt={dish.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-contain filter contrast-[1.05]"
                    />
                  </div>
                </div>

                {/* Dish Name in Gold Serif */}
                <h3 className="text-xl font-serif text-[#FCCB1C] mb-2 group-hover:text-[#FFD84D] transition-colors">
                  {dish.name}
                </h3>

                {/* Minimal Description */}
                <p className="text-xs text-zinc-400 font-light leading-relaxed mb-4">
                  {dish.description}
                </p>
              </div>

              {/* Card Bottom Meta */}
              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span>Quarter • Half • Full</span>
                <span className="text-[#FCCB1C]/80">Unlimited Rice</span>
              </div>
            </div>
          ))}
        </div>

        {/* ========================================================= */}
        {/* PART 3: MINIMAL OUTLINE BUTTON "VIEW OUR FULL MENU"       */}
        {/* ========================================================= */}
        <div className="flex justify-center">
          <Link
            href="/menu"
            className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full border border-white/20 bg-transparent text-white text-xs font-mono tracking-widest uppercase transition-all duration-300 hover:border-[#FCCB1C] hover:bg-[#FCCB1C] hover:text-[#141314] hover:shadow-[0_0_25px_rgba(252,203,28,0.3)]"
          >
            <span>View Our Full Menu</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
