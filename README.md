# Bizin Portugal

A modern, multilingual website for Bizin Portugal - providing investment consulting, business incentives, and professional training services in Portugal.

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Storage:** Supabase Storage
- **Authentication:** JWT with HTTP-only cookies
- **Internationalization:** next-intl (PT, EN, ES, FR)
- **Email:** SendGrid
- **Analytics:** Google Analytics 4
- **AI Assistant:** Bizin Agent Widget

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- SendGrid account (for contact forms)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Bizin_Site
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Admin Authentication
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password
JWT_SECRET=your_jwt_secret

# SendGrid
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=noreply@bizinportugal.com

# Google Analytics (optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

4. Set up the database:
```bash
# Run the SQL scripts in your Supabase SQL Editor:
# 1. supabase/schema.sql
# 2. supabase/storage-setup.sql
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## Key Features

### Public Features
- **Multilingual Support:** Portuguese, English, Spanish, French
- **Services Pages:** Investment consulting, incentives, training
- **Blog/CMS:** Dynamic blog with categories and rich text editor
- **Contact Forms:** Lead capture with SendGrid integration
- **AI Assistant:** Interactive chat widget for visitor support
- **SEO Optimized:** Dynamic sitemaps, robots.txt, meta tags
- **Cookie Compliance:** GDPR-compliant cookie banner
- **Responsive Design:** Mobile-first, modern UI

### Admin Features
- **Blog Management:** Create, edit, delete posts
- **Rich Text Editor:** Full WYSIWYG editor with image uploads
- **Image Management:** Supabase Storage integration
- **Category Management:** Organize content by categories
- **Protected Routes:** JWT-based authentication

## Project Structure

```
Bizin_Site/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes (admin, leads)
│   ├── blog/              # Blog pages (public + admin)
│   ├── [locale]/          # Localized routes
│   └── ...                # Other pages
├── components/            # React components
│   ├── admin/            # Admin-specific components
│   ├── ui/               # Reusable UI components
│   └── ...               # Page components
├── lib/                   # Utilities and configurations
│   ├── supabase/         # Supabase client and queries
│   ├── utils/            # Helper functions
│   ├── auth.ts           # Authentication logic
│   ├── analytics.ts      # Google Analytics
│   └── constants.ts      # App constants
├── messages/              # i18n translation files
│   ├── pt.json
│   ├── en.json
│   ├── es.json
│   └── fr.json
├── public/                # Static assets
├── supabase/              # Database schemas
└── middleware.ts          # Route protection & i18n

```

## Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm start            # Start production server

# Linting
npm run lint         # Run ESLint
```

## Admin Panel

Access the admin panel at `/blog/admin/login`

Default features:
- Create and edit blog posts
- Upload and manage images
- Organize content with categories
- Rich text editing with TipTap editor

## Deployment

The site is configured for deployment on Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

**Important:** Ensure all environment variables are set in your deployment platform.

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Yes |
| `ADMIN_USERNAME` | Admin panel username | Yes |
| `ADMIN_PASSWORD` | Admin panel password | Yes |
| `JWT_SECRET` | Secret for JWT token generation | Yes |
| `SENDGRID_API_KEY` | SendGrid API key | Yes |
| `SENDGRID_FROM_EMAIL` | Sender email address | Yes |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics ID | No |

## Support

For questions or support, contact the development team.

---

**© 2024 Bizin Portugal. All rights reserved.**
