"use client";

import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Card, CardHeader, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useI18n } from "@/components/I18nProvider";

export function SobrePortugalContent() {
  const { t } = useI18n();

  const advantagesCards = [
    {
      key: "location",
      image:
        "https://images.unsplash.com/photo-1526495124232-a04e1849168c?q=80&w=800",
      iconPath:
        "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      key: "tax",
      image:
        "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800",
      iconPath:
        "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      key: "infrastructure",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800",
      iconPath:
        "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
    },
    {
      key: "talent",
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800",
      iconPath:
        "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    },
    {
      key: "innovation",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800",
      iconPath:
        "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    },
    {
      key: "qualityOfLife",
      image:
        "https://images.unsplash.com/photo-1528114039593-4366cc08227d?q=80&w=800",
      iconPath:
        "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    },
  ];

  const fundsPrograms = [
    {
      key: "portugal2030",
      gradient: "linear-gradient(to right bottom, #87c76c, #6baa53)",
    },
    {
      key: "prr",
      gradient: "linear-gradient(to right bottom, #1c2544, #2a3558)",
    },
    {
      key: "horizonEurope",
      gradient: "linear-gradient(to right bottom, #5a5a5a, #3a3a3a)",
    },
  ];

  return (
    <>
      {/* Hero Section with Portugal Image */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=2340"
          alt="Lisboa, Portugal"
          fill
          className="object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10 text-center text-white">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            {t("aboutPortugal.hero.title")}
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            {t("aboutPortugal.hero.subtitle")}
          </p>
        </div>
      </section>

      {/* Advantages */}
      <Section className="py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1c2544] mb-6">
              {t("aboutPortugal.advantages.title")}
            </h2>
            <p className="text-xl text-gray-600">
              {t("aboutPortugal.advantages.subtitle")}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantagesCards.map((item) => (
              <Card
                key={item.key}
                variant="elevated"
                className="overflow-hidden hover:shadow-2xl transition-all group"
              >
                <div className="relative h-56">
                  <Image
                    src={item.image}
                    alt={t(
                      `aboutPortugal.advantages.cards.${item.key}.title`,
                    )}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div 
                    className="absolute inset-0"
                    style={{
                      backgroundImage: 'linear-gradient(to top, rgba(28, 37, 68, 0.9), transparent)'
                    }}
                  />
                  <div className="absolute bottom-4 left-4 right-4">
                    <svg
                      className="w-10 h-10 text-[#87c76c] mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={item.iconPath}
                      />
                    </svg>
                    <h3 className="text-2xl font-bold text-white">
                      {t(`aboutPortugal.advantages.cards.${item.key}.title`)}
                    </h3>
                  </div>
                </div>
                <CardHeader className="p-6">
                  <CardDescription className="text-gray-600 text-base leading-relaxed">
                    {t(
                      `aboutPortugal.advantages.cards.${item.key}.description`,
                    )}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Funds section with image */}
      <Section variant="light" className="py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#1c2544] mb-6">
                {t("aboutPortugal.funds.title")}
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                {t("aboutPortugal.funds.description")}
              </p>
            </div>
            <div className="relative h-[400px] rounded-3xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1559526324-593bc073d938?q=80&w=2340"
                alt="Fundos Europeus"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {fundsPrograms.map((fund) => (
              <div
                key={fund.key}
                className="text-white rounded-2xl p-8 hover:shadow-2xl transition-all"
                style={{
                  backgroundImage: fund.gradient
                }}
              >
                <h3 className="text-2xl font-bold mb-3">
                  {t(`aboutPortugal.funds.programs.${fund.key}.title`)}
                </h3>
                <p className="opacity-90 mb-6 leading-relaxed">
                  {t(`aboutPortugal.funds.programs.${fund.key}.description`)}
                </p>
                <div className="text-3xl font-bold">
                  {t(`aboutPortugal.funds.programs.${fund.key}.amount`)}
                </div>
                <div className="text-sm opacity-75 mt-1">
                  {t("aboutPortugal.funds.availableLabel")}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA with dual images */}
      <Section className="py-20">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div 
              className="rounded-3xl overflow-hidden"
              style={{
                backgroundImage: 'linear-gradient(to right bottom, #1c2544, #2a3558)'
              }}
            >
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative h-[400px] lg:h-auto">
                  <Image
                    src="https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2340"
                    alt="Equipa a trabalhar em projeto de investimento"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="cta-content p-12 lg:p-16 flex flex-col justify-center text-white">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                    {t("aboutPortugal.cta.title")}
                  </h2>
                  <p className="text-xl mb-8 opacity-95 leading-relaxed text-white">
                    {t("aboutPortugal.cta.description")}
                  </p>
                  <Button variant="secondary" size="lg" className="px-8" asChild>
                    <Link href="/contactos">
                      {t("aboutPortugal.cta.button")}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Section>
    </>
  );
}


