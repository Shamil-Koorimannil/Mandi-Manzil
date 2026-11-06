"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Flame, Clock, Sparkles } from "lucide-react";
import gsap from "gsap";
import { HeroAtmosphereCanvas } from "@/components/canvas/HeroAtmosphereCanvas";

export function MinimalHero() {
  const heroRef = useRef<HTMLElement>(null);
  const titleLine1Ref = useRef<HTMLHeadingElement>(null);
  const titleLine2Ref = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const platterRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered reveal timeline on load
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        [titleLine1Ref.current, titleLine2Ref.current],
        { y: 80, opacity: 0, rotateX: 20 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.15 }
      )
        .fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          "-=0.7"
        )
        .fromTo(
          ctaGroupRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          platterRef.current,
          { scale: 0.75, opacity: 0, y: 60, rotate: -15 },
          { scale: 1, opacity: 1, y: 0, rotate: 0, duration: 1.4, ease: "power2.out" },
          "-=1.1"
        )
        .fromTo(
          badgesRef.current?.children ? Array.from(badgesRef.current.children) : [],
          { scale: 0.6, opacity: 0, y: 20 },
          { scale: 1, opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "back.out(1.7)" },
          "-=0.8"
        )
        .fromTo(
          tickerRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.4"
        );

      // Continuous anti-gravity floating loop for the platter
      gsap.to(platterRef.current, {
        y: "-=18",
        rotation: 3,
        duration: 3.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Mouse 3D tilt tracking for platter
      const handleMouseMove = (e: MouseEvent) => {
        if (!platterRef.current) return;
        const rect = heroRef.current?.getBoundingClientRect();
        if (!rect) return;

        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(platterRef.current, {
          rotateY: x * 18,
          rotateX: -y * 18,
          x: x * 25,
          duration: 0.6,
          ease: "power1.out",
          transformPerspective: 1000,
        });
      };

      const heroEl = heroRef.current;
      if (heroEl) {
        heroEl.addEventListener("mousemove", handleMouseMove);
      }

      return () => {
        if (heroEl) heroEl.removeEventListener("mousemove", handleMouseMove);
      };
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100svh] pt-28 pb-16 lg:pt-36 lg:pb-24 flex flex-col justify-between overflow-hidden bg-[#0C0B0C]"
      style={{ perspective: "1000px" }}
    >
      {/* 3D WebGL Atmosphere Particles */}
      <HeroAtmosphereCanvas />

      {/* Subtle radial ambient saffron backglow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-20 blur-[140px]"
        style={{
          background: "radial-gradient(circle, #FCCB1C 0%, #E07A5F 40%, transparent 70%)",
        }}
      />

      {/* Main Hero Container */}
      <div className="site-container relative z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Minimalist Editorial Content */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Top Minimal Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FCCB1C] animate-pulse" />
              <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#EDECEE]/80">
                Wood-Fired Yemeni Heritage · Kerala
              </span>
            </div>

            {/* Editorial Serif Display Headline */}
            <div className="overflow-hidden mb-6">
              <h1
                ref={titleLine1Ref}
                className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-normal tracking-tight font-serif text-white leading-[1.05]"
              >
                SLOW-COOKED.
              </h1>
              <h1
                ref={titleLine2Ref}
                className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-normal tracking-tight font-serif leading-[1.05] text-transparent bg-clip-text bg-gradient-to-r from-[#FCCB1C] via-[#FFD84D] to-[#EDECEE]"
              >
                ZERO GRAVITY.
              </h1>
            </div>

            {/* Concise Minimal Story */}
            <p
              ref={subtitleRef}
              className="text-base sm:text-lg text-[#EDECEE]/70 max-w-xl font-light leading-relaxed mb-8"
            >
              Sealed deep inside subterranean earthen pits over acacia charcoal.
              Juices drip through suspended meat into cardamom-aged basmati,
              creating Kerala’s lightest, most fragrant Mandi.
            </p>

            {/* CTA Actions */}
            <div
              ref={ctaGroupRef}
              className="flex flex-wrap items-center gap-4 sm:gap-6"
            >
              <Link
                href="/menu"
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#FCCB1C] text-[#141314] font-medium text-sm tracking-wide transition-all duration-300 hover:bg-[#FFD84D] hover:shadow-[0_0_30px_rgba(252,203,28,0.35)] hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Explore The Menu</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link
                href="/branches"
                className="group inline-flex items-center gap-2.5 px-6 py-4 rounded-full border border-white/15 bg-white/[0.02] text-white/90 text-sm font-light hover:border-white/35 hover:bg-white/[0.06] transition-all duration-300"
              >
                <Flame className="w-4 h-4 text-[#FCCB1C]" />
                <span>Find 16 Branches</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Floating 3D Anti-Gravity Platter Showcase */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Ambient circular platter pedestal reflection */}
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-white/[0.07] bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />
            <div className="absolute w-[440px] h-[440px] rounded-full border border-dashed border-white/[0.04] animate-[spin_60s_linear_infinite] pointer-events-none" />

            {/* 3D Floating Platter */}
            <div
              ref={platterRef}
              className="relative w-[310px] h-[310px] sm:w-[420px] sm:h-[420px] xl:w-[460px] xl:h-[460px] drop-shadow-[0_35px_45px_rgba(0,0,0,0.85)] cursor-grab active:cursor-grabbing transition-transform will-change-transform"
            >
              <Image
                src="/images/mandi/full-mandi.png"
                alt="Anti-Gravity Authentic Mandi Platter"
                fill
                priority
                sizes="(max-width: 640px) 310px, (max-width: 1024px) 420px, 460px"
                className="object-contain pointer-events-none select-none filter contrast-[1.05]"
              />
            </div>

            {/* Floating Flavor Nodes */}
            <div
              ref={badgesRef}
              className="absolute inset-0 pointer-events-none flex flex-col justify-between"
            >
              {/* Badge 1: Top Right */}
              <div className="self-end translate-x-3 -translate-y-2 px-3.5 py-2 rounded-xl backdrop-blur-md bg-[#181718]/90 border border-white/10 shadow-xl flex items-center gap-2 text-xs text-white/90">
                <Sparkles className="w-3.5 h-3.5 text-[#FCCB1C]" />
                <span>Aged Basmati & Loomi</span>
              </div>

              {/* Badge 2: Bottom Left */}
              <div className="self-start -translate-x-3 translate-y-4 px-3.5 py-2 rounded-xl backdrop-blur-md bg-[#181718]/90 border border-white/10 shadow-xl flex items-center gap-2 text-xs text-white/90">
                <Flame className="w-3.5 h-3.5 text-[#FCCB1C]" />
                <span>Underground Pit Sealed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Minimal Info Ticker */}
      <div
        ref={tickerRef}
        className="site-container relative z-10 pt-10 border-t border-white/[0.07] mt-8"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-xs text-white/60">
          <div className="flex items-center gap-3">
            <span className="text-[#FCCB1C] font-serif text-lg font-normal">01</span>
            <div>
              <p className="text-white/90 font-medium">100% Pit Cooked</p>
              <p className="text-[11px] text-white/50">Acacia charcoal embers</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[#FCCB1C] font-serif text-lg font-normal">02</span>
            <div>
              <p className="text-white/90 font-medium">Yemeni Spices</p>
              <p className="text-[11px] text-white/50">Whole loomi & green cardamom</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[#FCCB1C] font-serif text-lg font-normal">03</span>
            <div>
              <p className="text-white/90 font-medium">16 Kerala Outlets</p>
              <p className="text-[11px] text-white/50">From TVM to Calicut</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-[#FCCB1C]" />
            <div>
              <p className="text-white/90 font-medium">Open 11:30 AM – 11:30 PM</p>
              <p className="text-[11px] text-white/50">Dine-in, takeaway & delivery</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

