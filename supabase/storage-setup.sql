-- Complete Storage Setup for Image Uploads
-- Run this AFTER creating the bucket manually, or use this to verify

-- Step 1: Create the bucket (this might fail if it already exists - that's OK!)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'public-images',
  'public-images', 
  true,  -- Public bucket
  5242880,  -- 5MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880;

-- Step 2: Remove any existing policies (cleanup)
DROP POLICY IF EXISTS "Allow public uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public reads" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated deletes" ON storage.objects;

-- Step 3: Create new policies
CREATE POLICY "Allow public uploads"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'public-images');

CREATE POLICY "Allow public reads"  
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'public-images');

CREATE POLICY "Allow authenticated deletes"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'public-images');

-- Verify setup
SELECT 
  'Bucket created: ' || name as status,
  'Public: ' || public as access,
  'Size limit: ' || (file_size_limit / 1024 / 1024) || 'MB' as limit
FROM storage.buckets 
WHERE id = 'public-images';

