'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export function ImageUploader({ value, onChange, label = 'Featured Image' }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [activeTab, setActiveTab] = useState<'url' | 'upload'>('url');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image size must be less than 5MB');
      return;
    }

    setUploading(true);
    setUploadError('');

    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `blog-images/${fileName}`;

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('public-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        // If bucket doesn't exist, show a helpful message
        if (error.message.includes('not found')) {
          setUploadError('Storage bucket not configured. Using URL option instead.');
          setActiveTab('url');
          return;
        }
        throw error;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('public-images')
        .getPublicUrl(filePath);

      onChange(publicUrl);
      setUploadError('');
    } catch (error: any) {
      console.error('Upload error:', error);
      setUploadError(error.message || 'Failed to upload image');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">{label}</h3>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`px-3 py-1 text-sm rounded-lg transition-colors ${
              activeTab === 'url'
                ? 'bg-[#87c76c] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            URL
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`px-3 py-1 text-sm rounded-lg transition-colors ${
              activeTab === 'upload'
                ? 'bg-[#87c76c] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Upload
          </button>
        </div>
      </div>

      {activeTab === 'url' ? (
        <div>
          <Input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
          <p className="text-sm text-gray-500 mt-2">
            Enter the URL of an image from Unsplash or another source
          </p>
        </div>
      ) : (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload">
            <Button
              type="button"
              variant="secondary"
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
              className="w-full"
            >
              {uploading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  Choose Image to Upload
                </>
              )}
            </Button>
          </label>
          {uploadError && (
            <p className="text-sm text-red-600 mt-2">{uploadError}</p>
          )}
          <p className="text-sm text-gray-500 mt-2">
            Max file size: 5MB. Supported: JPG, PNG, GIF, WebP
          </p>
        </div>
      )}

      {/* Preview */}
      {value && (
        <div className="mt-4 relative w-full h-40 rounded-lg overflow-hidden border-2 border-gray-200">
          <Image
            src={value}
            alt="Preview"
            fill
            className="object-cover"
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Invalid+URL';
            }}
          />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg z-10"
            title="Remove image"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

