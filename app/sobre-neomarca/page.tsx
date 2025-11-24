import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Sobre a Neomarca - Neomarca",
  description: "Conheça a Neomarca, especialistas em apoio ao acesso a fundos e incentivos europeus em Portugal.",
  openGraph: {
    title: "Sobre a Neomarca - Neomarca",
    description: "Conheça a Neomarca, especialistas em apoio ao acesso a fundos e incentivos europeus em Portugal.",
  },
};

export default function SobreNeomarcaPage() {
  return (
    <>
      {/* Hero Section with Background */}
      <section className="relative py-32 bg-gradient-to-br from-[#1c2544] to-[#2a3558] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2340"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Sobre a Neomarca
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Somos especialistas em transformar oportunidades europeias em
              resultados concretos para empresas e empreendedores.
            </p>
          </div>
        </div>
      </section>

      {/* Missão e Visão with Images */}
      <Section className="py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <Card variant="elevated" className="overflow-hidden">
              <div className="relative h-64">
                <Image
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2340"
                  alt="Nossa Missão"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c2544] to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <div className="w-16 h-16 bg-[#87c76c] rounded-2xl flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-white">Nossa missão</h2>
                </div>
              </div>
              <CardHeader className="p-8">
                <CardDescription className="text-gray-700 text-lg leading-relaxed">
                  Facilitar o acesso de empresas e empreendedores portugueses aos
                  fundos, incentivos e programas europeus, maximizando as suas
                  hipóteses de sucesso através de acompanhamento especializado e
                  personalizado.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card variant="elevated" className="overflow-hidden">
              <div className="relative h-64">
                <Image
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2340"
                  alt="Nossa Visão"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c2544] to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <div className="w-16 h-16 bg-[#87c76c] rounded-2xl flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-white">Nossa visão</h2>
                </div>
              </div>
              <CardHeader className="p-8">
                <CardDescription className="text-gray-700 text-lg leading-relaxed">
                  Ser a referência nacional em consultoria de fundos europeus,
                  reconhecida pela excelência do serviço, taxa de aprovação e
                  impacto positivo no desenvolvimento empresarial português.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </Section>

      {/* Valores */}
      <Section variant="light" className="py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1c2544] mb-6">
              Os nossos valores
            </h2>
            <p className="text-xl text-gray-600">
              Princípios que guiam o nosso trabalho e relação com os clientes.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Excelência",
                description: "Compromisso com a qualidade e resultados superiores",
                icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              },
              {
                title: "Transparência",
                description: "Comunicação clara e honesta em todas as etapas",
                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              },
              {
                title: "Especialização",
                description: "Conhecimento profundo de fundos e incentivos",
                icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              },
              {
                title: "Parceria",
                description: "Relações de longo prazo baseadas em confiança",
                icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              },
            ].map((valor) => (
              <div key={valor.title} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all text-center group">
                <div className="w-16 h-16 bg-[#f3f9f0] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#87c76c] transition-colors">
                  <svg className="w-8 h-8 text-[#87c76c] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={valor.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#1c2544]">
                  {valor.title}
                </h3>
                <p className="text-gray-600">{valor.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Abordagem with image */}
      <Section className="py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[600px] rounded-3xl overflow-hidden order-2 lg:order-1">
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2340"
                alt="Nossa Abordagem"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl md:text-5xl font-bold text-[#1c2544] mb-6">
                A nossa abordagem
              </h2>
              <p className="text-xl text-gray-600 mb-10">
                Como trabalhamos com os nossos clientes.
              </p>
              <div className="space-y-8">
                {[
                  {
                    step: "01",
                    title: "Diagnóstico personalizado",
                    description: "Analisamos a situação específica de cada cliente, identificando oportunidades e necessidades únicas.",
                  },
                  {
                    step: "02",
                    title: "Estratégia customizada",
                    description: "Desenvolvemos um plano de ação adaptado aos objetivos e características do projeto ou empresa.",
                  },
                  {
                    step: "03",
                    title: "Execução especializada",
                    description: "Preparamos e submetemos candidaturas com máximo rigor, aumentando as hipóteses de aprovação.",
                  },
                  {
                    step: "04",
                    title: "Acompanhamento contínuo",
                    description: "Mantemos apoio permanente durante a execução do projeto e prestação de contas.",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 bg-[#87c76c] rounded-full flex items-center justify-center text-white text-xl font-bold">
                        {item.step}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#1c2544] mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-lg leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA section with background image */}
      <section className="relative py-20">
        <Image
          src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2340"
          alt="Trabalhar Juntos"
          fill
          className="object-cover brightness-50"
        />
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Vamos trabalhar juntos?
            </h2>
            <p className="text-xl mb-8 opacity-95">
              Entre em contacto connosco e descubra como podemos ajudar o seu
              projeto a ter sucesso.
            </p>
            <Button variant="secondary" size="lg" className="px-8" asChild>
              <Link href="/contactos">Fale Connosco →</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
