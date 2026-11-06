export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: "food" | "dining" | "preparation";
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    src: "/images/gallery/gallery-01.jpg",
    alt: "Signature Chicken Mandi platter served with authentic Yemeni chutneys",
    caption: "Signature Chicken Mandi Platter",
    category: "food",
  },
  {
    id: "gal-2",
    src: "/images/gallery/gallery-02.jpg",
    alt: "Tender slow-cooked Mutton Mandi served over spiced basmati rice",
    caption: "Slow-Cooked Mutton Mandi",
    category: "food",
  },
  {
    id: "gal-3",
    src: "/images/gallery/gallery-03.jpg",
    alt: "Grand Full Mandi family platter arranged with chicken, salads, and sauces",
    caption: "Full Mandi Grand Platter",
    category: "food",
  },
  {
    id: "gal-4",
    src: "/images/gallery/gallery-04.jpg",
    alt: "Charcoal grilled Alfaham Mandi featuring smoky marinated chicken",
    caption: "Charcoal Grilled Alfaham Mandi",
    category: "food",
  },
  {
    id: "gal-5",
    src: "/images/gallery/gallery-05.jpg",
    alt: "Spicy Mandi with rich red Arabian spice glaze and roasted nuts",
    caption: "Spicy Mandi Specialty",
    category: "food",
  },
  {
    id: "gal-6",
    src: "/images/gallery/gallery-06.jpg",
    alt: "Mandi Manzil dining table spread with freshly made Arabian delicacies",
    caption: "The Mandi Manzil Dining Experience",
    category: "dining",
  },
  {
    id: "gal-7",
    src: "/images/gallery/gallery-07.jpg",
    alt: "Aromatic basmati rice being spiced and slow-steamed",
    caption: "Traditional Wood-Fired Preparation",
    category: "preparation",
  },
  {
    id: "gal-8",
    src: "/images/gallery/gallery-08.jpg",
    alt: "Authentic dining atmosphere inside Mandi Manzil branch",
    caption: "Warm Hospitality & Gathering Spaces",
    category: "dining",
  },
  {
    id: "gal-9",
    src: "/images/gallery/gallery-09.jpg",
    alt: "Crispy skin and juicy interior of traditional roasted Mandi chicken",
    caption: "Golden Roasted Mandi Chicken",
    category: "food",
  },
];
