"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Flame, Star, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Dish {
  id: string;
  name: string;
  category: string;
  price: string;
  tag: string;
  rating: string;
  image: string;
  description: string;
}

const SHOWCASE_DISHES: Dish[] = [
  {
    id: "royal-mutton",
    name: "Royal Mutton Mandi",
    category: "Signature Pit Roast",
    price: "₹790",
    tag: "Chef's Crown",
    rating: "4.9",
    image: "/images/dishes/mutton half with rice.png",
    description: "Young mutton slow-cooked 4 hours over charcoal until the bone pulls free effortlessly.",
  },
  {
    id: "woodfired-chicken",
    name: "Classic Chicken Mandi",
    category: "Traditional Yemeni",
    price: "₹420",
    tag: "Best Seller",
    rating: "4.8",
    image: "/images/dishes/normal mandi full with rice.png",
    description: "Golden crispy skin outside, succulent steam-infused meat inside over aged saffron basmati.",
  },
  {
    id: "alfaham-mandi",
    name: "Smoked Alfaham Mandi",
    category: "Charcoal Infused",
    price: "₹450",
    tag: "Wood-Smoked",
    rating: "4.9",
    image: "/images/dishes/alfaham with rice.png",
    description: "Arabian herbs marinade, charred over open embers, served atop warm fragrant spiced rice.",
  },
  {
    id: "beef-mandi",
    name: "Tender Beef Mandi",
    category: "Slow Pit Braise",
    price: "₹520",
    tag: "Special Reserve",
    rating: "4.8",
    image: "/images/dishes/Beef half with rice.png",
    description: "Prime cuts slowly tenderized in fragrant pit vapors with cloves and toasted black pepper.",
  },
  {
    id: "peri-peri-mandi",
    name: "Peri-Peri Flame Mandi",
    category: "Spiced Fusion",
    price: "₹460",
    tag: "Spicy Favorite",
    rating: "4.7",
    image: "/images/dishes/peri peri with rice.png",
    description: "Crushed bird's eye chilies and garlic glaze paired with cooling house toum & maraq.",
  },
  {
    id: "honey-chilly-mandi",
    name: "Honey Chilly Mandi",
    category: "Glazed Specialty",
    price: "₹480",
    tag: "Unique Blend",
    rating: "4.8",
    image: "/images/dishes/Honey with rice.png",
    description: "Sweet wild bee honey glaze contrasted with pit-roasted heat and toasted dry fruits.",
  },
  {
    id: "green-chilly-mandi",
    name: "Green Chilly Mandi",
    category: "Herbal Flame",
    price: "₹470",
    tag: "Fiery Classic",
    rating: "4.8",
    image: "/images/dishes/Green chilie with rice.png",
    description: "Fresh crushed green chilies infused into steam-seared meat and long grain rice.",
  },
  {
    id: "spicy-mandi",
    name: "Special Spicy Mandi",
    category: "Ember Roasted",
    price: "₹490",
    tag: "Hot Signature",
    rating: "4.9",
    image: "/images/dishes/Spicy half with rice.png",
    description: "Bold Arabic spices and red masala glazed over tender charcoal roasted meat.",
  },
];

export function KineticDishShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      // Calculate total horizontal scroll distance
      const scrollWidth = track.scrollWidth - window.innerWidth + 80;

      if (scrollWidth > 0 && window.innerWidth > 768) {
        gsap.to(track, {
          x: -scrollWidth,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 20%",
            end: () => `+=${scrollWidth}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              // Dynamic velocity-skew trick! Cards subtly tilt on rapid scrolling
              const velocity = self.getVelocity();
              const clampSkew = Math.max(-6, Math.min(6, velocity / 300));
              gsap.to(track.children, {
                skewX: clampSkew,
                duration: 0.4,
                ease: "power2.out",
                overwrite: "auto",
              });
            },
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-[#090809] border-t border-white/[0.07] overflow-hidden"
    >
      {/* Header */}
      <div className="site-container mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] mb-3">
            <Sparkles className="w-3 h-3 text-[#FCCB1C]" />
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/70">
              The Curated Collection
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-white">
            Signature Pit Creations
          </h2>
        </div>

        <Link
          href="/menu"
          className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#FCCB1C] hover:text-[#FFD84D] transition-colors"
        >
          <span>View All Offerings</span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>

      {/* Horizontal Track */}
      <div className="relative w-full overflow-x-auto md:overflow-visible no-scrollbar px-6 md:px-12">
        <div
          ref={trackRef}
          className="flex gap-6 sm:gap-8 w-max pb-8 pt-4 will-change-transform"
        >
          {SHOWCASE_DISHES.map((dish) => (
            <div
              key={dish.id}
              className="group relative w-[290px] sm:w-[350px] rounded-3xl bg-[#141314] border border-white/10 p-5 flex flex-col justify-between transition-all duration-500 hover:border-[#FCCB1C]/40 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
            >
              {/* Image Frame with Floating 3D Product Platter */}
              <div className="relative w-full h-[240px] sm:h-[280px] rounded-2xl overflow-hidden mb-5 bg-[#171617] border border-white/[0.04] flex items-center justify-center p-4">
                {/* Subtle radial glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(252,203,28,0.12)_0%,transparent_70%)] pointer-events-none" />

                <div className="relative w-full h-full drop-shadow-[0_20px_25px_rgba(0,0,0,0.85)] transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-2">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    sizes="(max-width: 640px) 290px, 350px"
                    className="object-contain filter contrast-[1.05]"
                  />
                </div>

                {/* Top Overlay Badge */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full backdrop-blur-md bg-black/70 border border-white/10 text-[11px] text-[#FCCB1C] font-mono z-10">
                  {dish.tag}
                </div>

                {/* Rating Badge */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full backdrop-blur-md bg-black/70 border border-white/10 text-[11px] text-white flex items-center gap-1 z-10">
                  <Star className="w-3 h-3 fill-[#FCCB1C] text-[#FCCB1C]" />
                  <span>{dish.rating}</span>
                </div>
              </div>

              {/* Dish Meta */}
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-[11px] font-mono text-white/50 uppercase tracking-wider">
                    {dish.category}
                  </span>
                  <span className="text-xl font-serif text-[#FCCB1C] font-normal">
                    {dish.price}
                  </span>
                </div>

                <h3 className="text-xl font-serif text-white mb-2 group-hover:text-[#FCCB1C] transition-colors">
                  {dish.name}
                </h3>

                <p className="text-xs text-white/65 leading-relaxed line-clamp-2 font-light mb-4">
                  {dish.description}
                </p>
              </div>

              {/* Bottom Quick Order Link */}
              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-[11px] text-white/40">Includes Maraq & Toum</span>
                <Link
                  href="/menu"
                  className="inline-flex items-center gap-1 text-xs text-[#FCCB1C] font-medium group-hover:underline"
                >
                  <span>Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

