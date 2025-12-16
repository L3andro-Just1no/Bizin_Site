# Environment Variables Setup

## Supabase CMS Integration

After creating your Supabase project, create a `.env.local` file in the root of your project with the following variables:

```bash
# Supabase Configuration
# Get these from your Supabase project settings (Settings → API)

# Your Supabase project URL
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co

# Supabase anon/public key (safe to use in frontend)
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your-anon-key...

# Supabase service role key (keep secret! server-side only)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...your-service-role-key...
```

## Configuration Steps

1. Create `.env.local` file in the project root:
```bash
# Windows
type nul > .env.local

# Mac/Linux
touch .env.local
```

2. Add your Supabase credentials (get from Supabase dashboard → Settings → API):
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

3. Restart the Next.js development server:
```bash
npm run dev
```

## Testing the Configuration

You can test if Supabase is connected by:

1. Visit `http://localhost:3000/blog`
2. Check browser console for any Supabase errors
3. If no errors, connection is working!

Or test in code:
```typescript
import { checkSupabaseConnection } from '@/lib/supabase/blog';
const isConnected = await checkSupabaseConnection();
console.log('Supabase connected:', isConnected);
```

## Production Environment (Vercel)

For production deployment on Vercel:

1. Go to your Vercel project → Settings → Environment Variables
2. Add the same three variables:
   - `NEXT_PUBLIC_SUPABASE_URL` → Production
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` → Production
   - `SUPABASE_SERVICE_ROLE_KEY` → Production (mark as "Sensitive")

3. Redeploy your site

### Example Production URLs:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
```

## Security Notes

- ✅ **NEXT_PUBLIC_SUPABASE_URL**: Safe to expose (it's public)
- ✅ **NEXT_PUBLIC_SUPABASE_ANON_KEY**: Safe to expose (it's for public read-only access)
- ⚠️ **SUPABASE_SERVICE_ROLE_KEY**: Keep this secret! Never commit to git or expose in frontend

## Quick Start

See `SUPABASE_QUICK_START.md` for a 5-minute setup guide!

