"use client";

import { useState } from "react";

interface FAQItem {
  q: string;
  a: string;
}

const faqData: FAQItem[] = [
  {
    q: "Quanto tempo demora para abrir uma empresa em Portugal?",
    a: "O processo varia entre 2 a 4 semanas, dependendo do tipo de sociedade e documentação. Acompanhamos todo o processo, desde a escolha da estrutura legal até ao registo na Autoridade Tributária e Segurança Social.",
  },
  {
    q: "Preciso estar em Portugal para candidatar-me a fundos europeus?",
    a: "Não necessariamente. Pode iniciar o processo à distância, mas a presença em Portugal é recomendada para certas etapas, como abertura de conta bancária e assinatura de documentos. Orientamos sobre os momentos em que a presença é obrigatória.",
  },
  {
    q: "Que vistos existem para empreendedores e investidores?",
    a: "Portugal oferece o Golden Visa (investimento mínimo), Startup Visa (para projetos inovadores), D2 Visa (empreendedores), e D7 (rendimentos passivos). Cada um tem requisitos específicos que avaliamos consigo.",
  },
  {
    q: "Como sei se sou elegível para fundos do Portugal 2030?",
    a: "A elegibilidade depende do setor, dimensão da empresa, localização e tipo de projeto. Fazemos uma análise gratuita da sua situação e identificamos as melhores oportunidades de financiamento disponíveis.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqData.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className="bg-[#f3f9f0] rounded-2xl p-6 cursor-pointer hover:bg-[#e8f0e0] transition-colors"
            onClick={() => toggleFAQ(i)}
          >
            <div className="flex justify-between items-start gap-4">
              <h3 className="text-lg font-medium text-gray-700 flex-1">{faq.q}</h3>
              <svg
                className={`w-6 h-6 text-gray-400 flex-shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-gray-600">{faq.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

