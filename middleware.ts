import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

// TEMPORARILY DISABLED - Enable when app structure is migrated to [locale]
// Uncomment the export below and comment out the empty export to activate i18n

// export default createMiddleware({
//   locales,
//   defaultLocale,
//   localePrefix: 'as-needed'
// });

// Temporary passthrough middleware (does nothing)
export default function middleware() {
  return;
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};

