# SendGrid Email Testing Guide

## Overview

The contact form now sends email notifications to `leandrojustino2025@gmail.com` using SendGrid when users submit inquiries.

## Prerequisites

Before testing, ensure you have:

1. ✅ SendGrid account created (free tier available)
2. ✅ SendGrid API key generated
3. ✅ Sender email verified in SendGrid dashboard
4. ✅ Environment variables configured

## Setup Instructions

### Step 1: Create SendGrid Account

1. Visit [sendgrid.com](https://sendgrid.com)
2. Sign up for a free account
3. Verify your email address
4. Complete the onboarding process

**Free Tier Limits:**
- 100 emails/day forever
- No credit card required
- Perfect for testing and small projects

### Step 2: Generate API Key

1. Log in to [SendGrid Dashboard](https://app.sendgrid.com)
2. Navigate to **Settings** → **API Keys**
3. Click **Create API Key**
4. Name it (e.g., "Bizin Website Contact Form")
5. Choose **Restricted Access**
6. Enable **Mail Send** permission only
7. Click **Create & View**
8. **Copy the API key immediately** (you won't see it again!)

### Step 3: Verify Sender Email

SendGrid requires sender verification to prevent spam:

1. In SendGrid Dashboard, go to **Settings** → **Sender Authentication**
2. Click **Verify a Single Sender**
3. Fill in the form:
   - **From Name**: Bizin (or your company name)
   - **From Email Address**: noreply@yourdomain.com (or any email you own)
   - **Reply To**: Same as from email
   - **Company Address**: Your company address
4. Click **Create**
5. Check your email inbox for verification link
6. Click the verification link to complete the process

**Note:** You can use any email address you own (Gmail, Outlook, custom domain, etc.)

### Step 4: Configure Environment Variables

Add to your `.env.local` file:

```bash
# SendGrid Email Configuration
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SENDGRID_FROM_EMAIL=noreply@yourdomain.com  # Must match verified sender
```

**Important:** Make sure `SENDGRID_FROM_EMAIL` exactly matches the email you verified in Step 3.

### Step 5: Restart Development Server

```bash
# Stop the current server (Ctrl+C)
npm run dev
```

## Testing Locally

### Test 1: Submit Contact Form

1. Open your browser to `http://localhost:3000/contactos`
2. Fill in all required fields:
   - **Name**: John Doe
   - **Email**: your-test-email@example.com
   - **Company**: Test Company (optional)
   - **Interest**: Select any option
   - **Message**: This is a test message from the contact form
   - **Consent**: Check the checkbox
3. Click **Send Message**
4. You should see a success message

### Test 2: Check Server Logs

In your terminal, you should see:

```
=== Nova Lead Recebida ===
Nome: John Doe
Email: your-test-email@example.com
...
✅ Email enviado com sucesso via SendGrid
```

### Test 3: Check Email Inbox

1. Check `leandrojustino2025@gmail.com` inbox
2. Look for email with subject: "Nova Mensagem de Contacto - [Interest]"
3. Verify all information is correctly displayed
4. Check that reply-to is set to the submitter's email

**If email doesn't arrive:**
- Check spam/junk folder
- Wait 1-2 minutes (SendGrid can have slight delays)
- Check SendGrid Activity Feed (see Troubleshooting below)

## Verifying SendGrid Activity

1. Go to [SendGrid Dashboard](https://app.sendgrid.com)
2. Click **Activity** in the left sidebar
3. You'll see all sent emails with status:
   - ✅ **Delivered**: Email successfully sent
   - ⚠️ **Processed**: Email queued, not yet delivered
   - ❌ **Bounced**: Email failed (check recipient address)
   - 🚫 **Dropped**: Blocked by SendGrid (usually spam)

## Production Deployment (Vercel)

### Step 1: Add Environment Variables to Vercel

1. Go to your [Vercel Dashboard](https://vercel.com)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add two variables:

**Variable 1:**
- Name: `SENDGRID_API_KEY`
- Value: `SG.your-api-key-here`
- Environment: **Production** (and optionally Preview, Development)
- Click **Save**
- ⚠️ Mark as **Sensitive**

**Variable 2:**
- Name: `SENDGRID_FROM_EMAIL`
- Value: `noreply@yourdomain.com`
- Environment: **Production** (and optionally Preview, Development)
- Click **Save**

### Step 2: Redeploy

1. Go to **Deployments** tab
2. Click the **...** menu on the latest deployment
3. Select **Redeploy**
4. Or push a new commit to trigger automatic deployment

### Step 3: Test Production

1. Visit your production URL: `https://yourdomain.com/contactos`
2. Submit a test form
3. Check email delivery

## Troubleshooting

### Error: "Forbidden"

**Cause:** API key doesn't have correct permissions

**Solution:**
1. Go to SendGrid → Settings → API Keys
2. Delete the old key
3. Create a new one with **Mail Send** permission enabled

### Error: "The from email does not match a verified Sender Identity"

**Cause:** `SENDGRID_FROM_EMAIL` doesn't match verified email

**Solution:**
1. Check the email address in `.env.local`
2. Go to SendGrid → Settings → Sender Authentication
3. Verify it matches exactly (including case)
4. If not verified, click the verification email link again

### Error: "Unauthorized"

**Cause:** Invalid or expired API key

**Solution:**
1. Generate a new API key in SendGrid
2. Update `.env.local` with the new key
3. Restart the dev server

### Email Not Arriving

**Check 1: Spam Folder**
- Check spam/junk folder in Gmail
- Mark as "Not Spam" if found there

**Check 2: SendGrid Activity**
- Go to SendGrid Dashboard → Activity
- Check the delivery status of recent emails
- Look for error messages

**Check 3: Server Logs**
- Check terminal for error messages
- Look for "✅ Email enviado com sucesso" confirmation
- Or "❌ Erro ao enviar email" error

**Check 4: Email Address**
- Confirm recipient email is correct in code
- Default: `leandrojustino2025@gmail.com`

### Warning: "SendGrid não configurado"

**Cause:** Environment variables not set

**Solution:**
1. Check `.env.local` file exists in project root
2. Verify both `SENDGRID_API_KEY` and `SENDGRID_FROM_EMAIL` are set
3. Restart development server: `npm run dev`

## Email Template Features

The email notification includes:

- ✅ Professional HTML template with company branding
- ✅ Clean layout with gradient header
- ✅ All form fields formatted nicely
- ✅ Timestamp in Portugal timezone (Europe/Lisbon)
- ✅ Reply-to automatically set to submitter's email
- ✅ Plain text fallback for email clients that don't support HTML
- ✅ Responsive design for mobile email clients

## Security Best Practices

- ⚠️ **Never commit `.env.local` to Git** (already in `.gitignore`)
- ⚠️ **Never expose API key in frontend code**
- ⚠️ **Use restricted API keys** (only enable Mail Send permission)
- ⚠️ **Mark API key as "Sensitive" in Vercel**
- ✅ **Rotate API keys periodically** (every 3-6 months)
- ✅ **Monitor SendGrid Activity** for unusual sending patterns

## SendGrid Quotas & Limits

### Free Tier:
- 100 emails/day (forever)
- Single Sender Verification only
- Email support

### Paid Tiers (if needed):
- **Essentials**: $19.95/mo - 50,000 emails/month
- **Pro**: $89.95/mo - 100,000 emails/month
- Domain authentication available
- Phone support

**Recommendation:** Start with free tier. Upgrade only if you exceed 100 submissions/day.

## Next Steps

Once email is working:

1. ✅ Test form on staging environment
2. ✅ Test form on production
3. ✅ Add email address to safe senders in Gmail
4. ✅ Monitor SendGrid Activity for first few days
5. ✅ Consider adding Slack/Discord webhook for instant notifications
6. ✅ Set up email forwarding rules if needed

## Support

- SendGrid Documentation: [https://docs.sendgrid.com](https://docs.sendgrid.com)
- SendGrid Support: [https://support.sendgrid.com](https://support.sendgrid.com)
- SendGrid Status: [https://status.sendgrid.com](https://status.sendgrid.com)

## Testing Checklist

Before deploying to production:

- [ ] SendGrid account created
- [ ] API key generated with Mail Send permission
- [ ] Sender email verified
- [ ] Environment variables added to `.env.local`
- [ ] Dev server restarted
- [ ] Test form submission completed
- [ ] Email received at `leandrojustino2025@gmail.com`
- [ ] Reply-to works correctly
- [ ] Email HTML renders correctly
- [ ] Environment variables added to Vercel
- [ ] Production deployment tested
- [ ] Email added to safe senders in Gmail

---

**Ready to test?** Start with Step 1 above and work through each step carefully. Good luck! 🚀

