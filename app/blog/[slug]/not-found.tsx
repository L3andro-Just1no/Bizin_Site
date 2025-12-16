import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

export default function NotFound() {
  return (
    <Section className="py-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-6xl font-bold text-[#1c2544] mb-4">404</h1>
          <h2 className="text-3xl font-bold text-[#1c2544] mb-6">
            Artigo Não Encontrado
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Desculpe, o artigo que procura não existe ou foi removido.
          </p>
          <Button variant="primary" size="lg" asChild>
            <Link href="/blog">Voltar ao Blog</Link>
          </Button>
        </div>
      </div>
    </Section>
  );
}

