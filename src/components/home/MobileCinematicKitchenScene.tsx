"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function MobileCinematicKitchenScene() {
  const containerRef = useRef<HTMLElement>(null);
  const pinTargetRef = useRef<HTMLDivElement>(null);

  // Layer containers for scroll animation
  const bgRef = useRef<HTMLDivElement>(null);
  const potRef = useRef<HTMLDivElement>(null);
  const steamRef = useRef<HTMLDivElement>(null);
  const spicesRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<HTMLDivElement>(null);

  // Inner tilt refs for device orientation & touch parallax
  const tiltBgRef = useRef<HTMLDivElement>(null);
  const tiltPotRef = useRef<HTMLDivElement>(null);
  const tiltFgRef = useRef<HTMLDivElement>(null);

  // Atmospheric top badge & caption
  const badgeRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);

  const [hasTiltActive, setHasTiltActive] = useState(false);

  useEffect(() => {
    // Only run on mobile viewports (< 768px)
    if (typeof window === "undefined" || window.innerWidth >= 768) return;

    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      // 1. Initial entrance animation
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          once: true,
        },
      });

      entranceTl.fromTo(
        bgRef.current,
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1.0, duration: 1.1, ease: "power2.out" }
      );

      entranceTl.fromTo(
        potRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
        "-=0.8"
      );

      entranceTl.fromTo(
        [steamRef.current, spicesRef.current],
        { opacity: 0 },
        { opacity: 1, duration: 1.3, ease: "power2.out" },
        "-=0.9"
      );

      entranceTl.fromTo(
        fgRef.current,
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
        "-=0.8"
      );

      if (badgeRef.current) {
        entranceTl.fromTo(
          badgeRef.current,
          { opacity: 0, y: -12 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.7"
        );
      }

      if (captionRef.current) {
        entranceTl.fromTo(
          captionRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.6"
        );
      }

      // 2. Ambient subtle floating effects (Requirement 6 & 7)
      if (!prefersReducedMotion) {
        if (steamRef.current) {
          gsap.to(steamRef.current, {
            y: "-=14",
            opacity: 0.95,
            scale: 1.02,
            duration: 3.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }

        if (spicesRef.current) {
          gsap.to(spicesRef.current, {
            y: "+=12",
            x: "+=5",
            duration: 4.0,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
      }

      // 3. Mobile Pinned Scroll-Story Timeline
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

        // Background glides subtly upward for depth
        scrollTl.to(bgRef.current, { y: -20, scale: 1.02, ease: "none" }, 0);

        // Rice pot scales up slightly for central visual focus
        scrollTl.to(potRef.current, { scale: 1.05, y: -12, ease: "none" }, 0);

        // Steam lifts upward
        if (steamRef.current) {
          scrollTl.to(steamRef.current, { y: -30, opacity: 0.95, ease: "none" }, 0);
        }

        // Foreground ingredients glide subtly
        scrollTl.to(fgRef.current, { y: -8, ease: "none" }, 0);
      }
    }, containerRef);

    // 4. Device Orientation Tilt with Smooth Clamped Interpolation & Touch Fallback
    if (!prefersReducedMotion && typeof window !== "undefined") {
      const setBgX = gsap.quickTo(tiltBgRef.current, "x", { duration: 1.2, ease: "power2.out" });
      const setBgY = gsap.quickTo(tiltBgRef.current, "y", { duration: 1.2, ease: "power2.out" });

      const setPotX = gsap.quickTo(tiltPotRef.current, "x", { duration: 0.8, ease: "power2.out" });
      const setPotY = gsap.quickTo(tiltPotRef.current, "y", { duration: 0.8, ease: "power2.out" });

      const setFgX = gsap.quickTo(tiltFgRef.current, "x", { duration: 0.7, ease: "power2.out" });
      const setFgY = gsap.quickTo(tiltFgRef.current, "y", { duration: 0.7, ease: "power2.out" });

      let orientationFired = false;

      const handleOrientation = (e: DeviceOrientationEvent) => {
        if (e.gamma === null || e.beta === null) return;
        if (!orientationFired) {
          orientationFired = true;
          setHasTiltActive(true);
        }

        const normX = Math.max(-1, Math.min(1, (e.gamma || 0) / 30));
        const normY = Math.max(-1, Math.min(1, ((e.beta || 0) - 45) / 30));

        setBgX(normX * -5);
        setBgY(normY * -3);

        setPotX(normX * -9);
        setPotY(normY * -6);

        setFgX(normX * -14);
        setFgY(normY * -8);
      };

      const handleTouchMove = (e: TouchEvent) => {
        if (orientationFired || e.touches.length === 0) return;
        const touch = e.touches[0];
        const normX = (touch.clientX / window.innerWidth - 0.5) * 2;
        const normY = (touch.clientY / window.innerHeight - 0.5) * 2;

        setBgX(normX * -4);
        setBgY(normY * -2);

        setPotX(normX * -8);
        setPotY(normY * -5);

        setFgX(normX * -12);
        setFgY(normY * -7);
      };

      if (window.DeviceOrientationEvent) {
        window.addEventListener("deviceorientation", handleOrientation, { passive: true });
      }
      window.addEventListener("touchmove", handleTouchMove, { passive: true });

      return () => {
        if (window.DeviceOrientationEvent) {
          window.removeEventListener("deviceorientation", handleOrientation);
        }
        window.removeEventListener("touchmove", handleTouchMove);
      };
    }

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#0F0D0E] text-white selection:bg-[#FCCB1C] selection:text-[#141314]"
      aria-label="Scene 03: The Wood-Fired Kitchen (Mobile)"
    >
      <div
        ref={pinTargetRef}
        className="relative w-full h-[100svh] min-h-[560px] overflow-hidden flex items-center justify-center"
      >
        {/* Soft Vignette Gradients */}
        <div
          className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#2B2A2D] via-[#2B2A2D]/60 to-transparent pointer-events-none z-30"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#2B2A2D] via-[#2B2A2D]/60 to-transparent pointer-events-none z-30"
          aria-hidden="true"
        />

        {/* Atmospheric Top Badge */}
        <div
          ref={badgeRef}
          className="absolute top-6 left-1/2 -translate-x-1/2 z-40 pointer-events-none text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141314]/85 backdrop-blur-md border border-[#FCCB1C]/25 shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FCCB1C] animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#FCCB1C] font-semibold">
              The Wood-Fired Kitchen
            </span>
          </div>
        </div>

        {/* Story Caption Overlay at Bottom */}
        <div
          ref={captionRef}
          className="absolute bottom-8 left-4 right-4 z-40 pointer-events-none text-center"
        >
          <div className="inline-block px-4 py-2.5 rounded-xl bg-[#141314]/80 backdrop-blur-md border border-white/10 max-w-xs mx-auto shadow-2xl">
            <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#FCCB1C] mb-0.5 font-semibold">
              Slow-Cooked Wood-Fired Mandi
            </p>
            <p className="text-[11px] font-serif text-white/90 leading-snug font-light">
              Subterranean clay oven embers infusing aromatic basmati and slow-cooked spices.
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SCENE 03 MOBILE: CAREFULLY CROPPED RESPONSIVE COMPOSITION                 */}
        {/* Calibrated (w-[160%] left-[-30%]) to center on the pot & hearth          */}
        {/* ========================================================================= */}
        <div className="relative w-[160%] h-full max-w-none left-[-30%] flex items-center justify-center pointer-events-none select-none overflow-hidden">
          
          {/* LAYER 1: Full-Scene Kitchen Background */}
          <div
            ref={bgRef}
            className="absolute inset-0 w-full h-full will-change-transform z-0"
          >
            <div
              ref={tiltBgRef}
              className="relative w-full h-full scale-[1.05] will-change-transform"
            >
              <Image
                src="/images/scene-03/01-kitchen-scene-composite.webp"
                alt="Wood-fired underground kitchen hearth with warm golden lighting"
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
              />
              <div
                className="absolute inset-0 opacity-25 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, rgba(252, 203, 28, 0.40) 0%, rgba(255, 138, 0, 0.15) 50%, transparent 75%)",
                }}
              />
            </div>
          </div>

          {/* LAYER 2: Isolated Rice Pot Layer (Requirement 4) */}
          <div
            ref={potRef}
            className="absolute inset-0 w-full h-full will-change-transform z-10 flex items-center justify-center"
          >
            <div
              ref={tiltPotRef}
              className="relative w-full h-full scale-[1.03] will-change-transform flex items-center justify-center"
            >
              <Image
                src="/images/scene-03/03-separate-mandi-rice-pot.webp"
                alt="Isolated authentic Mandi rice pot degh"
                fill
                priority
                sizes="100vw"
                className="object-contain object-center filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.65)]"
              />
            </div>
          </div>

          {/* LAYER 3A: Rising Steam Overlay (Requirement 7) */}
          <div
            ref={steamRef}
            className="absolute inset-0 w-full h-full will-change-transform z-15 pointer-events-none"
          >
            <div className="relative w-full h-full will-change-transform flex items-center justify-center mix-blend-screen opacity-85">
              <Image
                src="/images/scene-03/05-falling-spices-and-steam.webp"
                alt="Rising steam wisps from mandi hearth"
                fill
                priority
                sizes="100vw"
                className="object-contain object-center scale-[1.02]"
              />
            </div>
          </div>

          {/* LAYER 3B: Falling Spices Overlay (Requirement 6) */}
          <div
            ref={spicesRef}
            className="absolute inset-0 w-full h-full will-change-transform z-16 pointer-events-none"
          >
            <div className="relative w-full h-full will-change-transform flex items-center justify-center mix-blend-screen opacity-90">
              <Image
                src="/images/scene-03/05-falling-spices-and-steam.webp"
                alt="Falling aromatic mandi spices drifting over the pot"
                fill
                priority
                sizes="100vw"
                className="object-contain object-center scale-[1.04]"
              />
            </div>
          </div>

          {/* LAYER 4: Foreground Ingredients & Table (Requirement 3) */}
          <div
            ref={fgRef}
            className="absolute inset-0 w-full h-full will-change-transform z-20 flex items-end justify-center"
          >
            <div
              ref={tiltFgRef}
              className="relative w-full h-full scale-[1.02] will-change-transform flex items-end justify-center"
            >
              <Image
                src="/images/scene-03/02-foreground-ingredients-and-table.webp"
                alt="Foreground ingredients and feasting table"
                fill
                priority
                sizes="100vw"
                className="object-contain object-bottom filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)]"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
