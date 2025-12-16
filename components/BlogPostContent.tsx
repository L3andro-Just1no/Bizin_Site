'use client';

interface BlogPostContentProps {
  content: string;
}

export function BlogPostContent({ content }: BlogPostContentProps) {
  return (
    <>
      <div
        className="prose prose-lg max-w-none blog-content"
        dangerouslySetInnerHTML={{ __html: content }}
        style={{ whiteSpace: 'normal', overflowWrap: 'break-word' }}
      />
      
      <style jsx global>{`
        .blog-content {
          word-wrap: break-word !important;
          overflow-wrap: break-word !important;
          word-break: break-word !important;
          hyphens: auto !important;
        }
        
        .blog-content h1,
        .blog-content h2,
        .blog-content h3,
        .blog-content h4,
        .blog-content h5,
        .blog-content h6 {
          color: #1c2544 !important;
          font-weight: 700 !important;
          line-height: 1.3 !important;
          word-wrap: break-word !important;
          overflow-wrap: break-word !important;
        }
        
        .blog-content h1 {
          font-size: 2.25rem !important;
          margin-top: 3rem !important;
          margin-bottom: 1.5rem !important;
        }
        
        .blog-content h2 {
          font-size: 1.875rem !important;
          margin-top: 3rem !important;
          margin-bottom: 1.5rem !important;
        }
        
        .blog-content h3 {
          font-size: 1.5rem !important;
          margin-top: 2rem !important;
          margin-bottom: 1rem !important;
        }
        
        .blog-content h4 {
          font-size: 1.25rem !important;
          margin-top: 1.5rem !important;
          margin-bottom: 0.75rem !important;
        }
        
        .blog-content strong,
        .blog-content b {
          color: #1c2544 !important;
          font-weight: 700 !important;
        }
        
        .blog-content p {
          color: #374151;
          margin-bottom: 1.5rem !important;
          line-height: 1.75 !important;
          white-space: pre-wrap !important;
          word-wrap: break-word !important;
        }
        
        .blog-content ul,
        .blog-content ol {
          margin: 1.5rem 0 !important;
          padding-left: 1.5rem !important;
        }
        
        .blog-content li {
          margin-bottom: 0.5rem !important;
          color: #374151;
          word-wrap: break-word !important;
          overflow-wrap: break-word !important;
        }
        
        .blog-content a {
          color: #87c76c !important;
          text-decoration: none;
        }
        
        .blog-content a:hover {
          text-decoration: underline;
        }
        
        .blog-content blockquote {
          border-left: 4px solid #87c76c !important;
          padding-left: 1.5rem !important;
          font-style: italic;
          color: #6b7280 !important;
          margin: 1.5rem 0 !important;
          word-wrap: break-word !important;
          overflow-wrap: break-word !important;
        }
        
        /* Ensure all text elements break properly */
        .blog-content * {
          max-width: 100% !important;
        }
        
        /* Add spacing between direct children */
        .blog-content > * + * {
          margin-top: 1rem !important;
        }
        
        .blog-content img {
          border-radius: 0.75rem !important;
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1) !important;
          margin: 2rem 0 !important;
        }
        
        .blog-content code {
          background: #f3f4f6 !important;
          padding: 0.125rem 0.5rem !important;
          border-radius: 0.25rem !important;
          font-size: 0.875em !important;
        }
        
        .blog-content pre {
          background: #1f2937 !important;
          color: #f9fafb !important;
          padding: 1.5rem !important;
          border-radius: 0.75rem !important;
          overflow-x: auto;
          margin: 1.5rem 0 !important;
        }
        
        .blog-content pre code {
          background: transparent !important;
          color: inherit !important;
          padding: 0 !important;
        }
      `}</style>
    </>
  );
}
