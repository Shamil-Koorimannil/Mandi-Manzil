"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ASSET = "/images/scene-01";

export function MinimalHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const townRef = useRef<HTMLDivElement>(null);
  const gardenRef = useRef<HTMLDivElement>(null);
  const buildingRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<HTMLDivElement>(null);
  const travellerRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .fromTo(townRef.current, { scale: 1.08 }, { scale: 1, duration: 1.5 })
        .fromTo(buildingRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1 }, "-=1.1")
        .fromTo(travellerRef.current, { x: -90, opacity: 0 }, { x: 0, opacity: 1, duration: 1.1 }, "-=0.8")
        .fromTo(copyRef.current, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, "-=0.7")
        .fromTo(hintRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.2");

      const scroll = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      scroll
        .to(townRef.current, { yPercent: 10, scale: 1.08, ease: "none" }, 0)
        .to(gardenRef.current, { yPercent: -7, ease: "none" }, 0)
        .to(buildingRef.current, { yPercent: -4, scale: 1.04, ease: "none" }, 0)
        .to(pathRef.current, { yPercent: -14, ease: "none" }, 0)
        .to(travellerRef.current, { x: "28vw", yPercent: -2, ease: "none" }, 0)
        .to(copyRef.current, { y: -100, opacity: 0, ease: "none" }, 0.12)
        .to(hintRef.current, { opacity: 0, ease: "none" }, 0);

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[175svh] bg-[#342333]">
      <div className="sticky top-0 h-[100svh] min-h-[620px] overflow-hidden isolate">
        <div ref={townRef} className="absolute inset-0 z-0 will-change-transform">
          <Image src={`${ASSET}/arabian-town.webp`} alt="" fill priority sizes="100vw" className="object-cover object-center" />
        </div>
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#351f3d]/55 via-transparent to-[#351f3d]/5" />
        <div ref={buildingRef} className="absolute inset-0 z-[2] will-change-transform">
          <Image src={`${ASSET}/restaurant.webp`} alt="Mandi Manzil restaurant illuminated at sunset" fill priority sizes="100vw" className="object-contain object-bottom" />
        </div>
        <div ref={gardenRef} className="absolute inset-0 z-[3] pointer-events-none will-change-transform">
          <Image src={`${ASSET}/garden-frame.webp`} alt="" fill priority sizes="100vw" className="object-cover object-center" />
        </div>
        <div ref={pathRef} className="absolute inset-x-0 bottom-0 z-[4] h-[38%] pointer-events-none will-change-transform">
          <Image src={`${ASSET}/stone-pathway.webp`} alt="" fill priority sizes="100vw" className="object-cover object-bottom" />
        </div>
        <div ref={travellerRef} className="absolute z-[5] bottom-[7%] left-[25%] h-[58%] w-[24%] max-w-[360px] min-w-[190px] will-change-transform">
          <Image src={`${ASSET}/arabian-traveller.webp`} alt="A traveller walking towards Mandi Manzil" fill priority sizes="(max-width: 768px) 45vw, 360px" className="object-contain object-bottom" />
        </div>

        <div ref={copyRef} className="absolute z-10 left-[7%] top-[30%] max-w-[560px] text-white will-change-transform">
          <p className="mb-4 text-[10px] sm:text-xs font-semibold tracking-[0.35em] uppercase text-[#FFE0A0]">Welcome to</p>
          <h1 className="font-philosopher text-5xl sm:text-6xl lg:text-8xl leading-[0.92] tracking-tight text-white drop-shadow-lg">Mandi<br className="hidden sm:block" /> Manzil</h1>
          <p className="mt-5 max-w-sm text-sm sm:text-lg leading-relaxed text-white/90">Authentic Arabian Mandi<br className="hidden sm:block" /> in a Modern Experience</p>
          <Link href="/menu" className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#FFD17A] px-6 py-3 text-xs sm:text-sm font-semibold text-[#342333] shadow-lg transition-transform hover:-translate-y-1">
            Explore Our Menu <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div ref={hintRef} className="absolute z-20 bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-white drop-shadow-md">
          <span>Scroll to Explore</span>
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </div>
        <div className="absolute inset-0 z-[6] pointer-events-none bg-gradient-to-t from-[#271a2c]/20 via-transparent to-[#271a2c]/10" />
      </div>
    </section>
  );
}
