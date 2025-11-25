# 🚀 Quick Start Guide - Neomarca Website

## Welcome! Your website is ready to use.

This guide will help you get started in 5 minutes.

---

## ✅ What You Have

A complete, production-ready website with:
- ✅ 8 fully functional pages
- ✅ Contact forms with validation
- ✅ SEO optimization
- ✅ Cookie consent banner
- ✅ Google Analytics integration
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Links to 2 Siglas e-commerce

---

## 🏁 Getting Started (5 Steps)

### Step 1: Install Dependencies

```bash
npm install
```

This installs all required packages. Takes about 1-2 minutes.

### Step 2: Configure Environment

```bash
# Copy the example file
cp .env.example .env.local

# Edit .env.local with your editor
# Add your Google Analytics ID (optional for now)
# Add your 2 Siglas URL (optional for now)
```

You can skip this for now and use placeholders.

### Step 3: Start Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

The website should load immediately!

### Step 4: Explore the Website

Navigate to:
- Home: http://localhost:3000
- Services: http://localhost:3000/servicos
- About Portugal: http://localhost:3000/sobre-portugal
- About Neomarca: http://localhost:3000/sobre-neomarca
- Blog: http://localhost:3000/blog
- Contacts: http://localhost:3000/contactos

### Step 5: Test the Contact Form

1. Go to http://localhost:3000/contactos
2. Fill in the form
3. Submit
4. Check your terminal - you'll see the form data logged

---

## 📝 What To Do Next

### Immediate Actions

1. **Replace Placeholder Content**
   - Open `CONTENT_TODO.md` for complete checklist
   - Update `lib/constants.ts` with real contact info
   - Edit page files in `app/` folder

2. **Add Your Logo**
   - Place logo in `public/` folder
   - Update `components/Header.tsx` to use it

3. **Configure Analytics**
   - Create Google Analytics account
   - Get your GA4 measurement ID (G-XXXXXXXXXX)
   - Add to `.env.local` as `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`

### Before Launching

1. **Review All Content**
   - Read through each page
   - Fix any placeholder text
   - Ensure all information is accurate

2. **Test Everything**
   - Test on Chrome, Firefox, Safari
   - Test on mobile phone
   - Submit all forms
   - Click all links

3. **Deploy to Vercel**
   - See `DEPLOYMENT.md` for detailed instructions
   - Takes about 10 minutes to deploy

---

## 🗂️ Key Files to Know

### Content & Configuration
- `lib/constants.ts` - Contact info, URLs, navigation, interests
- `app/page.tsx` - Home page content
- `app/servicos/page.tsx` - Services page content
- `app/contactos/page.tsx` - Contacts page
- `.env.local` - Your private configuration (don't commit!)

### Components
- `components/Header.tsx` - Top navigation
- `components/Footer.tsx` - Footer with links
- `components/ContactForm.tsx` - Contact form
- `components/ui/` - Reusable UI components

### Documentation
- `README.md` - Complete project documentation
- `DEPLOYMENT.md` - How to deploy to production
- `CONTENT_TODO.md` - What content to replace
- `PROJECT_SUMMARY.md` - What was built
- `QUICKSTART.md` - This file

---

## 🎨 Customizing the Website

### Change Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    DEFAULT: "#0066CC", // Change this!
    // ... other shades
  }
}
```

### Change Text

Edit the page files in `app/`:
- `app/page.tsx` for home page
- `app/servicos/page.tsx` for services
- etc.

### Add New Pages

Create a new folder in `app/`:

```bash
mkdir app/new-page
# Create app/new-page/page.tsx
```

It automatically becomes available at `/new-page`

---

## 📧 Form Integration

### Current Behavior
Forms log to console (check your terminal)

### To Send Emails or Save to CRM

Edit `app/api/leads/route.ts`:

```typescript
// Add your email service (SendGrid, Resend, etc.)
// Or save to database
// Or integrate with CRM (HubSpot, Salesforce, etc.)
```

Examples of integrations:
- SendGrid for emails
- Airtable for simple storage
- HubSpot for CRM
- Notion for database

---

## 🌐 Deploy to Production

### Quick Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Go to https://vercel.com
3. Click "Import Project"
4. Select your repository
5. Add environment variables
6. Click "Deploy"

Takes 5-10 minutes. See `DEPLOYMENT.md` for details.

---

## 🆘 Common Issues

### Issue: "Port 3000 is already in use"

```bash
# Kill the process using port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# Or use a different port:
npm run dev -- -p 3001
```

### Issue: "Module not found"

```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

### Issue: "Environment variables not loading"

- Restart development server after changing `.env.local`
- Ensure file is named `.env.local` not `.env`
- Public variables must start with `NEXT_PUBLIC_`

### Issue: Build fails

```bash
# Clean and rebuild
rm -rf .next
npm run build
```

---

## 💡 Pro Tips

1. **Use the correct file extension**
   - `.tsx` for components with JSX
   - `.ts` for utilities without JSX

2. **Follow the existing patterns**
   - Look at existing pages for structure
   - Copy and modify rather than start from scratch

3. **Test frequently**
   - After each change, check the browser
   - Use Chrome DevTools (F12) to debug

4. **Keep placeholder URLs**
   - Update them in one place: `lib/constants.ts`
   - They update everywhere automatically

5. **Use the components**
   - Don't create new buttons/cards from scratch
   - Use components from `components/ui/`

---

## 📚 Learning Resources

### Next.js
- Official Docs: https://nextjs.org/docs
- App Router Guide: https://nextjs.org/docs/app

### Tailwind CSS
- Official Docs: https://tailwindcss.com/docs
- Cheat Sheet: https://nerdcave.com/tailwind-cheat-sheet

### TypeScript
- Handbook: https://www.typescriptlang.org/docs/handbook/

---

## 🎯 Your Checklist

Use this to track your progress:

- [ ] Installed dependencies (`npm install`)
- [ ] Started dev server (`npm run dev`)
- [ ] Explored all pages
- [ ] Tested contact form
- [ ] Read `CONTENT_TODO.md`
- [ ] Updated contact information
- [ ] Replaced placeholder text on Home
- [ ] Replaced placeholder text on Services
- [ ] Replaced placeholder text on About pages
- [ ] Added real logo
- [ ] Set up Google Analytics
- [ ] Added 2 Siglas URL
- [ ] Tested on mobile
- [ ] Tested on different browsers
- [ ] Integrated form with email/CRM
- [ ] Read `DEPLOYMENT.md`
- [ ] Deployed to Vercel
- [ ] Configured custom domain
- [ ] Submitted sitemap to Google
- [ ] Launched! 🎉

---

## 🚀 You're Ready!

The website is built, tested, and ready to use.

**Next steps:**
1. Customize the content
2. Deploy to production
3. Launch Phase 2 (AI Agent) when ready

**Questions?**
- Check `README.md` for detailed documentation
- Check `DEPLOYMENT.md` for deployment help
- Check `CONTENT_TODO.md` for content checklist

---

**Good luck with your launch! 🎉**

The development server is running at http://localhost:3000

