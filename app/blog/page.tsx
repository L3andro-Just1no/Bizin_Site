import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Blog e Insights - Neomarca",
  description: "Artigos, notícias e insights sobre fundos europeus, incentivos e empreendedorismo em Portugal.",
  openGraph: {
    title: "Blog e Insights - Neomarca",
    description: "Artigos, notícias e insights sobre fundos europeus, incentivos e empreendedorismo em Portugal.",
  },
};

// Placeholder blog posts
const blogPosts = [
  {
    id: 1,
    title: "Portugal 2030: Oportunidades para PMEs",
    excerpt: "Descubra as principais linhas de financiamento do Portugal 2030 destinadas a pequenas e médias empresas.",
    date: "2024-03-15",
    category: "Fundos Europeus",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800"
  },
  {
    id: 2,
    title: "SIFIDE: Como Maximizar o Benefício Fiscal em I&D",
    excerpt: "Guia completo sobre o Sistema de Incentivos Fiscais à Investigação e Desenvolvimento Empresarial.",
    date: "2024-03-10",
    category: "Incentivos",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?q=80&w=800"
  },
  {
    id: 3,
    title: "PRR: Prazos e Oportunidades em 2024",
    excerpt: "Calendário atualizado das candidaturas ao Plano de Recuperação e Resiliência para este ano.",
    date: "2024-03-05",
    category: "Fundos Europeus",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800"
  },
  {
    id: 4,
    title: "Internacionalização: Apoios Disponíveis",
    excerpt: "Conheça os programas de apoio à exportação e expansão internacional de empresas portuguesas.",
    date: "2024-02-28",
    category: "Consultoria",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1526495124232-a04e1849168c?q=80&w=800"
  },
  {
    id: 5,
    title: "Erros Comuns em Candidaturas a Fundos",
    excerpt: "Os 10 erros mais frequentes que podem levar à rejeição de uma candidatura e como evitá-los.",
    date: "2024-02-20",
    category: "Guias",
    readTime: "10 min",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800"
  },
  {
    id: 6,
    title: "Sustentabilidade: Fundos para Economia Verde",
    excerpt: "Programas europeus de financiamento para projetos de sustentabilidade e transição climática.",
    date: "2024-02-15",
    category: "Fundos Europeus",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800"
  },
];

const categories = [
  "Todos",
  "Fundos Europeus",
  "Incentivos",
  "Consultoria",
  "Guias",
];

export default function BlogPage() {
  return (
    <>
      {/* Hero Section with Background */}
      <section className="relative py-32 bg-gradient-to-br from-[#1c2544] to-[#2a3558] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=2340"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Blog e Insights
            </h1>
            <p className="text-xl opacity-90">
              Mantenha-se atualizado sobre fundos europeus, incentivos e
              oportunidades de financiamento.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <Section className="py-8 bg-[#f3f9f0]">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-3 rounded-full bg-white border-2 border-transparent hover:border-[#87c76c] hover:text-[#87c76c] transition-all font-medium shadow-sm hover:shadow-md"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </Section>

      {/* Blog Posts Grid */}
      <Section className="py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card
                key={post.id}
                variant="elevated"
                className="hover:shadow-2xl transition-all cursor-pointer group overflow-hidden"
              >
                <div className="relative h-56">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#87c76c] text-white px-4 py-2 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                <CardHeader className="p-6">
                  <div className="flex items-center justify-between mb-3 text-sm text-gray-500">
                    <span>{new Date(post.date).toLocaleDateString("pt-PT", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}</span>
                    <span>{post.readTime} leitura</span>
                  </div>
                  <CardTitle className="group-hover:text-[#87c76c] transition-colors mb-3">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Newsletter CTA with Image */}
      <Section className="py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#87c76c] to-[#6baa53] rounded-3xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="p-12 lg:p-16 flex flex-col justify-center text-white">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Receba as Nossas Novidades
                </h2>
                <p className="text-xl mb-8 opacity-95">
                  Subscreva a nossa newsletter e fique a par das últimas oportunidades
                  de financiamento.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    placeholder="O seu email"
                    className="flex-1 px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/30"
                  />
                  <Button
                    variant="outline"
                    className="bg-white text-[#87c76c] hover:bg-gray-100 border-white whitespace-nowrap px-8 py-4 rounded-full"
                  >
                    Subscrever
                  </Button>
                </div>
                <p className="text-sm mt-4 opacity-80">
                  Enviamos apenas conteúdo relevante. Sem spam.
                </p>
              </div>
              <div className="relative h-[400px] lg:h-auto">
                <Image
                  src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=2340"
                  alt="Newsletter"
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
              Precisa de Ajuda Personalizada?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Fale com os nossos especialistas e descubra as melhores oportunidades
              para o seu negócio.
            </p>
            <Button 
              className="bg-[#1c2544] hover:bg-[#2a3558] text-white px-8 py-6 text-lg rounded-full"
              asChild
            >
              <Link href="/contactos">Falar com Especialista</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
