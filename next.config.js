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
    ],
  },
}

module.exports = withNextIntl(nextConfig)

