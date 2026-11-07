"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function MobileCinematicHero() {
  const containerRef = useRef<HTMLElement>(null);
  const pinTargetRef = useRef<HTMLDivElement>(null);

  // Layer refs for scroll animation
  const bgRef = useRef<HTMLDivElement>(null);
  const restaurantRef = useRef<HTMLDivElement>(null);
  const travellerRef = useRef<HTMLDivElement>(null);
  const gardenRef = useRef<HTMLDivElement>(null);
  const lanternGlowRef = useRef<HTMLDivElement>(null);

  // Inner tilt refs for gyroscope / device orientation
  const tiltBgRef = useRef<HTMLDivElement>(null);
  const tiltRestRef = useRef<HTMLDivElement>(null);
  const tiltTravRef = useRef<HTMLDivElement>(null);
  const tiltGardenRef = useRef<HTMLDivElement>(null);

  // Text overlay refs
  const initialTextRef = useRef<HTMLDivElement>(null);
  const midStoryRef = useRef<HTMLDivElement>(null);
  const arrivalTextRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const [hasTiltActive, setHasTiltActive] = useState(false);

  useEffect(() => {
    // Only run on mobile viewports (< 768px)
    if (typeof window === "undefined" || window.innerWidth >= 768) return;

    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      // 1. Initial entrance timeline on mount
      const entranceTl = gsap.timeline({ defaults: { ease: "power2.out" } });

      entranceTl.fromTo(bgRef.current, { opacity: 0 }, { opacity: 1, duration: 1.0 });
      entranceTl.fromTo(
        restaurantRef.current,
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1.0, duration: 1.1 },
        "-=0.7"
      );
      entranceTl.fromTo(
        travellerRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 1.1 },
        "-=0.8"
      );
      entranceTl.fromTo(gardenRef.current, { opacity: 0 }, { opacity: 1, duration: 1.0 }, "-=0.8");
      entranceTl.fromTo(
        initialTextRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.9 },
        "-=0.6"
      );

      // Idle lantern glow pulse
      gsap.to(lanternGlowRef.current, {
        scale: 1.2,
        opacity: 0.85,
        duration: 2.0,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // 2. Mobile Pinned Scroll-Story Timeline
      // Compact scroll distance adapted for touch screens
      if (!prefersReducedMotion) {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=1200",
            pin: pinTargetRef.current,
            scrub: 1.1,
            anticipatePin: 1,
          },
        });

        // Layer 1: Background slow upward parallax
        scrollTl.to(bgRef.current, { y: -30, scale: 1.03, ease: "none" }, 0);

        // Layer 2: Restaurant facade subtle depth anchor
        scrollTl.to(restaurantRef.current, { y: -10, scale: 1.02, ease: "none" }, 0);

        // Layer 3: Traveller walks forward naturally toward the restaurant steps
        scrollTl.to(
          travellerRef.current,
          {
            x: 35,
            y: -18,
            scale: 0.94,
            ease: "power1.inOut",
          },
          0
        );

        // Layer 4: Garden foreground shifts downwards for rich cinematic depth
        scrollTl.to(gardenRef.current, { y: 40, scale: 1.03, ease: "none" }, 0);

        // --- Narrative Text Choreography ---
        // Phase A: Hero Title fades out
        scrollTl.to(
          initialTextRef.current,
          { opacity: 0, y: -25, duration: 0.25, ease: "power1.in" },
          0
        );
        scrollTl.to(
          scrollIndicatorRef.current,
          { opacity: 0, duration: 0.15 },
          0
        );

        // Phase B: Mid-Story Caption blooms as traveller walks
        scrollTl.fromTo(
          midStoryRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.22, ease: "power2.out" },
          0.32
        );
        scrollTl.to(
          midStoryRef.current,
          { opacity: 0, y: -15, duration: 0.18, ease: "power1.in" },
          0.65
        );

        // Phase C: Arrival Caption as traveller nears entrance
        scrollTl.fromTo(
          arrivalTextRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.22, ease: "power2.out" },
          0.74
        );
      }
    }, containerRef);

    // 3. Gyroscope / Device Orientation Tilt Interaction
    if (!prefersReducedMotion && typeof window !== "undefined") {
      // Clamped quickTo physics for silky smooth response without layer separation
      const setBgX = gsap.quickTo(tiltBgRef.current, "x", { duration: 1.1, ease: "power2.out" });
      const setBgY = gsap.quickTo(tiltBgRef.current, "y", { duration: 1.1, ease: "power2.out" });

      const setRestX = gsap.quickTo(tiltRestRef.current, "x", { duration: 0.9, ease: "power2.out" });
      const setRestY = gsap.quickTo(tiltRestRef.current, "y", { duration: 0.9, ease: "power2.out" });

      const setTravX = gsap.quickTo(tiltTravRef.current, "x", { duration: 0.7, ease: "power2.out" });
      const setTravY = gsap.quickTo(tiltTravRef.current, "y", { duration: 0.7, ease: "power2.out" });

      const setGardenX = gsap.quickTo(tiltGardenRef.current, "x", { duration: 0.85, ease: "power2.out" });
      const setGardenY = gsap.quickTo(tiltGardenRef.current, "y", { duration: 0.85, ease: "power2.out" });

      const handleOrientation = (e: DeviceOrientationEvent) => {
        if (e.gamma === null || e.beta === null) return;
        setHasTiltActive(true);

        // Normalized tilt:
        // gamma (left/right tilt): standard handheld ±25 deg
        const normGamma = Math.max(-1, Math.min(1, e.gamma / 25));
        // beta (front/back tilt): centered around natural viewing angle (~45 deg)
        const normBeta = Math.max(-1, Math.min(1, (e.beta - 45) / 25));

        // Clamped displacements (4px to 12px based on layer depth)
        // Layer 1 Background: 4px
        setBgX(normGamma * -4);
        setBgY(normBeta * -3);

        // Layer 2 Restaurant: 6px
        setRestX(normGamma * -6);
        setRestY(normBeta * -4);

        // Layer 3 Traveller: 9px
        setTravX(normGamma * -9);
        setTravY(normBeta * -6);

        // Layer 4 Garden Foreground: 12px
        setGardenX(normGamma * -12);
        setGardenY(normBeta * -8);
      };

      // iOS permission handling (request on first user touch, never automatic popup)
      const setupOrientation = () => {
        const doe = window.DeviceOrientationEvent as unknown as {
          requestPermission?: () => Promise<"granted" | "denied">;
        };

        if (typeof doe?.requestPermission === "function") {
          const onFirstTouch = () => {
            doe
              .requestPermission!()
              .then((permission) => {
                if (permission === "granted") {
                  window.addEventListener("deviceorientation", handleOrientation, {
                    passive: true,
                  });
                }
              })
              .catch(() => {
                // Permission denied or dismissed — fallback to scroll parallax
              });
            window.removeEventListener("touchstart", onFirstTouch);
          };
          window.addEventListener("touchstart", onFirstTouch, { passive: true, once: true });
        } else {
          // Standard Android / mobile devices
          window.addEventListener("deviceorientation", handleOrientation, { passive: true });
        }
      };

      setupOrientation();

      return () => {
        window.removeEventListener("deviceorientation", handleOrientation);
        ctx.revert();
      };
    }

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#160E18] text-white selection:bg-[#FCCB1C] selection:text-[#141314]"
      aria-label="Scene 01: The Arabian Journey"
    >
      {/* Pinned Stage Container (100svh on mobile) */}
      <div
        ref={pinTargetRef}
        className="relative w-full h-[100svh] min-h-[580px] overflow-hidden flex flex-col justify-between"
      >
        {/* Soft Top Vignette for Nav / Header Readability */}
        <div
          className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#141314]/85 via-[#141314]/30 to-transparent pointer-events-none z-20"
          aria-hidden="true"
        />

        {/* ========================================================================= */}
        {/* MOBILE SCENE 01: 4-LAYER VERTICAL COMPOSITION                              */}
        {/* 1. Arabian town sunset background                                         */}
        {/* 2. Restaurant facade                                                      */}
        {/* 3. Traveller approaching                                                  */}
        {/* 4. Garden foreground frame                                                */}
        {/* ========================================================================= */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden">
          
          {/* LAYER 1: Arabian Town & Sunset Background */}
          <div
            ref={bgRef}
            className="absolute inset-0 w-full h-full will-change-transform"
          >
            <div
              ref={tiltBgRef}
              className="relative w-full h-full scale-[1.06] will-change-transform"
            >
              <Image
                src="/images/scene-01/mobile/mobile-background.webp"
                alt="Arabian town at sunset with purple mountains"
                fill
                priority
                sizes="100vw"
                className="object-cover object-[48%_center]"
              />
              {/* Atmospheric sunset radial glow */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at 60% 30%, rgba(252, 203, 28, 0.4) 0%, rgba(224, 122, 95, 0.2) 40%, transparent 70%)",
                }}
              />
            </div>
          </div>

          {/* LAYER 2: Restaurant Facade (Visual Destination) */}
          <div
            ref={restaurantRef}
            className="absolute right-[-4%] top-[27%] sm:top-[28%] w-[68%] max-w-[340px] aspect-[1161/1355] will-change-transform z-10 filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.65)]"
          >
            <div
              ref={tiltRestRef}
              className="relative w-full h-full will-change-transform"
            >
              <Image
                src="/images/scene-01/mobile/mobile-restaurant.webp"
                alt="Mandi Manzil fortress restaurant"
                fill
                priority
                sizes="70vw"
                className="object-contain"
              />
              {/* Warm Lantern Ambient Hearth Glow */}
              <div
                className="absolute bottom-[22%] left-[45%] w-24 h-24 rounded-full pointer-events-none opacity-40 blur-xl"
                style={{
                  background:
                    "radial-gradient(circle, #FCCB1C 0%, #FF8A00 50%, transparent 70%)",
                }}
              />
            </div>
          </div>

          {/* LAYER 3: Traveller (Approaching Naturally) */}
          <div
            ref={travellerRef}
            className="absolute left-[3%] bottom-[16%] sm:bottom-[17%] w-[41%] max-w-[210px] aspect-[1029/1529] will-change-transform z-15 origin-bottom-center filter drop-shadow-[10px_20px_20px_rgba(0,0,0,0.7)]"
          >
            <div
              ref={tiltTravRef}
              className="relative w-full h-full will-change-transform"
            >
              <Image
                src="/images/scene-01/mobile/mobile-traveller.webp"
                alt="Arabian traveller journeying toward Mandi Manzil"
                fill
                priority
                sizes="45vw"
                className="object-contain"
              />
            </div>
          </div>

          {/* LAYER 4: Garden Foreground Frame (Palm, Lantern, Rocks & Flowers) */}
          <div
            ref={gardenRef}
            className="absolute inset-0 w-full h-full will-change-transform z-20 pointer-events-none"
          >
            <div
              ref={tiltGardenRef}
              className="relative w-full h-full scale-[1.06] will-change-transform"
            >
              <Image
                src="/images/scene-01/mobile/mobile-garden-frame.webp"
                alt="Palm tree, glowing lantern and desert garden frame"
                fill
                priority
                sizes="100vw"
                className="object-cover object-bottom"
              />
              {/* Hanging Lantern Warm Hearth Glow on Palm */}
              <div
                ref={lanternGlowRef}
                className="absolute top-[12.5%] left-[8%] w-14 h-14 rounded-full bg-[#FCCB1C]/45 blur-lg pointer-events-none"
              />
            </div>
          </div>

        </div>

        {/* Soft bottom ground fade into Scene 02 */}
        <div
          className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#2B2A2D] via-[#2B2A2D]/70 to-transparent pointer-events-none z-25"
          aria-hidden="true"
        />

        {/* ========================================================================= */}
        {/* MOBILE STORY OVERLAYS & HEADLINE                                          */}
        {/* ========================================================================= */}

        {/* Phase 1: Brand Hero Presentation (Top) */}
        <div
          ref={initialTextRef}
          className="site-container w-full relative z-30 pt-20 sm:pt-24 flex flex-col items-start"
        >
          {/* Subtle Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141314]/70 backdrop-blur-md border border-white/10 mb-3 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FCCB1C] animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#FCCB1C] font-semibold">
              Original Arabic Mandi · 2016
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl font-serif font-normal text-white tracking-tight leading-[0.98] mb-2 drop-shadow-[0_4px_14px_rgba(0,0,0,0.85)]">
            Mandi Manzil
          </h1>

          {/* Official Tagline */}
          <p className="text-lg sm:text-xl font-serif text-[#FCCB1C] tracking-wide mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            The Feast Of Arabia
          </p>

          <p className="text-xs text-zinc-200 font-light leading-relaxed max-w-xs mb-5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] bg-[#141314]/40 backdrop-blur-sm p-2 rounded-xl border border-white/[0.06]">
            Follow the desert pathway to authentic wood-fired Yemeni Mandi and Arabian hospitality.
          </p>

          {/* Action Button */}
          <div className="flex items-center gap-3">
            <Link
              href="/menu"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FCCB1C] text-[#141314] font-medium text-[11px] uppercase tracking-wider transition-all duration-300 hover:bg-[#FFD84D]"
            >
              <span>Explore Menu</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/branches"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#141314]/70 backdrop-blur-md border border-white/15 text-white text-[11px] font-mono tracking-wide"
            >
              16 Outlets
            </Link>
          </div>
        </div>

        {/* Phase 2: Mid-Story Caption (Walks towards restaurant) */}
        <div
          ref={midStoryRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 opacity-0 px-6"
        >
          <div className="max-w-xs text-center p-4 rounded-2xl bg-[#141314]/80 backdrop-blur-md border border-white/10 shadow-2xl">
            <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#FCCB1C] font-semibold block mb-1">
              The Journey
            </span>
            <p className="text-base sm:text-lg font-serif text-white leading-snug">
              Guided by the warm glow of lantern light across the desert sands.
            </p>
          </div>
        </div>

        {/* Phase 3: Arrival Caption (At the fortress steps) */}
        <div
          ref={arrivalTextRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 opacity-0 px-6"
        >
          <div className="max-w-xs text-center p-4 rounded-2xl bg-[#141314]/85 backdrop-blur-md border border-[#FCCB1C]/30 shadow-2xl">
            <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#FCCB1C] font-semibold block mb-1">
              Welcome
            </span>
            <p className="text-base sm:text-lg font-serif text-[#FCCB1C] leading-snug">
              The fortress gates open to the true taste of Yemen.
            </p>
          </div>
        </div>

        {/* Bottom Scroll Indicator */}
        <div
          ref={scrollIndicatorRef}
          className="site-container w-full relative z-30 pb-6 flex items-center justify-between pointer-events-none"
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FCCB1C] animate-ping" />
            <span className="text-[10px] font-mono text-zinc-400 tracking-widest uppercase">
              {hasTiltActive ? "Tilt & Scroll" : "Scroll to Enter"}
            </span>
          </div>
          <ChevronDown className="w-4 h-4 text-[#FCCB1C] animate-bounce" />
        </div>

      </div>
    </section>
  );
}

