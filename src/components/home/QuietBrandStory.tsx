import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function QuietBrandStory() {
  return (
    <section className="section-rhythm bg-[#111011] border-t border-white/[0.06] relative">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Text block (5 cols) */}
          <div className="lg:col-span-5 space-y-6 order-2 lg:order-1">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-brand-yellow font-semibold">
                  04 / Our Story
                </span>
                <span className="w-8 h-[1px] bg-brand-yellow/60" />
              </div>
              <h2 className="font-philosopher text-3xl sm:text-5xl lg:text-[3.25rem] font-bold text-white leading-[1.08] tracking-tight">
                Rooted in tradition. Made for today.
              </h2>
            </div>

            <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed">
              Born from a passion for authentic Yemeni wood-fired mandi, Mandi Manzil honors time-honored subterranean cooking and generous hospitality.
            </p>

            <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
              What began in 2016 has grown into Kerala&apos;s most trusted gathering table across 16 branches, with unlimited basmati rice refills and warm majlis dining.
            </p>

            <div className="pt-2">
              <Link href="/about-us" className="btn-secondary group inline-flex">
                <span>The Mandi Manzil Story</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Visual block (7 cols) - Order 1 on mobile, Order 2 on desktop */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden border border-white/[0.1] shadow-2xl bg-[#1B1A1B] group">
              <Image
                src="/images/about-story.jpg"
                alt="Traditional spices, basmati rice, and slow-cooked meat at Mandi Manzil"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover object-center transform transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 right-5 hidden sm:block">
                <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-300 px-3.5 py-1 bg-[#141314]/90 backdrop-blur-sm border border-white/10 rounded-full">
                  Kozhikode Flagship &bull; Kerala
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
