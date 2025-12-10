# ⚠️ WordPress Setup - DEPRECATED

This directory contains WordPress setup documentation that is **no longer used**.

The project has been **migrated to Supabase** as the CMS backend.

## Why We Switched

✅ Supabase is simpler - no separate hosting needed  
✅ Better integration with Next.js and Vercel  
✅ PostgreSQL database (more powerful than MySQL)  
✅ Built-in REST API  
✅ Better performance with ISR  
✅ Free tier is more generous  

## New Documentation

Please refer to these files instead:

- **Quick Start**: `SUPABASE_QUICK_START.md` (5-minute setup)
- **Full Guide**: `SUPABASE_CMS_SETUP.md` (comprehensive)
- **Environment Setup**: `ENV_SETUP.md`
- **Database Schema**: `supabase/schema.sql`

## Migration

If you were using WordPress before:

1. Export your WordPress posts
2. Import data into Supabase (see migration guide in SUPABASE_CMS_SETUP.md)
3. Update environment variables from WordPress URLs to Supabase credentials

## Files in This Directory

These files are kept for reference only:

- `INSTALLATION.md` - WordPress installation (no longer needed)
- `PLUGINS.md` - WordPress plugins (no longer needed)
- `TESTING.md` - WordPress testing (replaced by Supabase testing)
- `DEPLOYMENT.md` - WordPress deployment (replaced by Vercel deployment)
- `install-wordpress.sh` - Installation script (no longer needed)

**You can safely delete this `wordpress-setup/` directory if desired.**

---

**Use Supabase instead! See `SUPABASE_QUICK_START.md` to get started. 🚀**

