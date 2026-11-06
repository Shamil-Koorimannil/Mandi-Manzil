"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function EditorialHero() {
  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex items-center pt-24 pb-16 lg:py-0 overflow-hidden bg-[#121112] border-b border-white/[0.06]">
      {/* Ambient warm glow in charcoal darkness */}
      <div
        className="absolute top-1/4 right-1/4 w-[520px] h-[520px] bg-brand-yellow/[0.045] rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 -left-20 w-[420px] h-[420px] bg-brand-yellow/[0.03] rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="site-container w-full py-10 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Narrative Column (7 cols) with Framer Motion Stagger */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 sm:space-y-8 z-10"
          >
            {/* Editorial Index Kicker */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-3"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 text-[11px] font-mono tracking-[0.2em] uppercase text-brand-yellow font-semibold">
                <Sparkles className="w-3 h-3 text-brand-yellow" />
                01 / The Art of Mandi
              </span>
              <span className="w-8 h-[1px] bg-brand-yellow/60" />
              <span className="text-[11px] font-mono tracking-wider text-zinc-500 uppercase hidden sm:inline">
                Est. 2016 • 16 Kerala Branches
              </span>
            </motion.div>

            {/* Disciplined Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-philosopher text-4xl sm:text-5xl lg:text-[4rem] xl:text-[4.35rem] font-bold text-white leading-[1.06] tracking-tight"
            >
              A tradition worth gathering for.
            </motion.h1>

            {/* Supporting Line */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed max-w-xl"
            >
              Slow-cooked flavour. Generous hospitality. Authentic subterranean wood-fired Mandi that brings everyone together across Kerala.
            </motion.p>

            {/* Restrained Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
            >
              <Link href="/menu" className="btn-primary group">
                <span>Explore the Menu</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link href="/branches" className="btn-secondary">
                <span>Find Your Nearest Branch</span>
              </Link>
            </motion.div>

            {/* Architectural Spec Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="pt-6 border-t border-white/[0.08] grid grid-cols-3 gap-4 max-w-lg"
            >
              <div>
                <span className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500">Method</span>
                <span className="text-xs sm:text-sm font-medium text-zinc-200">Subterranean Pit</span>
              </div>
              <div>
                <span className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500">Hospitality</span>
                <span className="text-xs sm:text-sm font-medium text-brand-yellow">Unlimited Rice</span>
              </div>
              <div>
                <span className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500">Outlets</span>
                <span className="text-xs sm:text-sm font-medium text-zinc-200">16 In Kerala</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Architectural Image Asset with Controlled Overlap & 3D Entry (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, rotate: 3, x: 40 }}
            animate={{ opacity: 1, scale: 1, rotate: 0, x: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Image Frame (4:5 Aspect Ratio) with subtle hover float */}
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/[0.12] bg-[#1B1A1B] shadow-2xl group">
                <Image
                  src="/images/dishes/chicken-mandi.jpg"
                  alt="Authentic Mandi Manzil Chicken Mandi Platter served on traditional embossed brass"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-center transform scale-100 group-hover:scale-[1.03] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Controlled Overlap Caption Card sliding in from the side */}
              <motion.div
                initial={{ opacity: 0, x: -30, rotate: -4 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{ duration: 0.7, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="hidden sm:block absolute -bottom-6 -left-6 bg-[#181718]/95 backdrop-blur-md border border-white/[0.12] p-4 sm:p-5 rounded-2xl shadow-2xl max-w-xs z-20"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-brand-yellow font-bold">
                    Signature Majlis Platter
                  </span>
                </div>
                <p className="text-xs text-zinc-300 font-light leading-relaxed">
                  Slow-steamed chicken over aromatic aged basmati, accompanied by rich Maraq broth and velvety garlic toum.
                </p>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
