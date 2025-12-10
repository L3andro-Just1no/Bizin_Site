import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPostSlugs, getRelatedPosts } from "@/lib/supabase/blog";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { BlogPostContent } from "@/components/BlogPostContent";

// Enable ISR - revalidate every 60 seconds
export const revalidate = 60;

// Generate static params for all blog posts
export async function generateStaticParams() {
  try {
    const slugs = await getAllPostSlugs();
    return slugs.map((slug) => ({
      slug: slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const post = await getPostBySlug(params.slug);

    if (!post) {
      return {
        title: "Post Not Found - Neomarca",
        description: "O artigo que procura não foi encontrado.",
      };
    }

    const url = `https://bizin.pt/blog/${params.slug}`;
    const imageUrl = post.featuredImage?.url || 'https://bizin.pt/og-image.jpg';

    return {
      title: post.title,
      description: post.excerpt,
      authors: post.author ? [{ name: post.author }] : undefined,
      keywords: [
        ...post.categories,
        ...post.tags,
        'fundos europeus',
        'incentivos',
        'Portugal',
        'Neomarca',
      ],
      alternates: {
        canonical: url,
      },
      openGraph: {
        title: post.title,
        description: post.excerpt,
        url: url,
        siteName: 'Neomarca',
        locale: 'pt_PT',
        type: 'article',
        publishedTime: post.date,
        authors: post.author ? [post.author] : undefined,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: post.featuredImage?.alt || post.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt,
        images: [imageUrl],
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
    };
  } catch (error) {
    return {
      title: "Blog Post - Neomarca",
      description: "Artigos e insights sobre fundos europeus e incentivos.",
    };
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  // Get related posts based on categories
  const relatedPosts = await getRelatedPosts(post.id, 3);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-PT", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Structured data for SEO (JSON-LD) - Article Schema
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage?.url || "https://bizin.pt/og-image.jpg",
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: post.author || "Neomarca",
      url: "https://bizin.pt",
    },
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
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://bizin.pt/blog/${params.slug}`,
    },
    keywords: [...post.categories, ...post.tags].join(", "),
    articleSection: post.categories.length > 0 ? post.categories[0] : "Business",
    wordCount: post.content.replace(/<[^>]*>/g, '').split(/\s+/).length,
    inLanguage: "pt-PT",
  };

  // Breadcrumb Schema
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://bizin.pt",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://bizin.pt/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://bizin.pt/blog/${params.slug}`,
      },
    ],
  };

  // Organization Schema
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Neomarca",
    url: "https://bizin.pt",
    logo: "https://bizin.pt/logo.svg",
    description: "Apoio a empresas no acesso a fundos europeus, incentivos e programas de financiamento.",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "geral@neomarca.pt",
      availableLanguage: ["Portuguese"],
    },
    sameAs: [
      // Add social media profiles here if available
    ],
  };

  return (
    <>
      {/* Structured Data - Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
      />
      {/* Structured Data - Breadcrumb */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      {/* Structured Data - Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationStructuredData) }}
      />
      {/* Hero Section */}
      <header className="relative py-20 bg-gradient-to-br from-[#1c2544] to-[#2a3558] text-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb Navigation */}
            <nav className="mb-6" aria-label="Breadcrumb">
              <Link
                href="/blog"
                className="text-white/80 hover:text-white transition-colors inline-flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Voltar ao Blog
              </Link>
            </nav>

            {/* Post Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {post.title}
            </h1>

            {/* Post Meta */}
            <div className="flex flex-wrap items-center gap-4 text-white/90">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{post.readTime}</span>
              </div>
              {post.author && (
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span>{post.author}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Post Content */}
      <article className="py-16">
        <Section>
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Featured Image */}
              {post.featuredImage && (
                <figure className="relative w-full h-[400px] md:h-[500px] mb-12 rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src={post.featuredImage.url}
                    alt={post.featuredImage.alt}
                    fill
                    className="object-cover"
                    priority
                  />
                </figure>
              )}

              {/* Post Content */}
              <BlogPostContent content={post.content} />

              {/* Categories/Tags */}
              {(post.categories.length > 0 || post.tags.length > 0) && (
                <footer className="mt-12 pt-8 border-t border-gray-200">
                  <div className="flex flex-wrap gap-2" role="list" aria-label="Categorias e tags">
                    {post.categories.map((category) => (
                      <span
                        key={category}
                        className="bg-[#87c76c] text-white px-4 py-2 rounded-full text-sm font-medium"
                        role="listitem"
                      >
                        {category}
                      </span>
                    ))}
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm"
                        role="listitem"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </footer>
              )}
            </div>
          </div>
        </Section>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <Section variant="light" className="py-16">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1c2544] mb-8 text-center">
                Artigos Relacionados
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.slug}`}
                    className="block"
                  >
                    <Card
                      variant="elevated"
                      className="hover:shadow-2xl transition-all cursor-pointer group overflow-hidden h-full"
                    >
                      <div className="relative h-48">
                        <Image
                          src={
                            relatedPost.featuredImage?.url ||
                            "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800"
                          }
                          alt={relatedPost.featuredImage?.alt || relatedPost.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardHeader className="p-6">
                        <div className="text-sm text-gray-500 mb-2">
                          {formatDate(relatedPost.date)}
                        </div>
                        <CardTitle className="group-hover:text-[#87c76c] transition-colors mb-2 text-lg">
                          {relatedPost.title}
                        </CardTitle>
                        <CardDescription className="text-gray-600 line-clamp-2">
                          {relatedPost.excerpt}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Section>
      )}

      {/* CTA Section */}
      <Section className="py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1c2544] mb-6">
              Precisa de Ajuda com Fundos Europeus?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              A nossa equipa está pronta para ajudar a sua empresa a aceder aos melhores
              incentivos e financiamentos.
            </p>
            <Button variant="primary" size="lg" className="px-8 py-6" asChild>
              <Link href="/contactos">Entre em Contacto</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

