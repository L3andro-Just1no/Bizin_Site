-- Supabase Blog CMS Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create categories table
CREATE TABLE IF NOT EXISTS blog_categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image_url TEXT,
  featured_image_alt TEXT,
  author_name TEXT DEFAULT 'Admin',
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  meta_title TEXT,
  meta_description TEXT,
  read_time INTEGER, -- in minutes
  views INTEGER DEFAULT 0
);

-- Create post_categories junction table (many-to-many relationship)
CREATE TABLE IF NOT EXISTS post_categories (
  post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  category_id UUID REFERENCES blog_categories(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, category_id)
);

-- Create tags table
CREATE TABLE IF NOT EXISTS blog_tags (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create post_tags junction table
CREATE TABLE IF NOT EXISTS post_tags (
  post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES blog_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_categories_slug ON blog_categories(slug);
CREATE INDEX IF NOT EXISTS idx_blog_tags_slug ON blog_tags(slug);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_categories_updated_at
  BEFORE UPDATE ON blog_categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create view for posts with categories and tags
CREATE OR REPLACE VIEW blog_posts_with_relations AS
SELECT 
  p.*,
  COALESCE(
    json_agg(DISTINCT jsonb_build_object(
      'id', c.id,
      'name', c.name,
      'slug', c.slug
    )) FILTER (WHERE c.id IS NOT NULL),
    '[]'
  ) as categories,
  COALESCE(
    json_agg(DISTINCT jsonb_build_object(
      'id', t.id,
      'name', t.name,
      'slug', t.slug
    )) FILTER (WHERE t.id IS NOT NULL),
    '[]'
  ) as tags
FROM blog_posts p
LEFT JOIN post_categories pc ON p.id = pc.post_id
LEFT JOIN blog_categories c ON pc.category_id = c.id
LEFT JOIN post_tags pt ON p.id = pt.post_id
LEFT JOIN blog_tags t ON pt.tag_id = t.id
GROUP BY p.id;

-- Row Level Security (RLS) Policies
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_tags ENABLE ROW LEVEL SECURITY;

-- Public read access for published posts
CREATE POLICY "Public can view published posts"
  ON blog_posts FOR SELECT
  USING (status = 'published');

-- Public read access for categories
CREATE POLICY "Public can view categories"
  ON blog_categories FOR SELECT
  USING (true);

-- Public read access for tags
CREATE POLICY "Public can view tags"
  ON blog_tags FOR SELECT
  USING (true);

-- Public read access for post relationships
CREATE POLICY "Public can view post categories"
  ON post_categories FOR SELECT
  USING (true);

CREATE POLICY "Public can view post tags"
  ON post_tags FOR SELECT
  USING (true);

-- Admin access (authenticated users can manage all content)
-- You'll need to create an admin role or use Supabase Auth
CREATE POLICY "Authenticated users can manage posts"
  ON blog_posts FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage categories"
  ON blog_categories FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage tags"
  ON blog_tags FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage post categories"
  ON post_categories FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage post tags"
  ON post_tags FOR ALL
  USING (auth.role() = 'authenticated');

-- Insert default categories
INSERT INTO blog_categories (name, slug, description) VALUES
  ('Incentivos', 'incentivos', 'Informação sobre incentivos fiscais e apoios'),
  ('Consultoria', 'consultoria', 'Serviços de consultoria e apoio empresarial'),
  ('Guias', 'guias', 'Guias práticos para empresas')
ON CONFLICT (slug) DO NOTHING;

-- Function to calculate read time
CREATE OR REPLACE FUNCTION calculate_read_time(content_text TEXT)
RETURNS INTEGER AS $$
DECLARE
  word_count INTEGER;
  words_per_minute INTEGER := 200;
BEGIN
  -- Strip HTML tags and count words
  word_count := array_length(regexp_split_to_array(regexp_replace(content_text, '<[^>]*>', '', 'g'), '\s+'), 1);
  RETURN CEIL(word_count::FLOAT / words_per_minute);
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-calculate read_time
CREATE OR REPLACE FUNCTION update_post_read_time()
RETURNS TRIGGER AS $$
BEGIN
  NEW.read_time := calculate_read_time(NEW.content);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER calculate_blog_post_read_time
  BEFORE INSERT OR UPDATE OF content ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_post_read_time();

-- Function to auto-generate slug from title
CREATE OR REPLACE FUNCTION generate_slug(input_text TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN lower(
    regexp_replace(
      regexp_replace(
        regexp_replace(input_text, '[áàâãä]', 'a', 'gi'),
        '[éèêë]', 'e', 'gi'
      ),
      '[^a-z0-9]+', '-', 'gi'
    )
  );
END;
$$ LANGUAGE plpgsql;

-- Increment view count function
CREATE OR REPLACE FUNCTION increment_post_views(post_slug TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE blog_posts
  SET views = views + 1
  WHERE slug = post_slug;
END;
$$ LANGUAGE plpgsql;

-- Comments
COMMENT ON TABLE blog_posts IS 'Blog posts with rich content';
COMMENT ON TABLE blog_categories IS 'Blog post categories';
COMMENT ON TABLE blog_tags IS 'Blog post tags';
COMMENT ON COLUMN blog_posts.status IS 'Post status: draft, published, or archived';
COMMENT ON COLUMN blog_posts.read_time IS 'Estimated reading time in minutes (auto-calculated)';

