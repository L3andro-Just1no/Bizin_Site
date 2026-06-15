import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const disabled = NextResponse.json(
  { error: "Blog admin is disabled. Content is managed via the external CMS." },
  { status: 410 },
);

export async function POST() {
  return disabled;
}
