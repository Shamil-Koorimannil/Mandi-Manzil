"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function MobileCinematicMenuScene() {
  const containerRef = useRef<HTMLElement>(null);
  const pinTargetRef = useRef<HTMLDivElement>(null);

  // Layer containers for scroll animation
  const bgRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<HTMLDivElement>(null);

  // Inner tilt refs for device orientation & touch parallax
  const tiltBgRef = useRef<HTMLDivElement>(null);
  const tiltFgRef = useRef<HTMLDivElement>(null);

  // Atmospheric top badge
  const badgeRef = useRef<HTMLDivElement>(null);

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
        { opacity: 0, scale: 1.04 },
        { opacity: 1, scale: 1.0, duration: 1.1, ease: "power2.out" }
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

      // 2. Mobile Pinned Scroll-Story Timeline
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

        // Foreground customer & menu scales up slightly for visual focus
        scrollTl.to(fgRef.current, { scale: 1.05, y: -12, ease: "none" }, 0);
      }
    }, containerRef);

    // 3. Device Orientation Tilt with Smooth Clamped Interpolation & Touch Fallback
    if (!prefersReducedMotion && typeof window !== "undefined") {
      // Clamped quickTo physics:
      // - Background: 5px X, 3px Y (very subtle)
      // - Customer/Menu foreground: 12px X, 7px Y (within 8-14px range)
      const setBgX = gsap.quickTo(tiltBgRef.current, "x", { duration: 1.2, ease: "power2.out" });
      const setBgY = gsap.quickTo(tiltBgRef.current, "y", { duration: 1.2, ease: "power2.out" });

      const setFgX = gsap.quickTo(tiltFgRef.current, "x", { duration: 0.8, ease: "power2.out" });
      const setFgY = gsap.quickTo(tiltFgRef.current, "y", { duration: 0.8, ease: "power2.out" });

      let orientationFired = false;

      const handleOrientation = (e: DeviceOrientationEvent) => {
        if (e.gamma === null || e.beta === null) return;
        orientationFired = true;
        setHasTiltActive(true);

        // Clamp gamma (-25 to +25 deg) and beta (natural viewing angle 45 deg +/- 25 deg)
        const normGamma = Math.max(-1, Math.min(1, e.gamma / 25));
        const normBeta = Math.max(-1, Math.min(1, (e.beta - 45) / 25));

        setBgX(normGamma * -5);
        setBgY(normBeta * -3);

        setFgX(normGamma * -12);
        setFgY(normBeta * -7);
      };

      // Fallback: Touch / pointer movement where device orientation is unavailable
      const handleTouchMove = (e: TouchEvent) => {
        if (orientationFired || !e.touches[0]) return;
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect || rect.bottom < -100 || rect.top > window.innerHeight + 100) return;

        const touch = e.touches[0];
        const normX = (touch.clientX / window.innerWidth - 0.5) * 2;
        const normY = (touch.clientY / window.innerHeight - 0.5) * 2;

        setBgX(normX * -5);
        setBgY(normY * -3);

        setFgX(normX * -12);
        setFgY(normY * -7);
      };

      // iOS permission handling (request on first user touch, never automatic popup)
      const setupMotion = () => {
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
                // Denied or dismissed — touch fallback remains active
              });
            window.removeEventListener("touchstart", onFirstTouch);
          };
          window.addEventListener("touchstart", onFirstTouch, { passive: true, once: true });
        } else {
          // Standard mobile devices
          window.addEventListener("deviceorientation", handleOrientation, { passive: true });
        }

        window.addEventListener("touchmove", handleTouchMove, { passive: true });
      };

      setupMotion();

      return () => {
        window.removeEventListener("deviceorientation", handleOrientation);
        window.removeEventListener("touchmove", handleTouchMove);
        ctx.revert();
      };
    }

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#0F0D0E] text-white selection:bg-[#FCCB1C] selection:text-[#141314]"
      aria-label="Scene 02: The Mandi Menu (Mobile)"
    >
      {/* Pinned Stage Container (Locks 100svh during scroll) */}
      <div
        ref={pinTargetRef}
        className="relative w-full h-[100svh] min-h-[580px] overflow-hidden flex flex-col justify-end"
      >
        {/* Soft Vignette Gradients */}
        <div
          className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#2B2A2D] via-[#2B2A2D]/60 to-transparent pointer-events-none z-20"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#2B2A2D] via-[#2B2A2D]/60 to-transparent pointer-events-none z-20"
          aria-hidden="true"
        />

        {/* Subtle Atmospheric Top Badge */}
        <div
          ref={badgeRef}
          className="absolute top-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141314]/75 backdrop-blur-md border border-[#FCCB1C]/25 shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FCCB1C] animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#FCCB1C] font-semibold">
              The Mandi Menu
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SCENE 02 MOBILE: TWO-LAYER DEDICATED COMPOSITION                          */}
        {/* Layer 1: Dedicated portrait restaurant interior background (941x1670)     */}
        {/* Layer 2: Diner holding open 8-dish menu (1671x941 transparent foreground) */}
        {/* ========================================================================= */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden">
          
          {/* LAYER 1: Restaurant Interior Background (Logo in upper right archway) */}
          <div
            ref={bgRef}
            className="absolute inset-0 w-full h-full will-change-transform"
          >
            <div
              ref={tiltBgRef}
              className="relative w-full h-full scale-[1.06] will-change-transform"
            >
              <Image
                src="/images/scene-02/mobile/scene-02-mobile-background.webp"
                alt="Mandi Manzil restaurant interior with glowing arches and lanterns"
                fill
                priority
                sizes="100vw"
                className="object-cover object-[52%_center]"
              />
              {/* Warm Golden Atmosphere Lighting Accent */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at 65% 25%, rgba(252, 203, 28, 0.4) 0%, rgba(255, 138, 0, 0.12) 45%, transparent 70%)",
                }}
              />
            </div>
          </div>

          {/* LAYER 2: Customer with Open Menu (All 8 Dishes Visible & Readable) */}
          <div
            ref={fgRef}
            className="absolute bottom-[-1%] left-[-16%] sm:left-[-14%] w-[120%] sm:w-[115%] max-w-none aspect-[1671/941] will-change-transform z-10 filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.65)]"
          >
            <div
              ref={tiltFgRef}
              className="relative w-full h-full will-change-transform"
            >
              <Image
                src="/images/scene-02/mobile/scene-02-mobile-menu-foreground.webp"
                alt="Customer holding open Mandi Manzil menu with 8 signature dishes"
                fill
                priority
                sizes="100vw"
                className="object-contain"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
