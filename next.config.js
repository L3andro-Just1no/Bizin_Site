const withNextIntl = require('next-intl/plugin')(
  // This is the path to your i18n config
  './i18n.ts'
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.figma.com',
        port: '',
        pathname: '/api/mcp/asset/**',
      },
      // Supabase Storage for uploaded images
      {
        protocol: 'https',
        hostname: 'vqcapoyfpoakgibkaqnf.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      // Placeholder images
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = withNextIntl(nextConfig)

