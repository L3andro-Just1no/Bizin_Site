# Environment Variables Setup

## Supabase CMS Integration

After creating your Supabase project, create a `.env.local` file in the root of your project with the following variables:

```bash
# Supabase Configuration
# Get these from your Supabase project settings (Settings → API)

# Your Supabase project URL
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co

# Supabase anon/public key (safe to use in frontend)
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your-anon-key...

# Supabase service role key (keep secret! server-side only)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...your-service-role-key...
```

## Configuration Steps

1. Create `.env.local` file in the project root:
```bash
# Windows
type nul > .env.local

# Mac/Linux
touch .env.local
```

2. Add your Supabase credentials (get from Supabase dashboard → Settings → API):
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

3. Restart the Next.js development server:
```bash
npm run dev
```

## Testing the Configuration

You can test if Supabase is connected by:

1. Visit `http://localhost:3000/blog`
2. Check browser console for any Supabase errors
3. If no errors, connection is working!

Or test in code:
```typescript
import { checkSupabaseConnection } from '@/lib/supabase/blog';
const isConnected = await checkSupabaseConnection();
console.log('Supabase connected:', isConnected);
```

## Production Environment (Vercel)

For production deployment on Vercel:

1. Go to your Vercel project → Settings → Environment Variables
2. Add the same three variables:
   - `NEXT_PUBLIC_SUPABASE_URL` → Production
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` → Production
   - `SUPABASE_SERVICE_ROLE_KEY` → Production (mark as "Sensitive")

3. Redeploy your site

### Example Production URLs:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
```

## Security Notes

- ✅ **NEXT_PUBLIC_SUPABASE_URL**: Safe to expose (it's public)
- ✅ **NEXT_PUBLIC_SUPABASE_ANON_KEY**: Safe to expose (it's for public read-only access)
- ⚠️ **SUPABASE_SERVICE_ROLE_KEY**: Keep this secret! Never commit to git or expose in frontend

## SendGrid Email Integration

The contact form uses SendGrid to send email notifications when users submit inquiries.

### Getting Started with SendGrid

1. **Sign up for SendGrid** (free tier includes 100 emails/day):
   - Visit [sendgrid.com](https://sendgrid.com)
   - Create a free account

2. **Create an API Key**:
   - Log in to SendGrid dashboard
   - Go to Settings → API Keys
   - Click "Create API Key"
   - Choose "Restricted Access" and enable "Mail Send" permission
   - Copy the API key (you won't be able to see it again!)

3. **Verify Sender Email**:
   - Go to Settings → Sender Authentication
   - Click "Verify a Single Sender"
   - Add and verify an email address (this will be the "from" address)
   - Check your email for verification link

### Configuration

Add these variables to your `.env.local` file:

```bash
# SendGrid Configuration
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SENDGRID_FROM_EMAIL=noreply@yourdomain.com  # Must be verified in SendGrid
```

### Testing

1. Add the SendGrid variables to `.env.local`
2. Restart the development server:
   ```bash
   npm run dev
   ```
3. Go to `http://localhost:3000/contactos`
4. Submit the contact form
5. Check the inbox at the configured recipient email

### Production Setup (Vercel)

1. Go to Vercel project → Settings → Environment Variables
2. Add these variables:
   - `SENDGRID_API_KEY` → Production (mark as "Sensitive")
   - `SENDGRID_FROM_EMAIL` → Production
3. Redeploy your site

### Security Notes

- ⚠️ **SENDGRID_API_KEY**: Keep this secret! Never commit to git or expose in frontend
- ✅ **SENDGRID_FROM_EMAIL**: Can be public, but must be verified in SendGrid dashboard

### Troubleshooting

**Error: "Forbidden"**
- Make sure your API key has "Mail Send" permission enabled
- Verify the API key is correctly copied

**Error: "The from email does not match a verified Sender Identity"**
- Go to SendGrid dashboard → Settings → Sender Authentication
- Verify the email address you're using in `SENDGRID_FROM_EMAIL`

**Emails not arriving**
- Check your spam/junk folder
- Check SendGrid dashboard → Activity for delivery status
- Verify recipient email is correct in the code

## Quick Start

See `SUPABASE_QUICK_START.md` for a 5-minute setup guide!

