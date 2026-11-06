"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GALLERY_ITEMS, GalleryItem } from "@/data/gallery";

export function GalleryClient() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems =
    activeCategory === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) =>
          prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1
        );
      }
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) =>
          prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  // Lock body scroll when lightbox open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  // Curated aspect ratio mapping for intentional asymmetrical rhythm
  const getAspectRatioClass = (idx: number) => {
    const pattern = [
      "aspect-[4/5] md:col-span-1 md:row-span-2", // Tall portrait 1
      "aspect-[16/10] md:col-span-2",             // Wide landscape 2
      "aspect-[1/1]",                             // Square 3
      "aspect-[1/1]",                             // Square 4
      "aspect-[16/10] md:col-span-2",             // Wide landscape 5
      "aspect-[4/5] md:col-span-1 md:row-span-2", // Tall portrait 6
      "aspect-[1/1]",                             // Square 7
      "aspect-[16/10]",                           // Landscape 8
      "aspect-[16/9] md:col-span-2",              // Wide cinematic 9
    ];
    return pattern[idx % pattern.length];
  };

  return (
    <div className="space-y-10 lg:space-y-12">
      
      {/* Category Filter */}
      <div className="flex flex-wrap items-center justify-start gap-1.5 sm:gap-2 border-b border-white/[0.08] pb-5">
        {[
          { label: "All Works", value: "all" },
          { label: "Mandi Platters", value: "food" },
          { label: "Dining Atmosphere", value: "dining" },
          { label: "Hearth Craft", value: "preparation" },
        ].map((cat) => {
          const isActive = activeCategory === cat.value;
          return (
            <button
              key={cat.value}
              type="button"
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] rounded-full transition-colors cursor-pointer ${
                isActive
                  ? "bg-brand-yellow text-[#141314] font-bold"
                  : "bg-white/[0.02] text-zinc-400 hover:text-white hover:bg-white/[0.05]"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Asymmetric Curated Gallery Grid (Pinterest/Editorial Style) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-start">
        {filteredItems.map((item, index) => (
          <div
            key={item.id}
            onClick={() => setLightboxIndex(index)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setLightboxIndex(index);
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={`Inspect photo: ${item.caption}`}
            className={`group relative rounded-2xl overflow-hidden bg-[#1B1A1B] border border-white/[0.08] hover:border-brand-yellow/40 transition-colors duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-yellow ${getAspectRatioClass(index)}`}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center transform transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
            />
            
            {/* Subtle Gradient & Restrained Caption Reveal */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-85 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 sm:p-6">
              <span className="text-[10px] font-mono uppercase tracking-widest text-brand-yellow font-bold mb-1">
                {item.category === "food" ? "Platter Craft" : item.category === "dining" ? "Hospitality" : "Preparation"}
              </span>
              <p className="font-philosopher text-lg font-bold text-white leading-snug">
                {item.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Accessible Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image Lightbox"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 p-2.5 text-zinc-400 hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-yellow rounded-full bg-black/60 border border-white/10"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6 text-white" strokeWidth={1.5} />
          </button>

          {/* Previous */}
          <button
            type="button"
            onClick={() =>
              setLightboxIndex((prev) =>
                prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1
              )
            }
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 text-zinc-400 hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-yellow rounded-full bg-black/60 border border-white/10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5 text-white" strokeWidth={1.75} />
          </button>

          {/* Main Display */}
          <div className="max-w-5xl max-h-[85vh] flex flex-col items-center">
            <div className="relative w-[90vw] max-w-4xl h-[65vh]">
              <Image
                src={filteredItems[lightboxIndex].src}
                alt={filteredItems[lightboxIndex].alt}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
            </div>
            <div className="text-center mt-4">
              <p className="font-philosopher text-xl font-bold text-white">
                {filteredItems[lightboxIndex].caption}
              </p>
              <p className="text-xs font-mono text-zinc-500 mt-1">
                {lightboxIndex + 1} of {filteredItems.length} &bull; Mandi Manzil Archive
              </p>
            </div>
          </div>

          {/* Next */}
          <button
            type="button"
            onClick={() =>
              setLightboxIndex((prev) =>
                prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0
              )
            }
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 text-zinc-400 hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-yellow rounded-full bg-black/60 border border-white/10"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5 text-white" strokeWidth={1.75} />
          </button>
        </div>
      )}

    </div>
  );
}
