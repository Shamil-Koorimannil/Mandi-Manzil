"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MobileCinematicKitchenScene } from "./MobileCinematicKitchenScene";

export function CinematicKitchenScene() {
  const containerRef = useRef<HTMLElement>(null);
  const pinTargetRef = useRef<HTMLDivElement>(null);

  // Layer containers for entrance & scroll animations
  const bgLayerRef = useRef<HTMLDivElement>(null);
  const chefLayerRef = useRef<HTMLDivElement>(null);
  const potLayerRef = useRef<HTMLDivElement>(null);
  const fgLayerRef = useRef<HTMLDivElement>(null);
  const steamContainerRef = useRef<HTMLDivElement>(null);
  const spicesContainerRef = useRef<HTMLDivElement>(null);

  // Inner wrappers for independent mouse parallax
  const bgMouseRef = useRef<HTMLDivElement>(null);
  const chefMouseRef = useRef<HTMLDivElement>(null);
  const potMouseRef = useRef<HTMLDivElement>(null);
  const fgMouseRef = useRef<HTMLDivElement>(null);
  const effectsMouseRef = useRef<HTMLDivElement>(null);

  // Atmospheric UI references
  const badgeRef = useRef<HTMLDivElement>(null);
  const storyCardRef = useRef<HTMLDivElement>(null);

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

      // Fade in kitchen composite background (wide cinematic view)
      entranceTl.fromTo(
        bgLayerRef.current,
        { opacity: 0, scale: 1.02 },
        { opacity: 1, scale: 1.0, duration: 1.2, ease: "power2.out" }
      );

      // Bring chef into view with smooth subtle upward glide
      if (chefLayerRef.current) {
        entranceTl.fromTo(
          chefLayerRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.3, ease: "power3.out" },
          "-=0.9"
        );
      }

      // Bring rice pot into view, settling onto counter
      if (potLayerRef.current) {
        entranceTl.fromTo(
          potLayerRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
          "-=1.0"
        );
      }

      // Bring foreground table and ingredients into view
      if (fgLayerRef.current) {
        entranceTl.fromTo(
          fgLayerRef.current,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 1.3, ease: "power3.out" },
          "-=0.9"
        );
      }

      // Fade in steam & spices effects
      if (steamContainerRef.current && spicesContainerRef.current) {
        entranceTl.fromTo(
          [steamContainerRef.current, spicesContainerRef.current],
          { opacity: 0 },
          { opacity: 1, duration: 1.4, ease: "power2.out" },
          "-=0.8"
        );
      }

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

      // 2. Continuous ambient effects (Falling Spices & Rising Steam)
      if (!prefersReducedMotion) {
        // Continuous gentle steam rise
        if (steamContainerRef.current) {
          gsap.to(steamContainerRef.current.children, {
            y: "-=18",
            opacity: 0.9,
            scaleY: 1.1,
            stagger: 0.25,
            duration: 3.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }

        // Continuous gentle spice drift
        if (spicesContainerRef.current) {
          gsap.to(spicesContainerRef.current.children, {
            y: "+=16",
            x: "+=5",
            stagger: 0.18,
            duration: 2.8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
      }

      // 3. Restrained Pinned Scroll Timeline (GSAP ScrollTrigger)
      // "Do not make the layers move so far that their alignment breaks. Do not use dramatic zoom-in effects."
      if (!prefersReducedMotion) {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=1400",
            pin: pinTargetRef.current,
            scrub: 1.0,
            anticipatePin: 1,
          },
        });

        // Background: very subtle restrained movement (retains full kitchen overview)
        scrollTl.to(
          bgLayerRef.current,
          {
            y: -14,
            scale: 1.015,
            ease: "none",
          },
          0
        );

        // Chef: subtle depth movement
        if (chefLayerRef.current) {
          scrollTl.to(
            chefLayerRef.current,
            {
              y: -12,
              scale: 1.025,
              ease: "none",
            },
            0
          );
        }

        // Pot on work surface: subtle depth shift aligned with counter
        if (potLayerRef.current) {
          scrollTl.to(
            potLayerRef.current,
            {
              y: -10,
              scale: 1.02,
              ease: "none",
            },
            0
          );
        }

        // Steam gently lifts as scroll progresses
        if (steamContainerRef.current) {
          scrollTl.to(
            steamContainerRef.current,
            {
              y: -24,
              opacity: 0.95,
              ease: "none",
            },
            0
          );
        }

        // Spices drift downward as heat rises
        if (spicesContainerRef.current) {
          scrollTl.to(
            spicesContainerRef.current,
            {
              y: 20,
              x: 6,
              ease: "none",
            },
            0
          );
        }

        // Foreground table & ingredients: restrained foreground shift
        if (fgLayerRef.current) {
          scrollTl.to(
            fgLayerRef.current,
            {
              y: -8,
              scale: 1.015,
              ease: "none",
            },
            0
          );
        }
      }

      // 4. Subtle Mouse Movement Parallax
      if (!prefersReducedMotion && typeof window !== "undefined") {
        const setBgX = gsap.quickTo(bgMouseRef.current, "x", { duration: 1.3, ease: "power2.out" });
        const setBgY = gsap.quickTo(bgMouseRef.current, "y", { duration: 1.3, ease: "power2.out" });

        const setChefX = gsap.quickTo(chefMouseRef.current, "x", { duration: 1.0, ease: "power2.out" });
        const setChefY = gsap.quickTo(chefMouseRef.current, "y", { duration: 1.0, ease: "power2.out" });

        const setPotX = gsap.quickTo(potMouseRef.current, "x", { duration: 1.0, ease: "power2.out" });
        const setPotY = gsap.quickTo(potMouseRef.current, "y", { duration: 1.0, ease: "power2.out" });

        const setEffX = gsap.quickTo(effectsMouseRef.current, "x", { duration: 1.1, ease: "power2.out" });
        const setEffY = gsap.quickTo(effectsMouseRef.current, "y", { duration: 1.1, ease: "power2.out" });

        const setFgX = gsap.quickTo(fgMouseRef.current, "x", { duration: 0.85, ease: "power2.out" });
        const setFgY = gsap.quickTo(fgMouseRef.current, "y", { duration: 0.85, ease: "power2.out" });

        const handleMouseMove = (e: MouseEvent) => {
          const rect = containerRef.current?.getBoundingClientRect();
          if (!rect || rect.bottom < -100 || rect.top > window.innerHeight + 100) return;

          const normX = (e.clientX / window.innerWidth - 0.5) * 2;
          const normY = (e.clientY / window.innerHeight - 0.5) * 2;

          // Restrained physical displacement calibrated by depth layer
          setBgX(normX * -5);
          setBgY(normY * -3);

          setChefX(normX * -10);
          setChefY(normY * -6);

          setPotX(normX * -8);
          setPotY(normY * -5);

          setEffX(normX * -12);
          setEffY(normY * -7);

          setFgX(normX * -16);
          setFgY(normY * -9);
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
      {/* 1. Dedicated Mobile Scene 03 (Screens < 768px with deliberate responsive composition) */}
      <div className="block md:hidden">
        <MobileCinematicKitchenScene />
      </div>

      {/* 2. Master Desktop Scene 03 (Screens >= 768px, wide 16:9 cinematic kitchen composition) */}
      <div className="hidden md:block">
        <section
          ref={containerRef}
          className="relative w-full bg-[#0F0D0E] text-white selection:bg-[#FCCB1C] selection:text-[#141314]"
          aria-label="Scene 03: The Wood-Fired Kitchen"
        >
          {/* Pinned Stage Container (Locks 100svh during scroll) */}
          <div
            ref={pinTargetRef}
            className="relative w-full h-[100svh] min-h-[640px] max-h-[1080px] overflow-hidden flex items-center justify-center"
          >
            {/* Soft Vignette Gradients for Flawless Narrative Transitions */}
            <div
              className="absolute top-0 left-0 right-0 h-24 lg:h-32 bg-gradient-to-b from-[#2B2A2D] via-[#2B2A2D]/50 to-transparent pointer-events-none z-30"
              aria-hidden="true"
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-24 lg:h-32 bg-gradient-to-t from-[#2B2A2D] via-[#2B2A2D]/50 to-transparent pointer-events-none z-30"
              aria-hidden="true"
            />

            {/* Subtle Atmospheric Top Badge */}
            <div
              ref={badgeRef}
              className="absolute top-7 sm:top-9 left-1/2 -translate-x-1/2 z-40 pointer-events-none text-center"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#141314]/85 backdrop-blur-md border border-[#FCCB1C]/25 shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FCCB1C] animate-pulse" />
                <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.22em] text-[#FCCB1C] font-semibold">
                  Scene 03: The Wood-Fired Kitchen
                </span>
              </div>
            </div>

            {/* Subtle Narrative Story Card in Lower-Left */}
            <div
              ref={storyCardRef}
              className="absolute bottom-8 left-8 lg:left-14 z-40 pointer-events-none max-w-sm"
            >
              <div className="px-4 py-3 rounded-xl bg-[#141314]/80 backdrop-blur-md border border-white/10 shadow-2xl">
                <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#FCCB1C] mb-1 font-semibold">
                  Authentic Wood-Fired Preparation
                </p>
                <p className="text-xs lg:text-sm font-serif text-white/90 leading-relaxed font-light">
                  Slow-cooked within subterranean clay ovens over natural wood embers, releasing fragrant cardamoms, cloves, and rich juices into the aged basmati pot.
                </p>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* SCENE 03: WIDE 16:9 DESKTOP CINEMATIC COMPOSITION                         */}
            {/* ========================================================================= */}
            <div className="relative w-full h-full max-w-[1920px] aspect-[16/9] mx-auto flex items-center justify-center pointer-events-none select-none overflow-hidden">
              
              {/* LAYER 1: Full Kitchen Background (Preserves architecture, oven, lanterns, logo) */}
              <div
                ref={bgLayerRef}
                className="absolute inset-0 w-full h-full will-change-transform z-0"
              >
                <div
                  ref={bgMouseRef}
                  className="relative w-full h-full scale-[1.02] will-change-transform"
                >
                  <Image
                    src="/images/scene-03/scene-03-kitchen-desktop.webp"
                    alt="Mandi Manzil wood-fired underground kitchen hearth with golden lighting, stone walls, and lanterns"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center"
                  />
                  {/* Warm Amber Kitchen Atmospheric Lighting Accent */}
                  <div
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(circle at 45% 55%, rgba(252, 203, 28, 0.35) 0%, rgba(255, 138, 0, 0.12) 50%, transparent 75%)",
                    }}
                  />
                </div>
              </div>

              {/* LAYER 2: Foreground Ingredients and Table (Along lower foreground) */}
              <div
                ref={fgLayerRef}
                className="absolute inset-x-0 bottom-0 w-full h-[46%] will-change-transform z-20 flex items-end justify-center pointer-events-none"
              >
                <div
                  ref={fgMouseRef}
                  className="relative w-full h-full scale-[1.02] will-change-transform flex items-end justify-center"
                >
                  <Image
                    src="/images/scene-03/02-foreground-ingredients-and-table.webp"
                    alt="Foreground wooden table spread with whole Arabian spices, brass vessels, and fresh mandi seasonings"
                    fill
                    priority
                    sizes="100vw"
                    className="object-contain object-bottom filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.85)]"
                  />
                </div>
              </div>

              {/* LAYER 3: Mandi Rice Pot (Positioned on the kitchen counter surface) */}
              <div
                ref={potLayerRef}
                className="absolute left-[24%] lg:left-[25%] top-[51%] w-[23%] aspect-[2172/724] will-change-transform z-10 flex items-center justify-center pointer-events-none"
              >
                <div
                  ref={potMouseRef}
                  className="relative w-full h-full will-change-transform"
                >
                  {/* Anchoring Contact Shadow on Counter Surface */}
                  <div
                    className="absolute -bottom-2 left-[5%] right-[5%] h-5 bg-[#0a0502]/80 rounded-full blur-[7px] pointer-events-none"
                    aria-hidden="true"
                  />
                  <Image
                    src="/images/scene-03/03-separate-mandi-rice-pot.webp"
                    alt="Isolated authentic Mandi rice pot degh seasoned with spices"
                    fill
                    priority
                    sizes="25vw"
                    className="object-contain object-bottom filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.65)]"
                  />
                </div>
              </div>

              {/* LAYER 4: Chef Sprinkling Spices (Toward left / centre-left, upper body visible) */}
              <div
                ref={chefLayerRef}
                className="absolute -left-[1%] lg:left-[0%] bottom-[8%] w-[54%] h-[64%] will-change-transform z-15 pointer-events-none"
              >
                <div
                  ref={chefMouseRef}
                  className="relative w-full h-full will-change-transform"
                >
                  <Image
                    src="/images/scene-03/scene-03-chef-sprinkling-spices.webp"
                    alt="Arabian chef in Mandi Manzil apron sprinkling spices over the rice pot"
                    fill
                    priority
                    sizes="55vw"
                    className="object-contain object-bottom filter drop-shadow-[0_16px_32px_rgba(0,0,0,0.55)]"
                  />
                </div>
              </div>

              {/* LAYER 5: Falling Spices and Steam Overlay */}
              <div
                ref={effectsMouseRef}
                className="absolute left-[36%] lg:left-[37%] top-[44%] w-[12%] h-[24%] will-change-transform z-16 pointer-events-none"
              >
                {/* 5A: Rising Steam Wisps from the Pot */}
                <div
                  ref={steamContainerRef}
                  className="absolute inset-0 flex items-end justify-center pointer-events-none"
                >
                  <div className="w-8 h-20 bg-gradient-to-t from-white/35 via-white/15 to-transparent rounded-full blur-[10px] transform -translate-y-4" />
                  <div className="w-12 h-24 bg-gradient-to-t from-white/30 via-white/10 to-transparent rounded-full blur-[12px] transform -translate-y-6 -translate-x-3" />
                  <div className="w-10 h-18 bg-gradient-to-t from-white/25 via-white/10 to-transparent rounded-full blur-[10px] transform -translate-y-3 translate-x-3" />
                </div>

                {/* 5B: Falling Spice Particles Under Chef's Hand */}
                <div
                  ref={spicesContainerRef}
                  className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-28 pointer-events-none"
                >
                  <span className="absolute top-2 left-3 w-1.5 h-1.5 rounded-full bg-[#FCCB1C] opacity-90 blur-[0.5px]" />
                  <span className="absolute top-6 left-5 w-1 h-1 rounded-full bg-[#E08A24] opacity-80" />
                  <span className="absolute top-10 left-2 w-1.5 h-1 rounded-full bg-[#FCCB1C] opacity-85" />
                  <span className="absolute top-14 left-6 w-1 h-1.5 rounded-full bg-[#C83E1A] opacity-75" />
                  <span className="absolute top-18 left-4 w-1.5 h-1.5 rounded-full bg-[#E08A24] opacity-80 blur-[0.4px]" />
                  <span className="absolute top-22 left-3 w-1 h-1 rounded-full bg-[#FCCB1C] opacity-70" />
                  <span className="absolute top-26 left-5 w-1.5 h-1 rounded-full bg-[#C83E1A] opacity-65" />
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    </>
  );
}
