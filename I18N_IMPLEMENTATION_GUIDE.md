# 🌍 i18n Implementation Guide - Next-Intl

Your website now has **internationalization (i18n) infrastructure** ready! This allows you to support multiple languages: **Portuguese, English, Spanish, and French**.

## ✅ What's Already Set Up

### 1. **Dependencies Installed**
- ✅ `next-intl` - Modern i18n library for Next.js App Router

### 2. **Configuration Files**
- ✅ `i18n.ts` - Main i18n configuration
- ✅ `middleware.ts` - Automatic locale detection and routing
- ✅ `next.config.js` - Updated to use next-intl plugin

### 3. **Translation Files Created**
- ✅ `messages/pt.json` - Portuguese (default)
- ✅ `messages/en.json` - English
- ✅ `messages/es.json` - Spanish  
- ✅ `messages/fr.json` - French

### 4. **Components**
- ✅ `components/LanguageSwitcher.tsx` - Language selector dropdown

---

## 🔄 Current Status

**The infrastructure is ready, but the full implementation requires restructuring your app directory.**

### Why Not Fully Implemented?

To avoid breaking your entire site, I've set up the framework but haven't migrated all pages yet. This gives you two options:

**Option A: Gradual Migration** (Recommended)
- Keep current structure
- Add translations page by page
- Test each page before moving to the next

**Option B: Full Migration**
- Restructure entire `app/` directory to `app/[locale]/`
- All pages get i18n at once
- Requires thorough testing

---

## 📋 Option A: Gradual Migration (Step-by-Step)

### Step 1: Add Language Switcher to Header

Update `components/Header.tsx`:

```typescript
import { LanguageSwitcher } from './LanguageSwitcher';

// In your navigation, add:
<LanguageSwitcher />
```

### Step 2: Update a Single Page (Example: Home Page)

**Current structure:**
```
app/
  ├── page.tsx
  ├── layout.tsx
  └── ...
```

**New structure for i18n:**
```
app/
  ├── [locale]/
  │   ├── page.tsx (migrated home page)
  │   └── layout.tsx
  └── ... (other pages stay as-is)
```

### Step 3: Use Translations in Components

Instead of hardcoded text:
```tsx
<h1>Portugal. O Seu Próximo Destino</h1>
```

Use translations:
```tsx
import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('hero');
  
  return <h1>{t('title')} {t('subtitle')}</h1>;
}
```

---

## 🚀 Option B: Full Migration (Complete Restructuring)

### Required Changes:

1. **Move all app routes into `[locale]` folder:**

```bash
app/
  ├── [locale]/
  │   ├── page.tsx
  │   ├── layout.tsx
  │   ├── servicos/
  │   │   └── page.tsx
  │   ├── sobre-portugal/
  │   │   └── page.tsx
  │   ├── sobre-neomarca/
  │   │   └── page.tsx
  │   ├── blog/
  │   │   └── page.tsx
  │   ├── contactos/
  │   │   └── page.tsx
  │   └── ...
  └── api/ (stays outside [locale])
```

2. **Update Root Layout** (`app/[locale]/layout.tsx`):

```typescript
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

3. **Update All Links:**

Change from:
```tsx
<Link href="/servicos">Serviços</Link>
```

To:
```tsx
import { useLocale } from 'next-intl';

const locale = useLocale();
<Link href={`/${locale}/servicos`}>Serviços</Link>
```

Or use the next-intl Link component:
```tsx
import { Link } from '@/i18n/routing';

<Link href="/servicos">Serviços</Link>
```

---

## 📦 Translation Keys Structure

All translations are organized in JSON files:

```json
{
  "hero": {
    "title": "Portugal.",
    "subtitle": "Your subtitle here"
  },
  "nav": {
    "services": "Services",
    "contact": "Contact"
  }
}
```

### Available Translation Namespaces:

- `common` - Shared UI elements
- `nav` - Navigation labels
- `hero` - Hero section
- `whyBizin` - Why section
- `success` - Success metrics
- `cta` - Call-to-action sections
- `articles` - Blog/articles section
- `faq` - Frequently asked questions
- `contactPreview` - Contact preview
- `footer` - Footer content

---

## 🎨 Usage Examples

### In Server Components:

```typescript
import { getTranslations } from 'next-intl/server';

export default async function Page() {
  const t = await getTranslations('hero');
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}
```

### In Client Components:

```typescript
'use client';

import { useTranslations } from 'next-intl';

export function HeroComponent() {
  const t = useTranslations('hero');
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <button>{t('ctaInvest')}</button>
    </div>
  );
}
```

---

## 🌐 URL Structure

With i18n properly set up, your URLs will be:

- **Portuguese (default):** `yourdomain.com/servicos`
- **English:** `yourdomain.com/en/servicos` or `/en/services`
- **Spanish:** `yourdomain.com/es/servicios`
- **French:** `yourdomain.com/fr/services`

---

## 🔧 Adding New Translations

1. Open `messages/pt.json` (or any language)
2. Add your key:
```json
{
  "mySection": {
    "newKey": "New text content"
  }
}
```
3. Repeat for all language files
4. Use in component: `t('mySection.newKey')`

---

## 📝 Best Practices

1. **Keep keys organized** - Use nested objects for related content
2. **Use descriptive names** - `hero.title` not `h1Text`
3. **Maintain consistency** - Same structure across all language files
4. **Test all languages** - Switch languages to verify translations
5. **Use TypeScript** - Get autocomplete for translation keys

---

## 🚨 Common Issues & Solutions

### Issue: "Messages are not defined"
**Solution:** Ensure you're wrapping components with `NextIntlClientProvider`

### Issue: Links don't preserve locale
**Solution:** Use `useLocale()` hook or next-intl's Link component

### Issue: Translation key not found
**Solution:** Check JSON syntax and ensure key exists in all language files

---

## 🎯 Recommended Next Steps

1. **Add Language Switcher to Header** (5 minutes)
   - Import and add `<LanguageSwitcher />` component

2. **Test Current Setup** (10 minutes)
   - Visit `/en`, `/es`, `/fr` URLs
   - Verify middleware is working

3. **Migrate Home Page** (30 minutes)
   - Move `app/page.tsx` to `app/[locale]/page.tsx`
   - Replace hardcoded text with `t()` calls

4. **Migrate Other Pages** (1-2 hours each)
   - One page at a time
   - Test thoroughly

5. **Update Navigation** (20 minutes)
   - Update all `<Link>` components
   - Add locale awareness

---

## 💡 Need Help?

The infrastructure is ready! You can either:

1. **Ask me to do the full migration** - I'll restructure everything
2. **Migrate gradually** - I can help with one page at a time
3. **Get specific examples** - Ask for specific component conversions

---

## 📚 Resources

- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Next.js i18n Routing](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
- Translation files: `messages/*.json`
- Config: `i18n.ts`
- Middleware: `middleware.ts`

---

**Your site is now i18n-ready! 🎉**

Choose your migration strategy and let me know how you'd like to proceed!

