import type { Metadata } from "next";
import { BlogContent } from "@/components/BlogContent";
import { getPosts, getCategories } from "@/lib/supabase/blog";

export const metadata: Metadata = {
  title: "Blog e insights sobre incentivos ao investimento - Bizin Portugal",
  description:
    "Artigos, notícias e insights sobre incentivos ao investimento e empreendedorismo em Portugal. Mantenha-se atualizado sobre oportunidades de financiamento.",
  keywords: [
    "incentivos ao investimento",
    "incentivos",
    "apoio empresarial",
    "Portugal",
    "Neomarca",
    "financiamento",
    "empreendedorismo",
    "blog",
  ],
  alternates: {
    canonical: "https://bizin.pt/blog",
  },
  openGraph: {
    title: "Blog e insights sobre incentivos ao investimento - Bizin Portugal",
    description:
      "Artigos, notícias e insights sobre incentivos ao investimento e empreendedorismo em Portugal.",
    url: "https://bizin.pt/blog",
    siteName: "Bizin Portugal",
    locale: "pt_PT",
    type: "website",
    images: [
      {
        url: "https://bizin.pt/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Neomarca - Apoio a Fundos e Incentivos Europeus",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog e insights sobre incentivos ao investimento - Bizin Portugal",
    description:
      "Artigos, notícias e insights sobre incentivos ao investimento e empreendedorismo em Portugal.",
    images: ["https://bizin.pt/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// Enable ISR - revalidate every 60 seconds
export const revalidate = 60;

export default async function BlogPage() {
  // Fetch posts and categories from Supabase
  let posts: any[] = [];
  let categories: any[] = [];

  try {
    [posts, categories] = await Promise.all([
      getPosts({ limit: 100 }),
      getCategories(),
    ]);
  } catch (error) {
    console.error("Error fetching blog data:", error);
    // If Supabase is not available, component will show empty state
  }

  // Structured data for blog listing page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Bizin Portugal Blog",
    description: "Artigos, notícias e insights sobre incentivos ao investimento e empreendedorismo em Portugal.",
    url: "https://bizin.pt/blog",
    publisher: {
      "@type": "Organization",
      name: "Neomarca",
      url: "https://bizin.pt",
      logo: {
        "@type": "ImageObject",
        url: "https://bizin.pt/logo.svg",
        width: 200,
        height: 98,
      },
    },
    inLanguage: "pt-PT",
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <BlogContent posts={posts} categories={categories} />
    </>
  );
}
