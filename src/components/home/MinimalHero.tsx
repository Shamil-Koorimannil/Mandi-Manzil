"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function MinimalHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const textGroupRef = useRef<HTMLDivElement>(null);
  const dishGroupRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Initial entrance timeline on load
      const entranceTl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Text enters from the left
      entranceTl.fromTo(
        textGroupRef.current,
        { x: -120, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.4 }
      );

      // Dish enters from the right
      entranceTl.fromTo(
        dishGroupRef.current,
        { x: 160, opacity: 0, rotate: 18, scale: 0.9 },
        { x: 0, opacity: 1, rotate: 0, scale: 1, duration: 1.5, ease: "power2.out" },
        "-=1.2"
      );

      // Scroll indicator fade-in
      entranceTl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.6"
      );

      // 2. Idle continuous subtle floating animation for dish
      const idleFloat = gsap.to(dishGroupRef.current, {
        y: -14,
        rotate: 2,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // 3. ScrollTrigger scrub: Text flies out to left, Dish flies out to right on scroll
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Text moves out to the left
      scrollTl.to(
        textGroupRef.current,
        {
          x: -280,
          opacity: 0,
          ease: "power1.in",
        },
        0
      );

      // Dish moves out to the right
      scrollTl.to(
        dishGroupRef.current,
        {
          x: 340,
          rotate: 25,
          scale: 0.88,
          opacity: 0,
          ease: "power1.in",
        },
        0
      );

      // Fade out scroll indicator quickly
      scrollTl.to(
        scrollIndicatorRef.current,
        {
          opacity: 0,
          y: -20,
          duration: 0.2,
        },
        0
      );

      return () => {
        idleFloat.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] pt-24 pb-16 lg:pt-0 lg:pb-0 flex items-center overflow-hidden bg-[#222123]"
    >
      <div className="site-container w-full relative z-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Side: "Mandi Manzil" & "The Feast Of Arabia" text coming from left */}
          <div
            ref={textGroupRef}
            className="lg:col-span-7 flex flex-col items-start will-change-transform"
          >
            {/* Tagline coming with text */}
            <span className="text-xs sm:text-sm font-medium tracking-[0.28em] uppercase text-[#FCCB1C] mb-4">
              The Feast Of Arabia
            </span>

            {/* Brand Title */}
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-normal text-white tracking-tight leading-[0.95] mb-6">
              Mandi <br />
              <span className="text-[#EDECEE]/90">Manzil</span>
            </h1>

            {/* Clean, minimal editorial subtitle */}
            <p className="text-sm sm:text-base text-zinc-400 font-light max-w-lg leading-relaxed mb-8">
              Authentic wood-fired Yemeni Mandi. Sealed in subterranean clay pits,
              slow-cooked over glowing embers, and served in the generous tradition of Arabian hospitality.
            </p>

            {/* Minimal Action link */}
            <div className="flex items-center gap-6">
              <Link
                href="/menu"
                className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#FCCB1C] text-[#141314] font-medium text-xs uppercase tracking-widest transition-all duration-300 hover:bg-[#FFD84D] hover:shadow-[0_0_25px_rgba(252,203,28,0.3)] hover:-translate-y-0.5"
              >
                <span>View Menu</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link
                href="/branches"
                className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
              >
                <span>16 Kerala Outlets</span>
              </Link>
            </div>
          </div>

          {/* Right Side: Dish from the dishes folder coming from right */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            {/* Dish container */}
            <div
              ref={dishGroupRef}
              className="relative w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] lg:w-[480px] lg:h-[480px] xl:w-[520px] xl:h-[520px] drop-shadow-[0_35px_50px_rgba(0,0,0,0.85)] will-change-transform cursor-pointer"
            >
              <Image
                src="/images/dishes/normal mandi full with rice.png"
                alt="Mandi Manzil Authentic Arabian Dish Platter"
                fill
                priority
                sizes="(max-width: 640px) 300px, (max-width: 1024px) 420px, 520px"
                className="object-contain filter contrast-[1.05] select-none pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Down Indicator at Bottom */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500 text-[11px] tracking-widest uppercase font-mono pointer-events-none"
      >
        <span>Scroll to Explore</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#FCCB1C]" />
      </div>
    </section>
  );
}
