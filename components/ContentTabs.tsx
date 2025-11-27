"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { useI18n } from "@/components/I18nProvider";

type TabType = "artigo" | "eventos" | "formacoes";

const tabContent = {
  artigo: {
    title: "Artigos notícias e oportunidades",
    description: "Mantenha-se atualizado sobre incentivos, legislação e tendências de mercado.",
    items: [
      {
        id: "portugal-2030-financiamento",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2340",
        title: "Portugal 2030: novas oportunidades de financiamento",
        description:
          "Descubra as mais recentes linhas de apoio para PMEs, startups e projetos de inovação em Portugal. Saiba como candidatar-se...",
        link: "/blog#portugal-2030-financiamento",
      },
      {
        id: "golden-visa-vs-startup-visa",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426",
        title: "Guia completo: Golden Visa vs Startup Visa",
        description:
          "Compare as opções de residência para investidores e empreendedores. Entenda os requisitos, vantagens e processo de candidatura...",
        link: "/blog#golden-visa-vs-startup-visa",
      },
    ],
  },
  eventos: {
    title: "Eventos e networking",
    description: "Participe em eventos exclusivos sobre fundos europeus, investimento e empreendedorismo em Portugal.",
    items: [
      {
        id: "workshop-portugal-2030",
        image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069",
        title: "Workshop: como aceder aos fundos do Portugal 2030",
        date: "15 de Março, 2024",
        location: "Lisboa | online",
        description:
          "Workshop prático sobre o processo de candidatura aos fundos europeus. Inclui análise de casos de sucesso e sessão de Q&A.",
        link: "/contactos?interest=evento&event=workshop-portugal-2030",
      },
      {
        id: "networking-investidores",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070",
        title: "Networking: investidores internacionais em Portugal",
        date: "28 de Março, 2024",
        location: "Porto",
        description:
          "Evento de networking exclusivo para investidores e empreendedores internacionais. Conheça outros profissionais e partilhe experiências.",
        link: "/contactos?interest=evento&event=networking-investidores",
      },
    ],
  },
  formacoes: {
    title: "Formações e cursos",
    description: "Desenvolva competências essenciais com os nossos cursos especializados em fundos europeus e negócios em Portugal.",
    items: [
      {
        id: "curso-fundos-europeus",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2021",
        title: "Curso intensivo: gestão de candidaturas a fundos europeus",
        duration: "40 horas",
        format: "Presencial | online",
        description:
          "Formação completa sobre o ciclo completo de candidatura, desde a identificação de oportunidades até à gestão de projetos aprovados.",
        link: "/contactos?interest=formacao&curso=gestao-candidaturas-fundos-europeus",
      },
      {
        id: "masterclass-empreender-portugal",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070",
        title: "Masterclass: empreender em Portugal (do conceito ao sucesso)",
        duration: "16 horas",
        format: "Online",
        description:
          "Aprenda tudo sobre o ecossistema empresarial português, requisitos legais, fiscalidade e estratégias de crescimento.",
        link: "/contactos?interest=formacao&curso=empreender-portugal",
      },
    ],
  },
};

