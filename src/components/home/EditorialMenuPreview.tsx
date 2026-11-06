"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DISHES } from "@/data/dishes";
import { motion } from "framer-motion";

export function EditorialMenuPreview() {
  // Carefully select 3 standout dishes with verified real details
  const chicken = DISHES.find((d) => d.id === "chicken-mandi") || DISHES[0];
  const mutton = DISHES.find((d) => d.id === "mutton-mandi") || DISHES[2];
  const alfaham = DISHES.find((d) => d.id === "alfaham-mandi") || DISHES[4];

  return (
    <section className="section-rhythm bg-[#121112] border-t border-white/[0.06] relative">
      <div className="site-container">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-brand-yellow font-semibold">
                04 / Culinary Selection
              </span>
              <span className="w-8 h-[1px] bg-brand-yellow/60" />
            </div>
            <h2 className="font-philosopher text-3xl sm:text-5xl lg:text-[3.25rem] font-bold text-white tracking-tight leading-tight">
              Flavours of the Mandi.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 font-light max-w-sm leading-relaxed">
            Prepared fresh for every service with fragrant aged basmati and slow-cooked cuts.
          </p>
        </div>

        {/* Asymmetrical Editorial Composition (3 Dishes, Varied Proportions) with Scroll Motion */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Main Dish Feature (7 cols) - Tall 4:5 Aspect Ratio sliding from Left with subtle angle */}
          <motion.div
            initial={{ opacity: 0, x: -40, rotate: -2 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-4 group"
          >
            <div className="relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5] rounded-3xl overflow-hidden border border-white/[0.08] bg-[#1f1e1f] shadow-2xl">
              <Image
                src={chicken.image}
                alt={chicken.name}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-104"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-brand-yellow font-bold px-3 py-1 bg-black/80 rounded-full border border-brand-yellow/20">
                  Classic Mandi
                </span>
              </div>
            </div>

            <div className="pt-2">
              <h3 className="font-philosopher text-2xl sm:text-3xl font-bold text-white group-hover:text-brand-yellow transition-colors">
                {chicken.name}
              </h3>
              <p className="text-sm text-zinc-400 font-light leading-relaxed mt-1.5 max-w-lg">
                {chicken.description}
              </p>
              <div className="mt-2 text-xs font-mono text-zinc-500">
                Quarter • Half • Full Platter
              </div>
            </div>
          </motion.div>

          {/* Secondary Stack (5 cols) sliding from Right with subtle angle */}
          <motion.div
            initial={{ opacity: 0, x: 40, rotate: 2 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-10 lg:space-y-12"
          >
            
            {/* Dish 2: Mutton Mandi - Landscape 16:10 */}
            <div className="space-y-3 group">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/[0.08] bg-[#1f1e1f] shadow-lg">
                <Image
                  src={mutton.image}
                  alt={mutton.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-104"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-brand-yellow font-bold px-3 py-1 bg-black/80 rounded-full border border-brand-yellow/20">
                    Traditional Pit Cut
                  </span>
                </div>
              </div>

              <div className="pt-1">
                <h3 className="font-philosopher text-xl sm:text-2xl font-bold text-white group-hover:text-brand-yellow transition-colors">
                  {mutton.name}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed mt-1">
                  {mutton.description}
                </p>
              </div>
            </div>

            {/* Dish 3: Alfaham Mandi - Compact Square 1:1 */}
            <div className="space-y-3 group">
              <div className="relative aspect-[16/10] sm:aspect-[2/1] lg:aspect-[16/10] rounded-2xl overflow-hidden border border-white/[0.08] bg-[#1f1e1f] shadow-lg">
                <Image
                  src={alfaham.image}
                  alt={alfaham.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-104"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-brand-yellow font-bold px-3 py-1 bg-black/80 rounded-full border border-brand-yellow/20">
                    Charcoal Fusion
                  </span>
                </div>
              </div>

              <div className="pt-1">
                <h3 className="font-philosopher text-xl sm:text-2xl font-bold text-white group-hover:text-brand-yellow transition-colors">
                  {alfaham.name}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed mt-1">
                  {alfaham.description}
                </p>
              </div>
            </div>

            {/* Link to Full Menu */}
            <div className="pt-4 border-t border-white/[0.08]">
              <Link href="/menu" className="btn-secondary group w-full justify-between">
                <span>View Full Menu with All 8 Varieties</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
