import { marked } from "marked";

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const LEADING_COVER_MARKDOWN_RE = /^!\[Cover image\]\([^)]*\)\s*\n?/i;

export function stripLeadingCoverImageMarkdown(content: string): string {
  let result = content.trimStart();

  while (LEADING_COVER_MARKDOWN_RE.test(result)) {
    result = result.replace(LEADING_COVER_MARKDOWN_RE, "").trimStart();
  }

  return result
    .replace(/^!\[[^\]]*\]\(\{COVER_IMAGE_PLACEHOLDER\}\)\s*\n?/gi, "")
    .replace(/!\[[^\]]*\]\(\{COVER_IMAGE_PLACEHOLDER\}\)\s*/gi, "")
    .replace(/<img[^>]*COVER_IMAGE_PLACEHOLDER[^>]*>\s*/gi, "")
    .trimStart();
}

export function stripDuplicateTitleHeading(content: string, title: string): string {
  if (!title.trim()) {
    return content;
  }

  const escaped = escapeRegExp(title.trim());
  return content.replace(new RegExp(`^#\\s+${escaped}\\s*\\n+`, "i"), "");
}

export function stripAuthorBlockHtml(content: string): string {
  return content.replace(/\n?<div id="author-block"[\s\S]*?<\/div>\s*$/i, "").trimEnd();
}

export function sanitizeBlogContent(content: string, title: string): string {
  return stripAuthorBlockHtml(
    stripDuplicateTitleHeading(stripLeadingCoverImageMarkdown(content), title),
  );
}

export async function renderBlogContent(content: string, title: string): Promise<string> {
  const sanitized = sanitizeBlogContent(content, title);
  if (!sanitized) {
    return "";
  }
  if (sanitized.trimStart().startsWith("<")) {
    return sanitized;
  }
  return marked.parse(sanitized, { gfm: true, breaks: true }) as string;
}

export function estimateReadTime(content: string): string {
  const words = content.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}
