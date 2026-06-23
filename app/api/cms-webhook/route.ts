import { revalidatePath, revalidateTag } from "next/cache";

import { CMS_BLOG_TAG } from "@/lib/cms/config";
import type { CmsWebhookPayload } from "@/lib/cms/types";
import { verifyCmsWebhookRequest } from "@/lib/cms/verify-webhook";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function revalidateBlog(slug?: string): void {
  revalidateTag(CMS_BLOG_TAG);
  revalidatePath("/blog");
  revalidatePath("/");
  revalidatePath("/sitemap.xml");

  if (slug) {
    revalidatePath(`/blog/${slug}`);
  }
}

export async function GET() {
  return Response.json({ error: "Method not allowed" }, { status: 405 });
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  const verification = verifyCmsWebhookRequest(request.headers, rawBody);

  if (!verification.ok) {
    if (verification.reason === "CMS_WEBHOOK_SECRET is not configured") {
      return Response.json({ error: verification.reason }, { status: 500 });
    }
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let payload: CmsWebhookPayload;
  try {
    payload = JSON.parse(rawBody) as CmsWebhookPayload;
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const slug = payload.post?.slug ?? payload.slug;
  revalidateBlog(slug);

  return Response.json(
    {
      ok: true,
      event: payload.event,
      slug: slug ?? null,
      revalidated: ["/blog", "/", slug ? `/blog/${slug}` : null].filter(Boolean),
    },
    { status: 200 },
  );
}
