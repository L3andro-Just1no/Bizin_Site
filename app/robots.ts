import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/blog/admin', '/api/'],
      },
    ],
    sitemap: 'https://bizin.pt/sitemap.xml',
  };
}
