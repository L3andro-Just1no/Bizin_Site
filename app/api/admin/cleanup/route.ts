import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/client';

// Disable caching for admin routes
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Utility endpoint to list ALL posts including problematic ones
export async function GET(request: NextRequest) {
  try {
    const supabase: any = createServerClient();
    
    // Get absolutely all posts, no filtering
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ 
      posts: data || [],
      count: data?.length || 0 
    });
  } catch (error: any) {
    console.error('Error fetching all posts:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

// Delete post by ID or slug
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const slug = searchParams.get('slug');

    if (!id && !slug) {
      return NextResponse.json(
        { error: 'Either id or slug is required' },
        { status: 400 }
      );
    }

    const supabase: any = createServerClient();
    
    let query = supabase.from('blog_posts').delete();
    
    if (id) {
      query = query.eq('id', id);
    } else if (slug) {
      query = query.eq('slug', slug);
    }

    const { error } = await query;

    if (error) throw error;

    return NextResponse.json({ 
      success: true,
      message: `Post deleted successfully` 
    });
  } catch (error: any) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete post' },
      { status: 500 }
    );
  }
}

