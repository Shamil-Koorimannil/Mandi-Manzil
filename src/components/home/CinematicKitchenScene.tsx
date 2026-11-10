"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MobileCinematicKitchenScene } from "./MobileCinematicKitchenScene";

export function CinematicKitchenScene() {
  const containerRef = useRef<HTMLElement>(null);
  const pinTargetRef = useRef<HTMLDivElement>(null);

  // Layer containers for entrance & scroll animations
  const bgLayerRef = useRef<HTMLDivElement>(null);
  const potLayerRef = useRef<HTMLDivElement>(null);
  const rackLayerRef = useRef<HTMLDivElement>(null);
  const steamLayerRef = useRef<HTMLDivElement>(null);
  const spicesLayerRef = useRef<HTMLDivElement>(null);
  const fgLayerRef = useRef<HTMLDivElement>(null);

  // Inner wrappers for independent mouse parallax
  const bgMouseRef = useRef<HTMLDivElement>(null);
  const potMouseRef = useRef<HTMLDivElement>(null);
  const rackMouseRef = useRef<HTMLDivElement>(null);
  const effectsMouseRef = useRef<HTMLDivElement>(null);
  const fgMouseRef = useRef<HTMLDivElement>(null);

  // Atmospheric UI references
  const badgeRef = useRef<HTMLDivElement>(null);
  const storyCardRef = useRef<HTMLDivElement>(null);

  // Requirement 5: Use the rack-and-pot reference only as an alternative
  // until a rack-only asset is available. Never layer together with separate rice pot.
  const [useRackAlt, setUseRackAlt] = useState(false);

  useEffect(() => {
    // Only initialize desktop timeline on desktop/tablet viewports (>= 768px)
    if (typeof window === "undefined" || window.innerWidth < 768) return;

    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      // 1. Initial entrance animation: triggered when scene enters viewport
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          once: true,
        },
      });

      // Fade in kitchen composite background
      entranceTl.fromTo(
        bgLayerRef.current,
        { opacity: 0, scale: 1.04 },
        { opacity: 1, scale: 1.0, duration: 1.2, ease: "power2.out" }
      );

      // Bring isolated rice pot (or rack reference) into view with smooth upward glide
      const activeMidLayer = useRackAlt ? rackLayerRef.current : potLayerRef.current;
      if (activeMidLayer) {
        entranceTl.fromTo(
          activeMidLayer,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 1.3, ease: "power3.out" },
          "-=0.9"
        );
      }

      // Fade in steam & spices effects overlay
      entranceTl.fromTo(
        [steamLayerRef.current, spicesLayerRef.current],
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1.0, duration: 1.4, ease: "power2.out" },
        "-=1.0"
      );

      // Bring foreground table and ingredients into view
      entranceTl.fromTo(
        fgLayerRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.3, ease: "power3.out" },
        "-=0.9"
      );

      // Bring atmospheric badge & story card into view
      if (badgeRef.current) {
        entranceTl.fromTo(
          badgeRef.current,
          { opacity: 0, y: -15 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.8"
        );
      }
      if (storyCardRef.current) {
        entranceTl.fromTo(
          storyCardRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" },
          "-=0.7"
        );
      }

      // 2. Continuous ambient effects (Requirement 6 & 7)
      if (!prefersReducedMotion) {
        // Requirement 7: Animate steam slowly upward using subtle opacity and scale changes
        if (steamLayerRef.current) {
          gsap.to(steamLayerRef.current, {
            y: "-=18",
            opacity: 0.95,
            scale: 1.03,
            duration: 3.6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }

        // Requirement 6: Animate falling spices gently downward with slight horizontal drift
        if (spicesLayerRef.current) {
          gsap.to(spicesLayerRef.current, {
            y: "+=16",
            x: "+=7",
            duration: 4.4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
      }

      // 3. Pinned scroll scrub timeline (integrated with GSAP ScrollTrigger)
      if (!prefersReducedMotion) {
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

        // Rice pot / midground: scales slightly and glides upward for cinematic depth
        const midTarget = useRackAlt ? rackLayerRef.current : potLayerRef.current;
        if (midTarget) {
          scrollTl.to(
            midTarget,
            {
              scale: 1.06,
              y: -18,
              ease: "none",
            },
            0
          );
        }

        // Steam lifts further upward as scroll progresses
        if (steamLayerRef.current) {
          scrollTl.to(
            steamLayerRef.current,
            {
              y: -36,
              scale: 1.05,
              opacity: 0.95,
              ease: "none",
            },
            0
          );
        }

        // Spices drift downward as heat rises
        if (spicesLayerRef.current) {
          scrollTl.to(
            spicesLayerRef.current,
            {
              y: 24,
              x: 10,
              ease: "none",
            },
            0
          );
        }

        // Foreground table & ingredients: subtle depth shift
        scrollTl.to(
          fgLayerRef.current,
          {
            y: -10,
            scale: 1.02,
            ease: "none",
          },
          0
        );
      }

      // 4. Mouse Movement Parallax
      if (!prefersReducedMotion && typeof window !== "undefined") {
        const setBgX = gsap.quickTo(bgMouseRef.current, "x", { duration: 1.3, ease: "power2.out" });
        const setBgY = gsap.quickTo(bgMouseRef.current, "y", { duration: 1.3, ease: "power2.out" });

        const setPotX = gsap.quickTo(potMouseRef.current, "x", { duration: 1.0, ease: "power2.out" });
        const setPotY = gsap.quickTo(potMouseRef.current, "y", { duration: 1.0, ease: "power2.out" });

        const setRackX = gsap.quickTo(rackMouseRef.current, "x", { duration: 1.0, ease: "power2.out" });
        const setRackY = gsap.quickTo(rackMouseRef.current, "y", { duration: 1.0, ease: "power2.out" });

        const setEffX = gsap.quickTo(effectsMouseRef.current, "x", { duration: 1.1, ease: "power2.out" });
        const setEffY = gsap.quickTo(effectsMouseRef.current, "y", { duration: 1.1, ease: "power2.out" });

        const setFgX = gsap.quickTo(fgMouseRef.current, "x", { duration: 0.85, ease: "power2.out" });
        const setFgY = gsap.quickTo(fgMouseRef.current, "y", { duration: 0.85, ease: "power2.out" });

        const handleMouseMove = (e: MouseEvent) => {
          const rect = containerRef.current?.getBoundingClientRect();
          if (!rect || rect.bottom < -100 || rect.top > window.innerHeight + 100) return;

          const normX = (e.clientX / window.innerWidth - 0.5) * 2;
          const normY = (e.clientY / window.innerHeight - 0.5) * 2;

          // Subtle physical displacement calibrated by depth layer
          setBgX(normX * -6);
          setBgY(normY * -4);

          setPotX(normX * -12);
          setPotY(normY * -8);

          setRackX(normX * -12);
          setRackY(normY * -8);

          setEffX(normX * -15);
          setEffY(normY * -9);

          setFgX(normX * -18);
          setFgY(normY * -11);
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });

        return () => {
          window.removeEventListener("mousemove", handleMouseMove);
        };
      }
    }, containerRef);

    return () => ctx.revert();
  }, [useRackAlt]);

  return (
    <>
      {/* 1. Dedicated Mobile Scene 03 (Screens < 768px with responsive crop & orientation tilt) */}
      <div className="block md:hidden">
        <MobileCinematicKitchenScene />
      </div>

      {/* 2. Master Desktop Scene 03 (Screens >= 768px, full side-view kitchen composition) */}
      <div className="hidden md:block">
        <section
          ref={containerRef}
          className="relative w-full bg-[#0F0D0E] text-white selection:bg-[#FCCB1C] selection:text-[#141314]"
          aria-label="Scene 03: The Wood-Fired Kitchen"
        >
          {/* Pinned Stage Container (Locks 100svh during scroll) */}
          <div
            ref={pinTargetRef}
            className="relative w-full h-[100svh] min-h-[620px] overflow-hidden flex items-center justify-center"
          >
            {/* Soft Vignette Gradients for Flawless Narrative Transitions */}
            <div
              className="absolute top-0 left-0 right-0 h-28 sm:h-36 bg-gradient-to-b from-[#2B2A2D] via-[#2B2A2D]/60 to-transparent pointer-events-none z-30"
              aria-hidden="true"
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-28 sm:h-36 bg-gradient-to-t from-[#2B2A2D] via-[#2B2A2D]/60 to-transparent pointer-events-none z-30"
              aria-hidden="true"
            />

            {/* Subtle Atmospheric Top Badge */}
            <div
              ref={badgeRef}
              className="absolute top-7 sm:top-10 left-1/2 -translate-x-1/2 z-40 pointer-events-none text-center"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141314]/80 backdrop-blur-md border border-[#FCCB1C]/25 shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FCCB1C] animate-pulse" />
                <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.22em] text-[#FCCB1C] font-semibold">
                  Scene 03: The Wood-Fired Kitchen
                </span>
              </div>
            </div>

            {/* Subtle Narrative Story Card in Lower-Left */}
            <div
              ref={storyCardRef}
              className="absolute bottom-10 left-8 md:left-14 z-40 pointer-events-none max-w-sm"
            >
              <div className="px-4 py-3 rounded-xl bg-[#141314]/75 backdrop-blur-md border border-white/10 shadow-2xl">
                <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#FCCB1C] mb-1 font-semibold">
                  Authentic Wood-Fired Preparation
                </p>
                <p className="text-xs md:text-sm font-serif text-white/90 leading-relaxed font-light">
                  Slow-cooked within subterranean clay ovens over natural wood embers, releasing fragrant cardamoms, cloves, and rich juices into the aged basmati pot.
                </p>
              </div>
            </div>

            {/* Alternative Rack-and-Pot Reference Toggle (Requirement 5) */}
            <div className="absolute top-8 right-8 z-40 hidden lg:block">
              <button
                type="button"
                onClick={() => setUseRackAlt(!useRackAlt)}
                className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141314]/80 hover:bg-[#1a191a] backdrop-blur-md border border-white/15 hover:border-[#FCCB1C]/40 text-[10px] font-mono uppercase tracking-[0.16em] text-white/70 hover:text-[#FCCB1C] transition-all shadow-md cursor-pointer pointer-events-auto"
                title={
                  useRackAlt
                    ? "Currently showing combined rack-and-pot reference"
                    : "Switch to view alternative combined rack-and-pot reference"
                }
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    useRackAlt ? "bg-[#FCCB1C]" : "bg-white/40"
                  }`}
                />
                <span>
                  {useRackAlt ? "Rack Reference Active" : "View Rack Ref"}
                </span>
              </button>
            </div>

            {/* ========================================================================= */}
            {/* SCENE 03: MULTI-LAYER COMPOSITION (Cinematic Desktop Framing)             */}
            {/* ========================================================================= */}
            <div className="relative w-full h-full max-w-[1920px] mx-auto flex items-center justify-center pointer-events-none select-none overflow-hidden">
              
              {/* LAYER 1: Full Kitchen Scene Composite Background */}
              <div
                ref={bgLayerRef}
                className="absolute inset-0 w-full h-full will-change-transform z-0"
              >
                <div
                  ref={bgMouseRef}
                  className="relative w-full h-full scale-[1.04] will-change-transform"
                >
                  <Image
                    src="/images/scene-03/01-kitchen-scene-composite.webp"
                    alt="Mandi Manzil wood-fired underground kitchen hearth with golden lighting, stone walls, and copper utensils"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center"
                  />
                  {/* Warm Golden Arabian Atmosphere Lighting Accent */}
                  <div
                    className="absolute inset-0 opacity-25 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 50%, rgba(252, 203, 28, 0.40) 0%, rgba(255, 138, 0, 0.15) 50%, transparent 75%)",
                    }}
                  />
                </div>
              </div>

              {/* LAYER 2A: Isolated Rice Pot (Default Primary Layer - Requirement 4) */}
              {!useRackAlt && (
                <div
                  ref={potLayerRef}
                  className="absolute inset-0 w-full h-full will-change-transform z-10 flex items-center justify-center"
                >
                  <div
                    ref={potMouseRef}
                    className="relative w-full h-full scale-[1.03] will-change-transform flex items-center justify-center"
                  >
                    <Image
                      src="/images/scene-03/03-separate-mandi-rice-pot.webp"
                      alt="Isolated authentic Mandi rice pot degh seasoned with spices"
                      fill
                      priority
                      sizes="100vw"
                      className="object-contain object-center filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.65)]"
                    />
                  </div>
                </div>
              )}

              {/* LAYER 2B: Alternative Rack & Pot Reference (Requirement 5 - Never with pot) */}
              {useRackAlt && (
                <div
                  ref={rackLayerRef}
                  className="absolute inset-0 w-full h-full will-change-transform z-10 flex items-center justify-center"
                >
                  <div
                    ref={rackMouseRef}
                    className="relative w-full h-full scale-[1.03] will-change-transform flex items-center justify-center"
                  >
                    <Image
                      src="/images/scene-03/04-rack-chicken-and-pot-reference.webp"
                      alt="Alternative reference: roasting chicken rack hanging above the rice pot"
                      fill
                      priority
                      sizes="100vw"
                      className="object-contain object-center filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.65)]"
                    />
                  </div>
                </div>
              )}

              {/* LAYER 3A: Rising Steam Effect (Requirement 7: subtle upward opacity & scale) */}
              <div
                ref={steamLayerRef}
                className="absolute inset-0 w-full h-full will-change-transform z-15 pointer-events-none"
              >
                <div
                  ref={effectsMouseRef}
                  className="relative w-full h-full will-change-transform flex items-center justify-center mix-blend-screen opacity-85"
                >
                  <Image
                    src="/images/scene-03/05-falling-spices-and-steam.webp"
                    alt="Rising steam wisps from wood-fired mandi hearth"
                    fill
                    priority
                    sizes="100vw"
                    className="object-contain object-center scale-[1.02]"
                  />
                </div>
              </div>

              {/* LAYER 3B: Falling Spices Drift Effect (Requirement 6: gentle downward & horizontal drift) */}
              <div
                ref={spicesLayerRef}
                className="absolute inset-0 w-full h-full will-change-transform z-16 pointer-events-none"
              >
                <div className="relative w-full h-full will-change-transform flex items-center justify-center mix-blend-screen opacity-90">
                  <Image
                    src="/images/scene-03/05-falling-spices-and-steam.webp"
                    alt="Falling ground coriander, cloves, and cardamom spices drifting above the pot"
                    fill
                    priority
                    sizes="100vw"
                    className="object-contain object-center scale-[1.04]"
                  />
                </div>
              </div>

              {/* LAYER 4: Foreground Ingredients & Feasting Table (Requirement 3: one layer) */}
              <div
                ref={fgLayerRef}
                className="absolute inset-0 w-full h-full will-change-transform z-20 flex items-end justify-center"
              >
                <div
                  ref={fgMouseRef}
                  className="relative w-full h-full scale-[1.02] will-change-transform flex items-end justify-center"
                >
                  <Image
                    src="/images/scene-03/02-foreground-ingredients-and-table.webp"
                    alt="Foreground wooden table spread with whole Arabian spices, sliced lemons, garlic, and fresh mandi seasonings"
                    fill
                    priority
                    sizes="100vw"
                    className="object-contain object-bottom filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.85)]"
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
