import type { Metadata } from "next";
import { SobreNeomarcaContent } from "@/components/SobreNeomarcaContent";

export const metadata: Metadata = {
  title: "Sobre a Neomarca - Neomarca",
  description: "Conheça a Neomarca, especialistas em apoio ao acesso a fundos e incentivos europeus em Portugal.",
  openGraph: {
    title: "Sobre a Neomarca - Neomarca",
    description: "Conheça a Neomarca, especialistas em apoio ao acesso a fundos e incentivos europeus em Portugal.",
  },
};

export default function SobreNeomarcaPage() {
  return <SobreNeomarcaContent />;
}
