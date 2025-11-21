"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/servicos", label: "Serviços" },
  { href: "/sobre-neomarca", label: "Sobre nós" },
  { href: "/sobre-portugal", label: "Sobre Portugal" },
  { href: "/blog", label: "Notícias /Blog" },
  { href: "/contactos", label: "Contactos" },
];

// Language switcher matching Figma design with i18n ready
// Note: Currently displays static "English" - will be connected to i18n when activated
function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  
  // For now, default to Portuguese (when i18n is activated, this will use useLocale())
  const currentLang = "Português";

  const languages = [
    { code: "pt", name: "Português" },
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
  ];

  const handleLanguageChange = (langCode: string) => {
    // When i18n is activated, this will update the route
    // For now, just close the dropdown
    console.log(`Language change to: ${langCode}`);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-[18px] text-[rgba(28,37,68,0.7)] uppercase hover:text-[#1c2544] transition-colors"
      >
        {/* Globe Icon */}
        <svg 
          className="w-5 h-5" 
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
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={cn(
                  "w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors",
                  currentLang === lang.name && "bg-gray-50 font-semibold text-[#1c2544]"
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
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.svg"
              alt="Bizin Portugal"
              width={152}
              height={74}
              priority
              className="h-auto w-[152px]"
            />
          </Link>

          {/* Desktop Navigation & Language - Right Side */}
          <div className="hidden xl:flex items-center gap-8">
            <nav className="flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-[18px] font-normal uppercase transition-colors tracking-[-0.18px]",
                    pathname === item.href
                      ? "text-[#1c2544] font-medium"
                      : "text-[#1c2544] hover:text-[#1c2544]/80"
                  )}
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Vertical Separator */}
            <div className="h-6 w-px bg-gray-300" />
            
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
                  {item.label}
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

