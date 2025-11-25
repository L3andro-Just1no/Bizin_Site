"use client";

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { locales, type Locale } from '@/i18n';

const languages = {
  pt: { name: 'Português', flag: '🇵🇹' },
  en: { name: 'English', flag: '🇬🇧' },
  es: { name: 'Español', flag: '🇪🇸' },
  fr: { name: 'Français', flag: '🇫🇷' },
};

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: Locale) => {
    if (newLocale === locale) return;
    
    // Remove current locale from pathname if present
    const segments = pathname.split('/').filter(Boolean);
    const isLocaleInPath = locales.includes(segments[0] as Locale);
    const pathWithoutLocale = isLocaleInPath 
      ? '/' + segments.slice(1).join('/')
      : pathname;
    
    // Add new locale to path
    const newPath = newLocale === 'pt' 
      ? pathWithoutLocale
      : `/${newLocale}${pathWithoutLocale}`;
    
    router.push(newPath);
    router.refresh();
  };

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
        <span className="text-xl">{languages[locale].flag}</span>
        <span className="text-sm font-medium hidden sm:inline">{languages[locale].name}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
        {locales.map((loc) => (
          <button
            key={loc}
            onClick={() => handleLocaleChange(loc)}
            className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
              locale === loc ? 'bg-gray-50 font-semibold' : ''
            }`}
          >
            <span className="text-xl">{languages[loc].flag}</span>
            <span className="text-sm">{languages[loc].name}</span>
            {locale === loc && (
              <svg className="w-4 h-4 ml-auto text-[#87c76c]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

