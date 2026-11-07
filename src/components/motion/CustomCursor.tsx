"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const leadSparkRef = useRef<HTMLDivElement>(null);
  const trailingFrameRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    setEnabled(true);

    const lead = leadSparkRef.current;
    const frame = trailingFrameRef.current;
    if (!lead || !frame) return;

    let isHovering = false;
    let prevX = -100;
    let prevY = -100;

    const onMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Calculate subtle velocity-based tilt
      const deltaX = mouseX - prevX;
      const tilt = Math.max(-18, Math.min(18, deltaX * 0.45));
      prevX = mouseX;
      prevY = mouseY;

      // Pinpoint precision lead spark
      gsap.to(lead, {
        x: mouseX,
        y: mouseY,
        duration: 0.08,
        ease: "power2.out",
        opacity: 1,
      });

      // Trailing geometric diamond frame with velocity tilt
      gsap.to(frame, {
        x: mouseX,
        y: mouseY,
        rotation: isHovering ? 45 : tilt,
        duration: 0.38,
        ease: "power3.out",
        opacity: 1,
      });
    };

    // Clean event delegation for interactive hovering
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        target.closest &&
        target.closest("a, button, [role='button'], input, textarea, select, .interactive-hover, .cursor-pointer")
      ) {
        isHovering = true;
        gsap.to(frame, {
          scale: 1.7,
          rotation: 45,
          duration: 0.3,
          ease: "back.out(1.7)",
        });
        gsap.to(lead, {
          scale: 1.3,
          duration: 0.2,
          ease: "power2.out",
        });
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        target.closest &&
        target.closest("a, button, [role='button'], input, textarea, select, .interactive-hover, .cursor-pointer")
      ) {
        isHovering = false;
        gsap.to(frame, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(lead, {
          scale: 1,
          duration: 0.2,
          ease: "power2.out",
        });
      }
    };

    // Tactile click squeeze
    const onMouseDown = () => {
      gsap.to(frame, {
        scale: isHovering ? 1.25 : 0.75,
        duration: 0.15,
        ease: "power2.out",
      });
      gsap.to(lead, {
        scale: 0.7,
        duration: 0.15,
      });
    };

    const onMouseUp = () => {
      gsap.to(frame, {
        scale: isHovering ? 1.7 : 1,
        duration: 0.25,
        ease: "back.out(2)",
      });
      gsap.to(lead, {
        scale: isHovering ? 1.3 : 1,
        duration: 0.2,
      });
    };

    const onMouseLeave = () => {
      gsap.to([lead, frame], { opacity: 0, duration: 0.25 });
    };

    const onMouseEnter = () => {
      gsap.to([lead, frame], { opacity: 1, duration: 0.25 });
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseout", onMouseOut, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.documentElement.addEventListener("mouseleave", onMouseLeave, { passive: true });
    document.documentElement.addEventListener("mouseenter", onMouseEnter, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      {/* 1. Precision Center: Arabian Ember Star Spark */}
      <div
        ref={leadSparkRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 drop-shadow-[0_0_8px_rgba(252,203,28,0.8)] opacity-0"
      >
        <svg viewBox="0 0 16 16" className="w-full h-full fill-[#FCCB1C]">
          {/* Authentic 4-point curved ember spark */}
          <path d="M 8 0 Q 8 8 16 8 Q 8 8 8 16 Q 8 8 0 8 Q 8 8 8 0 Z" />
        </svg>
      </div>

      {/* 2. Trailing Geometric Ambient Frame: Luxury Diamond Crosshair Reticle */}
      <div
        ref={trailingFrameRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] -translate-x-1/2 -translate-y-1/2 w-8 h-8 opacity-0 transition-opacity duration-300 drop-shadow-[0_0_12px_rgba(252,203,28,0.35)]"
      >
        <svg
          viewBox="0 0 36 36"
          className="w-full h-full fill-white/[0.03] stroke-[#FCCB1C] stroke-[1.2]"
        >
          {/* Rotated Diamond Rhombus */}
          <polygon
            points="18,3 33,18 18,33 3,18"
            className="transition-colors duration-300"
          />
          {/* 4 Precision Reticle Ticks on the vertices */}
          <line x1="18" y1="5" x2="18" y2="8" stroke="#FCCB1C" strokeWidth="1.2" />
          <line x1="18" y1="28" x2="18" y2="31" stroke="#FCCB1C" strokeWidth="1.2" />
          <line x1="5" y1="18" x2="8" y2="18" stroke="#FCCB1C" strokeWidth="1.2" />
          <line x1="28" y1="18" x2="31" y2="18" stroke="#FCCB1C" strokeWidth="1.2" />
        </svg>
      </div>
    </>
  );
}
