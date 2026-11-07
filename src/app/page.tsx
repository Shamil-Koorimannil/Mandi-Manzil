import type { Metadata } from "next";
import { CinematicScrollHero } from "@/components/home/CinematicScrollHero";
import { GsapAnatomyShowcase } from "@/components/home/GsapAnatomyShowcase";
import { InteractiveFeastSelector } from "@/components/home/InteractiveFeastSelector";
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
      {/* 01. Cinematic Scroll Story Hero (Scene 01: The Arabian Journey) */}
      <CinematicScrollHero />

      {/* 02. GSAP ScrollTrigger Pinned Anatomy Showcase (The Alchemy of the Pit) */}
      <GsapAnatomyShowcase />

      {/* 03. Unlimited Rice Portions & Chef's Special Mandi Picks (8-Dish Grid) */}
      <InteractiveFeastSelector />

      {/* 04. Minimal Final Communal Invitation */}
      <SleekFinalInvitation />
    </>
  );
}
