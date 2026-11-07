"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MobileCinematicMenuScene } from "./MobileCinematicMenuScene";

export function CinematicMenuScene() {
  const containerRef = useRef<HTMLElement>(null);
  const pinTargetRef = useRef<HTMLDivElement>(null);

  // Layer containers for entrance & scroll animations
  const bgLayerRef = useRef<HTMLDivElement>(null);
  const readerLayerRef = useRef<HTMLDivElement>(null);

  // Inner wrappers for independent mouse parallax
  const bgMouseRef = useRef<HTMLDivElement>(null);
  const readerMouseRef = useRef<HTMLDivElement>(null);

  // Subtle atmospheric scene badge
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only initialize desktop timeline on desktop/tablet viewports (>= 768px)
    if (typeof window === "undefined" || window.innerWidth < 768) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Initial entrance animation: triggered when scene enters viewport
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          once: true,
        },
      });

      // Fade in restaurant background
      entranceTl.fromTo(
        bgLayerRef.current,
        { opacity: 0, scale: 1.04 },
        { opacity: 1, scale: 1.0, duration: 1.2, ease: "power2.out" }
      );

      // Bring man and menu into view with subtle upward movement and opacity transition
      entranceTl.fromTo(
        readerLayerRef.current,
        { opacity: 0, y: 45 },
        { opacity: 1, y: 0, duration: 1.3, ease: "power3.out" },
        "-=0.9"
      );

      if (badgeRef.current) {
        entranceTl.fromTo(
          badgeRef.current,
          { opacity: 0, y: -15 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.8"
        );
      }

      // 2. Pinned scroll scrub timeline
      // - Pin the scene briefly while scrolling
      // - Slowly scale the menu-reader layer up slightly
      // - Add subtle depth shift between background and foreground
      // - Transition smoothly into the next existing section
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1600",
          pin: pinTargetRef.current,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // Background depth shift: subtle upward glide and micro-scale
      scrollTl.to(
        bgLayerRef.current,
        {
          y: -24,
          scale: 1.03,
          ease: "none",
        },
        0
      );

      // Foreground menu reader: slowly scales up slightly for visual focus and immersion
      scrollTl.to(
        readerLayerRef.current,
        {
          scale: 1.07,
          y: -18,
          ease: "none",
        },
        0
      );

      // 3. Mouse Movement Parallax
      // - Very subtle parallax to foreground menu-reader layer
      // - Even more subtle to background layer
      // - Zero rotation to ensure menu remains crisp and effortless to read
      if (typeof window !== "undefined") {
        const setBgX = gsap.quickTo(bgMouseRef.current, "x", { duration: 1.3, ease: "power2.out" });
        const setBgY = gsap.quickTo(bgMouseRef.current, "y", { duration: 1.3, ease: "power2.out" });

        const setReaderX = gsap.quickTo(readerMouseRef.current, "x", { duration: 0.85, ease: "power2.out" });
        const setReaderY = gsap.quickTo(readerMouseRef.current, "y", { duration: 0.85, ease: "power2.out" });

        const handleMouseMove = (e: MouseEvent) => {
          const rect = containerRef.current?.getBoundingClientRect();
          if (!rect || rect.bottom < -100 || rect.top > window.innerHeight + 100) return;

          const normX = (e.clientX / window.innerWidth - 0.5) * 2;
          const normY = (e.clientY / window.innerHeight - 0.5) * 2;

          // Subtle physical displacement (in pixels)
          setBgX(normX * -8);
          setBgY(normY * -5);

          setReaderX(normX * -18);
          setReaderY(normY * -11);
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
    <>
      {/* 1. Dedicated Mobile Scene 02 (Phones < 768px with portrait assets & device tilt) */}
      <div className="block md:hidden">
        <MobileCinematicMenuScene />
      </div>

      {/* 2. Master Desktop Scene 02 (Desktops & Tablets >= 768px, 100% preserved) */}
      <div className="hidden md:block">
        <section
          ref={containerRef}
          className="relative w-full bg-[#0F0D0E] text-white selection:bg-[#FCCB1C] selection:text-[#141314]"
          aria-label="Scene 02: The Mandi Menu"
        >
      {/* Pinned Stage Container (Locks 100svh during scroll) */}
      <div
        ref={pinTargetRef}
        className="relative w-full h-[100svh] min-h-[580px] overflow-hidden flex items-center justify-center"
      >
        {/* Soft Vignette Gradients for Flawless Narrative Transitions */}
        <div
          className="absolute top-0 left-0 right-0 h-28 sm:h-36 bg-gradient-to-b from-[#2B2A2D] via-[#2B2A2D]/60 to-transparent pointer-events-none z-20"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-28 sm:h-36 bg-gradient-to-t from-[#2B2A2D] via-[#2B2A2D]/60 to-transparent pointer-events-none z-20"
          aria-hidden="true"
        />

        {/* Subtle Atmospheric Top Badge */}
        <div
          ref={badgeRef}
          className="absolute top-7 sm:top-10 left-1/2 -translate-x-1/2 z-30 pointer-events-none text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141314]/75 backdrop-blur-md border border-[#FCCB1C]/25 shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FCCB1C] animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.22em] text-[#FCCB1C] font-semibold">
              The Mandi Menu
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SCENE 02: SYNCHRONIZED TWO-LAYER COMPOSITION                              */}
        {/* Responsive: On desktop, preserves full 16:9 cinematic framing.            */}
        {/* On mobile, calibrated (w-[145%] left-[-22%]) so the open menu is centered */}
        {/* and comfortably readable while the background logo shines above it.       */}
        {/* ========================================================================= */}
        <div className="relative w-[145%] sm:w-[125%] md:w-full h-full max-w-none left-[-22%] sm:left-[-12%] md:left-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          
          {/* LAYER 1: Full-Screen Restaurant Interior Background */}
          <div
            ref={bgLayerRef}
            className="absolute inset-0 w-full h-full will-change-transform"
          >
            <div
              ref={bgMouseRef}
              className="relative w-full h-full scale-[1.04] will-change-transform"
            >
              <Image
                src="/images/scene-02/restaurant-background.png"
                alt="Mandi Manzil restaurant interior with golden lanterns, arches and Mandi Manzil logo"
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
              />
              {/* Warm Golden Atmosphere Lighting Accent */}
              <div
                className="absolute inset-0 opacity-25 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at 68% 25%, rgba(252, 203, 28, 0.45) 0%, rgba(255, 138, 0, 0.15) 45%, transparent 70%)",
                }}
              />
            </div>
          </div>

          {/* LAYER 2: Transparent Menu Reader Foreground */}
          <div
            ref={readerLayerRef}
            className="absolute inset-0 w-full h-full will-change-transform z-10"
          >
            <div
              ref={readerMouseRef}
              className="relative w-full h-full scale-[1.05] will-change-transform"
            >
              <Image
                src="/images/scene-02/menu-reader.png"
                alt="Arabian gentleman reading the open Mandi Manzil selection menu"
                fill
                priority
                sizes="100vw"
                className="object-cover object-center filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.65)]"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  </div>
</>
);
}
