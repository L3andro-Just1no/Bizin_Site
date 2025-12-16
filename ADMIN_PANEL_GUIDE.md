# Blog Admin Panel - User Guide

## 🎉 Your Visual CMS is Ready!

You now have a complete admin interface to manage your blog posts with a visual editor.

## 🔐 Access the Admin Panel

**URL**: http://localhost:3000/blog/admin/login

**Default Credentials**:
- Username: `admin`
- Password: `admin123`

## 📋 Features

### ✅ What You Can Do

1. **View All Posts** - See all your published and draft posts
2. **Create New Posts** - Visual editor with rich text formatting
3. **Edit Posts** - Update any existing post
4. **Delete Posts** - Remove posts you no longer need
5. **Preview Posts** - View posts on the live site before publishing
6. **Manage Status** - Save as draft or publish immediately
7. **Add Featured Images** - Include images from any URL
8. **Categorize Posts** - Assign posts to categories
9. **Auto-generate Slugs** - URL slugs created automatically from titles

## 🚀 Quick Start

### 1. Log In

1. Go to http://localhost:3000/blog/admin/login
2. Enter credentials: `admin` / `admin123`
3. Click "Sign In"

### 2. Create Your First Post

1. Click **"New Post"** button
2. Fill in the form:
   - **Title**: Your post title (required)
   - **Slug**: Auto-generated, but you can customize
   - **Excerpt**: Brief description for previews
   - **Content**: Use the rich text editor (required)
   - **Featured Image**: Paste image URL
   - **Categories**: Select one or more categories

3. Click **"Publish"** to make it live, or **"Save as Draft"** to publish later

### 3. Edit a Post

1. Find the post in the dashboard
2. Click **"Edit"** button
3. Make your changes
4. Click **"Publish"** or **"Save as Draft"**

### 4. Delete a Post

1. Find the post in the dashboard
2. Click **"Delete"** button
3. Confirm deletion

## 🎨 Using the Rich Text Editor

The visual editor supports:

### Formatting
- **Bold**, *Italic*, Underline, ~~Strikethrough~~
- Headers (H2, H3)
- Paragraphs

### Lists
- Numbered lists
- Bullet lists

### Content Blocks
- Blockquotes
- Code blocks

### Media
- Links
- Images

### Toolbar Buttons

```
[H2] [H3] - Headers
[B] [I] [U] [S] - Text formatting
[1.] [•] - Lists
["] [</>] - Blockquote and code
[🔗] [📷] - Links and images
[🗑️] - Clear formatting
```

## 📸 Adding Images

### Featured Image
1. Find an image online (e.g., Unsplash.com)
2. Right-click → Copy image address
3. Paste URL in "Featured Image" field

**Example URLs**:
```
https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800
https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?q=80&w=800
```

### Images in Content
1. Click the image icon in the editor toolbar
2. Paste image URL
3. Click OK

## 🏷️ Categories

Your blog has these default categories:
- **Fundos Europeus** - European funds articles
- **Incentivos** - Tax incentives and grants
- **Consultoria** - Consulting services
- **Guias** - Practical guides

Select one or more categories for each post to help organize your content.

## 📝 Post Status

### Draft
- Not visible on the public blog
- Can be edited and published later
- Shows in admin dashboard with draft indicator

### Published
- Visible on the public blog immediately
- Appears in blog list at /blog
- Has its own page at /blog/[slug]

## 🔍 URL Slugs

**What is a slug?**  
The slug is the last part of your post's URL.

**Example**:
- Title: "Como Aceder aos Fundos Europeus"
- Slug: `como-aceder-fundos-europeus`
- URL: `yourdomain.com/blog/como-aceder-fundos-europeus`

**Auto-generation**:
- Slugs are automatically created from titles
- Special characters are removed
- Spaces become dashes
- You can customize before publishing

## 💡 Tips & Best Practices

### Writing Great Posts

1. **Compelling Titles** - Clear, descriptive, SEO-friendly
2. **Strong Excerpts** - 1-2 sentences that hook readers
3. **Use Headers** - Break up long content with H2/H3
4. **Add Images** - Featured image and inline images
5. **Format Text** - Use bold, lists, and quotes for readability
6. **Choose Categories** - Help readers find related content
7. **SEO-friendly Slugs** - Keep them short and descriptive

### Image Best Practices

- **Size**: Use images at least 800px wide
- **Format**: JPG or PNG
- **Sources**: Unsplash, Pexels (free stock photos)
- **Alt text**: Automatically set to post title

### Before Publishing

✅ **Checklist**:
- [ ] Title is clear and compelling
- [ ] Slug is customized (if needed)
- [ ] Excerpt summarizes the post
- [ ] Content is formatted nicely
- [ ] Featured image is set
- [ ] At least one category selected
- [ ] Proofread for typos

## 🔒 Security Notes

### Current Setup
- Simple username/password authentication
- Session stored in cookies (7 days)
- **Default password**: `admin123`

### For Production

⚠️ **Important**: Before deploying to production:

1. **Change Password** - Update in `lib/auth.ts`:
```typescript
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'your-secure-password-here', // Change this!
};
```

2. **Use Environment Variables** (Better):
```bash
# .env.local
ADMIN_USERNAME=your-username
ADMIN_PASSWORD=your-secure-password
```

3. **Or Use Supabase Auth** (Most Secure):
- Implement proper Supabase authentication
- Use Row Level Security (RLS)
- Add email verification

## 🚀 Deploying to Production

### 1. Update Authentication

Change the password in `lib/auth.ts` before deploying.

### 2. Deploy to Vercel

```bash
git add .
git commit -m "Add admin panel"
git push
```

### 3. Access in Production

Your admin will be at:
```
https://yourdomain.com/blog/admin/login
```

## 🐛 Troubleshooting

### Can't Log In
- Check username and password
- Clear browser cookies
- Check browser console for errors

### Post Not Saving
- Ensure title is filled in
- Check Supabase connection
- Verify environment variables
- Check browser console for errors

### Images Not Loading
- Verify image URL is accessible
- Check image URL is valid (ends in .jpg, .png, etc.)
- Try a different image source

### Rich Text Editor Issues
- Refresh the page
- Clear browser cache
- Check browser console for errors

## 📚 Additional Resources

### Free Image Sources
- **Unsplash**: https://unsplash.com
- **Pexels**: https://pexels.com
- **Pixabay**: https://pixabay.com

### HTML/Markdown Help
The editor generates HTML automatically, but you can also:
- Use the visual toolbar (recommended)
- Switch to code view for HTML
- Copy/paste formatted text

## 🎓 Training Video Ideas

To help your team:
1. Screen record a post creation walkthrough
2. Show how to find and add images
3. Demonstrate the publishing workflow
4. Explain categories and their purpose

## 💬 Getting Help

If you encounter issues:
1. Check this guide
2. Review browser console for errors
3. Verify Supabase connection
4. Check environment variables

## 🎉 You're Ready!

Your visual CMS is fully functional. Start creating amazing content!

**Next Steps**:
1. Log in to the admin panel
2. Create your first post
3. Publish and view on the blog
4. Share with your team

---

**Admin URL**: http://localhost:3000/blog/admin/login  
**Credentials**: admin / admin123  
**Remember to change the password before production!** 🔐

