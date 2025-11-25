import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Can be imported from a shared config
export const locales = ['pt', 'en', 'es', 'fr'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'pt';

export default getRequestConfig(async ({ locale }) => {
  // Ensure we always have a concrete locale string
  const resolvedLocale = locale ?? defaultLocale;

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(resolvedLocale as Locale)) notFound();

  return {
    locale: resolvedLocale,
    messages: (await import(`./messages/${resolvedLocale}.json`)).default
  };
});

