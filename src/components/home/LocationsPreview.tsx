import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

export function LocationsPreview() {
  const regions = [
    { name: "Kozhikode", detail: "Flagship at Cheruvannur" },
    { name: "Thiruvananthapuram", detail: "6 Central & City Outlets" },
    { name: "Thrissur", detail: "Kaipamangalam, Chalakudy & Perambra" },
    { name: "Kollam", detail: "Kadappakada, Mevaram & Highway Hubs" },
  ];

  return (
    <section className="section-rhythm bg-[#141314] border-t border-white/[0.06] relative">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Branch Storefront Visual (6 cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden border border-white/[0.1] shadow-2xl bg-[#1B1A1B] group">
              <Image
                src="/images/branches/kaipamangalam.jpg"
                alt="Mandi Manzil Kaipamangalam restaurant storefront"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transform transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-5 left-5 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-yellow" />
                <span className="text-xs uppercase font-mono tracking-wider text-white font-medium">
                  Kaipamangalam &bull; Thrissur Belt
                </span>
              </div>
            </div>
          </div>

          {/* Editorial Text Block & Regions (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-brand-yellow font-semibold">
                  05 / Statewide Presence
                </span>
                <span className="w-8 h-[1px] bg-brand-yellow/60" />
              </div>
              <h2 className="font-philosopher text-3xl sm:text-5xl lg:text-[3.25rem] font-bold text-white leading-[1.08] tracking-tight">
                Find us near you.
              </h2>
            </div>

            <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed">
              From our flagship kitchen in Kozhikode to 16 welcoming spaces across Kerala, authentic wood-fired Mandi is never far away.
            </p>

            {/* Clean, airy region list (no heavy card boxes) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/[0.08]">
              {regions.map((reg) => (
                <div key={reg.name} className="space-y-0.5">
                  <h3 className="font-philosopher text-lg font-bold text-white">
                    {reg.name}
                  </h3>
                  <p className="text-xs text-zinc-400 font-light">
                    {reg.detail}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link href="/branches" className="btn-primary group inline-flex">
                <span>Explore Our Branches</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
