"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { ContentTabs } from "@/components/ContentTabs";
import { FAQ } from "@/components/FAQ";
import { EXTERNAL_URLS } from "@/lib/constants";
import { useI18n } from "@/components/I18nProvider";

const CLIENT_LOGOS = [
  { name: "Imago", src: "/imago.svg" },
  { name: "Seatrips", src: "/seatrips.svg" },
  { name: "Omnibees", src: "/omnibees.png" },
  { name: "Dengun", src: "/dengun.jpg" },
  { name: "Teetimes", src: "/teetimes.png" },
];

export default function Home() {
  const { t } = useI18n();

  return (
    <>
      {/* Hero Section with Background Image */}
      <section className="relative min-h-[600px] md:min-h-[700px] lg:min-h-[800px] bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="max-w-2xl order-2 lg:order-1">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1c2544] mb-6 leading-tight">
                {t("hero.title")}{" "}
                <span className="block mt-2">{t("hero.subtitle")}</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                {t("hero.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="primary" size="lg" className="px-8 py-6" asChild>
                  <Link href="/contactos">{t("hero.ctaInvest")}</Link>
                </Button>
                <Button variant="secondary" size="lg" className="px-8 py-6" asChild>
                  <Link href="/servicos">{t("hero.ctaTraining")}</Link>
                </Button>
              </div>
            </div>

            {/* Right image */}
            <div className="relative h-64 sm:h-80 md:h-[520px] lg:h-[600px] order-1 lg:order-2 mt-4 lg:mt-0">
              <div className="relative h-full rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=2340"
                  alt="Lisboa Portugal"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Bizin Portugal Section */}
      <Section variant="default" className="py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left Side - Text */}
            <div>
              <p className="text-gray-600 text-xl mb-2">{t("whyBizin.tag")}</p>
              <hr className="w-full border-t-2 border-gray-300 mb-8" />
              <h2 className="text-4xl md:text-5xl font-bold text-[#1c2544] mb-6 leading-tight">
                {t("whyBizin.title")}
              </h2>
              <div className="bg-[#1c2544] text-white inline-block px-6 py-3 rounded-2xl mb-8">
                <p className="text-sm uppercase font-medium">{t("whyBizin.badge")}</p>
              </div>
              <div className="relative h-[400px] rounded-3xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2340"
                  alt="Estratégia de negócios em equipa"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right Side - Services List */}
            <div className="space-y-12">
              {/* Investment Advisory */}
              <div>
                <h3 className="text-3xl font-bold text-[#1c2544] mb-4">
                  {t("whyBizin.investmentAdvisory.title")}
                </h3>
                <p className="text-gray-600 mb-6">
                  {t("whyBizin.investmentAdvisory.description")}
                </p>
                <div className="space-y-2">
                  {[
                    { num: "01", text: t("whyBizin.investmentAdvisory.item1") },
                    { num: "02", text: t("whyBizin.investmentAdvisory.item2") },
                    { num: "03", text: t("whyBizin.investmentAdvisory.item3") },
                  ].map((item) => (
                    <div key={item.num} className="border-t border-gray-200 py-4">
                      <div className="flex items-start gap-4">
                        <span className="text-gray-400 font-medium text-xl">{item.num}</span>
                        <p className="text-gray-700 text-lg">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Human Capital */}
              <div>
                <h3 className="text-3xl font-bold text-[#1c2544] mb-4">
                  {t("whyBizin.humanCapital.title")}
                </h3>
                <p className="text-gray-600 mb-6">
                  {t("whyBizin.humanCapital.description")}
                </p>
                <div className="space-y-2">
                  {[
                    { num: "01", text: t("whyBizin.humanCapital.item1") },
                    { num: "02", text: t("whyBizin.humanCapital.item2") },
                    { num: "03", text: t("whyBizin.humanCapital.item3") },
                  ].map((item) => (
                    <div key={item.num} className="border-t border-gray-200 py-4">
                      <div className="flex items-start gap-4">
                        <span className="text-gray-400 font-medium text-xl">{item.num}</span>
                        <p className="text-gray-700 text-lg">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Success Stories with Team Photo */}
      <Section variant="light" className="py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          {/* Team Image */}
          <div className="relative h-[500px] rounded-3xl overflow-hidden mb-16">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2340"
              alt="Nossa Equipa"
              fill
              className="object-cover"
            />
          </div>

          {/* Stats and Description */}
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#1c2544] mb-8">
                {t("success.title")}
              </h2>
              <div className="space-y-8">
                <div>
                  <div className="text-6xl md:text-7xl font-bold text-[#1c2544] mb-2">2,3M. +</div>
                  <p className="text-gray-600 text-lg">
                    {t("success.capitalFinanced")}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              <p className="text-gray-600 text-lg leading-relaxed">
                {t("success.description")}
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-5xl md:text-6xl font-bold text-[#1c2544] mb-2">120 +</div>
                  <p className="text-gray-600">
                    {t("success.clientsSupported")}
                  </p>
                </div>
                <div>
                  <div className="text-5xl md:text-6xl font-bold text-[#1c2544] mb-2">98% +</div>
                  <p className="text-gray-600">
                    {t("success.satisfactionRate")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Partner Logos */}
      <section className="py-12 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {CLIENT_LOGOS.map((logo) => (
              <div
                key={logo.name}
                className="relative w-40 h-16 sm:w-48 sm:h-20 flex items-center justify-center"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <Section variant="default" className="py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-gray-700">{t("cta.title1")}</span>{" "}
                <span className="text-[#1c2544]">{t("cta.title2")}</span>
              </h2>
            </div>
            <div>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                {t("cta.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="primary" size="lg" className="px-8 py-6" asChild>
                  <Link href="/contactos">{t("hero.ctaInvest")}</Link>
                </Button>
                <Button variant="secondary" size="lg" className="px-8 py-6" asChild>
                  <Link href="/servicos">{t("hero.ctaTraining")}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Blog/Articles/Events/Training Section */}
      <Section variant="light" className="py-20">
        <ContentTabs />
      </Section>

      {/* FAQ Section */}
      <Section variant="default" className="py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div>
              <p className="text-gray-600 text-lg mb-6">
                {t("faq.intro")}
              </p>
            </div>
            <div className="lg:col-span-2">
              <h2 className="text-5xl md:text-6xl font-bold text-[#1c2544] mb-12 leading-tight">
                {t("faq.title")}
              </h2>
              <FAQ />
            </div>
          </div>
        </div>
      </Section>

      {/* Contact Section Preview */}
      <Section variant="light" className="py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-5xl md:text-6xl font-bold text-[#1c2544] mb-6">
                {t("contactPreview.title")}
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                {t("contactPreview.description")}
              </p>
              <Button variant="primary" size="lg" asChild>
                <Link href="/contactos">{t("common.contactUs")}</Link>
              </Button>
            </div>
            <div className="relative h-[400px] rounded-3xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2340"
                alt="Contacto"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
