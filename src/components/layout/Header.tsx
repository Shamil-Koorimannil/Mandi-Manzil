"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Phone, ArrowUpRight } from "lucide-react";
import { MAIN_NAV, CONTACT_INFO } from "@/data/navigation";

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Handle Escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#141314]/95 backdrop-blur-md border-b border-white/[0.08] shadow-sm py-3"
          : "bg-[#141314]/80 backdrop-blur-sm border-b border-white/[0.05] py-4"
      }`}
    >
      <div className="site-container flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-yellow rounded-full"
          aria-label="Mandi Manzil — Home"
        >
          <div className="relative w-32 h-9 sm:w-36 sm:h-10 transition-opacity duration-200 hover:opacity-90">
            <Image
              src="/brand/logo.png"
              alt="Mandi Manzil"
              fill
              priority
              sizes="(max-width: 640px) 128px, 144px"
              className="object-contain object-left"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Main Navigation">
          {MAIN_NAV.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[11.5px] tracking-[0.14em] uppercase font-medium transition-colors duration-200 relative py-1 focus-visible:text-brand-yellow ${
                  isActive
                    ? "text-brand-yellow font-semibold"
                    : "text-zinc-300 hover:text-white"
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-brand-yellow" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Header Action */}
        <div className="hidden lg:flex items-center gap-5">
          <a
            href={CONTACT_INFO.telLink}
            className="flex items-center gap-2 text-[11px] tracking-wider uppercase font-medium text-zinc-400 hover:text-brand-yellow transition-colors duration-200"
            title={`Customer Care: ${CONTACT_INFO.centralCustomerCare}`}
          >
            <Phone className="w-3.5 h-3.5 text-brand-yellow" strokeWidth={1.5} aria-hidden="true" />
            <span className="font-mono text-xs">{CONTACT_INFO.centralCustomerCare}</span>
          </a>
          <Link
            href="/branches"
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-widest uppercase px-4 py-2 rounded-full bg-brand-yellow text-[#141314] hover:bg-brand-yellow-hover transition-colors duration-200"
          >
            <span>Branches</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-zinc-300 hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-yellow rounded-full"
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5 text-brand-yellow" strokeWidth={1.75} />
          ) : (
            <Menu className="w-5 h-5" strokeWidth={1.75} />
          )}
        </button>
      </div>

      {/* Accessible Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className="lg:hidden fixed inset-x-0 top-[61px] bottom-0 bg-[#141314] border-t border-white/10 px-6 py-8 flex flex-col justify-between overflow-y-auto z-40 animate-in fade-in duration-200"
        >
          <nav className="flex flex-col space-y-4" aria-label="Mobile Navigation">
            {MAIN_NAV.map((item, idx) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`py-3 border-b border-white/[0.06] text-base uppercase tracking-wider transition-colors flex items-center justify-between ${
                    isActive
                      ? "text-brand-yellow font-bold"
                      : "text-zinc-200 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono text-zinc-500">
                      0{idx + 1}
                    </span>
                    <span className="font-philosopher text-xl">{item.label}</span>
                  </div>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow" />}
                </Link>
              );
            })}
          </nav>

          <div className="pt-8 border-t border-white/10 flex flex-col gap-3">
            <a
              href={CONTACT_INFO.telLink}
              className="flex items-center justify-center gap-2 py-3.5 text-xs uppercase tracking-wider font-mono text-zinc-300 border border-white/15 rounded-full"
            >
              <Phone className="w-3.5 h-3.5 text-brand-yellow" strokeWidth={1.5} />
              <span>Customer Care: {CONTACT_INFO.centralCustomerCare}</span>
            </a>
            <Link
              href="/branches"
              className="btn-primary w-full text-center py-3.5"
            >
              Explore 16 Branches in Kerala
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
