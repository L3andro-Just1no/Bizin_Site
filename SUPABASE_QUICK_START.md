# Supabase CMS - Quick Start (5 Minutes)

## ⚡ Fast Setup

### 1. Create Supabase Project (2 min)

1. Go to [supabase.com](https://supabase.com) → Sign up / Log in
2. Click "New Project"
3. Fill in:
   - Name: `bizin-blog`
   - Database Password: (save it!)
   - Region: Europe West
4. Click "Create project" → Wait 2-3 minutes

### 2. Set Up Database (1 min)

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy **ALL** content from `supabase/schema.sql`
4. Paste and click "RUN"
5. ✅ You should see "Success. No rows returned"

### 3. Get Your API Keys (30 seconds)

1. Go to **Project Settings** (gear icon)
2. Click **API** in left menu
3. Copy these 2 values:

```
URL: https://xxxxx.supabase.co
anon key: eyJhbGc...
```

### 4. Add Environment Variables (1 min)

Create `.env.local` file in project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your-key...
```

### 5. Start Development Server (30 seconds)

```bash
npm run dev
```

Visit: http://localhost:3000/blog

You should see "No blog posts found" (because you haven't created any yet!)

### 6. Create Your First Post (1 min)

#### Option A: In Supabase Dashboard

1. Go to **Table Editor**
2. Click `blog_posts` table
3. Click "Insert row" button
4. Fill in:
   - title: `"Bem-vindo ao Blog"`
   - slug: `"bem-vindo"`
   - excerpt: `"Primeiro artigo"`
   - content: `"<h2>Olá!</h2><p>Bem-vindo!</p>"`
   - status: `"published"` (dropdown)
   - published_at: Click calendar, select today's date
   - featured_image_url: `"https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800"`
5. Click "Save"

#### Option B: Using SQL

In SQL Editor, run:

```sql
INSERT INTO blog_posts (
  title, slug, excerpt, content, status, published_at, featured_image_url
) VALUES (
  'Como Aceder aos Fundos Europeus',
  'fundos-europeus-2024',
  'Descubra como sua empresa pode beneficiar dos fundos europeus em 2024',
  '<h2>Introdução</h2><p>Os fundos europeus representam uma oportunidade única para empresas portuguesas expandirem e inovarem.</p><h2>Principais Programas</h2><ul><li>Portugal 2030</li><li>Horizonte Europa</li><li>COMPETE 2030</li></ul><p>Contacte-nos para saber mais!</p>',
  'published',
  NOW(),
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800'
);
```

### 7. Refresh Blog Page

Go back to http://localhost:3000/blog

🎉 **You should see your post!**

---

## ✅ That's It!

Your blog is now running on Supabase. 

### Next Steps:

1. **Add more posts** in Supabase Table Editor
2. **Deploy to Vercel:**
   ```bash
   git add .
   git commit -m "Migrate to Supabase"
   git push
   ```
3. **Add environment variables in Vercel** (Project Settings → Environment Variables)

### Quick Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Test production build
npm start
```

### Need Help?

- 📖 Full guide: See `SUPABASE_CMS_SETUP.md`
- 🗄️ Database schema: See `supabase/schema.sql`
- 💻 API functions: See `lib/supabase/blog.ts`

---

**Time to create content! 🚀**

