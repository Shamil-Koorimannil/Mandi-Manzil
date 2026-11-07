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
    id: "journey",
    number: "01",
    title: "Our Authentic Journey",
    tagline: "Established In 2016",
    description:
      "Since 2016, our journey began with a passion for bringing authentic Yemeni Mandi flavors to Kerala — now one of the region’s most loved destinations.",
    icon: Flame,
    details: ["Since 2016", "Authentic Arabian Roots"],
  },
  {
    id: "hospitality",
    number: "02",
    title: "Tradition & Hospitality",
    tagline: "More Than Food",
    description:
      "We serve tradition, generous Arabian hospitality, and an unforgettable culinary experience where authenticity and customer joy come first.",
    icon: Sparkles,
    details: ["Arabian Hospitality", "Authenticity First"],
  },
  {
    id: "promise",
    number: "03",
    title: "Dine-In & Online",
    tagline: "Consistent Excellence",
    description:
      "Whether dining in with friends and family or ordering online, we promise the exact same authentic wood-fired taste and quality every time.",
    icon: Utensils,
    details: ["Family Dine-In", "Fresh Online Delivery"],
  },
  {
    id: "together",
    number: "04",
    title: "Bringing People Together",
    tagline: "Moments Big & Small",
    description:
      "Great food brings people together. We are proud to share and celebrate your special moments, gatherings, and celebrations across Kerala.",
    icon: Users,
    details: ["Communal Dining", "Cherished Moments"],
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
        end: "+=2600",
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

      // Scrubbed rotation and scale of the platter as user scrolls
      gsap.fromTo(
        platterRef.current,
        { rotation: -15, scale: 0.9 },
        {
          rotation: 360,
          scale: 1.02,
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: "+=2600",
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
      {/* Pinned Showcase Container (Cleanly sized for 100vh screens) */}
      <section
        ref={triggerRef}
        className="h-screen w-full flex flex-col justify-between overflow-hidden relative px-6 md:px-12 py-5 sm:py-7"
      >
        {/* Subtle background glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none opacity-15 blur-[120px]"
          style={{
            background: "radial-gradient(circle, #FCCB1C 0%, #E07A5F 50%, transparent 70%)",
          }}
        />

        {/* Section Top Header (Compact & Crisp) */}
        <div className="site-container w-full flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-white/10 pb-3.5 relative z-10">
          <div>
            <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.25em] text-[#FCCB1C] uppercase block">
              Taste the Tradition
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal text-white mt-0.5 tracking-tight">
              Welcome to Mandi Manzil
            </h2>
            <p className="text-xs sm:text-[13px] text-zinc-400 font-light mt-0.5">
              Kerala’s Original Destination for Authentic Arabic Mandi Since 2016
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs text-white/50 self-start sm:self-end">
            <span className="hidden sm:inline">Scroll to explore</span>
            <span className="hidden sm:inline w-8 h-[1px] bg-white/20" />
            <span className="text-[#FCCB1C] font-mono font-semibold">
              0{activeStep + 1} / 04
            </span>
          </div>
        </div>

        {/* Center Grid: Left Accordion Steps vs Center/Right 3D Rotating Platter */}
        <div className="site-container w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto relative z-10">
          {/* Left Column: Progressive Step Accordion */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-2 sm:space-y-2.5">
            {STEPS.map((step, index) => {
              const isCurrent = activeStep === index;

              return (
                <div
                  key={step.id}
                  onClick={() => setActiveStep(index)}
                  className={`transition-all duration-300 rounded-xl cursor-pointer ${
                    isCurrent
                      ? "bg-white/[0.04] border border-white/10 p-4 sm:p-4.5 shadow-lg"
                      : "py-2 px-3 border border-transparent hover:border-white/[0.06] hover:bg-white/[0.02]"
                  }`}
                >
                  {/* Step Header */}
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-mono text-xs sm:text-sm font-semibold tracking-wider transition-colors duration-200 ${
                        isCurrent ? "text-[#FCCB1C]" : "text-white/40"
                      }`}
                    >
                      {step.number}
                    </span>
                    <span
                      className={`h-[1px] w-4 sm:w-6 transition-colors duration-200 ${
                        isCurrent ? "bg-[#FCCB1C]" : "bg-white/10"
                      }`}
                    />
                    <h3
                      className={`font-serif transition-colors duration-200 ${
                        isCurrent
                          ? "text-lg sm:text-xl md:text-2xl text-white font-normal tracking-tight"
                          : "text-sm sm:text-base text-white/50 hover:text-white/80"
                      }`}
                    >
                      {step.title}
                    </h3>
                    {!isCurrent && (
                      <span className="ml-auto text-[10px] font-mono uppercase tracking-wider text-white/30 hidden sm:inline">
                        {step.tagline}
                      </span>
                    )}
                  </div>

                  {/* Expanded Body: Only for Active Step */}
                  {isCurrent && (
                    <div className="mt-2.5 pt-2 pl-7 sm:pl-9 border-l border-[#FCCB1C]/30 space-y-2.5">
                      <p className="text-xs sm:text-[13px] text-[#EDECEE]/80 leading-relaxed font-light max-w-lg">
                        {step.description}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-0.5">
                        {step.details.map((detail, dIdx) => (
                          <span
                            key={dIdx}
                            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-light border border-white/10 bg-white/[0.04] text-white/85"
                          >
                            <span className="w-1 h-1 rounded-full bg-[#FCCB1C]" />
                            {detail}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Scrubbed Rotating Mandi Platter */}
          <div className="lg:col-span-6 flex items-center justify-center relative">
            {/* Concentric orbital rings (Proportionately scaled) */}
            <div className="absolute w-[260px] h-[260px] sm:w-[330px] sm:h-[330px] lg:w-[380px] lg:h-[380px] rounded-full border border-white/[0.06] pointer-events-none" />
            <div className="absolute w-[330px] h-[330px] sm:w-[420px] sm:h-[420px] lg:w-[460px] lg:h-[460px] rounded-full border border-dashed border-white/[0.04] pointer-events-none animate-[spin_80s_linear_infinite]" />

            {/* Rotating High-Res Platter */}
            <div
              ref={platterRef}
              className="relative w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] lg:w-[330px] lg:h-[330px] drop-shadow-[0_25px_45px_rgba(0,0,0,0.95)] will-change-transform"
            >
              <Image
                src="/images/showcase/top-shot-platter.jpg"
                alt="Slow Cooked Mandi Platter Top Shot"
                fill
                sizes="(max-width: 768px) 240px, 330px"
                className="object-cover rounded-full border-4 border-[#1c1b1c] shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Bottom Timeline Step Bar (Crisp & Clickable) */}
        <div className="site-container w-full relative z-10 pt-3 border-t border-white/10">
          <div className="grid grid-cols-4 gap-2 sm:gap-6">
            {STEPS.map((s, idx) => (
              <button
                type="button"
                onClick={() => setActiveStep(idx)}
                key={s.id}
                className={`relative py-1 text-left transition-colors duration-300 ${
                  activeStep === idx ? "text-white" : "text-white/35 hover:text-white/70"
                }`}
              >
                <div
                  className={`h-1 w-full rounded-full mb-1.5 transition-all duration-300 ${
                    activeStep === idx ? "bg-[#FCCB1C]" : "bg-white/10"
                  }`}
                />
                <div className="hidden sm:flex items-center justify-between text-[11px]">
                  <span className="font-mono font-medium">{s.number}</span>
                  <span className="font-light truncate">{s.tagline}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
