"use client";

import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { EXTERNAL_URLS } from "@/lib/constants";
import { useI18n } from "@/components/I18nProvider";
import { ServicosHero } from "@/components/ServicosHero";
import { ServicosFinalCta } from "@/components/ServicosFinalCta";

export function ServicosPageContent() {
  const { t } = useI18n();

  return (
    <>
      {/* Hero Section with Background */}
      <ServicosHero />

      {/* Fundos Europeus */}
      <Section id="fundos-europeus" className="py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] rounded-3xl overflow-hidden order-2 md:order-1">
              <Image
                src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2340"
                alt="Fundos Europeus"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-4xl md:text-5xl font-bold text-[#1c2544] mb-6">
                {t("servicesPage.funds.title")}
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {t("servicesPage.funds.description")}
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  t("servicesPage.funds.bullets.eligibility"),
                  t("servicesPage.funds.bullets.programs"),
                  t("servicesPage.funds.bullets.applications"),
                  t("servicesPage.funds.bullets.approval"),
                  t("servicesPage.funds.bullets.followUp"),
                ].map((item) => (
                  <li key={item} className="flex items-start">
                    <svg
                      className="w-6 h-6 text-[#87c76c] mr-3 flex-shrink-0 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700 text-lg">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-[#f3f9f0] rounded-2xl p-6">
                <h3 className="text-xl font-bold text-[#1c2544] mb-4">
                  {t("servicesPage.funds.programsTitle")}
                </h3>
                <ul className="space-y-4">
                  <li className="border-l-4 border-[#87c76c] pl-4">
                    <strong className="text-[#1c2544]">
                      {t("servicesPage.funds.programs.portugal2030.title")}
                    </strong>
                    <p className="text-sm text-gray-600 mt-1">
                      {t(
                        "servicesPage.funds.programs.portugal2030.description",
                      )}
                    </p>
                  </li>
                  <li className="border-l-4 border-[#87c76c] pl-4">
                    <strong className="text-[#1c2544]">
                      {t("servicesPage.funds.programs.horizonEurope.title")}
                    </strong>
                    <p className="text-sm text-gray-600 mt-1">
                      {t(
                        "servicesPage.funds.programs.horizonEurope.description",
                      )}
                    </p>
                  </li>
                  <li className="border-l-4 border-[#87c76c] pl-4">
                    <strong className="text-[#1c2544]">
                      {t("servicesPage.funds.programs.prr.title")}
                    </strong>
                    <p className="text-sm text-gray-600 mt-1">
                      {t("servicesPage.funds.programs.prr.description")}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Incentivos */}
      <Section id="incentivos" variant="light" className="py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1c2544] mb-6">
              {t("servicesPage.incentives.title")}
            </h2>
            <p className="text-xl text-gray-600">
              {t("servicesPage.incentives.subtitle")}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: t("servicesPage.incentives.cards.rfai.title"),
                description: t(
                  "servicesPage.incentives.cards.rfai.description",
                ),
                icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
              },
              {
                title: t("servicesPage.incentives.cards.sifide.title"),
                description: t(
                  "servicesPage.incentives.cards.sifide.description",
                ),
                icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
              },
              {
                title: t("servicesPage.incentives.cards.cfei.title"),
                description: t(
                  "servicesPage.incentives.cards.cfei.description",
                ),
                icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
              },
            ].map((incentive) => (
              <Card
                key={incentive.title}
                variant="elevated"
                className="hover:shadow-2xl transition-all p-8"
              >
                <CardHeader>
                  <div className="w-16 h-16 bg-[#87c76c] bg-opacity-10 rounded-2xl flex items-center justify-center mb-6">
                    <svg
                      className="w-8 h-8 text-[#87c76c]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={incentive.icon}
                      />
                    </svg>
                  </div>
                  <CardTitle className="text-2xl text-[#1c2544] mb-4">
                    {incentive.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-base leading-relaxed">
                    {incentive.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Consultoria */}
      <Section id="consultoria" className="py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#1c2544] mb-6">
                {t("servicesPage.consulting.title")}
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                {t("servicesPage.consulting.subtitle")}
              </p>
              <div className="space-y-6">
                {[
                  {
                    num: "01",
                    title: t("servicesPage.consulting.steps.step1.title"),
                    description: t(
                      "servicesPage.consulting.steps.step1.description",
                    ),
                  },
                  {
                    num: "02",
                    title: t("servicesPage.consulting.steps.step2.title"),
                    description: t(
                      "servicesPage.consulting.steps.step2.description",
                    ),
                  },
                  {
                    num: "03",
                    title: t("servicesPage.consulting.steps.step3.title"),
                    description: t(
                      "servicesPage.consulting.steps.step3.description",
                    ),
                  },
                  {
                    num: "04",
                    title: t("servicesPage.consulting.steps.step4.title"),
                    description: t(
                      "servicesPage.consulting.steps.step4.description",
                    ),
                  },
                ].map((service) => (
                  <div key={service.num} className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-[#87c76c] rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {service.num}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#1c2544] mb-2">
                        {service.title}
                      </h3>
                      <p className="text-gray-600">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-[600px] rounded-3xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2340"
                alt="Consultoria Estratégica"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* 2 Siglas CTA with Image */}
      <Section variant="default" className="py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#87c76c] to-[#6baa53] rounded-3xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="p-12 lg:p-16 flex flex-col justify-center text-white">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  {t("servicesPage.twoSiglas.title")}
                </h2>
                <p className="text-xl mb-8 opacity-95">
                  {t("servicesPage.twoSiglas.description")}
                </p>
                <Button variant="secondary" size="lg" className="px-8" asChild>
                  <a
                    href={EXTERNAL_URLS.twoSiglas.main}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("servicesPage.twoSiglas.button")}
                  </a>
                </Button>
              </div>
              <div className="relative h-[400px] lg:h-auto">
                <Image
                  src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2340"
                  alt="2 Siglas"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Final CTA Section */}
      <ServicosFinalCta />
    </>
  );
}


