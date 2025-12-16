/**
 * Convert a title to a URL-friendly slug
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    // Replace spaces and special characters with hyphens
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Strip HTML tags from content
 */
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Generate an excerpt from post content
 * @param content - HTML content of the post
 * @param maxLength - Maximum length of excerpt (default: 160 characters for SEO)
 */
export function generateExcerpt(content: string, maxLength: number = 160): string {
  if (!content) return '';
  
  const plainText = stripHtml(content);
  
  if (plainText.length <= maxLength) {
    return plainText;
  }
  
  // Cut at the last space before maxLength to avoid cutting words
  const truncated = plainText.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  if (lastSpace > 0) {
    return truncated.substring(0, lastSpace) + '...';
  }
  
  return truncated + '...';
}

/**
 * Calculate reading time based on content
 * @param content - HTML content of the post
 * @param wordsPerMinute - Average reading speed (default: 200)
 */
export function calculateReadTime(content: string, wordsPerMinute: number = 200): number {
  const plainText = stripHtml(content);
  const wordCount = plainText.split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return Math.max(1, minutes); // Minimum 1 minute
}

