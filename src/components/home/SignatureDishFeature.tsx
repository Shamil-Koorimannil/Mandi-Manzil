"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import { motion } from "framer-motion";

export function SignatureDishFeature() {
  return (
    <section className="section-rhythm bg-[#0E0D0E] border-t border-white/[0.06] relative overflow-hidden">
      {/* Ambient background glow */}
      <div
        className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[500px] bg-brand-yellow/[0.035] rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="site-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Large Magazine-Style Image Feature (7 cols) coming from left with subtle rotation */}
          <motion.div
            initial={{ opacity: 0, x: -60, rotate: -3 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative"
          >
            <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden border border-white/[0.1] shadow-2xl bg-[#1B1A1B] group">
              <Image
                src="/images/gallery/gallery-01.jpg"
                alt="Signature Mandi Manzil dish showing succulent meat with toasted sesame and seasoned basmati rice"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover object-center transform transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-5 left-5 sm:bottom-6 sm:left-6">
                <span className="inline-flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-widest text-brand-yellow font-bold px-3.5 py-1.5 bg-[#141314]/90 backdrop-blur-sm border border-brand-yellow/30 rounded-full shadow-lg">
                  <Flame className="w-3.5 h-3.5" />
                  <span>Wood-Fired Hearth Ritual</span>
                </span>
              </div>
            </div>
          </motion.div>

          {/* Minimal Elegant Narrative (5 cols) coming from right */}
          <motion.div
            initial={{ opacity: 0, x: 60, rotate: 2 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-brand-yellow font-semibold">
                  03 / The Signature Dish
                </span>
                <span className="w-8 h-[1px] bg-brand-yellow/60" />
              </div>
              <h2 className="font-philosopher text-3xl sm:text-5xl lg:text-[3.25rem] font-bold text-white leading-[1.08] tracking-tight">
                Made to be shared.
              </h2>
            </div>

            <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed">
              A generous mandi experience, prepared for the moments that bring people together.
            </p>

            <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
              Aged long-grain basmati is infused with whole cardamom, dried black loomi, and cloves, while tender meat roasts gently over fragrant wood embers until it yields to the gentlest touch.
            </p>

            {/* Key Specs */}
            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/[0.08] text-xs font-mono">
              <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                <span className="text-zinc-500 block uppercase tracking-wider text-[10px]">Slow Cooking</span>
                <span className="text-zinc-200 font-medium">4 Hours Pit Sealed</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                <span className="text-zinc-500 block uppercase tracking-wider text-[10px]">Rice Refills</span>
                <span className="text-brand-yellow font-medium">Complimentary Always</span>
              </div>
            </div>

            <div className="pt-2">
              <Link href="/menu" className="btn-secondary group inline-flex">
                <span>Discover Our Menu</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
