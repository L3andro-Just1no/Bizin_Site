# WordPress Headless CMS Integration

This directory contains all the documentation and scripts needed to set up WordPress as a headless CMS for your Next.js application.

## Quick Start

1. **Install WordPress**
   - Follow [INSTALLATION.md](./INSTALLATION.md) for detailed installation steps
   - Or run the automated script: `./install-wordpress.sh`

2. **Configure WordPress**
   - Install recommended plugins (see [PLUGINS.md](./PLUGINS.md))
   - Configure CORS and permalinks
   - Create sample blog posts

3. **Configure Next.js**
   - Set up environment variables (see [ENV_SETUP.md](../ENV_SETUP.md))
   - WordPress API client is already implemented in `lib/wordpress.ts`
   - Blog components are updated to use WordPress data

4. **Test Integration**
   - Follow [TESTING.md](./TESTING.md) to verify everything works
   - Create test posts and verify they appear in Next.js

5. **Deploy to Production**
   - Follow [DEPLOYMENT.md](./DEPLOYMENT.md) for production deployment

## Documentation

- **[INSTALLATION.md](./INSTALLATION.md)** - Complete WordPress installation guide
- **[PLUGINS.md](./PLUGINS.md)** - Recommended WordPress plugins
- **[TESTING.md](./TESTING.md)** - Testing guide with sample posts
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Production deployment guide
- **[ENV_SETUP.md](../ENV_SETUP.md)** - Environment variables configuration

## Files

- `install-wordpress.sh` - Automated installation script (Linux/Mac)
- `INSTALLATION.md` - Manual installation guide
- `PLUGINS.md` - Plugin recommendations
- `TESTING.md` - Testing procedures
- `DEPLOYMENT.md` - Deployment guide

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     User Browser                            │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  Next.js Application                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Blog List    │  │ Blog Post    │  │ Components   │     │
│  │ /blog        │  │ /blog/[slug] │  │              │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                            │                                │
│                            ▼                                │
│                  ┌──────────────────┐                      │
│                  │ WordPress Client │                      │
│                  │ lib/wordpress.ts │                      │
│                  └──────────────────┘                      │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ REST API
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   WordPress CMS                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Admin Panel  │  │ REST API     │  │ Database     │     │
│  │ /wp-admin    │  │ /wp-json     │  │ MySQL        │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

## Features

### Implemented Features

✅ WordPress REST API integration  
✅ TypeScript types for WordPress data  
✅ Blog list page with category filtering  
✅ Dynamic blog post pages  
✅ Featured images support  
✅ SEO metadata generation  
✅ ISR (Incremental Static Regeneration)  
✅ Related posts  
✅ Responsive design  
✅ Error handling  

### WordPress Features Used

- Posts API (`/wp-json/wp/v2/posts`)
- Categories API (`/wp-json/wp/v2/categories`)
- Media API (embedded in posts)
- Featured images
- Post metadata (date, author, excerpt)

## API Endpoints Used

```
GET /wp-json/wp/v2/posts              # Get all posts
GET /wp-json/wp/v2/posts?slug={slug}  # Get post by slug
GET /wp-json/wp/v2/posts/{id}         # Get post by ID
GET /wp-json/wp/v2/categories         # Get all categories
GET /wp-json/wp/v2/media/{id}         # Get media by ID
```

## Environment Variables

Required environment variables in `.env.local`:

```bash
WORDPRESS_API_URL=http://localhost/wordpress/wp-json/wp/v2
NEXT_PUBLIC_WORDPRESS_URL=http://localhost/wordpress
```

## File Structure

```
Bizin_Site/
├── app/
│   └── blog/
│       ├── page.tsx              # Blog list page (updated)
│       └── [slug]/
│           ├── page.tsx          # Dynamic blog post page (new)
│           └── not-found.tsx     # 404 page (new)
├── components/
│   └── BlogContent.tsx           # Blog list component (updated)
├── lib/
│   ├── wordpress.ts              # WordPress API client (new)
│   └── types/
│       └── wordpress.ts          # TypeScript types (new)
├── wordpress-setup/              # WordPress documentation (new)
│   ├── README.md
│   ├── INSTALLATION.md
│   ├── PLUGINS.md
│   ├── TESTING.md
│   ├── DEPLOYMENT.md
│   └── install-wordpress.sh
├── next.config.js                # Updated with WordPress images
└── ENV_SETUP.md                  # Environment setup guide (new)
```

## Next Steps

1. **Install WordPress** using the installation guide
2. **Create content** - Add blog posts, categories, and images
3. **Test locally** - Verify integration works
4. **Deploy** - Follow deployment guide for production

## Troubleshooting

### Common Issues

**WordPress API not accessible:**
- Check WordPress installation
- Verify permalink settings
- Check CORS configuration

**Images not loading:**
- Verify `next.config.js` remotePatterns
- Check WordPress media library
- Ensure featured images are set

**No posts showing:**
- Create published posts in WordPress
- Check `.env.local` configuration
- Verify API endpoint is correct

**Build errors:**
- Ensure WordPress is accessible during build
- Check environment variables
- Review error logs

## Support

For issues or questions:

1. Check the documentation in this directory
2. Review WordPress REST API documentation
3. Check Next.js ISR documentation
4. Review error logs in browser console and terminal

## Additional Resources

- [WordPress REST API Handbook](https://developer.wordpress.org/rest-api/)
- [Next.js Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [Next.js ISR](https://nextjs.org/docs/app/building-your-application/data-fetching/revalidating)
- [WordPress Headless CMS Guide](https://wordpress.org/support/article/wordpress-as-a-headless-cms/)

## License

This integration follows the same license as your main project.

