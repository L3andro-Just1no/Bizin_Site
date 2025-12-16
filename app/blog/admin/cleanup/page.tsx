'use client';

import { useEffect, useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function CleanupPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const fetchAllPosts = async () => {
    try {
      const response = await fetch('/api/admin/cleanup');
      if (response.ok) {
        const data = await response.json();
        setPosts(data.posts);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;

    setDeleting(postId);
    setMessage('');

    try {
      const response = await fetch(`/api/admin/cleanup?id=${postId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPosts(posts.filter(p => p.id !== postId));
        setMessage(`✓ Deleted "${title}" successfully!`);
      } else {
        const data = await response.json();
        setMessage(`✗ Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      setMessage('✗ Error deleting post');
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#87c76c] border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading all posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <Container className="py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#1c2544]">Cleanup Utility</h1>
              <p className="text-gray-600 text-sm">View and delete all posts (including drafts)</p>
            </div>
            <Link href="/blog/admin">
              <Button variant="secondary">Back to Dashboard</Button>
            </Link>
          </div>
        </Container>
      </div>

      {/* Content */}
      <Container className="py-8">
        {message && (
          <div className={`mb-6 px-4 py-3 rounded-lg ${
            message.startsWith('✓') 
              ? 'bg-green-50 border border-green-200 text-green-700'
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}>
            {message}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold text-gray-900">
              All Posts ({posts.length})
            </h2>
          </div>

          {posts.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              No posts found
            </div>
          ) : (
            <div className="divide-y">
              {posts.map((post) => (
                <div key={post.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-medium text-gray-900 truncate">
                          {post.title}
                        </h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          post.status === 'published'
                            ? 'bg-green-100 text-green-800'
                            : post.status === 'draft'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {post.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        Slug: {post.slug} | Created: {new Date(post.created_at).toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        ID: {post.id}
                      </p>
                    </div>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleDelete(post.id, post.title)}
                      disabled={deleting === post.id}
                      className="text-red-600 hover:bg-red-50"
                    >
                      {deleting === post.id ? 'Deleting...' : 'Delete'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> This page shows ALL posts from the database, including drafts.
            Use this to clean up any posts that aren&apos;t showing in the main dashboard.
          </p>
        </div>
      </Container>
    </div>
  );
}

