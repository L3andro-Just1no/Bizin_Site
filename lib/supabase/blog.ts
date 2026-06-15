import { getCmsConfig, isCmsConfigured } from "@/lib/cms/config";
import { renderBlogContent, estimateReadTime } from "@/lib/cms/content";
import {
  fetchAllCmsPosts,
  fetchCmsPostBySlug,
  fetchCmsSitemap,
} from "@/lib/cms/client";
import type { CmsPost, CmsPostListItem } from "@/lib/cms/types";
import type { SimpleBlogCategory, SimpleBlogPost } from "@/lib/supabase/types";

function pickLocalizedFields(
  post: CmsPostListItem | CmsPost,
  locale: string,
): Pick<SimpleBlogPost, "title" | "excerpt"> {
  const translation = post.translations[locale];
  if (translation) {
    return {
      title: translation.title || post.title,
      excerpt: translation.excerpt || post.excerpt || "",
    };
  }

  return {
    title: post.title,
    excerpt: post.excerpt || "",
  };
}

async function mapListItem(post: CmsPostListItem, locale: string): Promise<SimpleBlogPost> {
  const localized = pickLocalizedFields(post, locale);

  return {
    id: post.id,
    slug: post.slug,
    title: localized.title,
    excerpt: localized.excerpt,
    content: "",
    date: post.publishedAt || post.updatedAt,
    author: post.author?.name || "Bizin Portugal",
    featuredImage: post.coverImageUrl
      ? {
          url: post.coverImageUrl,
          alt: post.coverImageAlt || localized.title,
        }
      : null,
    categories: [],
    tags: [],
    readTime: estimateReadTime(localized.excerpt),
    views: 0,
  };
}

async function mapPost(post: CmsPost, locale: string): Promise<SimpleBlogPost> {
  const localized = pickLocalizedFields(post, locale);
  const translation = post.translations[locale];
  const rawContent = translation?.content || post.content;
  const htmlContent = await renderBlogContent(rawContent, localized.title);

  return {
    id: post.id,
    slug: post.slug,
    title: localized.title,
    excerpt: localized.excerpt,
    content: htmlContent,
    date: post.publishedAt || post.updatedAt,
    author: post.author?.name || "Bizin Portugal",
    featuredImage: post.coverImageUrl
      ? {
          url: post.coverImageUrl,
          alt: post.coverImageAlt || localized.title,
        }
      : null,
    categories: [],
    tags: [],
    readTime: estimateReadTime(rawContent),
    views: 0,
  };
}

function getLocale(): string {
  return getCmsConfig()?.contentLocale ?? "pt";
}

export async function getPosts(params: {
  limit?: number;
  offset?: number;
  categorySlug?: string;
  search?: string;
} = {}): Promise<SimpleBlogPost[]> {
  if (!isCmsConfigured()) {
    return [];
  }

  try {
    const locale = getLocale();
    let posts = await Promise.all((await fetchAllCmsPosts()).map((post) => mapListItem(post, locale)));

    if (params.categorySlug) {
      posts = posts.filter((post) => post.categories.includes(params.categorySlug!));
    }

    if (params.search) {
      const query = params.search.toLowerCase();
      posts = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query),
      );
    }

    if (params.offset) {
      posts = posts.slice(params.offset);
    }

    if (params.limit) {
      posts = posts.slice(0, params.limit);
    }

    return posts;
  } catch (error) {
    console.error("Error fetching posts from CMS:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<SimpleBlogPost | null> {
  if (!isCmsConfigured()) {
    return null;
  }

  try {
    const locale = getLocale();
    const post = await fetchCmsPostBySlug(slug);
    if (!post) {
      return null;
    }

    return mapPost(post, locale);
  } catch (error) {
    console.error(`Error fetching post with slug: ${slug}`, error);
    return null;
  }
}

export async function getCategories(): Promise<SimpleBlogCategory[]> {
  return [];
}

export async function getPostsByCategory(categorySlug: string): Promise<SimpleBlogPost[]> {
  return getPosts({ categorySlug });
}

export async function getAllPostSlugs(): Promise<string[]> {
  if (!isCmsConfigured()) {
    return [];
  }

  try {
    const urls = await fetchCmsSitemap();
    return urls.map((entry) => entry.slug);
  } catch (error) {
    console.error("Error fetching post slugs from CMS:", error);
    return [];
  }
}

export async function searchPosts(query: string): Promise<SimpleBlogPost[]> {
  if (!query.trim()) {
    return [];
  }

  return getPosts({ search: query });
}

export async function getRecentPosts(limit: number = 5): Promise<SimpleBlogPost[]> {
  return getPosts({ limit });
}

export async function getRelatedPosts(postId: string, limit: number = 3): Promise<SimpleBlogPost[]> {
  const posts = await getPosts();
  return posts.filter((post) => post.id !== postId).slice(0, limit);
}

export async function checkSupabaseConnection(): Promise<boolean> {
  return isCmsConfigured();
}
