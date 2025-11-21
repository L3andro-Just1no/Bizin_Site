# Image Replacement Guide

## Overview

This guide helps you replace the placeholder Unsplash images with your own branded photography.

## Current Placeholder Images

### Home Page Images

| Section | Current Unsplash URL | Recommended Size | What to Replace With |
|---------|---------------------|------------------|---------------------|
| **Hero Image** | Lisboa cityscape | 2340x1560px | Professional photo of Lisboa/Portugal, or your office building |
| **Business Strategy** | Professional office | 2340x1560px | Your team planning/strategy session |
| **Team Photo** | Diverse team collaboration | 2340x1560px | Your actual team photo (professional group photo) |
| **Article 1** | Business desk setup | 2340x1560px | Article thumbnail or relevant business image |
| **Article 2** | Data/analytics | 2426x1618px | Article thumbnail or relevant tech image |
| **Contact Image** | Office meeting | 2340x1560px | Your office reception or meeting room |

## How to Replace Images

### Method 1: Using Your Own Hosted Images

1. **Prepare your images**:
   - Resize to recommended dimensions (or larger)
   - Optimize for web (use tools like TinyPNG, Squoosh)
   - Save in WebP or JPEG format
   - Name them descriptively (e.g., `hero-lisboa.jpg`, `team-photo.jpg`)

2. **Upload to your image host**:
   - Use your CDN (Cloudinary, Imgix, etc.)
   - Or place in `public/images/` folder
   - Get the full URL

3. **Update in code**:

**Example:** Replace hero image

**Current:**
```tsx
<Image
  src="https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=2340"
  alt="Lisboa Portugal"
  fill
  className="object-cover"
  priority
/>
```

**Replace with:**
```tsx
<Image
  src="/images/hero-lisboa.jpg"  // If in public/images/
  // OR
  src="https://your-cdn.com/hero-lisboa.jpg"  // If using CDN
  alt="Lisboa Portugal"
  fill
  className="object-cover"
  priority
/>
```

### Method 2: Using Next.js Public Folder

1. **Add images to project**:
   ```
   public/
   └── images/
       ├── hero-lisboa.jpg
       ├── team-photo.jpg
       ├── business-strategy.jpg
       ├── article-1.jpg
       ├── article-2.jpg
       └── contact-office.jpg
   ```

2. **Reference in code**:
   ```tsx
   src="/images/hero-lisboa.jpg"
   ```

## Complete Replacement Checklist

### Home Page (`app/page.tsx`)

- [ ] **Line ~30-35**: Hero section background image
  - Replace: Lisboa cityscape
  - With: Your main hero image
  - Size: 2340x1560px minimum

- [ ] **Line ~90-95**: Business strategy image
  - Replace: Professional office setting
  - With: Your team in strategy meeting
  - Size: 2340x1560px minimum

- [ ] **Line ~115-120**: Team photo
  - Replace: Diverse team photo
  - With: YOUR ACTUAL TEAM PHOTO (most important!)
  - Size: 2340x1560px minimum
  - Tip: Get a professional photographer

- [ ] **Line ~260-265**: Article 1 image
  - Replace: Business desk
  - With: Your article thumbnail
  - Size: 2340x1560px minimum

- [ ] **Line ~275-280**: Article 2 image
  - Replace: Data/analytics
  - With: Your article thumbnail
  - Size: 2426x1618px minimum

- [ ] **Line ~350-355**: Contact section image
  - Replace: Office meeting
  - With: Your office/reception area
  - Size: 2340x1560px minimum

### Partner Logos Section

- [ ] **Line ~155-165**: Replace "LOGO 1", "LOGO 2", etc.
  - Add real partner logos
  - Use SVG format for best quality
  - Size: ~100-200px height

**Example:**
```tsx
<div className="flex items-center justify-center gap-12">
  <Image src="/images/partners/partner-1.svg" alt="Partner 1" width={150} height={60} />
  <Image src="/images/partners/partner-2.svg" alt="Partner 2" width={150} height={60} />
  <Image src="/images/partners/partner-3.svg" alt="Partner 3" width={150} height={60} />
  {/* ... more partners */}
</div>
```

## Image Specifications

### Recommended Formats

