"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { Section } from "@/components/ui/Section";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useI18n } from "@/components/I18nProvider";
import type { SimpleBlogPost, SimpleBlogCategory } from "@/lib/supabase/types";

// Alias for compatibility
type BlogPost = SimpleBlogPost;
type BlogCategory = SimpleBlogCategory;

interface BlogContentProps {
  posts: BlogPost[];
  categories: BlogCategory[];
}

export function BlogContent({ posts = [], categories = [] }: BlogContentProps) {
  const { t } = useI18n();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Create category options including "all"
  const categoryOptions = useMemo(() => {
    return ["all", ...categories.map((cat) => cat.slug)];
  }, [categories]);

  // Filter posts by active category
  const filteredPosts = useMemo(() => {
    if (activeCategory === "all") {
      return posts;
    }
    return posts.filter((post) => post.categories.includes(activeCategory));
  }, [posts, activeCategory]);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-PT", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      {/* Hero Section with Background */}
      <section className="relative py-32 bg-gradient-to-br from-[#1c2544] to-[#2a3558] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=2340"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {t("blogPage.hero.title")}
            </h1>
            <p className="text-xl opacity-90">
              {t("blogPage.hero.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <Section className="py-8 bg-[#f3f9f0]">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categoryOptions.map((category) => {
              const isActive = activeCategory === category;
              const categoryData = categories.find((cat) => cat.slug === category);
              const displayName = category === "all" 
                ? t("blogPage.categories.all")
                : categoryData?.name || category;
              
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-3 rounded-full border-2 font-medium shadow-sm transition-all hover:shadow-md ${
                    isActive
                      ? "bg-[#87c76c] border-[#87c76c] text-white"
                      : "bg-white border-transparent hover:border-[#87c76c] hover:text-[#87c76c]"
                  }`}
                >
                  {displayName}
                </button>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Blog Posts Grid */}
      <Section className="py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600 mb-4">
                {t("blogPage.noPosts") || "No blog posts found."}
              </p>
              <p className="text-gray-500">
                {t("blogPage.noPostsHint") || "Check back soon for new content!"}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="block">
                  <Card
                    variant="elevated"
                    className="hover:shadow-2xl transition-all cursor-pointer group overflow-hidden h-full"
                  >
                    <div className="relative h-56">
                      <Image
                        src={
                          post.featuredImage?.url ||
                          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800"
                        }
                        alt={post.featuredImage?.alt || post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {post.categories.length > 0 && (
                        <div className="absolute top-4 left-4">
                          <span className="bg-[#87c76c] text-white px-4 py-2 rounded-full text-sm font-medium">
                            {categories.find((cat) => cat.slug === post.categories[0])?.name ||
                              post.categories[0]}
                          </span>
                        </div>
                      )}
                    </div>
                    <CardHeader className="p-6">
                      <div className="flex items-center justify-between mb-3 text-sm text-gray-500">
                        <span>{formatDate(post.date)}</span>
                        <span>{post.readTime}</span>
                      </div>
                      <CardTitle className="group-hover:text-[#87c76c] transition-colors mb-3">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </Section>

      {/* CTA Section */}
      <Section variant="light" className="py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1c2544] mb-6">
              {t("blogPage.cta.title")}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {t("blogPage.cta.subtitle")}
            </p>
            <Button variant="primary" size="lg" className="px-8 py-6" asChild>
              <Link href="/contactos">
                {t("blogPage.cta.button")}
              </Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}


