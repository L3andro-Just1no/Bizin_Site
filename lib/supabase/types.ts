// Supabase Database Types
// These match the schema.sql definitions

export interface Database {
  public: {
    Tables: {
      blog_posts: {
        Row: BlogPost;
        Insert: BlogPostInsert;
        Update: BlogPostUpdate;
      };
      blog_categories: {
        Row: BlogCategory;
        Insert: BlogCategoryInsert;
        Update: BlogCategoryUpdate;
      };
      blog_tags: {
        Row: BlogTag;
        Insert: BlogTagInsert;
        Update: BlogTagUpdate;
      };
      post_categories: {
        Row: PostCategory;
        Insert: PostCategoryInsert;
        Update: PostCategoryUpdate;
      };
      post_tags: {
        Row: PostTag;
        Insert: PostTagInsert;
        Update: PostTagUpdate;
      };
    };
    Views: {
      blog_posts_with_relations: {
        Row: BlogPostWithRelations;
      };
    };
    Functions: {
      calculate_read_time: {
        Args: { content_text: string };
        Returns: number;
      };
      generate_slug: {
        Args: { input_text: string };
        Returns: string;
      };
      increment_post_views: {
        Args: { post_slug: string };
        Returns: void;
      };
    };
  };
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image_url: string | null;
  featured_image_alt: string | null;
  author_name: string;
  status: 'draft' | 'published' | 'archived';
  published_at: string | null;
  created_at: string;
  updated_at: string;
  meta_title: string | null;
  meta_description: string | null;
  read_time: number | null;
  views: number;
}

export interface BlogPostInsert {
  id?: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featured_image_url?: string;
  featured_image_alt?: string;
  author_name?: string;
  status?: 'draft' | 'published' | 'archived';
  published_at?: string;
  meta_title?: string;
  meta_description?: string;
  read_time?: number;
}

export interface BlogPostUpdate {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  featured_image_url?: string;
  featured_image_alt?: string;
  author_name?: string;
  status?: 'draft' | 'published' | 'archived';
  published_at?: string;
  meta_title?: string;
  meta_description?: string;
  read_time?: number;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface BlogCategoryInsert {
  id?: string;
  name: string;
  slug: string;
  description?: string;
}

export interface BlogCategoryUpdate {
  name?: string;
  slug?: string;
  description?: string;
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface BlogTagInsert {
  id?: string;
  name: string;
  slug: string;
}

export interface BlogTagUpdate {
  name?: string;
  slug?: string;
}

export interface PostCategory {
  post_id: string;
  category_id: string;
}

export interface PostCategoryInsert {
  post_id: string;
  category_id: string;
}

export interface PostCategoryUpdate {
  post_id?: string;
  category_id?: string;
}

export interface PostTag {
  post_id: string;
  tag_id: string;
}

export interface PostTagInsert {
  post_id: string;
  tag_id: string;
}

export interface PostTagUpdate {
  post_id?: string;
  tag_id?: string;
}

// View types
export interface BlogPostWithRelations extends BlogPost {
  categories: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  tags: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
}

// Simplified types for frontend use
export interface SimpleBlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  featuredImage: {
    url: string;
    alt: string;
  } | null;
  categories: string[];
  tags: string[];
  readTime: string;
  views: number;
}

export interface SimpleBlogCategory {
  id: string;
  name: string;
  slug: string;
  count: number;
}

