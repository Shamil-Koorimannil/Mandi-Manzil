"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function MinimalStatsGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const num1Ref = useRef<HTMLSpanElement>(null);
  const num2Ref = useRef<HTMLSpanElement>(null);
  const num3Ref = useRef<HTMLSpanElement>(null);
  const num4Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const counters = [
        { ref: num1Ref, target: 16, suffix: "" },
        { ref: num2Ref, target: 12, suffix: "h" },
        { ref: num3Ref, target: 500, suffix: "k+" },
        { ref: num4Ref, target: 100, suffix: "%" },
      ];

      counters.forEach((item) => {
        if (!item.ref.current) return;
        const obj = { val: 0 };

        gsap.to(obj, {
          val: item.target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            if (item.ref.current) {
              item.ref.current.textContent = `${Math.floor(obj.val)}${item.suffix}`;
            }
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-[#0B0A0B] border-t border-white/[0.08]"
    >
      <div className="site-container">
        {/* Top Story Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-end">
          <div className="lg:col-span-7">
            <span className="text-[11px] font-medium tracking-[0.25em] text-[#FCCB1C] uppercase block mb-3">
              Uncompromising Standards
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-white leading-tight">
              Honoring the Ancient Hearth.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm sm:text-base text-white/60 font-light leading-relaxed">
              We do not rush the fire. From morning ember lighting to evening banquet
              gatherings, our kitchens stay true to centuries-old Yemeni culinary discipline.
            </p>
          </div>
        </div>

        {/* 4-Column Architectural Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-white/10">
          {/* Stat 1 */}
          <div className="p-8 sm:p-10 border-r border-b border-white/10 flex flex-col justify-between group hover:bg-white/[0.02] transition-colors duration-300">
            <span className="text-xs font-mono text-[#FCCB1C] mb-8">01 / PRESENCE</span>
            <div>
              <div className="text-5xl sm:text-6xl font-serif text-white font-normal mb-3">
                <span ref={num1Ref}>16</span>
              </div>
              <h3 className="text-base font-serif text-white mb-2">Branches in Kerala</h3>
              <p className="text-xs text-white/50 leading-relaxed font-light">
                Spanning Trivandrum, Kollam, Ernakulam, Thrissur and Malabar.
              </p>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="p-8 sm:p-10 border-r border-b border-white/10 flex flex-col justify-between group hover:bg-white/[0.02] transition-colors duration-300">
            <span className="text-xs font-mono text-[#FCCB1C] mb-8">02 / CRAFT</span>
            <div>
              <div className="text-5xl sm:text-6xl font-serif text-white font-normal mb-3">
                <span ref={num2Ref}>12h</span>
              </div>
              <h3 className="text-base font-serif text-white mb-2">Slow Pit Roasting</h3>
              <p className="text-xs text-white/50 leading-relaxed font-light">
                Continuous underground radiant heat without artificial accelerants.
              </p>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="p-8 sm:p-10 border-r border-b border-white/10 flex flex-col justify-between group hover:bg-white/[0.02] transition-colors duration-300">
            <span className="text-xs font-mono text-[#FCCB1C] mb-8">03 / COMMUNITY</span>
            <div>
              <div className="text-5xl sm:text-6xl font-serif text-white font-normal mb-3">
                <span ref={num3Ref}>500k+</span>
              </div>
              <h3 className="text-base font-serif text-white mb-2">Platters Shared</h3>
              <p className="text-xs text-white/50 leading-relaxed font-light">
                Countless family gatherings, celebration banquets, and late-night cravings.
              </p>
            </div>
          </div>

          {/* Stat 4 */}
          <div className="p-8 sm:p-10 border-r border-b border-white/10 flex flex-col justify-between group hover:bg-white/[0.02] transition-colors duration-300">
            <span className="text-xs font-mono text-[#FCCB1C] mb-8">04 / PURITY</span>
            <div>
              <div className="text-5xl sm:text-6xl font-serif text-white font-normal mb-3">
                <span ref={num4Ref}>100%</span>
              </div>
              <h3 className="text-base font-serif text-white mb-2">Wood-Fired Natural</h3>
              <p className="text-xs text-white/50 leading-relaxed font-light">
                Acacia charcoal, cold-pressed marinades, and zero artificial colors.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

