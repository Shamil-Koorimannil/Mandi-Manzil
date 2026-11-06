"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Flame, Sparkles, UtensilsCrossed, ArrowRight, CheckCircle2, RotateCw } from "lucide-react";

interface Hotspot {
  id: string;
  title: string;
  subtitle: string;
  x: string;
  y: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: "chicken",
    title: "Crisp Wood-Fired Chicken",
    subtitle: "Tender, fall-off-the-bone meat roasted suspended over pit embers",
    x: "48%",
    y: "45%",
  },
  {
    id: "rice",
    title: "Cardamom Aged Basmati",
    subtitle: "Aged long-grain infused with meat drippings, dried black loomi & cloves",
    x: "28%",
    y: "65%",
  },
  {
    id: "cashew",
    title: "Toasted Cashews & Loomi",
    subtitle: "Garnished with caramelized onions, golden raisins & whole spices",
    x: "72%",
    y: "32%",
  },
];

export function ScrollPlatterShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

  // Track scroll position within this 180vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth springs for fluid cinematic response
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    restDelta: 0.001,
  });

  // Center platter transforms: enters with rotation & scale
  const platterScale = useTransform(smoothProgress, [0, 0.45, 0.85, 1], [0.68, 1.02, 1.02, 0.88]);
  const platterRotate = useTransform(smoothProgress, [0, 0.5, 1], [-24, 4, 18]);
  const platterY = useTransform(smoothProgress, [0, 0.45, 1], [80, 0, -40]);
  const platterOpacity = useTransform(smoothProgress, [0, 0.15, 0.9, 1], [0.3, 1, 1, 0.6]);

  // Left elements slide in from the left with subtle tilt
  const leftX = useTransform(smoothProgress, [0.08, 0.42], [-220, 0]);
  const leftOpacity = useTransform(smoothProgress, [0.08, 0.35], [0, 1]);
  const leftRotate = useTransform(smoothProgress, [0.08, 0.42], [-10, 0]);

  // Right elements slide in from the right with subtle tilt
  const rightX = useTransform(smoothProgress, [0.12, 0.46], [220, 0]);
  const rightOpacity = useTransform(smoothProgress, [0.12, 0.38], [0, 1]);
  const rightRotate = useTransform(smoothProgress, [0.12, 0.46], [10, 0]);

  // Top header text fade and progress
  const headerOpacity = useTransform(smoothProgress, [0, 0.25, 0.85, 1], [1, 1, 0.9, 0.2]);

  return (
    <section
      ref={containerRef}
      className="relative h-[210vh] bg-[#0E0D0E] text-white select-none"
    >
      {/* Sticky presentation viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between pt-20 pb-8 px-4 sm:px-8">
        
        {/* Ambient atmospheric backdrop lighting */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(252, 203, 28, 0.075) 0%, rgba(20, 19, 20, 0.8) 60%, #0E0D0E 100%)",
          }}
          aria-hidden="true"
        />

        {/* Ambient grain / texture feel */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

        {/* ── Section Title Header (Top Center) ── */}
        <motion.div
          style={{ opacity: headerOpacity }}
          className="relative z-20 text-center max-w-2xl mx-auto pt-2"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow text-[11px] font-mono uppercase tracking-[0.2em] font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Scroll-Interactive Majlis Platter</span>
          </div>

          <h2 className="font-philosopher text-3xl sm:text-5xl lg:text-[3.5rem] font-bold text-white tracking-tight leading-[1.08]">
            Crafted for the centre of the table.
          </h2>

          <p className="text-xs sm:text-sm text-zinc-400 font-light mt-2 max-w-lg mx-auto leading-relaxed">
            Scroll down to watch the pit-roasted feast assemble with its traditional condiments.
          </p>
        </motion.div>

        {/* ── Center Stage & Floating Side Elements ── */}
        <div className="relative z-10 flex-1 flex items-center justify-center w-full max-w-7xl mx-auto my-auto">
          
          {/* ◄◄ Left Floating Elements (Broth & Spices) */}
          <motion.div
            style={{ x: leftX, opacity: leftOpacity, rotate: leftRotate }}
            className="hidden lg:flex flex-col gap-5 absolute left-2 xl:left-8 z-30 max-w-[270px]"
          >
            {/* Element 1: Maraq Broth Bowl */}
            <div className="p-4 sm:p-5 rounded-3xl bg-[#161516]/90 backdrop-blur-md border border-white/[0.1] shadow-2xl hover:border-brand-yellow/40 transition-colors group">
              <div className="flex items-center gap-3.5">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-white/10 shadow-lg group-hover:scale-105 transition-transform">
                  <Image
                    src="/images/showcase/side-maraq.jpg"
                    alt="Authentic Maraq Broth"
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-brand-yellow font-bold block">
                    Accompaniment 01
                  </span>
                  <h4 className="font-philosopher text-base font-bold text-white">
                    Golden Maraq Broth
                  </h4>
                  <p className="text-[11px] text-zinc-400 font-light mt-0.5 leading-snug">
                    Simmered with bone marrow, whole cardamom &amp; lemon.
                  </p>
                </div>
              </div>
            </div>

            {/* Element 2: Hearth Ritual Tag */}
            <div className="p-4 rounded-3xl bg-[#161516]/80 backdrop-blur-md border border-white/[0.08] shadow-xl">
              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-full bg-brand-yellow/10 text-brand-yellow shrink-0 mt-0.5">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
                    Subterranean Pit
                  </h5>
                  <p className="text-[11px] text-zinc-400 font-light mt-0.5 leading-relaxed">
                    Sealed 4 hours under charcoal embers. The fat perfumes every rice grain.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ══ Centerpiece: Circular Mandi Platter (Top Shot with Dynamic Rotation & Scale) ══ */}
          <div className="relative flex items-center justify-center">
            
            {/* Glowing circular halo beneath platter */}
            <motion.div
              style={{ scale: platterScale }}
              className="absolute w-[320px] h-[320px] sm:w-[480px] sm:h-[480px] lg:w-[560px] lg:h-[560px] rounded-full bg-brand-yellow/[0.08] blur-[70px] pointer-events-none"
            />

            {/* The Rotating Mandi Platter */}
            <motion.div
              style={{
                scale: platterScale,
                rotate: platterRotate,
                y: platterY,
                opacity: platterOpacity,
              }}
              className="relative w-[300px] h-[300px] sm:w-[460px] sm:h-[460px] md:w-[520px] md:h-[520px] lg:w-[580px] lg:h-[580px] rounded-full p-2.5 sm:p-3.5 bg-gradient-to-br from-[#FCCB1C]/35 via-[#685208]/20 to-[#141314] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] cursor-grab active:cursor-grabbing group"
            >
              {/* Inner Platter Frame with Brass Rim */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-[#FCCB1C]/40 shadow-inner">
                <Image
                  src="/images/showcase/top-shot-platter.jpg"
                  alt="Authentic top-shot Arabian Mandi platter with tender roasted chicken and aged basmati rice"
                  fill
                  priority
                  sizes="(max-width: 640px) 300px, (max-width: 1024px) 500px, 600px"
                  className="object-cover object-center transform transition-transform duration-700 group-hover:scale-104"
                />

                {/* Subtle sheen highlight */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10 pointer-events-none rounded-full" />
              </div>

              {/* Interactive Hotspot Pins on Platter */}
              {HOTSPOTS.map((spot) => {
                const isSelected = activeHotspot?.id === spot.id;
                return (
                  <button
                    key={spot.id}
                    type="button"
                    onClick={() => setActiveHotspot(isSelected ? null : spot)}
                    style={{ left: spot.x, top: spot.y }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-30 group/pin focus:outline-none"
                    aria-label={`View detail: ${spot.title}`}
                  >
                    <span className="relative flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-yellow/40 opacity-75" />
                      <span className="relative inline-flex rounded-full h-4 w-4 sm:h-5 sm:w-5 bg-brand-yellow text-[#141314] font-bold text-[10px] items-center justify-center shadow-lg border border-black/40">
                        +
                      </span>
                    </span>
                  </button>
                );
              })}
            </motion.div>

            {/* Active Hotspot Popover Modal */}
            <AnimatePresence>
              {activeHotspot && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute z-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-5 rounded-3xl bg-[#181718]/95 backdrop-blur-xl border border-brand-yellow/40 shadow-2xl max-w-xs text-center space-y-2 pointer-events-auto"
                >
                  <div className="flex items-center justify-center gap-1.5 text-brand-yellow font-mono text-[10px] uppercase tracking-widest font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Ingredient Hallmark</span>
                  </div>
                  <h4 className="font-philosopher text-lg font-bold text-white">
                    {activeHotspot.title}
                  </h4>
                  <p className="text-xs text-zinc-300 font-light leading-relaxed">
                    {activeHotspot.subtitle}
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveHotspot(null)}
                    className="text-[11px] text-zinc-400 hover:text-brand-yellow font-mono pt-1 uppercase tracking-wider"
                  >
                    Dismiss
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* ►► Right Floating Elements (Garlic Toum & Unlimited Rice) */}
          <motion.div
            style={{ x: rightX, opacity: rightOpacity, rotate: rightRotate }}
            className="hidden lg:flex flex-col gap-5 absolute right-2 xl:right-8 z-30 max-w-[270px]"
          >
            {/* Element 1: Garlic Toum Ramekin */}
            <div className="p-4 sm:p-5 rounded-3xl bg-[#161516]/90 backdrop-blur-md border border-white/[0.1] shadow-2xl hover:border-brand-yellow/40 transition-colors group">
              <div className="flex items-center gap-3.5">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-white/10 shadow-lg group-hover:scale-105 transition-transform">
                  <Image
                    src="/images/showcase/side-toum.jpg"
                    alt="Velvety Garlic Toum Dip"
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-brand-yellow font-bold block">
                    Accompaniment 02
                  </span>
                  <h4 className="font-philosopher text-base font-bold text-white">
                    Whipped Garlic Toum
                  </h4>
                  <p className="text-[11px] text-zinc-400 font-light mt-0.5 leading-snug">
                    Fluffy emulsion of fresh garlic, olive oil, lemon &amp; sea salt.
                  </p>
                </div>
              </div>
            </div>

            {/* Element 2: Unlimited Rice Promise */}
            <div className="p-4 rounded-3xl bg-[#161516]/80 backdrop-blur-md border border-white/[0.08] shadow-xl">
              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-full bg-brand-yellow/10 text-brand-yellow shrink-0 mt-0.5">
                  <UtensilsCrossed className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
                    Unlimited Basmati
                  </h5>
                  <p className="text-[11px] text-zinc-400 font-light mt-0.5 leading-relaxed">
                    Complimentary steaming refills brought to your table across all 16 branches.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* ── Bottom Interactive Control Strip & Action CTAs ── */}
        <div className="relative z-20 w-full max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-white/[0.08]">
          <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
            <RotateCw className="w-3.5 h-3.5 text-brand-yellow animate-spin" style={{ animationDuration: "12s" }} />
            <span>Scroll drives platter rotation • Tap pins for details</span>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/menu" className="btn-primary text-xs py-2 px-5">
              <span>Order This Platter</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link href="/branches" className="btn-secondary text-xs py-2 px-4">
              <span>Locate Branch</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
