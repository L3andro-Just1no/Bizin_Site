import type { Metadata } from "next";
import { SobreNosContent } from "@/components/SobreNosContent";

export const metadata: Metadata = {
  title: "Sobre Nós - Bizin Portugal",
  description: "Conheça a Bizin Portugal, especialistas em apoio ao acesso a incentivos ao investimento e programas europeus.",
  openGraph: {
    title: "Sobre Nós - Bizin Portugal",
    description: "Conheça a Bizin Portugal, especialistas em apoio ao acesso a incentivos ao investimento e programas europeus.",
  },
};

export default function SobreNosPage() {
  return <SobreNosContent />;
}

