# Migration from WordPress to Supabase

## What Changed

Your blog has been migrated from WordPress to Supabase as the CMS backend.

### Before (WordPress)

```
Next.js App → WordPress (separate hosting) → MySQL Database
```

### After (Supabase)

```
Next.js App → Supabase (cloud) → PostgreSQL Database
```

## Files Changed

### ✅ Added

```
supabase/
└── schema.sql                      # Database schema

lib/supabase/
├── client.ts                       # Supabase client setup
├── types.ts                        # TypeScript types
└── blog.ts                         # Blog API functions

SUPABASE_CMS_SETUP.md               # Full setup guide
SUPABASE_QUICK_START.md             # 5-minute quick start
```

### ✏️ Modified

```
app/blog/page.tsx                   # Now uses Supabase
app/blog/[slug]/page.tsx            # Now uses Supabase
components/BlogContent.tsx          # Now uses Supabase types
ENV_SETUP.md                        # Updated for Supabase
next.config.js                      # No changes needed
```

### ❌ Removed

```
lib/wordpress.ts                    # Replaced by lib/supabase/blog.ts
lib/types/wordpress.ts              # Replaced by lib/supabase/types.ts
```

### 📦 Deprecated

```
wordpress-setup/                    # No longer needed
├── INSTALLATION.md
├── PLUGINS.md
├── TESTING.md
├── DEPLOYMENT.md
└── install-wordpress.sh
```

## API Function Mapping

All functions work the same, just import from a different location:

### Before (WordPress)

```typescript
import { getPosts, getPostBySlug, getCategories } from '@/lib/wordpress';

const posts = await getPosts({ per_page: 100 });
const post = await getPostBySlug('my-post');
const categories = await getCategories();
```

### After (Supabase)

```typescript
import { getPosts, getPostBySlug, getCategories } from '@/lib/supabase/blog';

const posts = await getPosts({ limit: 100 });
const post = await getPostBySlug('my-post');
const categories = await getCategories();
```

## Data Structure

The data structure is nearly identical:

```typescript
// Blog Post (same fields)
{
  id: string,
  slug: string,
  title: string,
  excerpt: string,
  content: string,
  date: string,
  author: string,
  featuredImage: { url, alt },
  categories: string[],
  tags: string[],
  readTime: string,
  views: number  // NEW!
}

// Category (same)
{
  id: string,
  name: string,
  slug: string,
  count: number
}
```

## Environment Variables

### Before (WordPress)

```.env
WORDPRESS_API_URL=http://localhost/wordpress/wp-json/wp/v2
NEXT_PUBLIC_WORDPRESS_URL=http://localhost/wordpress
```

### After (Supabase)

```.env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
```

## Setup Steps

1. **Create Supabase Project** (5 min)
   - Go to supabase.com
   - Create new project
   - Wait for provisioning

2. **Run Database Schema** (1 min)
   - Copy `supabase/schema.sql`
   - Paste in Supabase SQL Editor
   - Run query

3. **Update Environment Variables** (1 min)
   - Get API keys from Supabase dashboard
   - Update `.env.local`
   - Restart dev server

4. **Add Content** (5 min)
   - Use Supabase Table Editor
   - Or run SQL inserts
   - See `SUPABASE_QUICK_START.md`

5. **Deploy** (2 min)
   - Push to Git
   - Update Vercel environment variables
   - Auto-deploys

## Benefits

### Simpler Architecture

❌ **Before**: WordPress hosting + PHP + MySQL + Nginx/Apache config  
✅ **After**: Just Supabase (hosted, managed, free tier)

### Better Performance

- Supabase is globally distributed (CDN)
- PostgreSQL is faster than MySQL for complex queries
- Direct database connections (no PHP overhead)
- Built-in connection pooling

### Cost Savings

- **WordPress**: $5-20/month hosting + domain  
- **Supabase**: FREE (500MB database, 2GB file storage, 50GB bandwidth)

### Better DX (Developer Experience)

- No separate hosting to manage
- No PHP/WordPress updates
- Full TypeScript support
- Modern REST API
- Real-time capabilities
- Built-in auth (if needed later)

## Content Management

### WordPress Way

1. Log into WordPress admin
2. Go to Posts → Add New
3. Use visual editor
4. Click Publish

### Supabase Way

**Option 1: Supabase Dashboard**
1. Go to Table Editor
2. Select `blog_posts`
3. Click "Insert row"
4. Fill fields
5. Save

**Option 2: SQL**
```sql
INSERT INTO blog_posts (title, slug, content, status, published_at)
VALUES ('Title', 'slug', '<p>Content</p>', 'published', NOW());
```

**Option 3: Build Custom Admin** (optional)
- Create admin interface in Next.js
- Deploy to subdomain (admin.yourdomain.com)
- We provide starter code if needed

## Troubleshooting

### Issue: Build fails

**Solution**: Make sure environment variables are set in Vercel

### Issue: No posts showing

**Solution**: 
1. Check posts have `status = 'published'`
2. Check `published_at` is set
3. Verify Supabase credentials are correct

### Issue: Images not loading

**Solution**: Add image domain to `next.config.js` if using external images

## Rollback (if needed)

If you need to go back to WordPress:

1. Restore `lib/wordpress.ts` from git history
2. Update imports in blog components
3. Re-add WordPress environment variables
4. Restart server

However, we recommend moving forward with Supabase!

## Support

- 📖 **Quick Start**: `SUPABASE_QUICK_START.md`
- 📚 **Full Guide**: `SUPABASE_CMS_SETUP.md`
- 🗄️ **Schema**: `supabase/schema.sql`
- 💬 **Supabase Discord**: discord.supabase.com

---

**Welcome to Supabase! 🎉**

Your blog is now faster, simpler, and easier to manage.

