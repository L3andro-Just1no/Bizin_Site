"use client";

import { useState } from "react";
import { useI18n } from "@/components/I18nProvider";
import { Button } from "@/components/ui/Button";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useI18n();

  const faqData = [
    {
      q: t("faq.q1"),
      a: t("faq.a1"),
    },
    {
      q: t("faq.q2"),
      a: t("faq.a2"),
    },
    {
      q: t("faq.q3"),
      a: t("faq.a3"),
    },
    {
      q: t("faq.q4"),
      a: t("faq.a4"),
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const openAIChat = () => {
    // Open the Bizin AI widget
    if (typeof window !== 'undefined' && (window as any).openBizinChat) {
      (window as any).openBizinChat();
    } else {
      // Fallback: redirect to contact form if widget is not available
      window.location.href = '/contactos';
    }
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
      
      {/* AI Assistant CTA Button */}
      <div className="pt-12 mt-8 text-center">
        <Button 
          variant="primary" 
          size="lg" 
          onClick={openAIChat}
          className="px-8 py-6 rounded-2xl"
        >
          {t("faq.aiCta")}
        </Button>
      </div>
    </div>
  );
}

