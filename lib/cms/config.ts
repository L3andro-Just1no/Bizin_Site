export const CMS_BLOG_TAG = "cms-blog";

/** Witflow CMS production host for Bizin Portugal (override with CMS_API_BASE_URL). */
const DEFAULT_CMS_API_BASE_URL = "https://cms.witflow.co";

/** Bizin client site ID in Witflow CMS (override with CMS_SITE_ID). */
const DEFAULT_CMS_SITE_ID = "3d9a6615-ea84-4813-943c-27171c1fbac2";

export type CmsConfig = {
  baseUrl: string;
  siteId: string;
  apiKey: string;
  webhookSecret: string | undefined;
  contentLocale: string;
};

export function getCmsConfig(): CmsConfig | null {
  const baseUrl = (process.env.CMS_API_BASE_URL?.trim() || DEFAULT_CMS_API_BASE_URL).replace(
    /\/$/,
    "",
  );
  const siteId = process.env.CMS_SITE_ID?.trim() || DEFAULT_CMS_SITE_ID;
  const apiKey = (process.env.CMS_API_KEY ?? process.env.CMS_WEBHOOK_SECRET)?.trim();
  const webhookSecret = process.env.CMS_WEBHOOK_SECRET?.trim();
  const contentLocale = process.env.CMS_CONTENT_LOCALE?.trim() || "pt";

  if (!apiKey) {
    return null;
  }

  return { baseUrl, siteId, apiKey, webhookSecret, contentLocale };
}

export function isCmsConfigured(): boolean {
  return getCmsConfig() !== null;
}
