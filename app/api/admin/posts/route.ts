import { NextRequest, NextResponse } from 'next/server';
import { getPosts } from '@/lib/supabase/blog';
import { createServerClient } from '@/lib/supabase/client';

// Disable caching for admin routes
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    // Get all posts (including drafts for admin)
    const supabase = createServerClient();
    
    // First get all posts
    const { data: postsData, error: postsError } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (postsError) {
      console.error('Posts error:', postsError);
      throw postsError;
    }

    if (!postsData || postsData.length === 0) {
      return NextResponse.json({ posts: [] });
    }

    // Then get categories for each post
    const posts = await Promise.all(postsData.map(async (post: any) => {
      // Get categories for this post
      const { data: categoryData } = await supabase
        .from('post_categories')
        .select('category_id, blog_categories(id, name, slug)')
        .eq('post_id', post.id);

      const categories = categoryData?.map((pc: any) => pc.blog_categories?.slug).filter(Boolean) || [];
      
      return {
        id: post.id,
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt || '',
        content: post.content,
        date: post.published_at || post.created_at,
        author: post.author_name,
        status: post.status, // Include status for admin dashboard
        featuredImage: post.featured_image_url
          ? {
              url: post.featured_image_url,
              alt: post.featured_image_alt || post.title,
            }
          : null,
        categories: categories,
        tags: [],
        readTime: post.read_time ? `${post.read_time} min read` : '5 min read',
        views: post.views,
      };
    }));

    return NextResponse.json({ posts });
  } catch (error: any) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

