"use client";

import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { useI18n } from "@/components/I18nProvider";

type PostKey = "post1" | "post2" | "post3" | "post4" | "post5" | "post6";

interface BlogPostContentProps {
  postKey: PostKey;
}

export function BlogPostContent({ postKey }: BlogPostContentProps) {
  const { t } = useI18n();

  return (
    <Section className="py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
        <Link
          href="/blog"
          className="inline-flex items-center text-sm text-[#1c2544] hover:text-[#87c76c] transition-colors mb-6"
        >
          <span className="mr-2">←</span>
          {t("blogPage.postDetail.backToBlog")}
        </Link>

        <div className="mb-4 flex items-center gap-3 text-sm text-gray-500">
          <span className="inline-flex items-center rounded-full bg-[#f3f9f0] px-3 py-1 text-[#1c2544]">
            {t(`blogPage.posts.${postKey}.category`)}
          </span>
          <span>•</span>
          <span>{t(`blogPage.posts.${postKey}.date`)}</span>
          <span>•</span>
          <span>{t(`blogPage.posts.${postKey}.readTime`)}</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-[#1c2544] mb-6">
          {t(`blogPage.posts.${postKey}.title`)}
        </h1>

        <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
          {t(`blogPage.posts.${postKey}.excerpt`)}
        </p>

        <div className="space-y-5 text-gray-700 text-base md:text-lg leading-relaxed">
          <p>{t("blogPage.postDetail.genericIntro")}</p>
          <p>{t("blogPage.postDetail.genericBody")}</p>
        </div>

        <div className="mt-10">
          <Button variant="primary" size="lg" asChild>
            <Link href="/contactos">
              {t("blogPage.postDetail.ctaButton")}
            </Link>
          </Button>
        </div>
      </div>
    </Section>
  );
}


