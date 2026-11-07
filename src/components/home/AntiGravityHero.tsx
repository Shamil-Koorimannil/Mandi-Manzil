"use client";

import { useState, useRef, MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Sparkles,
  Star,
  Flame,
  Clock,
  Plus,
  Check,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  UtensilsCrossed,
  ChefHat,
  Award,
  Quote,
} from "lucide-react";

interface DishItem {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviews: string;
  prepTime: string;
  serves: string;
  image: string;
  tag: string;
  tagColor: string;
}

const SIGNATURE_DISHES: DishItem[] = [
  {
    id: "royal-mutton",
    name: "Royal Mutton Mandi",
    category: "Signature Pit Roast",
    rating: 4.9,
    reviews: "3.4k",
    prepTime: "Pit-Sealed 4 hrs",
    serves: "Serves 2-3",
    image: "/images/dishes/mutton half with rice.png",
    tag: "Chef's Crown",
    tagColor: "bg-amber-100 text-amber-900 border-amber-300",
  },
  {
    id: "smoked-madbi",
    name: "Smoked Chicken Madbi",
    category: "Charcoal Fusion",
    rating: 4.8,
    reviews: "2.8k",
    prepTime: "30 mins",
    serves: "Serves 1-2",
    image: "/images/dishes/normal mandi full with rice.png",
    tag: "Wood-Fired",
    tagColor: "bg-orange-100 text-orange-900 border-orange-300",
  },
  {
    id: "grand-feast",
    name: "Manzil Grand Majlis Feast",
    category: "Communal Platter",
    rating: 5.0,
    reviews: "5.1k",
    prepTime: "Fresh Batch Service",
    serves: "Serves 4-5",
    image: "/images/showcase/top-shot-platter.jpg",
    tag: "Unlimited Rice",
    tagColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
  },
];

const CUSTOMER_AVATARS = [
  { name: "Ajmal K.", image: "/images/team/ajmal.png" },
  { name: "Muneer P.", image: "/images/team/muneer.png" },
  { name: "Mishab R.", image: "/images/team/mishab.png" },
];

