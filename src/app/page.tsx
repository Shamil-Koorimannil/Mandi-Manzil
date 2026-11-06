import type { Metadata } from "next";
import { MinimalHero } from "@/components/home/MinimalHero";
import { GsapAnatomyShowcase } from "@/components/home/GsapAnatomyShowcase";
import { InteractiveFeastSelector } from "@/components/home/InteractiveFeastSelector";
import { KineticDishShowcase } from "@/components/home/KineticDishShowcase";
import { MinimalStatsGrid } from "@/components/home/MinimalStatsGrid";
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
      {/* 01. Minimal Anti-Gravity Hero with 3D WebGL Atmosphere Canvas & Levitation Physics */}
      <MinimalHero />

      {/* 02. GSAP ScrollTrigger Pinned Anatomy Showcase (The Alchemy of the Pit) */}
      <GsapAnatomyShowcase />

      {/* 03. 3D Perspective Portion & Feast Selector (Quarter, Half, Full, Spicy) */}
      <InteractiveFeastSelector />

      {/* 04. Kinetic Horizontal Scroll Gallery with GSAP Velocity Skew Physics */}
      <KineticDishShowcase />

      {/* 05. Architectural Numbers & Heritage Grid with GSAP Counters */}
      <MinimalStatsGrid />

      {/* 06. Sleek Branch & Location Navigator */}
      <SleekLocations />

      {/* 07. Minimal Final Communal Invitation */}
      <SleekFinalInvitation />
    </>
  );
}
