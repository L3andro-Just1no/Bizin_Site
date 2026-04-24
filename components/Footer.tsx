"use client";

import Link from "next/link";
import Image from "next/image";
import { CONTACT_INFO } from "@/lib/constants";
import { useI18n } from "@/components/I18nProvider";

const NAV_ITEMS = [
  { href: "/", labelKey: "common.home" },
  { href: "/servicos", labelKey: "nav.services" },
  { href: "/parceiros", labelKey: "nav.partners", hidden: true },
  { href: "/sobre-portugal", labelKey: "nav.aboutPortugal" },
  { href: "/sobre-nos", labelKey: "nav.aboutUs" },
  { href: "/blog", labelKey: "nav.blog" },
  { href: "/contactos", labelKey: "nav.contacts" },
];

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="bg-[#1c2544] text-white text-[15px]">
      <div className="container mx-auto px-4 md:px-4 lg:px-6 py-12">
        {/* Main Grid: Logo, Nav & Contact Block */}
        <div className="grid grid-cols-1 lg:grid-cols-[225px_1fr_auto] gap-y-6 gap-x-12 mb-12">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-start">
            <Image
              src="/logo_2.svg"
              alt="Bizin Portugal"
              width={200}
              height={98}
              className="h-auto w-[200px]"
            />
          </div>

          {/* Navigation */}
          <div className="flex items-start">
            <nav className="flex flex-wrap items-center gap-6 md:gap-8">
              {NAV_ITEMS.filter((item) => !item.hidden).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[18px] font-normal transition-colors hover:opacity-80 tracking-[-0.18px]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  {t(item.labelKey as string)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact: title + details */}
          <div>
            <div className="lg:grid lg:grid-cols-[32px_auto] lg:gap-x-4 lg:gap-y-4 space-y-4 lg:space-y-0">
              {/* Empty cell so the title aligns with the text column on desktop */}
              <div className="hidden lg:block" />
              <h3
                className="text-[18px] font-medium tracking-[-0.18px]"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                {t("common.contactUs")}
              </h3>

              {/* Address */}
              <div className="flex items-start gap-4 lg:contents">
                <svg className="w-8 h-8 flex-shrink-0 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <address className="not-italic text-[16px] leading-[30px] opacity-60">
                  {CONTACT_INFO.address.street}
                  <br />
                  {CONTACT_INFO.address.postalCode} {CONTACT_INFO.address.city}
                  <br />
                  {CONTACT_INFO.address.country}
                </address>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 lg:contents">
                <svg className="w-8 h-8 flex-shrink-0 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-[16px] leading-[30px] opacity-60 hover:opacity-100 transition-opacity"
                >
                  {CONTACT_INFO.email}
                </a>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 lg:contents">
                <svg className="w-8 h-8 flex-shrink-0 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <div className="text-[16px] leading-[30px] opacity-60">
                  <a
                    href={`tel:${CONTACT_INFO.phone}`}
                    className="hover:opacity-100 transition-opacity block"
                  >
                    {CONTACT_INFO.phone}
                  </a>
                  {CONTACT_INFO.mobile && (
                    <a
                      href={`tel:${CONTACT_INFO.mobile}`}
                      className="hover:opacity-100 transition-opacity block"
                    >
                      {CONTACT_INFO.mobile}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright & Privacy Links */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Copyright */}
            <p className="text-[16px] tracking-[-0.16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
              {t("footer.copyright")}
            </p>

            {/* Legal Information links */}
            <div
              className="flex flex-wrap items-center gap-4 md:gap-6 text-[16px] opacity-60 tracking-[-0.16px]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              <Link href="/politicas/termos" className="hover:opacity-100 transition-opacity whitespace-nowrap">
                {t("footer.termsAndConditions")}
              </Link>
              <Link href="/politicas/privacidade" className="hover:opacity-100 transition-opacity whitespace-nowrap">
                {t("footer.privacyPolicy")}
              </Link>
              <Link href="/politicas/cookies" className="hover:opacity-100 transition-opacity whitespace-nowrap">
                {t("footer.cookiePolicy")}
              </Link>
              <a 
                href="https://www.livroreclamacoes.pt/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-100 transition-opacity whitespace-nowrap"
              >
                {t("footer.complaintsBook")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

