import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { generatePageMetadata } from "@/lib/metadata";
import { CONTACT_INFO } from "@/data/navigation";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = generatePageMetadata({
  title: "Contact Us — Guest Relations & Inquiries",
  description:
    "Get in touch with Mandi Manzil. Find direct customer care phone numbers, email support, and flagship location details.",
  path: "/contact-us",
  image: "/images/shop-front.jpg",
});

export default function ContactUsPage() {
  return (
    <div className="pt-28 pb-24 lg:pt-36 lg:pb-32 bg-[#141314] min-h-screen">
      <div className="site-container">
        
        {/* Minimal, Welcoming Introduction */}
        <div className="max-w-3xl mb-12 lg:mb-14">
          <div className="flex items-center gap-3 mb-2.5">
            <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-brand-yellow font-semibold">
              Guest Relations &bull; Banquets
            </span>
            <span className="w-8 h-[1px] bg-brand-yellow/60" />
          </div>
          <h1 className="font-philosopher text-4xl sm:text-6xl lg:text-[4.25rem] font-bold text-white tracking-tight leading-[1.06]">
            We Welcome You.
          </h1>
          <p className="text-base sm:text-lg text-zinc-300 font-light mt-4 leading-relaxed max-w-xl">
            Whether inquiring about family gatherings, bulk feast catering, or branch dining, our team is at your service.
          </p>
        </div>

        {/* Asymmetrical 2-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Verified Contact Details & Flagship Feature (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#181718] border border-white/[0.08] space-y-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-brand-yellow font-bold block mb-1">
                  Central Guest Desk
                </span>
                <h2 className="font-philosopher text-2xl font-bold text-white">
                  Mandi Manzil
                </h2>
              </div>

              <div className="space-y-5">
                {/* Phone */}
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-mono block">
                    Customer Care Hotline
                  </span>
                  <a
                    href={CONTACT_INFO.telLink}
                    className="font-philosopher text-2xl font-bold text-white hover:text-brand-yellow transition-colors block"
                  >
                    {CONTACT_INFO.centralCustomerCare}
                  </a>
                  <p className="text-xs text-zinc-400 font-light">Available for catering &amp; statewide inquiries</p>
                </div>

                {/* Email */}
                <div className="space-y-1 pt-3.5 border-t border-white/[0.06]">
                  <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-mono block">
                    Direct Email
                  </span>
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="text-sm text-zinc-200 hover:text-brand-yellow transition-colors font-medium"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </div>

                {/* Flagship */}
                <div className="space-y-1 pt-3.5 border-t border-white/[0.06]">
                  <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-mono block">
                    Flagship Kitchen
                  </span>
                  <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                    Opposite BSNL, Cheruvannur, Calicut, Kerala 673027
                  </p>
                </div>
              </div>

              {/* Direct Route to Branches */}
              <div className="pt-4 border-t border-white/[0.08]">
                <Link
                  href="/branches"
                  className="btn-secondary w-full text-xs py-2.5 justify-between group"
                >
                  <span>Looking for a Specific Branch?</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Subtle Flagship Architectural Detail */}
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/[0.08] shadow-lg bg-[#1B1A1B] group">
              <Image
                src="/images/shop-front.jpg"
                alt="Mandi Manzil Cheruvannur Flagship Storefront"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-center transform transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-brand-yellow font-bold px-3 py-1 bg-[#141314]/90 rounded-full border border-brand-yellow/20">
                  Cheruvannur &bull; Calicut
                </span>
              </div>
            </div>
          </div>

          {/* Compact, Well-Designed Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#181718] border border-white/[0.08] shadow-xl space-y-5">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-brand-yellow font-bold block mb-1">
                  Message Desk
                </span>
                <h2 className="font-philosopher text-2xl sm:text-3xl font-bold text-white">
                  Send Us an Inquiry
                </h2>
                <p className="text-xs text-zinc-400 font-light mt-1">
                  We verify and respond to all guest inquiries within one business day.
                </p>
              </div>

              <ContactForm />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
