MANDI MANZIL — SCENE 03 WEBP ASSETS

Files:
01-kitchen-scene-composite.webp
  Full kitchen scene artwork. Use as the visual reference / fallback composite.
  Do not place all other layers over it blindly, as some content is already included.

02-foreground-ingredients-and-table.webp
  Transparent foreground layer containing the ingredients, serving items and table.
  This is the separate foreground layer requested by the user.

03-separate-mandi-rice-pot.webp
  Transparent isolated rice pot layer.

04-rack-chicken-and-pot-reference.webp
  Existing rack artwork. IMPORTANT: this artwork includes the rice pot as well.
  Use as a visual reference or alternate combined asset; do NOT stack it together
  with 03-separate-mandi-rice-pot.webp because the pot would appear twice.

05-falling-spices-and-steam.webp
  Transparent effects overlay for subtle falling spice and rising steam animation.

Implementation notes:
- Keep the transparent WebP alpha channels.
- Preserve each asset's aspect ratio.
- Align layers by visual composition, not by forcing all images to 100% width/height.
- The current set does not contain a clean isolated rack-with-chickens-only layer.
