"use client";

import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { useI18n } from "@/components/I18nProvider";

export function ServicosFinalCta() {
  const { t } = useI18n();

  return (
    <Section variant="light" className="py-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1c2544] mb-6">
            {t("servicesPage.cta.title")}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {t("servicesPage.cta.description")}
          </p>
          <Button variant="primary" size="lg" className="px-8 py-6" asChild>
            <Link href="/contactos">{t("servicesPage.cta.button")}</Link>
          </Button>
        </div>
      </div>
    </Section>
  );
}


