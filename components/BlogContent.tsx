"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Section } from "@/components/ui/Section";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useI18n } from "@/components/I18nProvider";

const categories = ["all", "funds", "incentives", "consulting", "guides"] as const;
type Category = (typeof categories)[number];

const blogPosts: { id: number; key: string; image: string; category: Exclude<Category, "all"> }[] =
  [
    {
      id: 1,
      key: "post1",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800",
      category: "funds",
    },
    {
      id: 2,
      key: "post2",
      image:
        "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?q=80&w=800",
      category: "incentives",
    },
    {
      id: 3,
      key: "post3",
      image:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800",
      category: "funds",
    },
    {
      id: 4,
      key: "post4",
      image:
        "https://images.unsplash.com/photo-1526495124232-a04e1849168c?q=80&w=800",
      category: "consulting",
    },
    {
      id: 5,
      key: "post5",
      image:
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800",
      category: "guides",
    },
    {
      id: 6,
      key: "post6",
      image:
        "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800",
      category: "funds",
    },
  ];

export function BlogContent() {
  const { t } = useI18n();
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const filteredPosts =
    activeCategory === "all"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

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
            {categories.map((category) => {
              const isActive = activeCategory === category;
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
                  {t(`blogPage.categories.${category}`)}
                </button>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Blog Posts Grid */}
      <Section className="py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.key}`} className="block">
                <Card
                  variant="elevated"
                  className="hover:shadow-2xl transition-all cursor-pointer group overflow-hidden h-full"
                >
                  <div className="relative h-56">
                    <Image
                      src={post.image}
                      alt={t(`blogPage.posts.${post.key}.title`)}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#87c76c] text-white px-4 py-2 rounded-full text-sm font-medium">
                        {t(`blogPage.posts.${post.key}.category`)}
                      </span>
                    </div>
                  </div>
                  <CardHeader className="p-6">
                    <div className="flex items-center justify-between mb-3 text-sm text-gray-500">
                      <span>{t(`blogPage.posts.${post.key}.date`)}</span>
                      <span>{t(`blogPage.posts.${post.key}.readTime`)}</span>
                    </div>
                    <CardTitle className="group-hover:text-[#87c76c] transition-colors mb-3">
                      {t(`blogPage.posts.${post.key}.title`)}
                    </CardTitle>
                    <CardDescription className="text-gray-600 leading-relaxed">
                      {t(`blogPage.posts.${post.key}.excerpt`)}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
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


