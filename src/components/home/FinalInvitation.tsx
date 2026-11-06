import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FinalInvitation() {
  return (
    <section className="relative py-28 sm:py-36 lg:py-40 overflow-hidden bg-[#100F10] border-t border-white/[0.06]">
      {/* Cinematic Full-Bleed Food Image with Deep Editorial Scrim */}
      <div className="absolute inset-0">
        <Image
          src="/images/gallery/gallery-06.jpg"
          alt="Communal dining platter at Mandi Manzil"
          fill
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.32] contrast-[1.08] transform scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#100F10] via-[#100F10]/70 to-[#100F10]/80" />
      </div>

      <div className="reading-container text-center relative z-10 space-y-6">
        <div className="flex items-center justify-center gap-3">
          <span className="w-8 h-[1px] bg-brand-yellow/60" />
          <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-brand-yellow font-semibold">
            06 / An Invitation
          </span>
          <span className="w-8 h-[1px] bg-brand-yellow/60" />
        </div>

        <h2 className="font-philosopher text-4xl sm:text-6xl lg:text-[4.25rem] font-bold text-white tracking-tight leading-[1.05]">
          Good food. Better company.
        </h2>

        <p className="text-base sm:text-lg text-zinc-300 font-light max-w-lg mx-auto leading-relaxed">
          Join us at our communal majlis tables across Kerala for a slow-cooked feast made to be remembered.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/menu" className="btn-primary group">
            <span>Explore the Menu</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
          <Link href="/branches" className="btn-secondary">
            <span>Locate Nearest Branch</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
