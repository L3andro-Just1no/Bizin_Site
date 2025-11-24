import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { EXTERNAL_URLS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Serviços - Neomarca",
  description: "Conheça os nossos serviços especializados em fundos europeus, incentivos ao investimento e consultoria estratégica.",
  openGraph: {
    title: "Serviços - Neomarca",
    description: "Conheça os nossos serviços especializados em fundos europeus, incentivos ao investimento e consultoria estratégica.",
  },
};

export default function ServicosPage() {
  return (
    <>
      {/* Hero Section with Background */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-[#1c2544] to-[#2a3558] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2340"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Os nossos serviços
            </h1>
            <p className="text-xl opacity-90">
              Soluções completas e personalizadas para maximizar as oportunidades
              de financiamento do seu negócio.
            </p>
          </div>
        </div>
      </section>

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
                Fundos europeus
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Apoiamos empresas e empreendedores na identificação e candidatura aos
                programas de financiamento mais adequados, maximizando as hipóteses
                de aprovação.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Análise de elegibilidade",
                  "Identificação de programas adequados",
                  "Preparação de candidaturas",
                  "Gestão de processos de aprovação",
                  "Acompanhamento pós-aprovação",
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
                <h3 className="text-xl font-bold text-[#1c2544] mb-4">Programas disponíveis</h3>
                <ul className="space-y-4">
                  <li className="border-l-4 border-[#87c76c] pl-4">
                    <strong className="text-[#1c2544]">Portugal 2030</strong>
                    <p className="text-sm text-gray-600 mt-1">
                      Apoio à inovação e competitividade empresarial
                    </p>
                  </li>
                  <li className="border-l-4 border-[#87c76c] pl-4">
                    <strong className="text-[#1c2544]">Horizonte Europa</strong>
                    <p className="text-sm text-gray-600 mt-1">
                      Financiamento para investigação e inovação
                    </p>
                  </li>
                  <li className="border-l-4 border-[#87c76c] pl-4">
                    <strong className="text-[#1c2544]">PRR - Plano de Recuperação</strong>
                    <p className="text-sm text-gray-600 mt-1">
                      Apoios no âmbito da recuperação económica
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
              Incentivos ao investimento
            </h2>
            <p className="text-xl text-gray-600">
              Maximização de benefícios fiscais e apoios ao investimento empresarial.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "RFAI",
                description: "Regime Fiscal de Apoio ao Investimento - Benefícios fiscais para investimentos produtivos.",
                icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              },
              {
                title: "SIFIDE",
                description: "Sistema de Incentivos Fiscais à I&D Empresarial - Dedução fiscal em projetos de investigação.",
                icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              },
              {
                title: "CFEI",
                description: "Crédito Fiscal Extraordinário ao Investimento - Apoio ao investimento em ativos fixos tangíveis.",
                icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              }
            ].map((incentive) => (
              <Card key={incentive.title} variant="elevated" className="hover:shadow-2xl transition-all p-8">
                <CardHeader>
                  <div className="w-16 h-16 bg-[#87c76c] bg-opacity-10 rounded-2xl flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-[#87c76c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={incentive.icon} />
                    </svg>
                  </div>
                  <CardTitle className="text-2xl text-[#1c2544] mb-4">{incentive.title}</CardTitle>
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
                Consultoria estratégica
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Acompanhamento especializado em todas as fases do seu projeto.
              </p>
              <div className="space-y-6">
                {[
                  {
                    num: "01",
                    title: "Diagnóstico Inicial",
                    description: "Análise da situação atual e identificação de oportunidades",
                  },
                  {
                    num: "02",
                    title: "Planeamento Estratégico",
                    description: "Definição de objetivos e estratégia de financiamento",
                  },
                  {
                    num: "03",
                    title: "Execução",
                    description: "Implementação e acompanhamento do projeto",
                  },
                  {
                    num: "04",
                    title: "Prestação de Contas",
                    description: "Gestão de relatórios e compliance com entidades financiadoras",
                  },
                ].map((service) => (
                  <div key={service.num} className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-[#87c76c] rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {service.num}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#1c2544] mb-2">{service.title}</h3>
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
                  Serviços documentais 2 Siglas
                </h2>
                <p className="text-xl mb-8 opacity-95">
                  Precisa de certificações, traduções ou outros serviços documentais?
                  Visite a nossa plataforma especializada.
                </p>
                <Button variant="secondary" size="lg" className="px-8" asChild>
                  <a
                    href={EXTERNAL_URLS.twoSiglas.main}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Explorar 2 Siglas →
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

      {/* CTA Section */}
      <Section variant="light" className="py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1c2544] mb-6">
              Interessado nos nossos serviços?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Entre em contacto connosco para uma consulta personalizada.
            </p>
            <Button variant="primary" size="lg" className="px-8 py-6" asChild>
              <Link href="/contactos">Falar com especialista</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

