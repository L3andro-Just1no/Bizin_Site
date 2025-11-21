import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { EXTERNAL_URLS } from "@/lib/constants";

export default function Home() {
  return (
    <>
      {/* Hero Section with Background Image */}
      <section className="relative min-h-[600px] md:min-h-[700px] lg:min-h-[800px] bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-32 lg:py-40">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1c2544] mb-6 leading-tight">
                Portugal.{" "}
                <span className="block mt-2">
                  O Seu Próximo Destino de Investimento e Carreira.
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                Oferecemos serviços personalizados, consultoria estratégica (Neomarca) e formação de excelência (2 Siglas) para garantir o seu sucesso, seja a investir, a empreender ou a desenvolver a sua carreira em Portugal
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="bg-[#1c2544] hover:bg-[#2a3558] text-white px-8 py-6 text-lg rounded-full"
                  asChild
                >
                  <Link href="/contactos">Quero Investir em Portugal</Link>
                </Button>
                <Button 
                  className="bg-[#87c76c] hover:bg-[#75b55c] text-white px-8 py-6 text-lg rounded-full"
                  asChild
                >
                  <Link href="/servicos">Quero Capacitar-me</Link>
                </Button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative hidden lg:block">
              <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
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
              <p className="text-gray-600 text-xl mb-2">Porquê Bizin Portugal?</p>
              <hr className="w-full border-t-2 border-gray-300 mb-8" />
              <h2 className="text-4xl md:text-5xl font-bold text-[#1c2544] mb-6 leading-tight">
                O Destino Estratégico para o Seu Negócio e Vida
              </h2>
              <div className="bg-[#1c2544] text-white inline-block px-6 py-3 rounded-2xl mb-8">
                <p className="text-sm uppercase font-medium">Desde 2018 a Apoiar Empreendedores</p>
              </div>
              <div className="relative h-[400px] rounded-3xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=2340"
                  alt="Estratégia de Negócios"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right Side - Services List */}
            <div className="space-y-12">
              {/* Investment Advisory */}
              <div>
                <h3 className="text-3xl font-bold text-[#1c2544] mb-4">Consultoria de Investimento</h3>
                <p className="text-gray-600 mb-6">
                  Obtenha consultoria especializada para lançar e financiar o seu projeto em Portugal. Apoiamos a tomada de decisão com análise de mercado, benchmarking e apoio na elegibilidade para incentivos e fundos europeus, como o Portugal 2030.
                </p>
                <div className="space-y-2">
                  {[
                    {num: "01", text: "Consultoria para Arranque de Negócio e Estratégia Corporativa"},
                    {num: "02", text: "Acesso a Fundos Nacionais e Europeus (Portugal 2030, PRR)."},
                    {num: "03", text: "Apoio a Incentivos Fiscais e Vistos de Residência (Golden Visa, Startup Visa)."}
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
                <h3 className="text-3xl font-bold text-[#1c2544] mb-4">Capital Humano</h3>
                <p className="text-gray-600 mb-6">
                  Invista nas competências certas para o mercado português. A nossa oferta de formação e capacitação é desenhada para profissionais e empreendedores que procuram reconversão, certificação nacional ou atualização de conhecimento.
                </p>
                <div className="space-y-2">
                  {[
                    {num: "01", text: "Formação Profissional Certificada e Infoprodutos"},
                    {num: "02", text: "Cursos e eBooks sobre Ambiente Fiscal e Oportunidades de Negócio."},
                    {num: "03", text: "Apoio à capacitação para o mercado de trabalho português"}
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
                O Seu Sucesso é a Nossa Métrica.
              </h2>
              <div className="space-y-8">
                <div>
                  <div className="text-6xl md:text-7xl font-bold text-[#1c2544] mb-2">2,3M. +</div>
                  <p className="text-gray-600 text-lg">Capital Financiado e Alavancado</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              <p className="text-gray-600 text-lg leading-relaxed">
                Mais do que consultores, somos parceiros estratégicos. Os números refletem o nosso compromisso, a nossa rede de contactos e o impacto real que geramos no mercado português para investidores e profissionais internacionais que escolhem Portugal.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-5xl md:text-6xl font-bold text-[#1c2544] mb-2">120 +</div>
                  <p className="text-gray-600">Clientes Estrangeiros Apoiados</p>
                </div>
                <div>
                  <div className="text-5xl md:text-6xl font-bold text-[#1c2544] mb-2">98% +</div>
                  <p className="text-gray-600">Taxa de Satisfação</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Partner Logos */}
      <section className="py-12 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all">
            {/* Placeholder for partner logos - replace with real logos */}
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="text-gray-400 font-bold text-2xl">
                LOGO {i}
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
                <span className="text-gray-700">Apoio Estratégico,</span>{" "}
                <span className="text-[#1c2544]">Comece Já.</span>
              </h2>
            </div>
            <div>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Seja para iniciar um negócio, mudar-se para Portugal ou desenvolver novas competências, oferecemos o suporte completo que precisa. Da ideia à execução, estamos ao seu lado em cada etapa da jornada.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="bg-[#1c2544] hover:bg-[#2a3558] text-white px-8 py-6 text-lg rounded-full"
                  asChild
                >
                  <Link href="/contactos">Quero Investir em Portugal</Link>
                </Button>
                <Button 
                  className="bg-[#87c76c] hover:bg-[#75b55c] text-white px-8 py-6 text-lg rounded-full"
                  asChild
                >
                  <Link href="/servicos">Quero Capacitar-me</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Blog/Articles Section */}
      <Section variant="light" className="py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left - Title */}
            <div>
              <div className="flex gap-4 mb-6">
                <button className="bg-[#419a59] bg-opacity-70 text-white px-6 py-2 rounded-full text-sm font-medium">
                  Artigo
                </button>
                <button className="border border-gray-300 text-[#1c2544] px-6 py-2 rounded-full text-sm">
                  Eventos
                </button>
                <button className="border border-gray-300 text-[#1c2544] px-6 py-2 rounded-full text-sm">
                  Formações
                </button>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold text-[#1c2544] mb-6 leading-tight">
                Artigos Notícias e Oportunidades
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                Mantenha-se atualizado sobre incentivos, legislação e tendências de mercado.
              </p>
              <Link href="/blog" className="text-[#1c2544] font-medium text-xl border-b-2 border-[#1c2544] inline-block pb-1">
                Ver Todos
              </Link>
            </div>

            {/* Right - Article Cards */}
            <div className="lg:col-span-2 grid md:grid-cols-2 gap-8">
              <Card variant="elevated" className="overflow-hidden">
                <div className="relative h-64">
                  <Image
                    src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2340"
                    alt="Artigo"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl mb-2">Portugal 2030: Novas Oportunidades de Financiamento</CardTitle>
                  <CardDescription>
                    Descubra as mais recentes linhas de apoio para PMEs, startups e projetos de inovação em Portugal. Saiba como candidatar-se...
                  </CardDescription>
                  <Button variant="outline" className="mt-4" size="sm">
                    Ler Mais →
                  </Button>
                </CardHeader>
              </Card>

              <Card variant="elevated" className="overflow-hidden">
                <div className="relative h-64">
                  <Image
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426"
                    alt="Artigo"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl mb-2">Guia Completo: Golden Visa vs Startup Visa</CardTitle>
                  <CardDescription>
                    Compare as opções de residência para investidores e empreendedores. Entenda os requisitos, vantagens e processo de candidatura...
                  </CardDescription>
                  <Button variant="outline" className="mt-4" size="sm">
                    Ler Mais →
                  </Button>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section variant="default" className="py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div>
              <p className="text-gray-600 text-lg mb-6">
                Tem dúvidas? Compilámos as questões mais frequentes sobre investir, empreender e trabalhar em Portugal. Se não encontrar a resposta, estamos aqui para ajudar.
              </p>
            </div>
            <div className="lg:col-span-2">
              <h2 className="text-5xl md:text-6xl font-bold text-[#1c2544] mb-12 leading-tight">
                Perguntas e Questões Frequentes
              </h2>
              <div className="space-y-4">
                {[
                  {q: "Quanto tempo demora para abrir uma empresa em Portugal?", a: "O processo varia entre 2 a 4 semanas, dependendo do tipo de sociedade e documentação. Acompanhamos todo o processo, desde a escolha da estrutura legal até ao registo na Autoridade Tributária e Segurança Social."},
                  {q: "Preciso estar em Portugal para candidatar-me a fundos europeus?", a: "Não necessariamente. Pode iniciar o processo à distância, mas a presença em Portugal é recomendada para certas etapas, como abertura de conta bancária e assinatura de documentos. Orientamos sobre os momentos em que a presença é obrigatória."},
                  {q: "Que vistos existem para empreendedores e investidores?", a: "Portugal oferece o Golden Visa (investimento mínimo), Startup Visa (para projetos inovadores), D2 Visa (empreendedores), e D7 (rendimentos passivos). Cada um tem requisitos específicos que avaliamos consigo."},
                  {q: "Como sei se sou elegível para fundos do Portugal 2030?", a: "A elegibilidade depende do setor, dimensão da empresa, localização e tipo de projeto. Fazemos uma análise gratuita da sua situação e identificamos as melhores oportunidades de financiamento disponíveis."}
                ].map((faq, i) => (
                  <div key={i} className="bg-[#f3f9f0] rounded-2xl p-6">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-medium text-gray-700">{faq.q}</h3>
                      <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    {faq.a && <p className="mt-4 text-gray-600">{faq.a}</p>}
                  </div>
                ))}
              </div>
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
                Contacte-nos
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Estamos aqui para transformar o seu projeto em realidade. Quer seja para investir, empreender ou desenvolver competências em Portugal, a nossa equipa de especialistas está pronta para o apoiar em cada etapa do processo.
              </p>
              <Button variant="primary" size="lg" asChild>
                <Link href="/contactos">Entre em Contacto</Link>
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
