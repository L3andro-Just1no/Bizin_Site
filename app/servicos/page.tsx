import type { Metadata } from "next";
import { ServicosPageContent } from "@/components/ServicosPageContent";

export const metadata: Metadata = {
  title: "Serviços - Bizin Portugal",
  description: "Conheça os nossos serviços especializados em incentivos ao investimento e consultoria estratégica.",
  openGraph: {
    title: "Serviços - Bizin Portugal",
    description: "Conheça os nossos serviços especializados em incentivos ao investimento e consultoria estratégica.",
  },
};

export default function ServicosPage() {
  return (
    <ServicosPageContent />
  );
}

