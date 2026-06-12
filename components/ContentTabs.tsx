"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { useI18n } from "@/components/I18nProvider";
import type { SimpleBlogPost, SimpleBlogCategory } from "@/lib/supabase/types";

interface ContentTabsProps {
  posts?: SimpleBlogPost[];
  categories?: SimpleBlogCategory[];
}

export function ContentTabs({ posts = [], categories = [] }: ContentTabsProps) {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.slug || "");
  const { t } = useI18n();

  // Category slug to translation key mapping
  const categoryTranslationMap: Record<string, { title: string; description: string }> = {
    "incentivos": {
      title: t("blogPage.categories.incentives"),
      description: t("articles.incentivesDescription")
    },
    "consultoria": {
      title: t("blogPage.categories.consulting"),
      description: t("articles.consultingDescription")
    },
    "guias": {
      title: t("blogPage.categories.guides"),
      description: t("articles.guidesDescription")
    },
  };

  // Filter posts by active category
  const filteredPosts = useMemo(() => {
    if (!activeCategory) return posts.slice(0, 2);
    return posts
      .filter((post) => post.categories.includes(activeCategory))
      .slice(0, 2);
  }, [posts, activeCategory]);

  // Get posts to display - only show posts that match the category
  const displayPosts = filteredPosts;

  const getCurrentContent = () => {
    const categoryInfo = categoryTranslationMap[activeCategory] || {
      title: categories.find(c => c.slug === activeCategory)?.name || "",
      description: ""
    };

    return {
      title: categoryInfo.title,
      description: categoryInfo.description
    };
  };

  const currentContent = getCurrentContent();

  // If no categories, don't render
  if (categories.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 md:px-4 lg:px-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
        {/* Left - Title and Category Tabs */}
        <div className="xl:col-span-1">
          <div className="flex gap-4 mb-6 flex-wrap">
            {categories.map((category) => {
              const isActive = activeCategory === category.slug;
              const displayName = categoryTranslationMap[category.slug]?.title || category.name;
              
              return (
                <button
                  key={category.slug}
                  onClick={() => setActiveCategory(category.slug)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    isActive
                      ? "bg-[#419a59] bg-opacity-70 text-white"
                      : "border border-gray-300 text-[#1c2544] hover:border-[#419a59] hover:text-[#419a59]"
                  }`}
                >
                  {displayName}
                </button>
              );
            })}
          </div>
          <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold text-[#1c2544] mb-6 leading-tight">
            {currentContent.title}
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            {currentContent.description}
          </p>
          <Link
            href="/blog"
            className="text-[#1c2544] font-medium text-xl border-b-2 border-[#1c2544] inline-block pb-1 hover:text-[#419a59] hover:border-[#419a59] transition-colors"
          >
            {t("common.viewAll")}
          </Link>
        </div>

        {/* Right - Content Cards */}
        <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayPosts.map((post) => {
            return (
              <Card key={post.id} variant="elevated" className="overflow-hidden group hover:shadow-xl transition-shadow">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={post.featuredImage?.url || "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2340"}
                    alt={post.featuredImage?.alt || post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl mb-2 group-hover:text-[#419a59] transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription>{post.excerpt}</CardDescription>
                  <Button variant="outline" className="mt-4" size="sm" asChild>
                    <Link href={`/blog/${post.slug}`}>
                      {t("common.readMore")} →
                    </Link>
                  </Button>
                </CardHeader>
              </Card>
            );
          })}
          
          {/* Show message if no posts available */}
          {displayPosts.length === 0 && (
            <div className="col-span-2 text-center py-12">
              <p className="text-gray-500 text-lg">{t("blogPage.noPosts")}</p>
              <p className="text-gray-400 mt-2">{t("blogPage.noPostsHint")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
