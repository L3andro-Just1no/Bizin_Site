import type { Metadata } from "next";
import { BlogContent } from "@/components/BlogContent";

export const metadata: Metadata = {
  title: "Blog e insights - Neomarca",
  description:
    "Artigos, notícias e insights sobre fundos europeus, incentivos e empreendedorismo em Portugal.",
  openGraph: {
    title: "Blog e insights - Neomarca",
    description:
      "Artigos, notícias e insights sobre fundos europeus, incentivos e empreendedorismo em Portugal.",
  },
};

export default function BlogPage() {
  return <BlogContent />;
}
