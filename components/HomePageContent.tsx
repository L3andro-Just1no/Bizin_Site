"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { ContentTabs } from "@/components/ContentTabs";
import { FAQ } from "@/components/FAQ";
import { useI18n } from "@/components/I18nProvider";
import { VideoModal } from "@/components/ui/VideoModal";
import { EXTERNAL_URLS } from "@/lib/constants";
import type { SimpleBlogPost, SimpleBlogCategory } from "@/lib/supabase/types";

const CLIENT_LOGOS = [
  { name: "Imago", src: "/imago.svg" },
  { name: "Seatrips", src: "/seatrips.svg" },
  { name: "Omnibees", src: "/omnibees.png" },
  { name: "Dengun", src: "/dengun.jpg" },
  { name: "Teetimes", src: "/teetimes.png" },
];

interface HomePageContentProps {
  recentPosts: SimpleBlogPost[];
  categories: SimpleBlogCategory[];
}

export function HomePageContent({ recentPosts, categories }: HomePageContentProps) {
  const { t } = useI18n();
  const [webinarOpen, setWebinarOpen] = useState(false);

  const handleOpenChat = () => {
    if (typeof window !== 'undefined' && (window as any).openBizinChat) {
      (window as any).openBizinChat();
    }
  };

  const handleCheckout = async (product: "investment" | "training" | "aiDiagnostic") => {
    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Checkout error:", data.error);
        alert("Failed to create checkout session. Please try again.");
        return;
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      {webinarOpen && (
        <VideoModal
          src="/videos/webinar-incentivos.mp4"
          onClose={() => setWebinarOpen(false)}
        />
      )}
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
                <Button variant="primary" size="lg" className="px-8 py-6" onClick={handleOpenChat}>
                  {t("hero.ctaInvest")}
                </Button>
                <Button variant="secondary" size="lg" className="px-8 py-6" onClick={handleOpenChat}>
                  {t("hero.ctaTraining")}
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
                  <div className="inline-flex items-baseline text-6xl md:text-7xl font-bold text-[#1c2544] mb-2">
                    <span>2,3M.</span>
                    <span className="ml-2">+</span>
                  </div>
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
                  <div className="inline-flex items-baseline text-5xl md:text-6xl font-bold text-[#1c2544] mb-2">
                    <span>120</span>
                    <span className="ml-2">+</span>
                  </div>
                  <p className="text-gray-600">
                    {t("success.clientsSupported")}
                  </p>
                </div>
                <div>
                  <div className="inline-flex items-baseline text-5xl md:text-6xl font-bold text-[#1c2544] mb-2">
                    <span>98%</span>
                    <span className="ml-2">+</span>
                  </div>
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

      {/* Products Section - Booking / Checkout Cards */}
      <Section variant="default" className="py-20" id="booking-section">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1c2544] mb-12 text-center">
            {t("products.sectionTitle")}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Investment Consulting Card */}
            <div 
              className="rounded-3xl overflow-hidden shadow-xl flex flex-col"
              style={{
                backgroundImage: 'linear-gradient(to right bottom, #1c2544, #2a3558)'
              }}
            >
              <div className="p-8 lg:p-10 text-white flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold mb-4 text-white">
                  {t("products.investment.title")}
                </h3>
                <p className="text-lg mb-6 text-white opacity-95 leading-relaxed flex-1">
                  {t("products.investment.description")}
                </p>
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full mt-auto border-white/30 hover:bg-white/90"
                  onClick={() => handleCheckout("investment")}
                >
                  {t("products.investment.button")}
                </Button>
              </div>
              <div className="relative h-[250px]">
                <Image
                  src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2340"
                  alt="Consultoria de Investimento"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Training Consulting Card */}
            <div 
              className="rounded-3xl overflow-hidden shadow-xl flex flex-col"
              style={{
                backgroundImage: 'linear-gradient(to right bottom, #87c76c, #6baa53)'
              }}
            >
              <div className="p-8 lg:p-10 text-white flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold mb-4 text-white">
                  {t("products.training.title")}
                </h3>
                <p className="text-lg mb-6 text-white opacity-95 leading-relaxed flex-1">
                  {t("products.training.description")}
                </p>
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="w-full mt-auto"
                  onClick={() => handleCheckout("training")}
                >
                  {t("products.training.button")}
                </Button>
              </div>
              <div className="relative h-[250px]">
                <Image
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2340"
                  alt="Consultoria de Formação"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* AI Diagnostic Card */}
            <div 
              className="rounded-3xl overflow-hidden shadow-xl flex flex-col"
              style={{
                backgroundImage: 'linear-gradient(to right bottom, #4a5568, #2d3748)'
              }}
            >
              <div className="p-8 lg:p-10 text-white flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold mb-4 text-white">
                  {t("products.aiDiagnostic.title")}
                </h3>
                <p className="text-lg mb-6 text-white opacity-95 leading-relaxed flex-1">
                  {t("products.aiDiagnostic.description")}
                </p>
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full mt-auto border-white/30 hover:bg-white/90"
                  onClick={() => handleCheckout("aiDiagnostic")}
                >
                  {t("products.aiDiagnostic.button")}
                </Button>
              </div>
              <div className="relative h-[250px]">
                <Image
                  src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2340"
                  alt="Diagnóstico Estratégico de IA"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Webinar Incentivos - Gratuito */}
            <div 
              className="rounded-3xl overflow-hidden shadow-xl flex flex-col relative"
              style={{
                backgroundImage: 'linear-gradient(to right bottom, #0d9488, #0f766e)'
              }}
            >
              <div className="absolute top-4 right-4 z-10">
                <span className="bg-white text-teal-800 text-sm font-semibold px-3 py-1 rounded-full">
                  {t("products.webinarIncentivos.tag")}
                </span>
              </div>
              <div className="p-8 lg:p-10 text-white flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-white">
                  {t("products.webinarIncentivos.title")}
                </h3>
                <p className="text-lg mb-6 text-white opacity-95 leading-relaxed flex-1">
                  {t("products.webinarIncentivos.description")}
                </p>
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full mt-auto border-white/30 hover:bg-white/90"
                  onClick={() => setWebinarOpen(true)}
                >
                  {t("products.webinarIncentivos.button")}
                </Button>
              </div>
              <div className="relative h-[250px]">
                <Image
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2340"
                  alt="Webinar Incentivos à Digitalização"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </Section>

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
                <Button variant="primary" size="lg" className="px-8 py-6" onClick={handleOpenChat}>
                  {t("hero.ctaInvest")}
                </Button>
                <Button variant="secondary" size="lg" className="px-8 py-6" onClick={handleOpenChat}>
                  {t("hero.ctaTraining")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Blog/Articles/Events/Training Section */}
      <Section variant="light" className="py-20">
        <ContentTabs posts={recentPosts} categories={categories} />
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
