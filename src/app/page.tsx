import type { Metadata } from "next";
import { MinimalHero } from "@/components/home/MinimalHero";
import { GsapAnatomyShowcase } from "@/components/home/GsapAnatomyShowcase";
import { InteractiveFeastSelector } from "@/components/home/InteractiveFeastSelector";
import { SleekLocations } from "@/components/home/SleekLocations";
import { SleekFinalInvitation } from "@/components/home/SleekFinalInvitation";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Mandi Manzil | Authentic Wood-Fired Yemeni Mandi in Kerala",
  description:
    "Kerala's premier destination for authentic wood-fired Yemeni Mandi. Slow-cooked subterranean clay ovens, cardamom-infused basmati, and shared communal platters across 16 branches.",
  path: "",
  image: "/images/showcase/top-shot-platter.jpg",
});

export default function HomePage() {
  return (
    <>
      {/* 01. Minimal Hero: Plain Grey Background, Slide-In Text & Dish, Dual Scroll Exit */}
      <MinimalHero />

      {/* 02. GSAP ScrollTrigger Pinned Anatomy Showcase (The Alchemy of the Pit) */}
      <GsapAnatomyShowcase />

      {/* 03. Unlimited Rice Portions & Chef's Special Mandi Picks (8-Dish Grid) */}
      <InteractiveFeastSelector />

      {/* 04. Sleek Branch & Location Navigator */}
      <SleekLocations />

      {/* 05. Minimal Final Communal Invitation */}
      <SleekFinalInvitation />
    </>
  );
}
