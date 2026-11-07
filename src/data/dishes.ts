export interface Dish {
  id: string;
  name: string;
  category: "classic" | "specialty" | "fusion";
  description: string;
  image: string;
  isChefSpecial?: boolean;
  flavorNotes: string[];
  servings: ("Quarter" | "Half" | "Full")[];
}

export interface MandiPortion {
  id: string;
  title: string;
  arabicName: string;
  subtitle: string;
  description: string;
  image: string;
  authenticPhoto: string;
  serves: string;
  badge: string;
  platterScale: string;
  meatCuts: string;
  accompaniments: string[];
}

export const MANDI_PORTIONS: MandiPortion[] = [
  {
    id: "quarter-mandi",
    title: "Quarter Mandi",
    arabicName: "Rub'a Mandi",
    subtitle: "Solo Feast",
    description: "An intimate personal feast centered around a tender quarter portion of slow-cooked meat resting upon fragrant spiced basmati rice, served with rich lamb broth, tangy salata hara, and freshly whipped garlic toum.",
    image: "/images/mandi/quarter-mandi.png",
    authenticPhoto: "/images/dishes/Normal half withrice.png",
    serves: "1 Person",
    badge: "Solo Table",
    platterScale: "28 cm Traditional Platter",
    meatCuts: "1 Slow-Smoked Quarter Cut",
    accompaniments: ["Fragrant Maraq Broth", "Crushed Salata Hara", "Whipped Garlic Toum", "Unlimited Rice Refills"],
  },
  {
    id: "half-mandi",
    title: "Half Mandi",
    arabicName: "Nisf Mandi",
    subtitle: "Shared Duo Feast",
    description: "Handcrafted for two to three companions gathering around a shared brass platter. Two generous portions of wood-fired meat over a mound of long-grain basmati, paired with dual sides and warm broth.",
    image: "/images/dishes/Normal half withrice.png",
    authenticPhoto: "/images/dishes/Normal half withrice.png",
    serves: "2 – 3 Persons",
    badge: "Shared Gathering",
    platterScale: "38 cm Hand-Embossed Platter",
    meatCuts: "2 Generous Meat Cuts",
    accompaniments: ["Dual Bowls of Maraq", "Fresh Tomato-Chili Salata", "Double Garlic Toum", "Unlimited Rice Refills"],
  },
  {
    id: "full-mandi",
    title: "Full Mandi",
    arabicName: "Kamil Mandi",
    subtitle: "Grand Majlis Platter",
    description: "The quintessential Yemeni Majlis celebration platter. A majestic 52 cm communal tray heaped with aromatic aged basmati, four whole roasted meat quarters, and an abundant carousel of accompaniments with unlimited rice refills.",
    image: "/images/dishes/normal mandi full with rice.png",
    authenticPhoto: "/images/dishes/normal mandi full with rice.png",
    serves: "4 – 5 Persons",
    badge: "Communal Banquet",
    platterScale: "52 cm Grand Majlis Platter",
    meatCuts: "4 Whole Roasted Meat Quarters",
    accompaniments: ["Tureen of Spiced Maraq", "House Crushed Salata Hara", "Velvety Garlic Toum", "Unlimited Rice Refills for Table"],
  },
];

export const DISHES: Dish[] = [
  {
    id: "chicken-mandi",
    name: "Chicken Mandi",
    category: "classic",
    description: "A fragrant Arabian rice dish with tender spiced chicken and smoky flavors, slow-cooked to perfection and served with traditional flair.",
    image: "/images/dishes/normal mandi full with rice.png",
    isChefSpecial: true,
    flavorNotes: ["Smoky Aromatics", "Tender Wood-Fired Chicken", "Cardamom & Clove"],
    servings: ["Quarter", "Half", "Full"],
  },
  {
    id: "spicy-mandi",
    name: "Spicy Mandi",
    category: "specialty",
    description: "A bold twist on the classic, featuring tender meat, aromatic rice, and an extra kick of fiery Arabic spices.",
    image: "/images/dishes/Spicy half with rice.png",
    isChefSpecial: true,
    flavorNotes: ["Fiery Arabic Spices", "Rich Red Masala", "Subtle Heat"],
    servings: ["Quarter", "Half", "Full"],
  },
  {
    id: "mutton-mandi",
    name: "Mutton Mandi",
    category: "classic",
    description: "A flavorful rice dish with juicy, slow-cooked mutton and rich Arabic spices, served with an authentic smoky touch.",
    image: "/images/dishes/mutton half with rice.png",
    isChefSpecial: true,
    flavorNotes: ["Slow-Cooked Mutton", "Marrow Essence", "Golden Saffron Rice"],
    servings: ["Quarter", "Half", "Full"],
  },
  {
    id: "beef-mandi",
    name: "Beef Mandi",
    category: "classic",
    description: "A hearty Arabic rice dish with tender, spiced beef slow-cooked to perfection and served with smoky, fragrant rice.",
    image: "/images/dishes/Beef half with rice.png",
    isChefSpecial: true,
    flavorNotes: ["Tender Braised Beef", "Deep Spice Infusion", "Fragrant Long Grain"],
    servings: ["Quarter", "Half", "Full"],
  },
  {
    id: "alfaham-mandi",
    name: "Alfaham Mandi",
    category: "fusion",
    description: "A delicious fusion of juicy grilled chicken and fragrant spiced rice, our Alfaham Mandi is a smoky, flavorful twist on the classic.",
    image: "/images/dishes/alfaham with rice.png",
    isChefSpecial: true,
    flavorNotes: ["Charcoal Flame-Grilled", "Barbecue Glaze", "Traditional Spiced Rice"],
    servings: ["Quarter", "Half", "Full"],
  },
  {
    id: "peri-peri-mandi",
    name: "Peri Peri Mandi",
    category: "fusion",
    description: "A spicy fusion of Arabic rice and tender meat tossed in zesty Peri Peri sauce for a bold, fiery flavor.",
    image: "/images/dishes/peri peri with rice.png",
    isChefSpecial: false,
    flavorNotes: ["Zesty Citrus Heat", "Peri Peri Seasoning", "Smoky Finish"],
    servings: ["Quarter", "Half", "Full"],
  },
  {
    id: "honey-chilly-mandi",
    name: "Honey Chilly Mandi",
    category: "fusion",
    description: "Blends sweet and spicy flavors with tender meat, aromatic rice, and a drizzle of honey chili glaze for a bold fusion twist.",
    image: "/images/dishes/Honey with rice.png",
    isChefSpecial: false,
    flavorNotes: ["Sweet Honey Glaze", "Chili Contrast", "Crisp Exterior"],
    servings: ["Quarter", "Half", "Full"],
  },
  {
    id: "green-chilly-mandi",
    name: "Green Chilly Mandi",
    category: "fusion",
    description: "A fiery blend of tender meat, aromatic rice, and bold green chilli spice, crafted for those who crave real flavor with a kick.",
    image: "/images/dishes/Green chilie with rice.png",
    isChefSpecial: false,
    flavorNotes: ["Fresh Green Chilis", "Herbal Piquant", "Punchy Heat"],
    servings: ["Quarter", "Half", "Full"],
  },
];