export function ContentTabs() {
  const [activeTab, setActiveTab] = useState<TabType>("artigo");
  const { t } = useI18n();

  const currentContent = tabContent[activeTab];

  return (
    <div className="container mx-auto px-4 md:px-4 lg:px-6">
      <div className="grid lg:grid-cols-3 gap-12">
        {/* Left - Title */}
        <div>
          <div className="flex gap-4 mb-6 flex-wrap">
            <button
              onClick={() => setActiveTab("artigo")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === "artigo"
                  ? "bg-[#419a59] bg-opacity-70 text-white"
                  : "border border-gray-300 text-[#1c2544] hover:border-[#419a59] hover:text-[#419a59]"
              }`}
            >
              {t("articles.tabArticle")}
            </button>
            <button
              onClick={() => setActiveTab("eventos")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === "eventos"
                  ? "bg-[#419a59] bg-opacity-70 text-white"
                  : "border border-gray-300 text-[#1c2544] hover:border-[#419a59] hover:text-[#419a59]"
              }`}
            >
              {t("articles.tabEvents")}
            </button>
            <button
              onClick={() => setActiveTab("formacoes")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === "formacoes"
                  ? "bg-[#419a59] bg-opacity-70 text-white"
                  : "border border-gray-300 text-[#1c2544] hover:border-[#419a59] hover:text-[#419a59]"
              }`}
            >
              {t("articles.tabTraining")}
            </button>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-[#1c2544] mb-6 leading-tight">
            {activeTab === "artigo"
              ? t("articles.title")
              : activeTab === "eventos"
              ? t("articles.eventsTitle")
              : t("articles.trainingTitle")}
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            {activeTab === "artigo"
              ? t("articles.description")
              : activeTab === "eventos"
              ? t("articles.eventsDescription")
              : t("articles.trainingDescription")}
          </p>
          <Link
            href="/blog"
            className="text-[#1c2544] font-medium text-xl border-b-2 border-[#1c2544] inline-block pb-1 hover:text-[#419a59] hover:border-[#419a59] transition-colors"
          >
            {t("common.viewAll")}
          </Link>
        </div>

        {/* Right - Content Cards */}
        <div className="lg:col-span-2 grid md:grid-cols-2 gap-8">
          {currentContent.items.map((item, index) => {
            const isArticleTab = activeTab === "artigo";
            const isEventsTab = activeTab === "eventos";
            const isTrainingTab = activeTab === "formacoes";

            const articleTitles = isArticleTab
              ? [
                  {
                    title: t("articles.article1.title"),
                    description: t("articles.article1.description"),
                  },
                  {
                    title: t("articles.article2.title"),
                    description: t("articles.article2.description"),
                  },
                ]
              : [];

            const eventsItems = isEventsTab
              ? [
                  {
                    title: t("articles.events.item1.title"),
                    date: t("articles.events.item1.date"),
                    location: t("articles.events.item1.location"),
                    description: t("articles.events.item1.description"),
                  },
                  {
                    title: t("articles.events.item2.title"),
                    date: t("articles.events.item2.date"),
                    location: t("articles.events.item2.location"),
                    description: t("articles.events.item2.description"),
                  },
                ]
              : [];

            const trainingItems = isTrainingTab
              ? [
                  {
                    title: t("articles.training.item1.title"),
                    duration: t("articles.training.item1.duration"),
                    format: t("articles.training.item1.format"),
                    description: t("articles.training.item1.description"),
                  },
                  {
                    title: t("articles.training.item2.title"),
                    duration: t("articles.training.item2.duration"),
                    format: t("articles.training.item2.format"),
                    description: t("articles.training.item2.description"),
                  },
                ]
              : [];

            const displayTitle = isArticleTab && articleTitles[index]
              ? articleTitles[index].title
              : isEventsTab && eventsItems[index]
              ? eventsItems[index].title
              : isTrainingTab && trainingItems[index]
              ? trainingItems[index].title
              : item.title;

            const displayDescription = isArticleTab && articleTitles[index]
              ? articleTitles[index].description
              : isEventsTab && eventsItems[index]
              ? eventsItems[index].description
              : isTrainingTab && trainingItems[index]
              ? trainingItems[index].description
              : item.description;

            const buttonLabel =
              activeTab === "artigo"
                ? `${t("common.readMore")} →`
                : activeTab === "eventos"
                ? `${t("common.getStarted")} →`
                : `${t("common.learnMore")} →`;

            return (
            <Card key={index} variant="elevated" className="overflow-hidden group hover:shadow-xl transition-shadow">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl mb-2 group-hover:text-[#419a59] transition-colors">
                  {displayTitle}
                </CardTitle>
                {"date" in item && (
                  <div className="flex flex-wrap gap-3 mb-2 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {isEventsTab && eventsItems[index]
                        ? eventsItems[index].date
                        : item.date}
                    </span>
                    {"location" in item && (
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {isEventsTab && eventsItems[index]
                          ? eventsItems[index].location
                          : item.location}
                      </span>
                    )}
                  </div>
                )}
                {"duration" in item && (
                  <div className="flex flex-wrap gap-3 mb-2 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {isTrainingTab && trainingItems[index]
                        ? trainingItems[index].duration
                        : item.duration}
                    </span>
                    {"format" in item && (
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {isTrainingTab && trainingItems[index]
                          ? trainingItems[index].format
                          : item.format}
                      </span>
                    )}
                  </div>
                )}
              <CardDescription>{displayDescription}</CardDescription>
                <Button variant="outline" className="mt-4" size="sm" asChild>
                  <Link href={item.link}>
                    {buttonLabel}
                  </Link>
                </Button>
              </CardHeader>
            </Card>
          );
          })}
        </div>
      </div>
    </div>
  );
}

