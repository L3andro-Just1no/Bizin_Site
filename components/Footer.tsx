"use client";

import Link from "next/link";
import Image from "next/image";
import { CONTACT_INFO, EXTERNAL_URLS } from "@/lib/constants";
import { useI18n } from "@/components/I18nProvider";

const NAV_ITEMS = [
  { href: "/", labelKey: "common.home" },
  { href: "/servicos", labelKey: "nav.services" },
  { href: "/sobre-neomarca", labelKey: "nav.aboutNeomarca" },
  { href: "/sobre-portugal", labelKey: "nav.aboutPortugal" },
  { href: "/blog", labelKey: "nav.blog" },
  { href: "/contactos", labelKey: "nav.contacts" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
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
              {NAV_ITEMS.map((item) => (
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

        {/* Bottom Section - Copyright, Privacy Links & Social Icons */}
        <div className="border-t border-white/10 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-[225px_1fr_auto] gap-6 lg:gap-12 items-center">
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

            {/* Social Icons */}
            <div className="flex items-center gap-2">
              <a
                href={EXTERNAL_URLS.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href={EXTERNAL_URLS.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
              <a
                href={EXTERNAL_URLS.social.instagram || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href={EXTERNAL_URLS.social.twitter || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                aria-label="X (Twitter)"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

