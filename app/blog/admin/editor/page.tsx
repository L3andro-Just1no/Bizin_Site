'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { RichTextEditor } from '@/components/admin/RichTextEditor';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { generateSlug, generateExcerpt, calculateReadTime } from '@/lib/utils/blogUtils';

function EditorContent() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [categories, setCategories] = useState<string[]>([]);
  const [availableCategories, setAvailableCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get('id');

  useEffect(() => {
    // Check if user is logged in
    const token = Cookies.get('admin-token');
    if (!token) {
      router.push('/blog/admin/login');
      return;
    }

    fetchCategories();

    // If editing, load post
    if (postId) {
      loadPost(postId);
    }
  }, [postId, router]);

  // Auto-generate slug from title (unless manually edited)
  useEffect(() => {
    if (!slugManuallyEdited && title) {
      setSlug(generateSlug(title));
    }
  }, [title, slugManuallyEdited]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/admin/categories');
      if (response.ok) {
        const data = await response.json();
        setAvailableCategories(data.categories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const loadPost = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/posts/${id}`);
      if (response.ok) {
        const data = await response.json();
        const post = data.post;
        setTitle(post.title);
        setSlug(post.slug);
        setSlugManuallyEdited(true); // Existing posts have their slug set
        setContent(post.content);
        setFeaturedImage(post.featured_image_url || '');
        setStatus(post.status);
        setCategories(post.categories || []);
      }
    } catch (error) {
      console.error('Error loading post:', error);
      setError('Failed to load post');
    } finally {
      setLoading(false);
    }
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    // Auto-generate slug from title if creating new post
    if (!postId && !slug) {
      const autoSlug = newTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      setSlug(autoSlug);
    }
  };

  const handleSave = async (saveStatus?: 'draft' | 'published') => {
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    setSaving(true);
    setError('');

    // Use the passed status or fall back to the state
    const finalStatus = saveStatus || status;

    try {
      // Auto-generate excerpt from content
      const autoExcerpt = generateExcerpt(content, 160);
      
      // Auto-calculate read time
      const readTime = calculateReadTime(content);

      const payload = {
        title,
        slug: slug || generateSlug(title), // Fallback if slug is empty
        excerpt: autoExcerpt,
        content,
        featured_image_url: featuredImage,
        featured_image_alt: title,
        status: finalStatus,
        categories,
        read_time: readTime,
      };

      const url = postId 
        ? `/api/admin/posts/${postId}`
        : '/api/admin/posts/create';
      
      const method = postId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // Force a full page reload to ensure fresh data
        window.location.href = '/blog/admin';
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to save post');
      }
    } catch (error) {
      console.error('Error saving post:', error);
      setError('An error occurred while saving');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#87c76c] border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading post...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <Container className="py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#1c2544]">
                {postId ? 'Edit Post' : 'Create New Post'}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="secondary"
                onClick={() => router.push('/blog/admin')}
              >
                Cancel
              </Button>
              <Button
                variant="secondary"
                onClick={() => handleSave('draft')}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save as Draft'}
              </Button>
              <Button
                variant="primary"
                onClick={() => handleSave('published')}
                disabled={saving}
              >
                {saving ? 'Publishing...' : 'Publish'}
              </Button>
            </div>
          </div>
        </Container>
      </div>

      {/* Content */}
      <Container className="py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Editor */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Post Title *
              </label>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter post title..."
                className="text-xl font-semibold"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL Slug
                <span className="text-xs text-gray-500 font-normal ml-2">
                  (auto-generated, editable)
                </span>
              </label>
              <Input
                type="text"
                value={slug}
                onChange={(e) => {
                  setSlug(e.target.value);
                  setSlugManuallyEdited(true);
                }}
                placeholder="url-slug-for-post"
              />
              <p className="text-sm text-gray-500 mt-1">
                URL: /blog/{slug || 'your-post-slug'}
              </p>
            </div>

            {/* Content Editor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content *
              </label>
              <RichTextEditor
                value={content}
                onChange={setContent}
                placeholder="Write your blog post content here..."
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Featured Image */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <ImageUploader
                value={featuredImage}
                onChange={setFeaturedImage}
                label="Featured Image"
              />
            </div>

            {/* Categories */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {availableCategories.map((cat) => (
                  <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={categories.includes(cat.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setCategories([...categories, cat.id]);
                        } else {
                          setCategories(categories.filter(id => id !== cat.id));
                        }
                      }}
                      className="rounded border-gray-300 text-[#87c76c] focus:ring-[#87c76c]"
                    />
                    <span className="text-sm text-gray-700">{cat.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Status */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Status</h3>
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  status === 'published'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {status === 'published' ? '✓ Published' : '📝 Draft'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default function EditorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#87c76c] border-t-transparent"></div>
        </div>
      </div>
    }>
      <EditorContent />
    </Suspense>
  );
}

