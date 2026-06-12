import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Parceiros - Bizin Portugal",
  description: "Conheça os nossos parceiros estratégicos e descubra as oportunidades de colaboração.",
  openGraph: {
    title: "Parceiros - Bizin Portugal",
    description: "Conheça os nossos parceiros estratégicos e descubra as oportunidades de colaboração.",
  },
};

export default function ParceirosPage() {
  return (
    <main className="pt-[110px]">
      {/* Hero Section */}
      <section 
        className="relative py-32"
        style={{
          backgroundImage: 'linear-gradient(to right bottom, #1c2544, #2a3558)'
        }}
      >
          <div className="hero-content container mx-auto px-4 md:px-6 lg:px-8 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
                Parceiros
              </h1>
              <p className="text-xl md:text-2xl opacity-90 text-white">
                Construindo relações estratégicas para o seu sucesso.
              </p>
            </div>
          </div>
        </section>

      {/* Coming Soon Section */}
      <Section className="py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-24 h-24 bg-[#f3f9f0] rounded-full flex items-center justify-center mx-auto mb-8">
              <svg
                className="w-12 h-12 text-[#87c76c]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h2 className="text-4xl font-bold text-[#1c2544] mb-6">
              Em Breve
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Estamos a desenvolver esta página para apresentar os nossos parceiros estratégicos e as oportunidades de colaboração.
            </p>
            <p className="text-lg text-gray-600">
              Se está interessado em estabelecer uma parceria connosco, entre em contacto através do nosso formulário.
            </p>
          </div>
        </div>
      </Section>
    </main>
  );
}

