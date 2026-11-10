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
  const chefRef = useRef<HTMLDivElement>(null);
  const potRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<HTMLDivElement>(null);
  const steamRef = useRef<HTMLDivElement>(null);
  const spicesRef = useRef<HTMLDivElement>(null);

  // Inner tilt refs for device orientation & touch parallax
  const tiltBgRef = useRef<HTMLDivElement>(null);
  const tiltChefRef = useRef<HTMLDivElement>(null);
  const tiltPotRef = useRef<HTMLDivElement>(null);
  const tiltFgRef = useRef<HTMLDivElement>(null);
  const tiltEffectsRef = useRef<HTMLDivElement>(null);

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
        { opacity: 0, scale: 1.03 },
        { opacity: 1, scale: 1.0, duration: 1.1, ease: "power2.out" }
      );

      if (chefRef.current) {
        entranceTl.fromTo(
          chefRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
          "-=0.8"
        );
      }

      if (potRef.current) {
        entranceTl.fromTo(
          potRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" },
          "-=0.9"
        );
      }

      if (fgRef.current) {
        entranceTl.fromTo(
          fgRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
          "-=0.8"
        );
      }

      if (steamRef.current && spicesRef.current) {
        entranceTl.fromTo(
          [steamRef.current, spicesRef.current],
          { opacity: 0 },
          { opacity: 1, duration: 1.2, ease: "power2.out" },
          "-=0.8"
        );
      }

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

      // 2. Ambient subtle floating effects
      if (!prefersReducedMotion) {
        if (steamRef.current) {
          gsap.to(steamRef.current.children, {
            y: "-=12",
            opacity: 0.9,
            scaleY: 1.08,
            stagger: 0.25,
            duration: 3.0,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }

        if (spicesRef.current) {
          gsap.to(spicesRef.current.children, {
            y: "+=14",
            x: "+=4",
            stagger: 0.16,
            duration: 2.6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
      }

      // 3. Compact Mobile Scroll Scrub Timeline
      if (!prefersReducedMotion) {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=950",
            pin: pinTargetRef.current,
            scrub: 0.9,
            anticipatePin: 1,
          },
        });

        scrollTl.to(
          bgRef.current,
          {
            y: -12,
            scale: 1.015,
            ease: "none",
          },
          0
        );

        if (chefRef.current) {
          scrollTl.to(
            chefRef.current,
            {
              y: -10,
              scale: 1.02,
              ease: "none",
            },
            0
          );
        }

        if (potRef.current) {
          scrollTl.to(
            potRef.current,
            {
              y: -8,
              scale: 1.015,
              ease: "none",
            },
            0
          );
        }

        if (steamRef.current) {
          scrollTl.to(
            steamRef.current,
            {
              y: -18,
              opacity: 0.95,
              ease: "none",
            },
            0
          );
        }

        if (spicesRef.current) {
          scrollTl.to(
            spicesRef.current,
            {
              y: 16,
              x: 5,
              ease: "none",
            },
            0
          );
        }

        if (fgRef.current) {
          scrollTl.to(
            fgRef.current,
            {
              y: -6,
              scale: 1.01,
              ease: "none",
            },
            0
          );
        }
      }

      // 4. Mobile Tilt & Touch Parallax
      if (!prefersReducedMotion) {
        const setBgX = gsap.quickTo(tiltBgRef.current, "x", { duration: 1.0, ease: "power2.out" });
        const setBgY = gsap.quickTo(tiltBgRef.current, "y", { duration: 1.0, ease: "power2.out" });

        const setChefX = gsap.quickTo(tiltChefRef.current, "x", { duration: 0.85, ease: "power2.out" });
        const setChefY = gsap.quickTo(tiltChefRef.current, "y", { duration: 0.85, ease: "power2.out" });

        const setPotX = gsap.quickTo(tiltPotRef.current, "x", { duration: 0.85, ease: "power2.out" });
        const setPotY = gsap.quickTo(tiltPotRef.current, "y", { duration: 0.85, ease: "power2.out" });

        const setEffX = gsap.quickTo(tiltEffectsRef.current, "x", { duration: 0.9, ease: "power2.out" });
        const setEffY = gsap.quickTo(tiltEffectsRef.current, "y", { duration: 0.9, ease: "power2.out" });

        const setFgX = gsap.quickTo(tiltFgRef.current, "x", { duration: 0.7, ease: "power2.out" });
        const setFgY = gsap.quickTo(tiltFgRef.current, "y", { duration: 0.7, ease: "power2.out" });

        const clamp = (val: number, min: number, max: number) =>
          Math.min(Math.max(val, min), max);

        // A. Gyroscope Orientation Listener
        const handleOrientation = (e: DeviceOrientationEvent) => {
          if (e.gamma === null || e.beta === null) return;
          setHasTiltActive(true);

          const gamma = clamp(e.gamma, -25, 25);
          const beta = clamp(e.beta - 45, -25, 25);

          const normX = gamma / 25;
          const normY = beta / 25;

          setBgX(normX * -3);
          setBgY(normY * -2);

          setChefX(normX * -8);
          setChefY(normY * -5);

          setPotX(normX * -6);
          setPotY(normY * -4);

          setEffX(normX * -9);
          setEffY(normY * -6);

          setFgX(normX * -12);
          setFgY(normY * -7);
        };

        // B. Touch Parallax Fallback
        const handleTouchMove = (e: TouchEvent) => {
          if (hasTiltActive) return;
          const touch = e.touches[0];
          if (!touch) return;

          const normX = (touch.clientX / window.innerWidth - 0.5) * 2;
          const normY = (touch.clientY / window.innerHeight - 0.5) * 2;

          setBgX(normX * -3);
          setBgY(normY * -2);

          setChefX(normX * -8);
          setChefY(normY * -5);

          setPotX(normX * -6);
          setPotY(normY * -4);

          setEffX(normX * -9);
          setEffY(normY * -6);

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
    }, containerRef);

    return () => ctx.revert();
  }, [hasTiltActive]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#0F0D0E] text-white selection:bg-[#FCCB1C] selection:text-[#141314]"
      aria-label="Scene 03: The Wood-Fired Kitchen (Mobile)"
    >
      <div
        ref={pinTargetRef}
        className="relative w-full h-[100svh] min-h-[580px] overflow-hidden flex items-center justify-center"
      >
        {/* Soft Vignette Gradients */}
        <div
          className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#2B2A2D] via-[#2B2A2D]/50 to-transparent pointer-events-none z-30"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#2B2A2D] via-[#2B2A2D]/50 to-transparent pointer-events-none z-30"
          aria-hidden="true"
        />

        {/* Ambient Top Tag */}
        <div
          ref={badgeRef}
          className="absolute top-5 left-1/2 -translate-x-1/2 z-40 pointer-events-none text-center"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#141314]/85 backdrop-blur-md border border-[#FCCB1C]/25 shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FCCB1C] animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#FCCB1C] font-semibold">
              Scene 03: The Wood-Fired Kitchen
            </span>
          </div>
        </div>

        {/* Atmospheric Mobile Narrative Badge */}
        <div
          ref={captionRef}
          className="absolute bottom-5 inset-x-4 z-40 pointer-events-none text-center"
        >
          <div className="inline-block px-3 py-1.5 rounded-lg bg-[#141314]/80 backdrop-blur-md border border-white/10 shadow-lg">
            <p className="text-[11px] font-serif text-white/90 leading-snug">
              Authentic slow-cooked mandi seasoned over glowing subterranean embers.
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SCENE 03 MOBILE: DELIBERATE RESPONSIVE COMPOSITION                        */}
        {/* ========================================================================= */}
        <div className="relative w-full h-full flex items-center justify-center pointer-events-none select-none overflow-hidden">
          
          {/* LAYER 1: Full Kitchen Background */}
          <div
            ref={bgRef}
            className="absolute inset-0 w-full h-full will-change-transform z-0"
          >
            <div
              ref={tiltBgRef}
              className="relative w-full h-full scale-[1.03] will-change-transform"
            >
              <Image
                src="/images/scene-03/scene-03-kitchen-desktop.webp"
                alt="Wood-fired underground kitchen hearth with warm golden lighting"
                fill
                priority
                sizes="100vw"
                className="object-cover object-[25%_center]"
              />
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at 40% 50%, rgba(252, 203, 28, 0.35) 0%, rgba(255, 138, 0, 0.12) 50%, transparent 75%)",
                }}
              />
            </div>
          </div>

          {/* LAYER 2: Foreground Ingredients & Table Along Lower Screen */}
          <div
            ref={fgRef}
            className="absolute inset-x-0 bottom-0 w-full h-[28%] will-change-transform z-20 flex items-end justify-center pointer-events-none"
          >
            <div
              ref={tiltFgRef}
              className="relative w-full h-full scale-[1.02] will-change-transform flex items-end justify-center"
            >
              <Image
                src="/images/scene-03/02-foreground-ingredients-and-table.webp"
                alt="Foreground ingredients and feasting table spread"
                fill
                priority
                sizes="100vw"
                className="object-contain object-bottom filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)]"
              />
            </div>
          </div>

          {/* LAYER 3: Mandi Rice Pot on Counter */}
          <div
            ref={potRef}
            className="absolute left-[33%] top-[49%] w-[54%] aspect-[2172/724] will-change-transform z-10 flex items-center justify-center pointer-events-none"
          >
            <div
              ref={tiltPotRef}
              className="relative w-full h-full will-change-transform"
            >
              <div
                className="absolute -bottom-1.5 left-[8%] right-[8%] h-4 bg-[#0a0502]/80 rounded-full blur-[6px] pointer-events-none"
                aria-hidden="true"
              />
              <Image
                src="/images/scene-03/03-separate-mandi-rice-pot.webp"
                alt="Isolated authentic Mandi rice pot degh"
                fill
                priority
                sizes="60vw"
                className="object-contain object-bottom filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.65)]"
              />
            </div>
          </div>

          {/* LAYER 4: Chef Sprinkling Spices (Visible Upper Body, Hand & Bowl) */}
          <div
            ref={chefRef}
            className="absolute -left-[14%] top-[18%] w-[112%] h-[56%] will-change-transform z-15 pointer-events-none"
          >
            <div
              ref={tiltChefRef}
              className="relative w-full h-full will-change-transform"
            >
              <Image
                src="/images/scene-03/scene-03-chef-sprinkling-spices.webp"
                alt="Arabian chef sprinkling spices over the mandi rice pot"
                fill
                priority
                sizes="110vw"
                className="object-contain object-bottom filter drop-shadow-[0_14px_28px_rgba(0,0,0,0.55)]"
              />
            </div>
          </div>

          {/* LAYER 5: Falling Spices & Rising Steam */}
          <div
            ref={tiltEffectsRef}
            className="absolute left-[54%] top-[39%] w-[26%] h-[22%] will-change-transform z-16 pointer-events-none"
          >
            {/* 5A: Rising Steam Wisps */}
            <div
              ref={steamRef}
              className="absolute inset-0 flex items-end justify-center pointer-events-none"
            >
              <div className="w-6 h-16 bg-gradient-to-t from-white/35 via-white/15 to-transparent rounded-full blur-[8px] transform -translate-y-3" />
              <div className="w-8 h-18 bg-gradient-to-t from-white/30 via-white/10 to-transparent rounded-full blur-[9px] transform -translate-y-5 -translate-x-2" />
            </div>

            {/* 5B: Falling Spices Particles */}
            <div
              ref={spicesRef}
              className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-20 pointer-events-none"
            >
              <span className="absolute top-1 left-2 w-1.5 h-1.5 rounded-full bg-[#FCCB1C] opacity-90 blur-[0.5px]" />
              <span className="absolute top-4 left-4 w-1 h-1 rounded-full bg-[#E08A24] opacity-80" />
              <span className="absolute top-7 left-1.5 w-1.5 h-1 rounded-full bg-[#FCCB1C] opacity-85" />
              <span className="absolute top-10 left-4.5 w-1 h-1.5 rounded-full bg-[#C83E1A] opacity-75" />
              <span className="absolute top-13 left-3 w-1.5 h-1 rounded-full bg-[#E08A24] opacity-80" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
