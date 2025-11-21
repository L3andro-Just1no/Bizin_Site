import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Sobre Portugal - Neomarca",
  description: "Descubra as vantagens de investir e empreender em Portugal com apoio de fundos e incentivos europeus.",
  openGraph: {
    title: "Sobre Portugal - Neomarca",
    description: "Descubra as vantagens de investir e empreender em Portugal com apoio de fundos e incentivos europeus.",
  },
};

export default function SobrePortugalPage() {
  return (
    <>
      {/* Hero Section with Portugal Image */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=2340"
          alt="Lisboa, Portugal"
          fill
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20" />
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10 text-center text-white">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            Portugal: Porta de Entrada para a Europa
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Um ecossistema empresarial dinâmico com acesso privilegiado a fundos
            e incentivos europeus.
          </p>
        </div>
      </section>

      {/* Vantagens */}
      <Section className="py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1c2544] mb-6">
              Porquê Portugal?
            </h2>
            <p className="text-xl text-gray-600">
              Um ambiente de negócios favorável e competitivo no contexto europeu.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Localização Estratégica",
                description: "Posição geográfica privilegiada entre Europa, África e Américas, ideal para operações internacionais.",
                image: "https://images.unsplash.com/photo-1526495124232-a04e1849168c?q=80&w=800",
                icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              },
              {
                title: "Regime Fiscal Competitivo",
                description: "Incentivos fiscais atrativos, incluindo regimes especiais para residentes não habituais e investimento em I&D.",
                image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800",
                icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              },
              {
                title: "Infraestruturas Modernas",
                description: "Ecossistema empresarial desenvolvido com infraestruturas de qualidade e conectividade digital de excelência.",
                image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800",
                icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              },
              {
                title: "Talento Qualificado",
                description: "Mão de obra altamente qualificada e multilingue, com boa relação qualidade-preço comparativamente a outros países europeus.",
                image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800",
                icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              },
              {
                title: "Inovação e Tecnologia",
                description: "Crescente ecossistema de startups e apoio governamental à inovação e transformação digital.",
                image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800",
                icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              },
              {
                title: "Qualidade de Vida",
                description: "Excelente clima, segurança, cultura rica e custo de vida competitivo atraem talento internacional.",
                image: "https://images.unsplash.com/photo-1528114039593-4366cc08227d?q=80&w=800",
                icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              },
            ].map((item) => (
              <Card key={item.title} variant="elevated" className="overflow-hidden hover:shadow-2xl transition-all group">
                <div className="relative h-56">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1c2544]/90 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <svg className="w-10 h-10 text-[#87c76c] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                    <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                  </div>
                </div>
                <CardHeader className="p-6">
                  <CardDescription className="text-gray-600 text-base leading-relaxed">
                    {item.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Fundos Disponíveis with Image */}
      <Section variant="light" className="py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#1c2544] mb-6">
                Fundos Europeus em Portugal
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Portugal tem acesso a milhares de milhões de euros em fundos europeus
                para apoiar o desenvolvimento empresarial e a inovação.
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
            {[
              {
                title: "Portugal 2030",
                description: "Programa de apoio ao desenvolvimento empresarial, inovação, competitividade e internacionalização.",
                amount: "€23 mil milhões",
                color: "from-[#87c76c] to-[#6baa53]"
              },
              {
                title: "PRR - Plano de Recuperação",
                description: "Financiamento para projetos de transição digital, climática e resiliência económica.",
                amount: "€16,6 mil milhões",
                color: "from-[#1c2544] to-[#2a3558]"
              },
              {
                title: "Horizonte Europa",
                description: "Programa europeu de apoio à investigação e inovação, aberto a entidades portuguesas.",
                amount: "€95,5 mil milhões",
                color: "from-[#5a5a5a] to-[#3a3a3a]"
              },
            ].map((fund) => (
              <div key={fund.title} className={`bg-gradient-to-br ${fund.color} text-white rounded-2xl p-8 hover:shadow-2xl transition-all`}>
                <h3 className="text-2xl font-bold mb-3">{fund.title}</h3>
                <p className="opacity-90 mb-6 leading-relaxed">{fund.description}</p>
                <div className="text-3xl font-bold">{fund.amount}</div>
                <div className="text-sm opacity-75 mt-1">disponíveis</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA with Dual Images */}
      <Section className="py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#1c2544] to-[#2a3558] rounded-3xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative h-[400px] lg:h-auto">
                <Image
                  src="https://images.unsplash.com/photo-1587108167880-c66e23c65ffe?q=80&w=2340"
                  alt="Contacte-nos"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-12 lg:p-16 flex flex-col justify-center text-white">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Pronto para Investir em Portugal?
                </h2>
                <p className="text-xl mb-8 opacity-95 leading-relaxed">
                  A Neomarca ajuda-o a navegar no ecossistema de fundos e incentivos
                  portugueses e europeus.
                </p>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white text-[#1c2544] hover:bg-gray-100 border-white w-fit px-8"
                  asChild
                >
                  <Link href="/contactos">Agendar Consulta →</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
