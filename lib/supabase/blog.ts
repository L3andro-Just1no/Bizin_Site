import { supabase } from './client';
import type { SimpleBlogPost, SimpleBlogCategory, BlogPostWithRelations } from './types';

// Type the supabase client to avoid strict type checking issues
const typedSupabase = supabase as any;

/**
 * Transform database post to simplified format
 */
function transformPost(post: BlogPostWithRelations): SimpleBlogPost {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt || '',
    content: post.content,
    date: post.published_at || post.created_at,
    author: post.author_name,
    featuredImage: post.featured_image_url
      ? {
          url: post.featured_image_url,
          alt: post.featured_image_alt || post.title,
        }
      : null,
    categories: Array.isArray(post.categories) 
      ? post.categories.map((cat: any) => cat.slug)
      : [],
    tags: Array.isArray(post.tags) 
      ? post.tags.map((tag: any) => tag.slug)
      : [],
    readTime: post.read_time ? `${post.read_time} min read` : '5 min read',
    views: post.views,
  };
}

/**
 * Get all published blog posts
 */
export async function getPosts(params: {
  limit?: number;
  offset?: number;
  categorySlug?: string;
  search?: string;
} = {}): Promise<SimpleBlogPost[]> {
  try {
    // Build base query
    let query = supabase
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (params.limit) {
      query = query.limit(params.limit);
    }

    if (params.offset) {
      query = query.range(params.offset, params.offset + (params.limit || 10) - 1);
    }

    if (params.search) {
      query = query.or(`title.ilike.%${params.search}%,content.ilike.%${params.search}%`);
    }

    const { data: postsData, error: postsError } = await query;

    if (postsError) throw postsError;

    if (!postsData || postsData.length === 0) {
      return [];
    }

    // Get categories and tags for each post
    const posts = await Promise.all(postsData.map(async (post: any) => {
      // Get categories for this post
      const { data: categoryData } = await supabase
        .from('post_categories')
        .select('category_id, blog_categories(id, name, slug)')
        .eq('post_id', post.id);

      const categories = categoryData?.map((pc: any) => pc.blog_categories).filter(Boolean) || [];
      
      return transformPost({
        ...post,
        categories,
        tags: [], // Tags can be added later if needed
      });
    }));

    // Filter by category if specified
    if (params.categorySlug) {
      return posts.filter(post => 
        post.categories.includes(params.categorySlug!)
      );
    }

    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

/**
 * Get a single post by slug
 */
export async function getPostBySlug(slug: string): Promise<SimpleBlogPost | null> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error) {
      throw error;
    }

    if (!data) {
      return null;
    }

    const postData = data as any;

    // Increment view count (fire and forget)
    typedSupabase.rpc('increment_post_views', { post_slug: slug }).then(() => {});

    // Get categories for this post
    const { data: categoryData } = await supabase
      .from('post_categories')
      .select('category_id, blog_categories(id, name, slug)')
      .eq('post_id', postData.id);

    const categories = categoryData?.map((pc: any) => pc.blog_categories).filter(Boolean) || [];

    return transformPost({
      ...postData,
      categories,
      tags: [],
    });
  } catch (error) {
    console.error(`Error fetching post with slug: ${slug}`, error);
    return null;
  }
}

/**
 * Get all categories with post counts
 */
export async function getCategories(): Promise<SimpleBlogCategory[]> {
  try {
    const { data, error } = await supabase
      .from('blog_categories')
      .select(`
        *,
        post_categories(count)
      `)
      .order('name');

    if (error) throw error;

    return (data || []).map((cat: any) => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      count: cat.post_categories?.length || 0,
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

/**
 * Get posts by category slug
 */
export async function getPostsByCategory(categorySlug: string): Promise<SimpleBlogPost[]> {
  return getPosts({ categorySlug });
}

/**
 * Get all post slugs for static generation
 */
export async function getAllPostSlugs(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('slug')
      .eq('status', 'published');

    if (error) throw error;

    return (data || []).map((post: any) => post.slug);
  } catch (error) {
    console.error('Error fetching post slugs:', error);
    return [];
  }
}

/**
 * Search posts
 */
export async function searchPosts(query: string): Promise<SimpleBlogPost[]> {
  if (!query.trim()) {
    return [];
  }

  return getPosts({ search: query });
}

/**
 * Get recent posts
 */
export async function getRecentPosts(limit: number = 5): Promise<SimpleBlogPost[]> {
  return getPosts({ limit });
}

/**
 * Get related posts based on categories
 */
export async function getRelatedPosts(postId: string, limit: number = 3): Promise<SimpleBlogPost[]> {
  try {
    // Get the categories of the current post
    const { data: postCategories, error: catError } = await supabase
      .from('post_categories')
      .select('category_id')
      .eq('post_id', postId);

    if (catError) throw catError;

    if (!postCategories || postCategories.length === 0) {
      return getRecentPosts(limit);
    }

    const categoryIds = postCategories.map((pc: any) => pc.category_id);

    // Find posts with similar categories
    const { data: relatedPostIds, error: relError } = await supabase
      .from('post_categories')
      .select('post_id')
      .in('category_id', categoryIds)
      .neq('post_id', postId)
      .limit(limit * 2); // Get more to filter later

    if (relError) throw relError;

    if (!relatedPostIds || relatedPostIds.length === 0) {
      return getRecentPosts(limit);
    }

    const postIds = Array.from(new Set(relatedPostIds.map((p: any) => p.post_id))).slice(0, limit);

    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        categories:post_categories(
          category:blog_categories(id, name, slug)
        ),
        tags:post_tags(
          tag:blog_tags(id, name, slug)
        )
      `)
      .in('id', postIds)
      .eq('status', 'published')
      .limit(limit);

    if (error) throw error;

    return (data || []).map((post: any) => {
      const categories = post.categories?.map((pc: any) => pc.category).filter(Boolean) || [];
      const tags = post.tags?.map((pt: any) => pt.tag).filter(Boolean) || [];
      
      return transformPost({
        ...post,
        categories,
        tags,
      });
    });
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return getRecentPosts(limit);
  }
}

/**
 * Check if Supabase connection is working
 */
export async function checkSupabaseConnection(): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('blog_posts')
      .select('id')
      .limit(1);

    return !error;
  } catch (error) {
    console.error('Supabase connection failed:', error);
    return false;
  }
}

