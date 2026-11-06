"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flame, Sparkles, Utensils, Users } from "lucide-react";

interface Step {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  icon: typeof Flame;
  details: string[];
}

const STEPS: Step[] = [
  {
    id: "pit",
    number: "01",
    title: "Subterranean Clay Oven",
    tagline: "Slow Wood-Fired Heat",
    description:
      "A deep earthen pit built inside the floor, fired with dense acacia charcoal embers until radiant heat saturates the clay walls.",
    icon: Flame,
    details: ["Sealed with damp jute sack & clay", "Zero open direct flame on rice", "Continuous radiant convection"],
  },
  {
    id: "suspension",
    number: "02",
    title: "Suspended Meat Dripping",
    tagline: "Natural Richness Infusion",
    description:
      "Selected cuts of young mutton or chicken are suspended on stainless tiers directly above the rice pot. As it cooks, seasoned fats drop continuously into the grains below.",
    icon: Sparkles,
    details: ["Self-basting fat cascade", "Fall-off-the-bone tenderness", "Zero heavy cooking oils"],
  },
  {
    id: "spices",
    number: "03",
    title: "Aged Basmati & Black Loomi",
    tagline: "The Yemeni Spice Matrix",
    description:
      "Extra-long aged basmati soaked in bone broth, cardamom pods, charred black sun-dried lime, cloves, and whole cinnamon bark.",
    icon: Utensils,
    details: ["Fluffy individual non-sticky grains", "Smoky citrus aroma from Loomi", "Subtle saffron aroma gradient"],
  },
  {
    id: "communal",
    number: "04",
    title: "The Majlis Communal Feast",
    tagline: "Elegance of Shared Dining",
    description:
      "Served on handcrafted round silvered platters with house garlic toum, fire-roasted tomato dakous, and simmering rich maraq broth.",
    icon: Users,
    details: ["Traditionally enjoyed together", "Complimentary refills of fragrant rice", "Signature mint & onion garnish"],
  },
];

export function GsapAnatomyShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const platterRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const pinTrigger = ScrollTrigger.create({
        trigger: triggerRef.current,
        start: "top top",
        end: "+=3000",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          const stepIndex = Math.min(
            STEPS.length - 1,
            Math.floor(self.progress * STEPS.length)
          );
          setActiveStep(stepIndex);
        },
      });

      // Scrubbed rotation and scale of the platter as the user scrolls
      gsap.fromTo(
        platterRef.current,
        { rotation: -20, scale: 0.85 },
        {
          rotation: 360,
          scale: 1.05,
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: "+=3000",
            scrub: 1,
          },
        }
      );

      return () => {
        pinTrigger.kill();
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative bg-[#0A090A] text-white">
      {/* Pinned Showcase Container */}
      <section
        ref={triggerRef}
        className="h-screen w-full flex flex-col justify-between overflow-hidden relative px-6 md:px-12 py-12"
      >
        {/* Subtle background glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-15 blur-[120px]"
          style={{
            background: "radial-gradient(circle, #FCCB1C 0%, #E07A5F 50%, transparent 70%)",
          }}
        />

        {/* Section Top Header */}
        <div className="site-container w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6 relative z-10">
          <div>
            <span className="text-[11px] font-medium tracking-[0.25em] text-[#FCCB1C] uppercase">
              The Alchemy of the Pit
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-white mt-1">
              Craft of the Authentic Platter
            </h2>
          </div>

          <div className="flex items-center gap-3 text-xs text-white/50">
            <span>Scroll to deconstruct</span>
            <span className="w-8 h-[1px] bg-white/20" />
            <span className="text-[#FCCB1C] font-mono">0{activeStep + 1} / 04</span>
          </div>
        </div>

        {/* Center Grid: Left Text Steps vs Center/Right 3D Rotating Platter */}
        <div className="site-container w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto relative z-10">
          {/* Left Column: Progressive Step Description */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {STEPS.map((step, index) => {
              const isCurrent = activeStep === index;
              const Icon = step.icon;

              return (
                <div
                  key={step.id}
                  className={`transition-all duration-500 py-3 ${
                    isCurrent
                      ? "opacity-100 translate-y-0"
                      : "opacity-25 translate-y-2 hidden lg:block pointer-events-none"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[#FCCB1C] font-mono text-sm tracking-wider">
                      {step.number}
                    </span>
                    <span className="h-[1px] w-6 bg-[#FCCB1C]/40" />
                    <span className="text-xs uppercase tracking-widest text-[#EDECEE]/70 font-medium">
                      {step.tagline}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-normal text-white mb-3">
                    {step.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#EDECEE]/75 leading-relaxed font-light max-w-lg mb-5">
                    {step.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {step.details.map((detail, dIdx) => (
                      <span
                        key={dIdx}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-light border border-white/10 bg-white/[0.03] text-white/80"
                      >
                        <span className="w-1 h-1 rounded-full bg-[#FCCB1C]" />
                        {detail}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Scrubbed Rotating Mandi Platter */}
          <div className="lg:col-span-6 flex items-center justify-center relative">
            {/* Concentric orbital rings */}
            <div className="absolute w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] rounded-full border border-white/[0.06] pointer-events-none" />
            <div className="absolute w-[440px] h-[440px] sm:w-[560px] sm:h-[560px] rounded-full border border-dashed border-white/[0.04] pointer-events-none animate-[spin_80s_linear_infinite]" />

            {/* Rotating High-Res Platter */}
            <div
              ref={platterRef}
              className="relative w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[440px] md:h-[440px] drop-shadow-[0_40px_60px_rgba(0,0,0,0.95)] will-change-transform"
            >
              <Image
                src="/images/showcase/top-shot-platter.jpg"
                alt="Slow Cooked Mandi Platter Top Shot"
                fill
                sizes="(max-width: 768px) 300px, 460px"
                className="object-cover rounded-full border-4 border-[#1c1b1c] shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Bottom Timeline Step Bar */}
        <div className="site-container w-full relative z-10 pt-4 border-t border-white/10">
          <div className="grid grid-cols-4 gap-2 sm:gap-6">
            {STEPS.map((s, idx) => (
              <div
                key={s.id}
                className={`relative py-2 transition-colors duration-300 ${
                  activeStep === idx ? "text-white" : "text-white/35"
                }`}
              >
                <div
                  className={`h-1 w-full rounded-full mb-2 transition-all duration-300 ${
                    activeStep === idx ? "bg-[#FCCB1C]" : "bg-white/10"
                  }`}
                />
                <div className="hidden sm:flex items-center justify-between text-xs">
                  <span className="font-mono font-medium">{s.number}</span>
                  <span className="font-light truncate">{s.tagline}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

