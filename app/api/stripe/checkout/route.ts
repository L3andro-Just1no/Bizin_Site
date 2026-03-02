import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { EXTERNAL_URLS, SITE_CONFIG } from "@/lib/constants";

type ProductKey = "investment" | "training" | "aiDiagnostic";

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

    if (!product || !["investment", "training", "aiDiagnostic"].includes(product)) {
      return NextResponse.json({ error: "Invalid product" }, { status: 400 });
    }

    const priceIdMap: Record<ProductKey, string | undefined> = {
      investment: process.env.STRIPE_PRICE_INVESTMENT,
      training: process.env.STRIPE_PRICE_TRAINING,
      aiDiagnostic: process.env.STRIPE_PRICE_BRIEFING,
    };
    const priceId = priceIdMap[product];

    if (!priceId) {
      return NextResponse.json(
        { error: `Missing Stripe price ID for product: ${product}` },
        { status: 500 }
      );
    }

    const baseUrl = getBaseUrl();
    const cancelUrl = `${baseUrl}/#booking-section`;

    const successUrlMap: Record<ProductKey, string> = {
      investment: EXTERNAL_URLS.bookingInvestment,
      training: EXTERNAL_URLS.bookingTraining,
      aiDiagnostic: EXTERNAL_URLS.bookingAiDiagnostic || cancelUrl,
    };
    const successUrl = successUrlMap[product];

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
