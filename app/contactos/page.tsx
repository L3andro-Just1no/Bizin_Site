import type { Metadata } from "next";
import { ContactPageContent } from "@/components/ContactPageContent";

export const metadata: Metadata = {
  title: "Contactos - Neomarca",
  description:
    "Entre em contacto com a Neomarca. Estamos aqui para ajudar o seu negócio a aceder a fundos e incentivos europeus.",
  openGraph: {
    title: "Contactos - Neomarca",
    description:
      "Entre em contacto com a Neomarca. Estamos aqui para ajudar o seu negócio a aceder a fundos e incentivos europeus.",
  },
};

export default function ContactosPage() {
  return <ContactPageContent />;
}
