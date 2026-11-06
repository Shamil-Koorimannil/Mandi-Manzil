import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Phone, Mail, MapPin } from "lucide-react";
import { MAIN_NAV, CONTACT_INFO } from "@/data/navigation";

export function Footer() {
  const currentYear = 2026;

  return (
    <footer className="bg-[#100F10] border-t border-white/[0.08] text-zinc-400">
      {/* Main Footer Container */}
      <div className="site-container py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Brand & Editorial Persona (5 cols) */}
          <div className="md:col-span-5 space-y-5">
            <Link href="/" className="inline-block" aria-label="Mandi Manzil — Home">
              <div className="relative w-40 h-10">
                <Image
                  src="/brand/logo.png"
                  alt="Mandi Manzil"
                  fill
                  sizes="160px"
                  className="object-contain object-left"
                />
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed max-w-sm">
              Authentic slow-cooked, wood-fired Yemeni Mandi. Preserving time-honored Arabian culinary rituals and generous communal dining across Kerala.
            </p>

            <div className="pt-1 text-[11px] uppercase tracking-[0.18em] font-mono text-brand-yellow font-semibold">
              Established 2016 • Kerala, India
            </div>
          </div>

          {/* Navigation Links (3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-xs">
              {MAIN_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-zinc-400 hover:text-brand-yellow transition-colors duration-200 inline-flex items-center gap-1 group"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Verified Contact Details (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
              Contact &amp; Hub
            </h3>
            
            <div className="space-y-3 text-xs">
              <div>
                <span className="block text-[10px] uppercase tracking-wider text-zinc-500 font-mono">
                  Customer Care
                </span>
                <a
                  href={CONTACT_INFO.telLink}
                  className="text-white hover:text-brand-yellow font-medium transition-colors duration-200 font-mono"
                >
                  {CONTACT_INFO.centralCustomerCare}
                </a>
              </div>

              <div>
                <span className="block text-[10px] uppercase tracking-wider text-zinc-500 font-mono">
                  General Inquiries
                </span>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-zinc-300 hover:text-brand-yellow transition-colors duration-200"
                >
                  {CONTACT_INFO.email}
                </a>
              </div>

              <div>
                <span className="block text-[10px] uppercase tracking-wider text-zinc-500 font-mono">
                  Flagship Address
                </span>
                <p className="text-zinc-400 font-light leading-relaxed">
                  Opposite BSNL, Cheruvannur, Calicut, Kerala 673027
                </p>
              </div>

              <div className="pt-2 flex items-center gap-4 text-xs">
                <a
                  href={CONTACT_INFO.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-brand-yellow transition-colors duration-200 uppercase tracking-wider text-[11px]"
                >
                  Instagram
                </a>
                <span className="text-zinc-700">•</span>
                <a
                  href={CONTACT_INFO.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-brand-yellow transition-colors duration-200 uppercase tracking-wider text-[11px]"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Minimal Bottom Bar */}
        <div className="mt-14 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>
            &copy; {currentYear} Mandi Manzil. Established 2016. All rights reserved.
          </p>
          <p className="font-philosopher italic text-zinc-400 text-sm">
            Timeless Tastes, Shared Traditions
          </p>
        </div>
      </div>
    </footer>
  );
}
