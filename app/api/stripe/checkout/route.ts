import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { EXTERNAL_URLS, SITE_CONFIG } from "@/lib/constants";

type ProductKey = "investment" | "training";

function getBaseUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");

  // Vercel provides VERCEL_URL without protocol
  const vercelUrl = process.env.VERCEL_URL?.trim();
  if (vercelUrl) return `https://${vercelUrl}`;

  return SITE_CONFIG.url;
}

export async function POST(req: NextRequest) {
  try {
    const { product } = (await req.json()) as { product?: ProductKey };

    if (!product || (product !== "investment" && product !== "training")) {
      return NextResponse.json({ error: "Invalid product" }, { status: 400 });
    }

    const priceId =
      product === "investment"
        ? process.env.STRIPE_PRICE_INVESTMENT
        : process.env.STRIPE_PRICE_TRAINING;

    if (!priceId) {
      return NextResponse.json(
        {
          error:
            product === "investment"
              ? "Missing STRIPE_PRICE_INVESTMENT"
              : "Missing STRIPE_PRICE_TRAINING",
        },
        { status: 500 }
      );
    }

    const baseUrl = getBaseUrl();
    const cancelUrl = `${baseUrl}/#booking-section`;

    // After payment, redirect directly to the corresponding booking link
    const successUrl =
      product === "investment"
        ? EXTERNAL_URLS.bookingInvestment
        : EXTERNAL_URLS.bookingTraining;

    // Create Stripe Checkout Session using the Stripe SDK
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      allow_promotion_codes: true, // Allow customers to enter promo codes
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
