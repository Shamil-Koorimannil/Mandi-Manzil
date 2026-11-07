"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, Flame, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function CinematicScrollHero() {
  const containerRef = useRef<HTMLElement>(null);
  const pinTargetRef = useRef<HTMLDivElement>(null);

  // Layer refs (pinned/scroll containers)
  const townRef = useRef<HTMLDivElement>(null);
  const restaurantRef = useRef<HTMLDivElement>(null);
  const pathwayRef = useRef<HTMLDivElement>(null);
  const travellerRef = useRef<HTMLDivElement>(null);
  const gardenRef = useRef<HTMLDivElement>(null);
  const lanternGlowRef = useRef<HTMLDivElement>(null);

  // Mouse parallax inner refs (independent from scroll triggers)
  const townMouseRef = useRef<HTMLDivElement>(null);
  const restaurantMouseRef = useRef<HTMLDivElement>(null);
  const pathwayMouseRef = useRef<HTMLDivElement>(null);
  const travellerMouseRef = useRef<HTMLDivElement>(null);
  const gardenMouseRef = useRef<HTMLDivElement>(null);

  // Text overlay refs
  const initialTextRef = useRef<HTMLDivElement>(null);
  const midStoryRef = useRef<HTMLDivElement>(null);
  const arrivalTextRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Initial entrance timeline on load
      const entranceTl = gsap.timeline({ defaults: { ease: "power2.out" } });

      entranceTl.fromTo(
        townRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2 }
      );

      entranceTl.fromTo(
        restaurantRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2 },
        "-=0.9"
      );

      entranceTl.fromTo(
        pathwayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2 },
        "-=0.9"
      );

      entranceTl.fromTo(
        travellerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2 },
        "-=0.9"
      );

      entranceTl.fromTo(
        gardenRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2 },
        "-=0.9"
      );

      entranceTl.fromTo(
        initialTextRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0 },
        "-=0.7"
      );

      entranceTl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.5"
      );

      // 2. Idle subtle animations: palm lantern glow pulse
      gsap.to(lanternGlowRef.current, {
        scale: 1.15,
        opacity: 0.85,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // 3. Multi-layer pinned scroll timeline (The Scroll Story)
      // NOTE: Per requirements, the man (travellerRef) and the building (restaurantRef) DO NOT MOVE with scroll.
      // Other layers (townRef, gardenRef, pathwayRef, and narrative texts) move with scroll to create parallax depth.
      const storyTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=2000",
          pin: pinTargetRef.current,
          scrub: 1.2,
          anticipatePin: 1,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
          },
        },
      });

      // LAYER 1: Background Arabian Town (Slow background parallax)
      storyTl.to(
        townRef.current,
        {
          y: -60,
          scale: 1.05,
          ease: "none",
        },
        0
      );

      // LAYER 3: Stone Pathway (Subtle ground parallax shift)
      storyTl.to(
        pathwayRef.current,
        {
          y: -18,
          scale: 1.01,
          ease: "none",
        },
        0
      );

      // LAYER 5: Foreground Garden Frame (Fastest foreground parallax creating rich depth)
      storyTl.to(
        gardenRef.current,
        {
          y: 55,
          scale: 1.04,
          ease: "none",
        },
        0
      );

      // --- STORY TEXT CHOREOGRAPHY ---

      // Phase A: Initial Title & CTAs fade and slide out (0.00 -> 0.28)
      storyTl.to(
        initialTextRef.current,
        {
          opacity: 0,
          y: -35,
          duration: 0.28,
          ease: "power1.in",
        },
        0
      );

      storyTl.to(
        scrollIndicatorRef.current,
        {
          opacity: 0,
          y: -20,
          duration: 0.15,
        },
        0
      );

      // Phase B: Mid-Story Caption blooms as traveller walks (0.35 -> 0.70)
      storyTl.fromTo(
        midStoryRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" },
        0.35
      );

      storyTl.to(
        midStoryRef.current,
        { opacity: 0, y: -25, duration: 0.2, ease: "power1.in" },
        0.68
      );

      // Phase C: Arrival Caption as traveller reaches the restaurant steps (0.76 -> 1.00)
      storyTl.fromTo(
        arrivalTextRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.22, ease: "power2.out" },
        0.76
      );

      // 4. Interactive Mouse Parallax (Silky multi-plane camera tilt displacement)
      if (typeof window !== "undefined") {
        const setTownX = gsap.quickTo(townMouseRef.current, "x", { duration: 1.1, ease: "power2.out" });
        const setTownY = gsap.quickTo(townMouseRef.current, "y", { duration: 1.1, ease: "power2.out" });

        const setRestaurantX = gsap.quickTo(restaurantMouseRef.current, "x", { duration: 0.9, ease: "power2.out" });
        const setRestaurantY = gsap.quickTo(restaurantMouseRef.current, "y", { duration: 0.9, ease: "power2.out" });

        const setPathwayX = gsap.quickTo(pathwayMouseRef.current, "x", { duration: 0.85, ease: "power2.out" });
        const setPathwayY = gsap.quickTo(pathwayMouseRef.current, "y", { duration: 0.85, ease: "power2.out" });

        const setTravellerX = gsap.quickTo(travellerMouseRef.current, "x", { duration: 0.75, ease: "power2.out" });
        const setTravellerY = gsap.quickTo(travellerMouseRef.current, "y", { duration: 0.75, ease: "power2.out" });

        const setGardenX = gsap.quickTo(gardenMouseRef.current, "x", { duration: 0.95, ease: "power2.out" });
        const setGardenY = gsap.quickTo(gardenMouseRef.current, "y", { duration: 0.95, ease: "power2.out" });

        const handleMouseMove = (e: MouseEvent) => {
          const rect = containerRef.current?.getBoundingClientRect();
          if (!rect || rect.bottom < -100 || rect.top > window.innerHeight + 100) return;

          // Normalized coordinates from -1.0 to +1.0
          const normX = (e.clientX / window.innerWidth - 0.5) * 2;
          const normY = (e.clientY / window.innerHeight - 0.5) * 2;

          // Subtle natural physical displacement (in pixels) for each depth layer
          setTownX(normX * -12);
          setTownY(normY * -8);

          setRestaurantX(normX * -18);
          setRestaurantY(normY * -12);

          setPathwayX(normX * -14);
          setPathwayY(normY * -8);

          setTravellerX(normX * -24);
          setTravellerY(normY * -15);

          setGardenX(normX * -34);
          setGardenY(normY * -20);
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });

        return () => {
          window.removeEventListener("mousemove", handleMouseMove);
        };
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#160E18] text-white selection:bg-[#FCCB1C] selection:text-[#141314]"
    >
      {/* Pinned Stage Container (Locks 100svh during scroll) */}
      <div
        ref={pinTargetRef}
        className="relative w-full h-[100svh] min-h-[580px] overflow-hidden flex flex-col justify-between"
      >
        {/* Soft Top Vignette for Crystal-Clear Header Legibility */}
        <div
          className="absolute top-0 left-0 right-0 h-32 sm:h-40 bg-gradient-to-b from-[#141314]/85 via-[#141314]/35 to-transparent pointer-events-none z-20"
          aria-hidden="true"
        />

        {/* ========================================================================= */}
        {/* SCENE 01: MULTI-LAYER COMPOSITION                                         */}
        {/* ========================================================================= */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden">
          {/* LAYER 1: Arabian Sunset Sky, Mountains & Distant Desert Town */}
          <div
            ref={townRef}
            className="absolute inset-0 w-full h-full will-change-transform"
          >
            <div
              ref={townMouseRef}
              className="relative w-full h-full scale-[1.05] will-change-transform"
            >
              <Image
                src="/images/scene-01/arabian-town.webp"
                alt="Arabian town at sunset with purple mountains"
                fill
                priority
                sizes="100vw"
                className="object-cover object-[center_35%] sm:object-[center_30%]"
              />
              {/* Atmospheric warm sunlight gradient */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at 75% 35%, rgba(252, 203, 28, 0.4) 0%, rgba(224, 122, 95, 0.2) 40%, transparent 70%)",
                }}
              />
            </div>
          </div>

          {/* LAYER 2: The Sandstone Mandi Manzil Restaurant Building */}
          <div
            ref={restaurantRef}
            className="absolute right-[-4%] sm:right-[3%] lg:right-[6%] xl:right-[8%] bottom-[15%] sm:bottom-[15%] lg:bottom-[16%] w-[78%] sm:w-[58%] lg:w-[46%] xl:w-[42%] max-w-[820px] aspect-[1536/1024] z-10 filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.55)]"
          >
            <div
              ref={restaurantMouseRef}
              className="relative w-full h-full will-change-transform"
            >
              <Image
                src="/images/scene-01/restaurant.webp"
                alt="Mandi Manzil fortress restaurant with glowing lanterns and dining canopy"
                fill
                priority
                sizes="(max-width: 640px) 80vw, (max-width: 1024px) 60vw, 45vw"
                className="object-contain object-bottom-right"
              />
              {/* Warm Lantern Ambient Hearth Glow */}
              <div
                className="absolute bottom-[20%] left-[45%] w-32 h-32 rounded-full pointer-events-none opacity-40 blur-2xl"
                style={{
                  background: "radial-gradient(circle, #FCCB1C 0%, #FF8A00 50%, transparent 70%)",
                }}
              />
            </div>
          </div>

          {/* LAYER 3: Stone Pathway with Desert Rocks & Steps */}
          <div
            ref={pathwayRef}
            className="absolute left-[-5%] sm:left-0 bottom-0 w-[110%] sm:w-full h-[40%] sm:h-[45%] lg:h-[48%] will-change-transform z-12"
          >
            <div
              ref={pathwayMouseRef}
              className="relative w-full h-full scale-[1.04] will-change-transform"
            >
              <Image
                src="/images/scene-01/stone-pathway.webp"
                alt="Stone pathway with garden lanterns and steps leading to the restaurant"
                fill
                priority
                sizes="100vw"
                className="object-cover object-bottom"
              />
            </div>
          </div>

          {/* LAYER 4: The Arabian Traveller Hero (Walking Towards the Restaurant) */}
          <div
            ref={travellerRef}
            className="absolute left-[3%] sm:left-[6%] lg:left-[8%] bottom-[7%] sm:bottom-[9%] lg:bottom-[10%] w-[32%] sm:w-[24%] lg:w-[19%] xl:w-[17%] max-w-[280px] aspect-[1268/1241] z-15 origin-bottom-center filter drop-shadow-[15px_25px_22px_rgba(0,0,0,0.7)]"
          >
            <div
              ref={travellerMouseRef}
              className="relative w-full h-full will-change-transform"
            >
              <Image
                src="/images/scene-01/arabian-traveller.webp"
                alt="Arabian traveler journeying toward Mandi Manzil"
                fill
                priority
                sizes="(max-width: 640px) 35vw, (max-width: 1024px) 25vw, 20vw"
                className="object-contain"
              />
            </div>
          </div>

          {/* LAYER 5: Foreground Garden Frame (Palm Tree, Hanging Lantern, Foreground Rocks) */}
          <div
            ref={gardenRef}
            className="absolute inset-0 w-full h-full will-change-transform z-20 pointer-events-none"
          >
            <div
              ref={gardenMouseRef}
              className="relative w-full h-full scale-[1.05] will-change-transform"
            >
              <Image
                src="/images/scene-01/garden-frame.webp"
                alt="Palm tree and tropical desert garden foreground frame"
                fill
                priority
                sizes="100vw"
                className="object-cover object-bottom"
              />
              {/* Hanging Lantern Warm Hearth Glow on Palm */}
              <div
                ref={lanternGlowRef}
                className="absolute top-[16%] sm:top-[17%] left-[6.5%] sm:left-[7.5%] w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FCCB1C]/40 blur-xl pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* STORY OVERLAY & NARRATIVE LAYOUT                                          */}
        {/* ========================================================================= */}

        {/* Soft bottom ground fade to blend smoothly into cooking story section */}
        <div
          className="absolute bottom-0 left-0 right-0 h-28 sm:h-36 bg-gradient-to-t from-[#0A090A] via-[#0A090A]/70 to-transparent pointer-events-none z-25"
          aria-hidden="true"
        />

        {/* Phase 1: Initial Brand Hero Presentation (Visible at Top) */}
        <div
          ref={initialTextRef}
          className="site-container w-full relative z-30 pt-28 sm:pt-32 lg:pt-36 flex flex-col items-start max-w-2xl"
        >
          {/* Subtle Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141314]/60 backdrop-blur-md border border-white/10 mb-4 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FCCB1C] animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.22em] text-[#FCCB1C] font-semibold">
              Kerala’s Original Arabic Mandi · Since 2016
            </span>
          </div>

          {/* Majestic Hero Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-normal text-white tracking-tight leading-[0.96] mb-3 drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
            Mandi Manzil
          </h1>

          {/* Official Slogan */}
          <p className="text-xl sm:text-2xl md:text-3xl font-serif text-[#FCCB1C] tracking-wide mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            The Feast Of Arabia
          </p>

          <p className="text-xs sm:text-sm text-zinc-200 font-light leading-relaxed max-w-lg mb-7 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] bg-[#141314]/40 backdrop-blur-sm p-2 rounded-xl border border-white/[0.06]">
            Follow the ancient stone pathway to authentic wood-fired Yemeni Mandi. Prepared with fragrant aged basmati and served in the generous tradition of Arabian hospitality.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/menu"
              className="group inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-[#FCCB1C] text-[#141314] font-medium text-xs uppercase tracking-widest transition-all duration-300 hover:bg-[#FFD84D] hover:shadow-[0_0_25px_rgba(252,203,28,0.4)] hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Explore Menu</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <Link
              href="/branches"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#141314]/65 backdrop-blur-md border border-white/20 text-xs font-medium uppercase tracking-widest text-zinc-200 hover:text-white hover:border-white/40 transition-all duration-200"
            >
              <span>16 Kerala Outlets</span>
            </Link>
          </div>
        </div>

        {/* Phase 2: Mid-Journey Story Milestone (Floats in as traveller walks) */}
        <div
          ref={midStoryRef}
          className="absolute top-[28%] sm:top-[30%] left-6 sm:left-12 lg:left-20 max-w-md z-30 pointer-events-none opacity-0"
        >
          <div className="p-5 sm:p-6 rounded-2xl bg-[#141314]/80 backdrop-blur-md border border-white/10 shadow-2xl">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#FCCB1C] font-semibold block mb-1.5">
              Chapter I &bull; The Calling
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-white mb-2 leading-snug">
              Aroma on the Evening Breeze
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
              As twilight paints the mountains in purple hues, the warm scent of roasting spices guides the weary traveler across the courtyard stone.
            </p>
          </div>
        </div>

        {/* Phase 3: Arrival Milestone (As traveller reaches restaurant steps) */}
        <div
          ref={arrivalTextRef}
          className="absolute top-[26%] sm:top-[28%] left-6 sm:left-12 lg:left-20 max-w-md z-30 pointer-events-none opacity-0"
        >
          <div className="p-5 sm:p-6 rounded-2xl bg-[#141314]/85 backdrop-blur-md border border-[#FCCB1C]/30 shadow-2xl">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#FCCB1C] font-semibold block mb-1.5">
              Chapter II &bull; The Majlis
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-white mb-2 leading-snug">
              Welcome to the Hearth
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed mb-3">
              Step inside. The embers glow, the brass platters are piled high, and the feast of Arabia awaits you.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-[#FCCB1C] font-semibold">
              <Flame className="w-3.5 h-3.5" />
              <span>Scroll to discover the craft</span>
            </div>
          </div>
        </div>

        {/* Persistent Bottom Floating Scroll Indicator & Progress Tracker */}
        <div
          ref={scrollIndicatorRef}
          className="site-container w-full relative z-30 pb-6 flex items-center justify-between pointer-events-none"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm flex items-center justify-center animate-bounce">
              <ChevronDown className="w-4 h-4 text-[#FCCB1C]" />
            </div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400">
              Scroll to begin journey
            </span>
          </div>

          <div className="flex items-center gap-2.5 text-[11px] font-mono text-zinc-400 bg-black/40 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-white/10">
            <span className="text-[#FCCB1C] font-semibold">
              {Math.round(scrollProgress * 100)}%
            </span>
            <span className="text-zinc-600">|</span>
            <span>Scene 01</span>
          </div>
        </div>
      </div>
    </section>
  );
}

