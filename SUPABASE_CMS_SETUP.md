# Supabase Blog CMS Setup Guide

## Overview

Your blog now uses Supabase as a headless CMS instead of WordPress. This provides:

✅ No separate hosting needed  
✅ PostgreSQL database  
✅ REST API built-in  
✅ Better performance with ISR  
✅ Full TypeScript support  
✅ Admin dashboard on subdomain  

## Architecture

```
Main Site (yourdomain.com)
└─→ Vercel → Next.js App → Supabase Database

Admin Dashboard (admin.yourdomain.com)
└─→ Vercel → Admin Interface → Supabase Database
```

## Step 1: Create Supabase Project

1. **Go to [supabase.com](https://supabase.com)**
2. **Sign up / Log in**
3. **Create a new project:**
   - Project name: `bizin-blog` (or your choice)
   - Database Password: (save this securely!)
   - Region: Choose closest to your users (e.g., Europe West)
   - Plan: Free tier is fine to start

4. **Wait for project to be created** (2-3 minutes)

## Step 2: Set Up Database

1. **Go to SQL Editor** in Supabase dashboard
2. **Create a new query**
3. **Copy and paste** the entire contents of `supabase/schema.sql`
4. **Run the query** (green "RUN" button)
5. **Verify tables created:**
   - Go to Table Editor
   - You should see: `blog_posts`, `blog_categories`, `blog_tags`, etc.

## Step 3: Get API Credentials

1. **Go to Project Settings** (gear icon in sidebar)
2. **Go to API section**
3. **Copy these values:**

```
Project URL: https://xxxxx.supabase.co
anon/public key: eyJhbGc...
service_role key: eyJhbGc... (keep this secret!)
```

## Step 4: Configure Environment Variables

### For Main Site (Next.js)

Create `.env.local` in your project root:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your-anon-key...

# Optional: For admin operations (keep secret!)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...your-service-key...
```

### For Vercel Deployment

1. Go to Vercel project settings
2. Go to **Environment Variables**
3. Add the same variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (check "Sensitive")

## Step 5: Test Locally

1. **Restart dev server:**
```bash
npm run dev
```

2. **Visit blog page:**
```
http://localhost:3000/blog
```

3. **Check console** for any errors

## Step 6: Add Sample Content

### Option A: Using Supabase Dashboard

1. **Go to Table Editor** in Supabase
2. **Open `blog_categories` table**
3. Default categories are already created (Fundos Europeus, Incentivos, etc.)

4. **Open `blog_posts` table**
5. **Click "Insert row"**
6. **Add a test post:**

```
title: "Bem-vindo ao Nosso Blog"
slug: "bem-vindo"
excerpt: "Este é o nosso primeiro artigo"
content: "<h2>Olá!</h2><p>Bem-vindo ao nosso blog sobre fundos europeus.</p>"
status: "published"
published_at: (current timestamp)
author_name: "Admin"
featured_image_url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800"
```

7. **Link post to category:**
   - Go to `post_categories` table
   - Insert row with:
     - `post_id`: (ID of your post)
     - `category_id`: (ID of a category)

### Option B: Using SQL

Run this in SQL Editor:

```sql
-- Insert a test post
INSERT INTO blog_posts (
  title, 
  slug, 
  excerpt, 
  content, 
  status, 
  published_at,
  featured_image_url
) VALUES (
  'Como Aceder aos Fundos Europeus',
  'como-aceder-fundos-europeus',
  'Descubra como a sua empresa pode beneficiar dos fundos europeus',
  '<h2>Introdução</h2><p>Os fundos europeus representam uma oportunidade única para empresas portuguesas.</p><h2>Principais Programas</h2><p>Portugal 2030 é o principal programa disponível.</p>',
  'published',
  NOW(),
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800'
) RETURNING id;

-- Link to category (replace YOUR_POST_ID with the ID from above)
INSERT INTO post_categories (post_id, category_id)
SELECT 'YOUR_POST_ID', id FROM blog_categories WHERE slug = 'fundos-europeus';
```

## Step 7: Deploy to Vercel

1. **Push changes to Git:**
```bash
git add .
git commit -m "Migrate to Supabase CMS"
git push
```

2. **Vercel will auto-deploy** if connected to your repo

3. **Or manually deploy:**
   - Go to Vercel dashboard
   - Click "Deploy"

4. **Verify deployment:**
   - Visit your deployed site
   - Check `/blog` page shows posts

## Admin Dashboard Setup (Optional)

For a simple admin interface, we recommend:

### Option 1: Use Supabase Dashboard (Easiest)

Just use the Supabase Table Editor to manage posts. It's actually quite good!

### Option 2: Deploy Supabase Studio (Self-hosted Admin)

Supabase Studio can be self-hosted and deployed to a subdomain.

### Option 3: Use Third-Party Headless CMS UI

Tools like [Directus](https://directus.io/) can connect to your Supabase database and provide a nice admin UI.

### Option 4: Build Custom Admin (We provide starter code)

We've created a simple admin interface in `app/admin` that you can deploy to a subdomain.

## Managing Content

### Creating Posts

Use Supabase Table Editor or run SQL:

```sql
INSERT INTO blog_posts (title, slug, excerpt, content, status, published_at)
VALUES (
  'Your Title',
  'your-slug',
  'Short description',
  '<p>Full HTML content here</p>',
  'published',
  NOW()
);
```

### Creating Categories

```sql
INSERT INTO blog_categories (name, slug, description)
VALUES ('New Category', 'new-category', 'Description here');
```

### Linking Post to Categories

```sql
INSERT INTO post_categories (post_id, category_id)
VALUES ('post-uuid', 'category-uuid');
```

## Features

### Auto-Calculated Fields

- **Read Time**: Automatically calculated from content length
- **Slug**: Can be auto-generated from title using `generate_slug()` function
- **Updated At**: Automatically updated on changes

### View Tracking

Views are automatically incremented when a post is viewed.

### Search

Full-text search is available:

```typescript
import { searchPosts } from '@/lib/supabase/blog';
const results = await searchPosts('fundos europeus');
```

## Troubleshooting

### "No blog posts found"

**Check:**
1. Supabase project is created
2. Database schema is installed
3. Environment variables are set correctly
4. At least one post has `status = 'published'`
5. Post has `published_at` date set

### "Supabase connection failed"

**Check:**
1. `NEXT_PUBLIC_SUPABASE_URL` is correct
2. `NEXT_PUBLIC_SUPABASE_ANON_KEY` is correct
3. Supabase project is running (check dashboard)
4. No firewall blocking supabase.co

### Images not loading

**Check:**
1. `featured_image_url` contains valid URL
2. Image URL is accessible
3. `next.config.js` includes image domain in `remotePatterns`

## Database Backups

### Automatic Backups

Supabase automatically backs up your database:
- Free tier: Daily backups, 7-day retention
- Pro tier: Daily backups, 30-day retention

### Manual Backup

1. Go to Database → Backups in Supabase dashboard
2. Click "Create backup"
3. Download when complete

### Restore from Backup

1. Go to Database → Backups
2. Select backup
3. Click "Restore"

## Performance Optimization

### Enable Realtime (Optional)

If you want posts to update instantly:

```typescript
const channel = supabase
  .channel('blog-changes')
  .on('postgres_changes', {
    event: '*',
    schema: 'public',
    table: 'blog_posts'
  }, (payload) => {
    console.log('Post updated:', payload);
  })
  .subscribe();
```

### Add Indexes

Already included in schema, but you can add more:

```sql
CREATE INDEX idx_posts_search ON blog_posts 
USING gin(to_tsvector('portuguese', title || ' ' || content));
```

## Migration from WordPress

If you had WordPress data before:

1. Export WordPress posts to JSON
2. Transform and import to Supabase
3. Update image URLs if needed

## Security

### Row Level Security (RLS)

Already configured in schema:
- ✅ Public can read published posts
- ✅ Only authenticated users can create/edit posts
- ✅ Draft posts are hidden from public

### API Keys

- **Anon key**: Safe to use in frontend (public read only)
- **Service role key**: Never expose in frontend! Server-side only

## Support

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
- Check `lib/supabase/blog.ts` for available functions

## Next Steps

1. ✅ Create Supabase project
2. ✅ Run database schema
3. ✅ Add environment variables
4. ✅ Add sample posts
5. ✅ Test locally
6. ✅ Deploy to Vercel
7. 📝 Create more content!

---

**Your blog is now powered by Supabase! 🎉**

