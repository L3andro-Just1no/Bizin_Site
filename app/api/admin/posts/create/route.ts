import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase: any = createServerClient();
    
    // Generate slug if not provided
    const slug = body.slug || body.title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    // Insert post
    const { data: post, error: postError } = await supabase
      .from('blog_posts')
      .insert({
        title: body.title,
        slug: slug,
        excerpt: body.excerpt,
        content: body.content,
        featured_image_url: body.featured_image_url,
        featured_image_alt: body.featured_image_alt,
        status: body.status || 'draft',
        published_at: body.status === 'published' ? new Date().toISOString() : null,
        author_name: body.author_name || 'Admin',
        read_time: body.read_time || null,
      })
      .select()
      .single();

    if (postError) throw postError;

    // Add categories if provided
    if (body.categories && body.categories.length > 0 && post) {
      const categoryInserts = body.categories.map((catId: string) => ({
        post_id: post.id,
        category_id: catId,
      }));

      await supabase
        .from('post_categories')
        .insert(categoryInserts);
    }

    return NextResponse.json({ success: true, post });
  } catch (error: any) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create post' },
      { status: 500 }
    );
  }
}

