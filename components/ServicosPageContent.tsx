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

      {/* Formação e Qualificação Profissional */}
      <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div 
            className="rounded-3xl overflow-hidden shadow-xl"
            style={{
              backgroundImage: 'linear-gradient(to right bottom, #87c76c, #6baa53)'
            }}
          >
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="training-content p-12 lg:p-16 flex flex-col justify-center relative z-10 text-white">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                    {t("servicesPage.training.title")}
                  </h2>
                  <p className="text-xl mb-8 text-white">
                    {t("servicesPage.training.description")}
                  </p>
                  <ul className="space-y-3 mb-8 text-white">
                    {[
                      t("servicesPage.training.services.item1"),
                      t("servicesPage.training.services.item2"),
                      t("servicesPage.training.services.item3"),
                      t("servicesPage.training.services.item4"),
                    ].map((item) => (
                      <li key={item} className="flex items-start text-white">
                        <svg
                          className="w-6 h-6 mr-3 flex-shrink-0 mt-1 text-white"
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
                        <span className="text-lg text-white">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="secondary" size="lg" className="px-8 w-fit" asChild>
                    <Link href="/contactos">
                      {t("servicesPage.training.button")}
                    </Link>
                  </Button>
                </div>
                <div className="relative h-[400px] lg:h-auto">
                  <Image
                    src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2340"
                    alt="Formação e Qualificação Profissional"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* Final CTA Section */}
      <ServicosFinalCta />
    </>
  );
}


