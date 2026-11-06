"use client";

import Link from "next/link";
import { ArrowUpRight, Flame, Phone } from "lucide-react";
import { CONTACT_INFO } from "@/data/navigation";

export function SleekFinalInvitation() {
  return (
    <section className="py-28 lg:py-36 bg-[#080708] border-t border-white/[0.08] relative overflow-hidden">
      {/* Saffron ember glow */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full opacity-20 blur-[140px]"
        style={{
          background: "radial-gradient(circle, #FCCB1C 0%, #E07A5F 50%, transparent 70%)",
        }}
      />

      <div className="site-container relative z-10 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] mb-6">
          <Flame className="w-3.5 h-3.5 text-[#FCCB1C]" />
          <span className="text-[11px] font-medium tracking-[0.25em] uppercase text-white/75">
            The Communal Tradition
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-normal text-white mb-6 leading-tight">
          Gather Around the Hearth.
        </h2>

        <p className="text-base sm:text-lg text-white/60 font-light max-w-2xl mx-auto leading-relaxed mb-10">
          Experience authentic slow wood-fired Mandi the way it was intended —
          unhurried, fragrant, and shared in generous company across 16 branches in Kerala.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#FCCB1C] text-[#141314] font-medium text-xs tracking-wider uppercase transition-all duration-300 hover:bg-[#FFD84D] hover:shadow-[0_0_30px_rgba(252,203,28,0.35)] hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Explore Complete Menu</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          <Link
            href="/branches"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-white/15 bg-white/[0.02] text-white/90 text-xs tracking-wider uppercase hover:border-white/35 hover:bg-white/[0.06] transition-all duration-300"
          >
            <span>Locate Nearest Branch</span>
          </Link>

          {CONTACT_INFO.telLink && (
            <a
              href={CONTACT_INFO.telLink}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-white/10 text-white/60 text-xs tracking-wider uppercase hover:text-[#FCCB1C] hover:border-[#FCCB1C]/30 transition-all duration-300"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{CONTACT_INFO.centralCustomerCare}</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

