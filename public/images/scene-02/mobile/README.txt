MANDI MANZIL — SCENE 02 MOBILE ASSETS

Files:
- scene-02-mobile-background.webp
  Portrait restaurant interior background (opaque).
- scene-02-mobile-menu-foreground.webp
  Customer holding the eight-dish menu (transparent foreground).

Recommended repository location:
public/images/scene-02/mobile/

Implementation notes:
- Keep the background as the rear layer, using cover sizing and careful focal positioning.
- Place the transparent customer/menu image above it; preserve its aspect ratio.
- Use restrained device-tilt parallax: background movement smallest, foreground movement slightly stronger.
- Do not crop the menu, alter the eight dishes, add clickable dish hotspots, or invent extra objects.
- Provide a scroll-based fallback and respect prefers-reduced-motion.
