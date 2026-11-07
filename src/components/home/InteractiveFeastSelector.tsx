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
  boldPrefix: string;
  text: string;
  image: string;
}

const CHEF_PICKS: ChefPick[] = [
  {
    id: "chicken-mandi",
    name: "Chicken mandi",
    boldPrefix: "Chicken Mandi",
    text: "is a fragrant Arabian rice dish with tender spiced chicken and smoky flavors, served with traditional flair.",
    image: "/images/dishes/normal mandi full with rice.png",
  },
  {
    id: "spicy-mandi",
    name: "Spicy mandi",
    boldPrefix: "Spicy Mandi",
    text: "is a bold twist on the classic, featuring tender meat, aromatic rice, and an extra kick of fiery Arabic spices.",
    image: "/images/dishes/Spicy half with rice.png",
  },
  {
    id: "mutton-mandi",
    name: "Mutton mandi",
    boldPrefix: "A flavorful rice dish",
    text: "with juicy, slow-cooked mutton and rich Arabic spices, served with an authentic smoky touch.",
    image: "/images/dishes/mutton half with rice.png",
  },
  {
    id: "beef-mandi",
    name: "Beef mandi",
    boldPrefix: "Beef Mandi",
    text: "is a hearty Arabic rice dish with tender, spiced beef slow-cooked to perfection and served with smoky, fragrant rice.",
    image: "/images/dishes/Beef half with rice.png",
  },
  {
    id: "alfaham-mandi",
    name: "Alfaham mandi",
    boldPrefix: "A delicious fusion",
    text: "of juicy grilled chicken and fragrant spiced rice, our Alfaham Mandi is a smoky, flavorful twist on the classic",
    image: "/images/dishes/alfaham with rice.png",
  },
  {
    id: "peri-peri-mandi",
    name: "Peri peri mandi",
    boldPrefix: "Peri Peri Mandi",
    text: "is a spicy fusion of Arabic rice and tender meat tossed in zesty Peri Peri sauce for a bold, fiery flavor.",
    image: "/images/dishes/peri peri with rice.png",
  },
  {
    id: "honey-chilly-mandi",
    name: "Honey chilly mandi",
    boldPrefix: "Blends sweet and spicy flavors",
    text: "with tender meat, aromatic rice, and a drizzle of honey chili glaze for a bold fusion twist.",
    image: "/images/dishes/Honey with rice.png",
  },
  {
    id: "green-chilly-mandi",
    name: "Green chilly mandi",
    boldPrefix: "Green Chilly Mandi",
    text: "a fiery blend of tender meat, aromatic rice, and bold green chilli spice, crafted for those who crave real flavor with a kick.",
    image: "/images/dishes/Green chilie with rice.png",
  },
];

function ArabianOrnateBadge({ persons }: { persons: number }) {
  return (
    <div className="relative w-24 h-24 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full fill-[#141314] stroke-[#FCCB1C] stroke-[1.5]"
      >
        <path
          d="M 50,2 
             C 57,2 62,8 65,12 
             C 72,9 79,12 83,17 
             C 88,21 91,28 88,35 
             C 92,38 98,43 98,50 
             C 98,57 92,62 88,65 
             C 91,72 88,79 83,83 
             C 79,88 72,91 65,88 
             C 62,92 57,98 50,98 
             C 43,98 38,92 35,88 
             C 28,91 21,88 17,83 
             C 12,79 9,72 12,65 
             C 8,62 2,57 2,50 
             C 2,43 8,38 12,35 
             C 9,28 12,21 17,17 
             C 21,12 28,9 35,12 
             C 38,8 43,2 50,2 Z"
        />
        <circle
          cx="50"
          cy="50"
          r="38"
          fill="none"
          stroke="#FCCB1C"
          strokeWidth="0.8"
          opacity="0.5"
        />
      </svg>
      <div className="relative z-10 flex flex-col items-center justify-center text-[#FCCB1C]">
        <span className="text-3xl font-serif font-bold leading-none">{persons}</span>
        <span className="text-[8px] font-mono tracking-widest uppercase mt-1 font-bold">
          {persons === 1 ? "PERSON" : "PERSONS"}
        </span>
      </div>
    </div>
  );
}

export function InteractiveFeastSelector() {
  return (
    <section className="py-24 lg:py-32 bg-[#2B2A2D] border-t border-white/[0.08] relative overflow-hidden">
      <div className="site-container relative z-10">
        {/* ========================================================= */}
        {/* PART 1: UNLIMITED RICE AVAILABLE (PORTIONS)               */}
        {/* ========================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#FCCB1C] tracking-tight">
            Unlimited rice available
          </h2>
        </div>

        {/* 3 Portion Cards (Exact Reference Design Matching Image 1) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto mb-28">
          {PORTIONS.map((portion) => (
            <div
              key={portion.id}
              className="group relative rounded-2xl bg-[#FCCB1C] py-8 px-6 text-[#141314] flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_30px_rgba(252,203,28,0.3)] cursor-pointer"
            >
              <h3 className="text-2xl sm:text-[26px] font-serif font-bold text-[#141314] mb-5 tracking-tight">
                {portion.name}
              </h3>

              <ArabianOrnateBadge persons={portion.persons} />
            </div>
          ))}
        </div>

        {/* ========================================================= */}
        {/* PART 2: CHEF'S SPECIAL MANDI PICKS                        */}
        {/* ========================================================= */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#FCCB1C] tracking-tight mb-4">
            Chef’s special mandi picks
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed max-w-xl mx-auto">
            Explore our handpicked selection of premium Mandi dishes, crafted with signature spices, rich flavors, and authentic Arabian flair. Perfect for those craving something truly special.
          </p>
        </div>

        {/* 8 Dishes Grid (2 Rows of 4 Cards Matching Image 2 & 3) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 mb-14">
          {CHEF_PICKS.map((dish) => (
            <div
              key={dish.id}
              className="group flex flex-col justify-start rounded-2xl bg-[#232225] border border-white/[0.06] p-5 transition-all duration-300 hover:border-[#FCCB1C]/40 hover:-translate-y-1.5 hover:shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
            >
              {/* Authentic Top-Shot Platter with Rice */}
              <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-4 bg-[#1B1A1C] flex items-center justify-center p-2.5">
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

              {/* Minimal Description with Bold Keyword */}
              <p className="text-xs text-zinc-300 font-light leading-relaxed">
                <strong className="font-semibold text-white/95">{dish.boldPrefix}</strong>{" "}
                {dish.text}
              </p>
            </div>
          ))}
        </div>

        {/* ========================================================= */}
        {/* PART 3: MINIMAL RECTANGULAR BUTTON "VIEW OUR FULL MENU"   */}
        {/* ========================================================= */}
        <div className="flex justify-center">
          <Link
            href="/menu"
            className="inline-flex items-center justify-center px-8 py-3.5 border border-white/25 bg-[#232225] text-white text-xs font-mono tracking-widest uppercase transition-all duration-300 hover:border-[#FCCB1C] hover:bg-[#FCCB1C] hover:text-[#141314] hover:shadow-[0_0_25px_rgba(252,203,28,0.3)]"
          >
            <span>View Our Full Menu</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
