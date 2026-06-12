# Stripe Checkout Setup - Complete ✅

## What Was Implemented

### 1. Stripe Integration
- ✅ Installed `stripe` npm package
- ✅ Created `lib/stripe.ts` helper for server-side Stripe initialization
- ✅ Updated `app/api/stripe/checkout/route.ts` to use Stripe SDK

### 2. Homepage Updates
- ✅ Updated `components/HomePageContent.tsx`:
  - Added `handleCheckout()` function to call Stripe API
  - Updated both product cards to trigger Stripe Checkout
  - Removed "free consulting" badge from both cards
  - Changed buttons from direct booking links to payment flow

### 3. Translation Updates
- ✅ Removed `freeConsultingBadge` key from all locales
- ✅ Removed "free" wording from product descriptions in:
  - `messages/pt.json` (Portuguese)
  - `messages/en.json` (English)
  - `messages/es.json` (Spanish)
  - `messages/fr.json` (French)
- ✅ Updated button text to "Comprar e Agendar" / "Purchase and Book"

### 4. Environment Configuration
- ✅ Added Stripe configuration to `.env.local` with placeholders

## Next Steps - Action Required ⚠️

You need to configure the following environment variables in `.env.local`:

### 1. Get Your Stripe Secret Key
1. Go to [Stripe Dashboard → API Keys](https://dashboard.stripe.com/apikeys)
2. Copy your **Live mode** Secret Key (starts with `sk_live_`)
3. Replace `sk_live_YOUR_SECRET_KEY_HERE` in `.env.local`

### 2. Create Products and Prices in Stripe
1. Go to [Stripe Dashboard → Products](https://dashboard.stripe.com/products)
2. Create two products:
   - **Investment Consulting** with your desired price
   - **Training Consulting** with your desired price
3. For each product, create a **one-time payment** price
4. Copy the **Price IDs** (starts with `price_`)
5. Update `.env.local`:
   - `STRIPE_PRICE_INVESTMENT=price_xxxxx`
   - `STRIPE_PRICE_TRAINING=price_xxxxx`

### 3. Verify Site URL
- Ensure `NEXT_PUBLIC_SITE_URL=https://bizin.pt` is correct
- This is used for cancel redirects

### 4. Deploy Environment Variables
Don't forget to add these same environment variables to your hosting provider (Vercel, etc.)!

## How It Works

1. User clicks "Comprar e Agendar" button on homepage
2. Frontend calls `/api/stripe/checkout` with product type
3. API creates Stripe Checkout Session
4. User is redirected to Stripe's hosted checkout page
5. After successful payment:
   - User is redirected to the Outlook booking link (Investment or Training)
6. If user cancels:
   - User returns to homepage products section (`/#booking-section`)

## Testing

### Test in Development
You can temporarily use Stripe's **Test Mode** for testing:
1. Use test mode API keys (`sk_test_...`)
2. Create test products with test Price IDs
3. Use [Stripe Test Cards](https://stripe.com/docs/testing) for payments
4. Card number: `4242 4242 4242 4242` (any future expiry, any CVC)

### Production Testing
When ready for live mode, switch to live mode keys and carefully test with small real payments.

## Troubleshooting

### Error: "Stripe not configured"
- Make sure `STRIPE_SECRET_KEY` is set in `.env.local`
- Restart your dev server after updating `.env.local`

### Error: "Missing STRIPE_PRICE_INVESTMENT"
- Ensure both price IDs are set in `.env.local`
- Verify the Price IDs start with `price_`

### Checkout redirects to wrong URL
- Verify `NEXT_PUBLIC_SITE_URL` is set correctly
- Check that booking URLs in `lib/constants.ts` are correct

## Optional: Display Prices on Cards

The plan included an optional feature to fetch and display Stripe prices on the product cards. This would require:

1. Updating `app/page.tsx` to fetch prices server-side
2. Passing price data to `HomePageContent` component
3. Displaying formatted prices on each card

This can be implemented later if needed.

## Questions?

If you encounter any issues, check:
- Stripe Dashboard logs
- Browser console for frontend errors
- Server logs for API errors
