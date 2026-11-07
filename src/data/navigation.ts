export interface NavItem {
  label: string;
  href: string;
}

export const MAIN_NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "About Us", href: "/about-us" },
  { label: "Branches", href: "/branches" },
  { label: "Contact Us", href: "/contact-us" },
];

export const CONTACT_INFO = {
  brandName: "Mandi Manzil",
  taglines: [
    "Timeless Tastes, Shared Traditions",
    "Taste the Tradition. Feel the Fusion.",
  ],
  email: "info@mandimanzil.com",
  centralCustomerCare: "06235 022 055",
  telLink: "tel:+916235022055",
  socials: {
    instagram: "https://www.instagram.com/mandimanzil/",
    facebook: "https://www.facebook.com/mandimanzil",
  },
  flagshipLocation: "Calicut, Kerala, India",
  establishedYear: 2016, // Verified on-page content
  alternateMentionYear: 2006, // Discovered in legacy meta-title tag during audit
};