1. **Photos**: WebP or JPEG
   - WebP: Smaller size, better quality
   - JPEG: Universal compatibility

2. **Logos**: SVG or PNG
   - SVG: Scalable, perfect quality
   - PNG: Transparent backgrounds

### Optimization Tips

1. **Use Next.js Image Optimization**:
   - Automatically serves WebP when supported
   - Responsive sizing
   - Lazy loading

2. **Before uploading**:
   - Compress images (aim for <200KB per image)
   - Use proper dimensions
   - Remove EXIF data

3. **Tools**:
   - [TinyPNG](https://tinypng.com/) - Compression
   - [Squoosh](https://squoosh.app/) - Format conversion
   - [SVGOMG](https://jakearchibald.github.io/svgomg/) - SVG optimization

## Professional Photography Tips

### Team Photo
- **Lighting**: Natural light or professional setup
- **Background**: Clean, professional (office or neutral)
- **Composition**: Everyone visible, engaged
- **Clothing**: Business casual, coordinated colors
- **Tip**: Hire a professional photographer (worth the investment!)

### Office Photos
- **Clean spaces**: Remove clutter
- **Branding**: Include subtle brand elements
- **Angles**: Show spaciousness and organization
- **Lighting**: Bright, welcoming

### Article Thumbnails
- **Relevance**: Match article content
- **Consistency**: Similar style across articles
- **Quality**: Professional stock photos or custom
- **Size**: 2340x1560px recommended

## Using a CDN (Recommended)

### Why Use a CDN?

- Faster loading times
- Automatic optimization
- Image transformations on-the-fly
- Better performance globally

### Popular CDN Options

1. **Cloudinary** (Recommended)
   - Free tier: 25GB/month
   - Automatic optimization
   - Easy Next.js integration

2. **Imgix**
   - Professional features
   - Real-time transformations

3. **Vercel Blob Storage**
   - Built into Vercel
   - Simple integration

### CDN Integration Example

```tsx
// Using Cloudinary
<Image
  src="https://res.cloudinary.com/your-cloud/image/upload/v1234567890/hero-image.jpg"
  alt="Hero"
  fill
  className="object-cover"
  priority
/>
```

## Alt Text Best Practices

Always provide descriptive alt text:

```tsx
// Good
alt="Neomarca team celebrating project success in Lisbon office"

// Bad
alt="Team photo"
alt="Image"
alt=""
```

## Troubleshooting

### Images Not Loading?

1. **Check file path**: Case-sensitive on Linux servers
2. **Check file size**: Very large images (>5MB) may timeout
3. **Check format**: Use supported formats (JPEG, PNG, WebP, SVG)
4. **Check Next.js config**: Verify `next.config.js` if using external domains

### Blurry Images?

1. **Use higher resolution**: At least 2x the display size
2. **Check compression**: Don't over-compress
3. **Use `quality` prop**: `<Image quality={90} />`

### Slow Loading?

1. **Optimize images**: Compress before uploading
2. **Use WebP**: Smaller file size
3. **Lazy load**: Don't use `priority` except for hero image
4. **Use CDN**: Faster delivery

## Quick Reference: Find & Replace

Open `app/page.tsx` and search for these Unsplash URLs:

1. `photo-1555881400-74d7acaacd8b` → Hero image
2. `photo-1526304640581-d334cdbbf45e` → Business strategy
3. `photo-1522071820081-009f0129c71c` → Team photo
4. `photo-1454165804606-c3d57bc86b40` → Article 1
5. `photo-1460925895917-afdab827c52f` → Article 2
6. `photo-1556761175-b413da4baf72` → Contact section

Replace the entire Unsplash URL with your image path.

## Final Checklist

Before going live:

- [ ] All Unsplash URLs replaced with your images
- [ ] Alt text updated for all images
- [ ] Images optimized (<200KB each)
- [ ] Partner logos added (if available)
- [ ] Team photo is professional and up-to-date
- [ ] Test on mobile devices
- [ ] Test loading speed (Google PageSpeed Insights)
- [ ] Verify images display correctly on all pages

---

**Need Help?** Check the Next.js Image documentation: https://nextjs.org/docs/basic-features/image-optimization

**Pro Tip**: Start with the hero image and team photo - these make the biggest impact!

