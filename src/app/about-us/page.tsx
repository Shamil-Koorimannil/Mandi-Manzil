import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Flame, Heart, Users } from "lucide-react";
import { generatePageMetadata } from "@/lib/metadata";
import { STORY_PILLARS, CORE_TEAM, BRAND_STORY } from "@/data/story";

export const metadata: Metadata = generatePageMetadata({
  title: "Our Story — The Heritage of the Hearth",
  description:
    "Learn about Mandi Manzil's heritage, authentic wood-fired Yemeni cooking techniques, and the founding team bringing true Arabian hospitality to Kerala since 2016.",
  path: "/about-us",
  image: "/images/about-story.jpg",
});

export default function AboutUsPage() {
  return (
    <div className="pt-28 pb-24 lg:pt-36 lg:pb-32 bg-[#141314] min-h-screen">
      <div className="site-container space-y-20 lg:space-y-32">
        
        {/* 1. Compelling Introduction with Large Feature Visual */}
        <div className="space-y-10 lg:space-y-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-2.5">
              <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-brand-yellow font-semibold">
                Heritage &bull; Established 2016
              </span>
              <span className="w-8 h-[1px] bg-brand-yellow/60" />
            </div>
            <h1 className="font-philosopher text-4xl sm:text-6xl lg:text-[4.25rem] font-bold text-white tracking-tight leading-[1.06]">
              The Heritage of the Hearth.
            </h1>
            <p className="text-base sm:text-lg text-zinc-300 font-light mt-4 leading-relaxed max-w-2xl">
              We don&apos;t just serve food — we honor an ancient subterranean roasting tradition, welcoming guests to gather around authentic Yemeni platters.
            </p>
          </div>

          {/* Large Hero Photograph */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden border border-white/[0.1] shadow-2xl bg-[#1B1A1B] group">
            <Image
              src="/images/hero-banquet.jpg"
              alt="Communal Arabian Mandi banquet at Mandi Manzil"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center transform transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.01]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-brand-yellow font-bold block">
                  The Majlis Tradition
                </span>
                <p className="font-philosopher text-xl sm:text-2xl font-bold text-white mt-0.5">
                  Shared platters, continuous refills, heartfelt hospitality.
                </p>
              </div>
              <span className="text-xs font-mono text-zinc-400">Cheruvannur Flagship, Calicut</span>
            </div>
          </div>
        </div>

        {/* 2. Editorial Narrative Moments (Not Generic Mission Cards) */}
        <div className="space-y-16 lg:space-y-24">
          
          {/* Moment 1: The Yemeni Pit Ritual */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-yellow font-mono block">
                01 &bull; The Subterranean Hearth
              </span>
              <h2 className="font-philosopher text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Where the meat perfumes the rice from above.
              </h2>
              <p className="text-base text-zinc-300 font-light leading-relaxed">
                Mandi was born in Hadhramaut, Yemen. Unlike rice dishes cooked in rapid pots or boiled in gravies, true Mandi is prepared in an airtight clay taboon dug into the earth.
              </p>
              <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                Aged long-grain basmati rests in a heavy pot at the base, while prime marinated cuts hang directly above on wire grates. As the meat roasts over incandescent wood embers, every drop of seasoned marrow drips down into the rice, imparting a rich, delicate wood smoke aroma.
              </p>
            </div>

            <div className="lg:col-span-6 relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/[0.08] shadow-xl bg-[#1B1A1B] group">
              <Image
                src="/images/about-story.jpg"
                alt="Wood-fired pit preparation spices and rice"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transform transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Moment 2: The Communal Hospitality */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-6 relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/[0.08] shadow-xl bg-[#1B1A1B] order-2 lg:order-1 group">
              <Image
                src="/images/gallery/gallery-06.jpg"
                alt="Traditional shared brass platter at Mandi Manzil"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transform transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="lg:col-span-6 space-y-4 order-1 lg:order-2">
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-yellow font-mono block">
                02 &bull; The Spirit of Majlis
              </span>
              <h2 className="font-philosopher text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Hospitality measured in generosity.
              </h2>
              <p className="text-base text-zinc-300 font-light leading-relaxed">
                In traditional Arabian culture, dining is never a solitary transaction. It is a shared ritual where families and friends eat from one circular brass platter.
              </p>
              <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                At Mandi Manzil, this principle remains unwavering. Every dine-in guest enjoys unlimited fragrant basmati rice refills, rich bowls of spiced Maraq broth, crushed Salata Hara, and garlic Toum.
              </p>
            </div>
          </div>

          {/* Moment 3: The Verified Journey & Dates */}
          <div className="p-8 sm:p-12 rounded-3xl bg-[#181718] border border-white/[0.08] relative">
            <div className="max-w-3xl space-y-3.5">
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-yellow font-mono block">
                Chronicle &bull; Roots &amp; Evolution
              </span>
              <h3 className="font-philosopher text-2xl sm:text-3xl font-bold text-white">
                From Malabar Craft to Kerala&apos;s Mandi Destination
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                While our founding team&apos;s culinary roots and regional catering background in Malabar trace back to <strong>2006</strong>, the dedicated <strong>Mandi Manzil</strong> restaurant brand was formally established in <strong>2016</strong> to focus exclusively on slow-cooked Arabic Mandi.
              </p>
              <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                What began in Calicut has grown steadily across Kerala to 16 welcoming branch locations spanning Kozhikode, Thiruvananthapuram, Thrissur, and Kollam.
              </p>
            </div>
          </div>

        </div>

        {/* 3. Leadership & Managing Partners (Editorial Portrait Gallery) */}
        <div className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-6">
            <div>
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-yellow font-mono block mb-2">
                The Stewards of Craft
              </span>
              <h2 className="font-philosopher text-3xl sm:text-4xl font-bold text-white">
                Core Leadership Team
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 font-light max-w-sm">
              The managing partners ensuring every branch maintains authentic recipes, wood-fired techniques, and warm service.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6">
            {CORE_TEAM.map((member) => (
              <div key={member.name} className="space-y-3 group text-center">
                <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/[0.1] bg-[#181718] group-hover:border-brand-yellow/40 transition-colors">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 50vw, 20vw"
                    className="object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div>
                  <h3 className="font-philosopher text-lg font-bold text-white group-hover:text-brand-yellow transition-colors">
                    {member.name}
                  </h3>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block mt-0.5">
                    {member.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Subtle Route to Menu & Branches */}
        <div className="pt-10 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-philosopher text-2xl font-bold text-white">
              Ready to taste the tradition?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 font-light mt-1">
              Explore our slow-cooked menu or find your nearest branch across Kerala.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/menu" className="btn-primary">
              <span>View The Menu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/branches" className="btn-secondary">
              <span>Find Branches</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
