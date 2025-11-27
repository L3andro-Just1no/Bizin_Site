import type { Metadata } from "next";
import { SobrePortugalContent } from "@/components/SobrePortugalContent";

export const metadata: Metadata = {
  title: "Sobre Portugal - Neomarca",
  description: "Descubra as vantagens de investir e empreender em Portugal com apoio de fundos e incentivos europeus.",
  openGraph: {
    title: "Sobre Portugal - Neomarca",
    description: "Descubra as vantagens de investir e empreender em Portugal com apoio de fundos e incentivos europeus.",
  },
};

export default function SobrePortugalPage() {
  return <SobrePortugalContent />;
}
