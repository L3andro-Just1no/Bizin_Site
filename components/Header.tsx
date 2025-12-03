"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useI18n } from "@/components/I18nProvider";

const NAV_ITEMS = [
  { href: "/", labelKey: "common.home" },
  { href: "/servicos", labelKey: "nav.services" },
  { href: "/sobre-neomarca", labelKey: "nav.aboutNeomarca" },
  { href: "/sobre-portugal", labelKey: "nav.aboutPortugal" },
  { href: "/blog", labelKey: "nav.blog" },
  { href: "/contactos", labelKey: "nav.contacts" },
];

function LanguageSelector() {
  const { locale, setLocale } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: "pt", name: "Português" },
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
  ] as const;

  type LangCode = (typeof languages)[number]["code"];

  const currentLang = languages.find((l) => l.code === locale)?.name ?? "Português";

  const handleLanguageChange = (langCode: LangCode) => {
    setLocale(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 text-[14px] 2xl:text-[16px] text-[rgba(28,37,68,0.7)] uppercase hover:text-[#1c2544] transition-colors"
      >
        {/* Globe Icon */}
        <svg 
          className="w-4 h-4 2xl:w-5 2xl:h-5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
        {currentLang}
        <svg
          className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <>
          {/* Backdrop to close dropdown */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute left-0 top-full mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={cn(
                  "w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors",
                  locale === lang.code &&
                    "bg-gray-50 font-semibold text-[#1c2544]"
                )}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function Header() {
  const { t } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleClick = () => {
      // This will be handled by the LanguageSelector component
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white",
        isScrolled ? "shadow-md" : ""
      )}
    >
      <div className="container mx-auto px-4 md:px-4 lg:px-6 py-4 2xl:py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.svg"
              alt="Bizin Portugal"
              width={152}
              height={74}
              priority
              className="h-auto w-[120px] 2xl:w-[140px]"
            />
          </Link>

          {/* Desktop Navigation & Language - Right Side */}
          <div className="hidden xl:flex items-center gap-4 2xl:gap-6">
            <nav className="flex items-center gap-4 2xl:gap-6">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-[14px] 2xl:text-[16px] font-normal uppercase transition-colors tracking-[-0.14px]",
                    pathname === item.href
                      ? "text-[#1c2544] font-medium"
                      : "text-[#1c2544] hover:text-[#1c2544]/80"
                  )}
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  {t(item.labelKey)}
                </Link>
              ))}
            </nav>

            {/* Vertical Separator */}
            <div className="h-5 w-px bg-gray-300" />
            
            {/* Language Selector */}
            <LanguageSelector />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="xl:hidden p-2 text-[#1c2544]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="xl:hidden mt-6 pb-4 border-t border-gray-200 pt-4">
            <nav className="flex flex-col space-y-4">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-base font-normal uppercase transition-colors",
                    pathname === item.href
                      ? "text-[#1c2544] font-medium"
                      : "text-[#1c2544]/70"
                  )}
                >
                  {t(item.labelKey)}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-200">
                <LanguageSelector />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

