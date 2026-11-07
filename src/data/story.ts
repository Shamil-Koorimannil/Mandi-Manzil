export interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export interface ValuePillar {
  number: string;
  title: string;
  subtitle: string;
  description: string;
}

export const STORY_PILLARS: ValuePillar[] = [
  {
    number: "01",
    title: "Authentic Preparation",
    subtitle: "Yemeni Tradition",
    description: "Every dish is prepared using time-honored techniques, authentic Arabian spices, and slow-cooking wood-fired methods that preserve delicate juices and deep smoky aromas.",
  },
  {
    number: "02",
    title: "Premium Ingredients",
    subtitle: "Purity & Quality",
    description: "We source only prime cuts of tender meat, extra-long aged basmati rice, and whole-spice botanicals imported to recreate the genuine essence of Yemeni Mandi.",
  },
  {
    number: "03",
    title: "Ambience & Hospitality",
    subtitle: "Shared Dining",
    description: "At Mandi Manzil, dining is a collective celebration. From spacious traditional majlis floor seating to welcoming service, our spaces honor the heartfelt warmth of Arabian generosity.",
  },
];

export const CORE_TEAM: TeamMember[] = [
  {
    name: "Razaq",
    role: "Managing Partner",
    image: "/images/team/razaq.png",
  },
  {
    name: "Muneer",
    role: "Managing Partner",
    image: "/images/team/muneer.png",
  },
  {
    name: "Munavvar",
    role: "Managing Partner",
    image: "/images/team/munavvar.jpg",
  },
  {
    name: "Ajmal",
    role: "Managing Partner",
    image: "/images/team/ajmal.png",
  },
  {
    name: "Mishab",
    role: "Managing Partner",
    image: "/images/team/mishab.png",
  },
];

export const BRAND_STORY = {
  headline: "Taste the Tradition. Feel the Fusion.",
  tagline: "The Feast Of Arabia",
  establishedYear: 2016,
  legacyNote: "While earlier culinary roots trace back to 2006 in specialized regional catering, Mandi Manzil formally established its dedicated Arabic Mandi dining brand in Kerala in 2016.",
  leadParagraph: "Mandi Manzil was born out of a deep admiration for the rich, aromatic, and soulful dish known as Mandi — a traditional Arabic rice and meat preparation that originated in Yemen and spread across the Arabian Peninsula.",
  secondaryParagraph: "We set out with a clear vision: to bring authentic slow-cooked, wood-fired Mandi to Kerala while remaining true to original techniques and honoring the local palate. What began as a heartfelt culinary venture has grown into one of Kerala's most trusted Mandi destinations, with over 16 branch locations serving thousands of guests daily.",
};
