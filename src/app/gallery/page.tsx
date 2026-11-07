import { notFound } from "next/navigation";

// Gallery Page is hashed out for now per project requirements.
export default function GalleryPage() {
  notFound();
}

/*
import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { GalleryClient } from "@/components/gallery/GalleryClient";

export const metadata: Metadata = generatePageMetadata({
  title: "Gallery — Curated Visual Archive",
  description:
    "Immerse yourself in authentic Kerala Mandi moments, wood-fired culinary craft, and traditional dining spaces at Mandi Manzil.",
  path: "/gallery",
  image: "/images/gallery/gallery-01.jpg",
});

export default function GalleryPage() {
  return (
    <div className="pt-28 pb-24 lg:pt-36 lg:pb-32 bg-[#141314] min-h-screen">
      <div className="site-container">
        <div className="max-w-3xl mb-12 lg:mb-14">
          <div className="flex items-center gap-3 mb-2.5">
            <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-brand-yellow font-semibold">
              Visual Archive &bull; Mandi Manzil
            </span>
            <span className="w-8 h-[1px] bg-brand-yellow/60" />
          </div>
          <h1 className="font-philosopher text-4xl sm:text-6xl lg:text-[4.25rem] font-bold text-white tracking-tight leading-[1.06]">
            Moments of Feasting &amp; Craft.
          </h1>
          <p className="text-base sm:text-lg text-zinc-300 font-light mt-4 leading-relaxed max-w-xl">
            A curated photographic window into our subterranean hearths, communal brass platters, and warm gathering spaces across Kerala.
          </p>
        </div>

        <GalleryClient />
      </div>
    </div>
  );
}
*/
