"use client";

import Image from "next/image";
import { useI18n } from "@/components/I18nProvider";

export function ServicosHero() {
  const { t } = useI18n();

  return (
    <section 
      className="relative pt-32 pb-20 overflow-hidden"
      style={{
        backgroundImage: 'linear-gradient(to right bottom, #1c2544, #2a3558)'
      }}
    >
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2340"
            alt="Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
      <div className="hero-content container mx-auto px-4 md:px-6 lg:px-8 relative z-10 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            {t("servicesPage.hero.title")}
          </h1>
          <p className="text-xl opacity-90 text-white">
            {t("servicesPage.hero.subtitle")}
          </p>
        </div>
      </div>
    </section>
  );
}