export function AntiGravityHero() {
  const containerRef = useRef<HTMLElement>(null);
  const [orderItems, setOrderItems] = useState<Record<string, number>>({});
  const [lastAddedDish, setLastAddedDish] = useState<string | null>(null);

  // Mouse 3D parallax tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for weightless physics response
  const springConfig = { damping: 28, stiffness: 95, mass: 0.6 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Multi-tier parallax transformations for depth
  const bgGlowX = useTransform(smoothMouseX, [-0.5, 0.5], [-25, 25]);
  const bgGlowY = useTransform(smoothMouseY, [-0.5, 0.5], [-20, 20]);

  const textParallaxX = useTransform(smoothMouseX, [-0.5, 0.5], [-10, 10]);
  const textParallaxY = useTransform(smoothMouseY, [-0.5, 0.5], [-8, 8]);

  // Primary Center Card (Royal Mutton)
  const card1X = useTransform(smoothMouseX, [-0.5, 0.5], [-35, 35]);
  const card1Y = useTransform(smoothMouseY, [-0.5, 0.5], [-30, 30]);
  const card1RotateX = useTransform(smoothMouseY, [-0.5, 0.5], [6, -6]);
  const card1RotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-8, 8]);

  // Satellite Card 2 (Top Right Madbi)
  const card2X = useTransform(smoothMouseX, [-0.5, 0.5], [40, -40]);
  const card2Y = useTransform(smoothMouseY, [-0.5, 0.5], [30, -30]);

  // Satellite Card 3 (Bottom Left Feast)
  const card3X = useTransform(smoothMouseX, [-0.5, 0.5], [-25, 25]);
  const card3Y = useTransform(smoothMouseY, [-0.5, 0.5], [35, -35]);

  // Floating organic ingredient parallax layers
  const herb1X = useTransform(smoothMouseX, [-0.5, 0.5], [-65, 65]);
  const herb1Y = useTransform(smoothMouseY, [-0.5, 0.5], [-50, 50]);

  const herb2X = useTransform(smoothMouseX, [-0.5, 0.5], [55, -55]);
  const herb2Y = useTransform(smoothMouseY, [-0.5, 0.5], [45, -45]);

  const badge1X = useTransform(smoothMouseX, [-0.5, 0.5], [-45, 45]);
  const badge1Y = useTransform(smoothMouseY, [-0.5, 0.5], [-40, 40]);

  const badge2X = useTransform(smoothMouseX, [-0.5, 0.5], [50, -50]);
  const badge2Y = useTransform(smoothMouseY, [-0.5, 0.5], [45, -45]);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const normalizedX = (e.clientX - rect.left) / rect.width - 0.5;
    const normalizedY = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const toggleOrder = (dishId: string) => {
    setOrderItems((prev) => {
      const current = prev[dishId] || 0;
      const next = current > 0 ? 0 : 1;
      return { ...prev, [dishId]: next };
    });
    setLastAddedDish(dishId);
    setTimeout(() => {
      setLastAddedDish(null);
    }, 2400);
  };

  const totalOrdered = Object.values(orderItems).reduce((sum, count) => sum + count, 0);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[92vh] lg:min-h-screen w-full flex items-center pt-28 pb-20 lg:py-0 overflow-hidden bg-[#FAF9F5] text-slate-900 selection:bg-amber-400 selection:text-slate-950"
    >
      {/* ── Soft Warm Ambient Radial Glows (Light & Organic Aesthetic) ── */}
      <motion.div
        style={{ x: bgGlowX, y: bgGlowY }}
        className="absolute top-1/4 left-1/3 w-[620px] h-[620px] rounded-full bg-gradient-to-tr from-amber-200/40 via-orange-100/30 to-transparent blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <motion.div
        style={{ x: bgGlowY, y: bgGlowX }}
        className="absolute bottom-10 right-10 w-[540px] h-[540px] rounded-full bg-gradient-to-bl from-amber-100/50 via-yellow-100/40 to-transparent blur-[130px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Subtle organic linen/paper background micro-texture */}
      <div
        className="absolute inset-0 bg-[radial-gradient(#00000008_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60"
        aria-hidden="true"
      />

      {/* ════ FLOATING ORGANIC SPICES & INGREDIENTS (Weightless Zero-Gravity Physics) ════ */}
      {/* 1. Floating Fresh Mint Sprig */}
      <motion.div
        style={{ x: herb1X, y: herb1Y }}
        className="absolute top-20 right-[42%] z-10 pointer-events-none hidden md:block"
      >
        <motion.div
          animate={{
            y: [0, -18, 8, 0],
            rotate: [0, 12, -8, 0],
          }}
          transition={{
            duration: 6.8,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-emerald-200/80 shadow-md text-[11px] font-mono text-emerald-800"
        >
          <span className="text-sm">🌿</span>
          <span className="font-medium">Fresh Mountain Mint</span>
        </motion.div>
      </motion.div>

      {/* 2. Floating Sun-Dried Black Loomi Lime */}
      <motion.div
        style={{ x: herb2X, y: herb2Y }}
        className="absolute bottom-28 left-[38%] z-10 pointer-events-none hidden md:block"
      >
        <motion.div
          animate={{
            y: [0, 16, -10, 0],
            rotate: [0, -14, 10, 0],
          }}
          transition={{
            duration: 7.4,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: 0.9,
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-amber-200/80 shadow-md text-[11px] font-mono text-amber-900"
        >
          <span className="text-sm">🍋</span>
          <span className="font-medium">Sun-Dried Black Loomi</span>
        </motion.div>
      </motion.div>

      {/* 3. Floating Smoked Red Chili */}
      <motion.div
        style={{ x: herb1Y, y: herb2X }}
        className="absolute top-1/2 left-8 z-10 pointer-events-none hidden lg:block"
      >
        <motion.div
          animate={{
            y: [0, -14, 12, 0],
            rotate: [0, -18, 12, 0],
          }}
          transition={{
            duration: 5.9,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: 1.6,
          }}
          className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-red-200/70 shadow-sm text-[10px] font-mono text-red-700"
        >
          <span className="text-xs">🌶️</span>
          <span>Yemeni Salata Spice</span>
        </motion.div>
      </motion.div>

      <div className="site-container w-full relative z-10 py-6 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 xl:gap-14 items-center">
          
          {/* ════ LEFT COLUMN: Brand Narrative, Stats & Social Proof (7 Cols) ════ */}
          <motion.div
            style={{ x: textParallaxX, y: textParallaxY }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-7 z-20"
          >
            {/* Provenance Badges (Light Style) */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/90 text-amber-900 text-xs font-mono font-semibold tracking-wide shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Wood-Fired Hearth Craft</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-mono shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Certified Halal</span>
              </span>

              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 text-xs font-mono shadow-sm hidden sm:inline-flex">
                <Award className="w-3.5 h-3.5 text-amber-600" />
                <span>Est. 2016 • Kerala</span>
              </span>
            </div>

            {/* Bold Headline on Clean Light Canvas */}
            <h1 className="font-philosopher text-4xl sm:text-6xl lg:text-[4.25rem] xl:text-[4.75rem] font-bold text-slate-900 tracking-tight leading-[1.05]">
              Authentic Taste{" "}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500">
                Elevated Beyond Gravity.
              </span>
            </h1>

            {/* Narrative Subtext */}
            <p className="text-base sm:text-lg text-slate-600 font-light leading-relaxed max-w-xl">
              Slow-steamed in subterranean clay taboon pits over glowing wood embers. Prime cuts roasted until tender, dripping rich essence into aged basmati spiced with 14 Yemeni aromatics.
            </p>

            {/* Interactive CTAs with Quick Cart Micro-Feedback */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/menu"
                className="btn-primary group relative overflow-hidden py-3.5 px-7 shadow-[0_12px_30px_-5px_rgba(245,158,11,0.45)] hover:shadow-[0_16px_36px_-5px_rgba(245,158,11,0.6)]"
              >
                <ShoppingBag className="w-4 h-4 text-slate-950 transition-transform group-hover:scale-110" />
                <span>Order Mandi Now</span>
                <ArrowRight className="w-4 h-4 text-slate-950 transition-transform duration-200 group-hover:translate-x-1" />
                {totalOrdered > 0 && (
                  <span className="ml-1.5 px-2 py-0.5 rounded-full bg-slate-950 text-amber-300 text-xs font-mono font-bold animate-pulse">
                    {totalOrdered} in bag
                  </span>
                )}
              </Link>

              <Link
                href="/menu"
                className="btn-secondary group py-3.5 px-7 bg-white text-slate-800 border-slate-300 hover:border-amber-500 hover:bg-amber-50/50 shadow-sm transition-all"
              >
                <UtensilsCrossed className="w-4 h-4 text-amber-600" />
                <span>Explore Full Menu</span>
              </Link>
            </div>

            {/* Key Statistics Strip */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-3 sm:gap-6 max-w-xl">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="font-philosopher text-2xl font-bold text-slate-900">4.9</span>
                </div>
                <p className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                  12k+ Food Lovers
                </p>
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span className="font-philosopher text-2xl font-bold text-slate-900">30m</span>
                </div>
                <p className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                  Fresh Pit Table Serving
                </p>
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <ChefHat className="w-4 h-4 text-amber-600" />
                  <span className="font-philosopher text-2xl font-bold text-slate-900">16</span>
                </div>
                <p className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                  Kerala Branches
                </p>
              </div>
            </div>

            {/* ── Social Proof / Customer Voices Snippet ("See What Others Say") ── */}
            <div className="pt-2">
              <div className="p-4 rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05)] max-w-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {/* Overlapping Avatars */}
                  <div className="flex -space-x-2.5 shrink-0">
                    {CUSTOMER_AVATARS.map((avatar, idx) => (
                      <div
                        key={avatar.name}
                        className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-white shadow-sm bg-slate-100"
                        title={avatar.name}
                      >
                        <Image
                          src={avatar.image}
                          alt={avatar.name}
                          fill
                          sizes="36px"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Stars & Text */}
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-500" />
                      ))}
                      <span className="text-[11px] font-mono font-bold text-slate-800 ml-1">5.0</span>
                    </div>
                    <p className="text-xs text-slate-700 font-medium">
                      &ldquo;The gold standard for wood-fired Mandi in Kerala.&rdquo;
                    </p>
                  </div>
                </div>

                <Link
                  href="/gallery"
                  className="text-[11px] font-mono uppercase tracking-wider text-amber-700 hover:text-amber-800 font-bold whitespace-nowrap self-end sm:self-center"
                >
                  See Reviews &rarr;
                </Link>
              </div>
            </div>

            {/* Quick interactive toast notification when dish is added */}
            <AnimatePresence>
              {lastAddedDish && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-3 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-mono inline-flex items-center gap-2 shadow-md"
                >
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Item added to your order! View selection in your bag.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ════ RIGHT COLUMN: Floating Zero-Gravity Food Canvas (5 Cols) ════ */}
          <div className="lg:col-span-5 relative w-full h-[520px] sm:h-[620px] lg:h-[660px] flex items-center justify-center [perspective:1400px]">
            
            {/* Center Background Light Saffron Disc */}
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-amber-300/30 via-orange-200/20 to-transparent blur-[70px] pointer-events-none" />

            {/* ── CARD 1 (PRIMARY CENTER): Royal Mutton Mandi ── */}
            <motion.div
              style={{
                x: card1X,
                y: card1Y,
                rotateX: card1RotateX,
                rotateY: card1RotateY,
              }}
              className="absolute z-30 w-[290px] sm:w-[320px]"
            >
              {/* Asynchronous Weightless Zero-Gravity Floating Animation */}
              <motion.div
                animate={{
                  y: [0, -18, 6, 0],
                  rotate: [0, 2, -1.8, 0],
                }}
                transition={{
                  duration: 6.4,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                  delay: 0.1,
                }}
                className="group relative rounded-3xl p-4 sm:p-5 bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-[0_20px_50px_-10px_rgba(15,23,42,0.14)] hover:shadow-[0_25px_60px_-10px_rgba(245,158,11,0.25)] hover:border-amber-300 transition-all duration-300"
              >
                <div className="relative">
                  {/* Dish Thumbnail */}
                  <div className="relative aspect-[16/11] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-inner">
                    <Image
                      src={SIGNATURE_DISHES[0].image}
                      alt={SIGNATURE_DISHES[0].name}
                      fill
                      priority
                      sizes="(max-width: 640px) 280px, 320px"
                      className="object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    
                    {/* Top Floating Badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`text-[10px] font-mono uppercase tracking-wider font-bold px-2.5 py-1 rounded-full border shadow-sm ${SIGNATURE_DISHES[0].tagColor}`}>
                        {SIGNATURE_DISHES[0].tag}
                      </span>
                    </div>
                  </div>

                  {/* Card Content & Interactive Add Button */}
                  <div className="mt-3.5 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[11px] font-mono text-slate-500 font-medium">
                        {SIGNATURE_DISHES[0].category}
                      </span>
                      <div className="flex items-center gap-1 text-amber-600 font-mono text-xs font-semibold">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span className="text-slate-900">{SIGNATURE_DISHES[0].rating}</span>
                        <span className="text-slate-400 font-normal">({SIGNATURE_DISHES[0].reviews})</span>
                      </div>
                    </div>

                    <h3 className="font-philosopher text-xl font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                      {SIGNATURE_DISHES[0].name}
                    </h3>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] font-mono text-slate-500">
                      <span className="flex items-center gap-1 text-slate-600">
                        <Flame className="w-3.5 h-3.5 text-orange-500" />
                        {SIGNATURE_DISHES[0].prepTime}
                      </span>

                      {/* Interactive Add to Order Button */}
                      <button
                        type="button"
                        onClick={() => toggleOrder(SIGNATURE_DISHES[0].id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer ${
                          orderItems[SIGNATURE_DISHES[0].id]
                            ? "bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                            : "bg-amber-400 text-slate-950 hover:bg-amber-300 shadow-sm"
                        }`}
                        aria-label={`Add ${SIGNATURE_DISHES[0].name} to order`}
                      >
                        {orderItems[SIGNATURE_DISHES[0].id] ? (
                          <>
                            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                            <span>Add</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* ── CARD 2 (TOP-RIGHT SATELLITE): Smoked Chicken Madbi ── */}
            <motion.div
              style={{
                x: card2X,
                y: card2Y,
              }}
              className="absolute z-20 top-2 right-0 sm:right-2 w-[220px] sm:w-[250px]"
            >
              <motion.div
                animate={{
                  y: [0, 16, -10, 0],
                  rotate: [0, -3, 2, 0],
                }}
                transition={{
                  duration: 5.6,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                  delay: 0.8,
                }}
                className="group relative rounded-3xl p-3 sm:p-3.5 bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-[0_15px_35px_-10px_rgba(15,23,42,0.12)] hover:border-amber-300 transition-all duration-300"
              >
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                  <Image
                    src={SIGNATURE_DISHES[1].image}
                    alt={SIGNATURE_DISHES[1].name}
                    fill
                    sizes="250px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute top-2 left-2">
                    <span className="text-[9px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-900 border border-orange-300 shadow-sm">
                      {SIGNATURE_DISHES[1].tag}
                    </span>
                  </div>
                </div>

                <div className="mt-2.5 space-y-1.5">
                  <h4 className="font-philosopher text-base font-bold text-slate-900 group-hover:text-amber-700 transition-colors truncate">
                    {SIGNATURE_DISHES[1].name}
                  </h4>
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span className="flex items-center gap-1 text-amber-600 font-medium">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      {SIGNATURE_DISHES[1].rating}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleOrder(SIGNATURE_DISHES[1].id)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-mono text-[10px] font-semibold transition-all cursor-pointer ${
                        orderItems[SIGNATURE_DISHES[1].id]
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-100 text-slate-800 hover:bg-amber-400 hover:text-slate-950"
                      }`}
                    >
                      {orderItems[SIGNATURE_DISHES[1].id] ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                      <span>{orderItems[SIGNATURE_DISHES[1].id] ? "Added" : "Add"}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* ── CARD 3 (BOTTOM-LEFT SATELLITE): Grand Majlis Feast ── */}
            <motion.div
              style={{
                x: card3X,
                y: card3Y,
              }}
              className="absolute z-20 bottom-3 left-0 sm:left-2 w-[230px] sm:w-[260px]"
            >
              <motion.div
                animate={{
                  y: [0, -14, 12, 0],
                  rotate: [0, 3, -2, 0],
                }}
                transition={{
                  duration: 7.2,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                  delay: 1.5,
                }}
                className="group relative rounded-3xl p-3 sm:p-3.5 bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-[0_15px_35px_-10px_rgba(15,23,42,0.12)] hover:border-amber-300 transition-all duration-300"
              >
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                  <Image
                    src={SIGNATURE_DISHES[2].image}
                    alt={SIGNATURE_DISHES[2].name}
                    fill
                    sizes="260px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute top-2 left-2">
                    <span className="text-[9px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 shadow-sm">
                      {SIGNATURE_DISHES[2].tag}
                    </span>
                  </div>
                </div>

                <div className="mt-2.5 space-y-1.5">
                  <h4 className="font-philosopher text-base font-bold text-slate-900 group-hover:text-amber-700 transition-colors truncate">
                    {SIGNATURE_DISHES[2].name}
                  </h4>
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span className="text-slate-600 font-medium">{SIGNATURE_DISHES[2].serves}</span>
                    <button
                      type="button"
                      onClick={() => toggleOrder(SIGNATURE_DISHES[2].id)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-mono text-[10px] font-semibold transition-all cursor-pointer ${
                        orderItems[SIGNATURE_DISHES[2].id]
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-100 text-slate-800 hover:bg-amber-400 hover:text-slate-950"
                      }`}
                    >
                      {orderItems[SIGNATURE_DISHES[2].id] ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                      <span>{orderItems[SIGNATURE_DISHES[2].id] ? "Added" : "Add"}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* ── FLOATING SATELLITE BADGE 1: Wood-Fired Pit ── */}
            <motion.div
              style={{ x: badge1X, y: badge1Y }}
              className="absolute -top-3 left-6 sm:left-12 z-40"
            >
              <motion.div
                animate={{
                  y: [0, -12, 8, 0],
                  rotate: [0, -4, 3, 0],
                }}
                transition={{
                  duration: 5.1,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                  delay: 0.3,
                }}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/95 backdrop-blur-md border border-amber-300 text-xs font-mono text-amber-900 shadow-md font-semibold"
              >
                <Flame className="w-3.5 h-3.5 text-orange-500" />
                <span>Wood-Fired Charcoal Pit</span>
              </motion.div>
            </motion.div>

            {/* ── FLOATING SATELLITE BADGE 2: Authentic Yemeni Spices ── */}
            <motion.div
              style={{ x: badge2X, y: badge2Y }}
              className="absolute -bottom-2 right-4 sm:right-10 z-40"
            >
              <motion.div
                animate={{
                  y: [0, 14, -8, 0],
                  rotate: [0, 4, -3, 0],
                }}
                transition={{
                  duration: 5.8,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                  delay: 1.1,
                }}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/95 backdrop-blur-md border border-emerald-300 text-xs font-mono text-emerald-900 shadow-md font-semibold"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Authentic Yemen Spice Blend</span>
              </motion.div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
