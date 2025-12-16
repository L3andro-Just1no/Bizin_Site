import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/client';
import type { BlogPost, BlogPostUpdate } from '@/lib/supabase/types';

// Disable caching for admin routes
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase: any = createServerClient();
    
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', params.id)
      .single();

    if (error) {
      throw error;
    }

    if (!data) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    const postData = data as BlogPost;

    // Get categories for this post
    const { data: categoryData } = await supabase
      .from('post_categories')
      .select('category_id')
      .eq('post_id', params.id);

    const post = {
      id: postData.id,
      title: postData.title,
      slug: postData.slug,
      excerpt: postData.excerpt,
      content: postData.content,
      featured_image_url: postData.featured_image_url,
      featured_image_alt: postData.featured_image_alt,
      status: postData.status,
      published_at: postData.published_at,
      author_name: postData.author_name,
      categories: categoryData?.map((pc: any) => pc.category_id) || [],
    };

    return NextResponse.json({ post });
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase: any = createServerClient();
    
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', params.id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const supabase: any = createServerClient();
    
    // Update post
    const { error: postError } = await supabase
      .from('blog_posts')
      .update({
        title: body.title,
        slug: body.slug,
        excerpt: body.excerpt,
        content: body.content,
        featured_image_url: body.featured_image_url,
        featured_image_alt: body.featured_image_alt,
        status: body.status,
        published_at: body.status === 'published' ? (body.published_at || new Date().toISOString()) : null,
        author_name: body.author_name || 'Admin',
        read_time: body.read_time || null,
      })
      .eq('id', params.id);

    if (postError) throw postError;

    // Update categories if provided
    if (body.categories && body.categories.length > 0) {
      // Delete existing categories
      await supabase
        .from('post_categories')
        .delete()
        .eq('post_id', params.id);

      // Insert new categories
      const categoryInserts = body.categories.map((catId: string) => ({
        post_id: params.id,
        category_id: catId,
      }));

      await supabase
        .from('post_categories')
        .insert(categoryInserts);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    );
  }
}

