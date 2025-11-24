import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "@/components/ContactForm";
import { CONTACT_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contactos - Neomarca",
  description: "Entre em contacto com a Neomarca. Estamos aqui para ajudar o seu negócio a aceder a fundos e incentivos europeus.",
  openGraph: {
    title: "Contactos - Neomarca",
    description: "Entre em contacto com a Neomarca. Estamos aqui para ajudar o seu negócio a aceder a fundos e incentivos europeus.",
  },
};

export default function ContactosPage() {
  return (
    <>
      {/* Hero Section with Background */}
      <section className="relative py-32 bg-gradient-to-br from-[#1c2544] to-[#2a3558] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=2340"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Entre em contacto
            </h1>
            <p className="text-xl opacity-90">
              Estamos prontos para ajudar o seu negócio a alcançar novos patamares.
              Fale connosco.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info + Form */}
      <Section className="py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div>
              <h2 className="text-4xl font-bold text-[#1c2544] mb-8">Informações de contacto</h2>
              <div className="space-y-6">
                <div className="flex items-start group">
                  <div className="w-14 h-14 bg-[#f3f9f0] rounded-2xl flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-[#87c76c] transition-colors">
                    <svg
                      className="w-7 h-7 text-[#87c76c] group-hover:text-white transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-[#1c2544]">Email</h3>
                    <a
                      href={`mailto:${CONTACT_INFO.email}`}
                      className="text-gray-600 hover:text-[#87c76c] transition-colors text-lg"
                    >
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="w-14 h-14 bg-[#f3f9f0] rounded-2xl flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-[#87c76c] transition-colors">
                    <svg
                      className="w-7 h-7 text-[#87c76c] group-hover:text-white transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-[#1c2544]">
                      Telefone
                    </h3>
                    <div className="flex flex-col text-lg">
                      <a
                        href={`tel:${CONTACT_INFO.phone}`}
                        className="text-gray-600 hover:text-[#87c76c] transition-colors"
                      >
                        {CONTACT_INFO.phone}
                      </a>
                      {CONTACT_INFO.mobile && (
                        <a
                          href={`tel:${CONTACT_INFO.mobile}`}
                          className="text-gray-600 hover:text-[#87c76c] transition-colors"
                        >
                          {CONTACT_INFO.mobile}
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="w-14 h-14 bg-[#f3f9f0] rounded-2xl flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-[#87c76c] transition-colors">
                    <svg
                      className="w-7 h-7 text-[#87c76c] group-hover:text-white transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-[#1c2544]">
                      Morada
                    </h3>
                    <address className="text-gray-600 not-italic text-lg leading-relaxed">
                      {CONTACT_INFO.address.street}
                      <br />
                      {CONTACT_INFO.address.postalCode}{" "}
                      {CONTACT_INFO.address.city}
                      <br />
                      {CONTACT_INFO.address.country}
                    </address>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="w-14 h-14 bg-[#f3f9f0] rounded-2xl flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-[#87c76c] transition-colors">
                    <svg
                      className="w-7 h-7 text-[#87c76c] group-hover:text-white transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-[#1c2544]">Horário</h3>
                    <p className="text-gray-600 text-lg">{CONTACT_INFO.hours}</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 p-8 bg-[#f3f9f0] rounded-2xl">
                <div className="flex items-start">
                  <svg className="w-8 h-8 text-[#87c76c] mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <div>
                    <h3 className="font-bold text-xl mb-2 text-[#1c2544]">Resposta Rápida</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      Respondemos a todos os contactos no prazo máximo de 24 horas
                      úteis.
                    </p>
                  </div>
                </div>
              </div>

              {/* Office Image */}
              <div className="mt-10 relative h-80 rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2340"
                  alt="Escritório Neomarca"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <Suspense fallback={<div className="text-center py-8">A carregar formulário...</div>}>
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
