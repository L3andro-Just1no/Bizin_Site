# Supabase Storage Setup for Image Uploads

## Quick Setup (2 minutes)

Your admin panel now has **image upload** functionality! But first, you need to create a storage bucket in Supabase.

### Step 1: Create Storage Bucket

1. Go to your **Supabase Dashboard**
2. Click **Storage** in the left sidebar
3. Click **"Create a new bucket"**
4. Fill in:
   - **Name**: `public-images`
   - **Public bucket**: ✅ Check this box (important!)
   - **File size limit**: Leave default or set to 5MB
5. Click **"Create bucket"**

### Step 2: Set Bucket Policies

1. Click on your `public-images` bucket
2. Go to **Policies** tab
3. Click **"New Policy"**
4. Select **"For full customization"**
5. Create this policy:

**Policy Name**: `Allow public uploads`

**Target roles**: `authenticated` and `anon`

**SQL Policy**:
```sql
CREATE POLICY "Allow public uploads"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'public-images');
```

6. Create another policy for public reads:

**Policy Name**: `Allow public reads`

```sql
CREATE POLICY "Allow public reads"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'public-images');
```

### Alternative: Quick SQL Setup

Or run this in **SQL Editor**:

```sql
-- Create bucket (if not exists via UI)
INSERT INTO storage.buckets (id, name, public)
VALUES ('public-images', 'public-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public uploads
CREATE POLICY "Allow public uploads"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'public-images');

-- Allow public reads
CREATE POLICY "Allow public reads"  
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'public-images');

-- Allow authenticated users to delete their uploads
CREATE POLICY "Allow authenticated deletes"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'public-images');
```

## ✅ You're Done!

Now when creating/editing blog posts, you'll see:

### Featured Image Options

**URL Tab**: 
- Paste any image URL (Unsplash, etc.)
- Works like before

**Upload Tab**: 
- Click "Choose Image to Upload"
- Select image from your computer
- Auto-uploads to Supabase Storage
- Image URL is automatically filled

## Features

✅ Direct file upload  
✅ Max 5MB per image  
✅ Supports: JPG, PNG, GIF, WebP  
✅ Images stored in your Supabase project  
✅ Automatic URL generation  
✅ Preview before saving  
✅ Remove/replace images easily  

## Using the Image Uploader

1. Go to `/blog/admin/editor`
2. In the **Featured Image** section, you'll see two tabs:
   - **URL**: Paste image link
   - **Upload**: Upload from computer
3. Switch between tabs as needed
4. Preview shows instantly
5. Click X button to remove image

## Storage Limits

### Free Tier (Supabase)
- **Storage**: 1GB
- **Bandwidth**: 2GB/month
- **File uploads**: Unlimited

This is plenty for most blogs!

## Troubleshooting

### "Storage bucket not configured" Error

**Solution**: Create the `public-images` bucket in Supabase Storage (see Step 1 above)

### Upload Fails

**Check:**
1. Bucket exists and is named exactly `public-images`
2. Bucket is set to **Public**
3. Storage policies are configured
4. File is under 5MB
5. File is an image format

### Images Don't Load

**Check:**
1. Bucket is marked as **Public**
2. RLS policies allow public SELECT
3. Image URL is correct

## Advanced: Custom Upload Directory

To organize images by date, modify the upload path in `components/admin/ImageUploader.tsx`:

```typescript
// Change this line:
const filePath = `blog-images/${fileName}`;

// To organize by date:
const date = new Date();
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0');
const filePath = `blog-images/${year}/${month}/${fileName}`;
```

## Next Steps

1. Create the storage bucket (2 minutes)
2. Try uploading an image in the editor
3. Create awesome blog posts! 🎉

---

**Storage Status**: Bucket needs to be created in Supabase Dashboard  
**Fallback**: URL input still works if storage isn't configured

