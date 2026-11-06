import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { MenuClient } from "@/components/menu/MenuClient";

export const metadata: Metadata = generatePageMetadata({
  title: "The Menu — Authentic Wood-Fired Mandi",
  description:
    "Explore Mandi Manzil's authentic Arabic Mandi menu including slow-cooked Chicken Mandi, Mutton Mandi, Beef Mandi, and Alfaham Mandi with unlimited rice refills.",
  path: "/menu",
  image: "/images/dishes/chicken-mandi.jpg",
});

export default function MenuPage() {
  return (
    <div className="pt-28 pb-24 lg:pt-36 lg:pb-32 bg-[#141314] min-h-screen">
      <div className="site-container">
        
        {/* Food-Led Uncluttered Introduction */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <div className="flex items-center gap-3 mb-2.5">
            <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-brand-yellow font-semibold">
              The Menu &bull; Wood-Fired Yemeni Mandi
            </span>
            <span className="w-8 h-[1px] bg-brand-yellow/60" />
          </div>
          <h1 className="font-philosopher text-4xl sm:text-6xl lg:text-[4.25rem] font-bold text-white tracking-tight leading-[1.06]">
            Slow-cooked. <br />
            <span className="italic font-normal text-zinc-300">Made to gather around.</span>
          </h1>
          <p className="text-base sm:text-lg text-zinc-300 font-light mt-4 leading-relaxed max-w-2xl">
            Every dish at Mandi Manzil honors Yemen&apos;s slow-cooked heritage — fragrant long-grain basmati infused with whole spices and topped with succulent roasted meats.
          </p>
        </div>

        {/* Menu Client */}
        <MenuClient />
      </div>
    </div>
  );
}
