'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const modules = {
    toolbar: [
      [{ header: [2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['blockquote', 'code-block'],
      ['link', 'image'],
      [{ align: [] }],
      ['clean'],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'blockquote',
    'code-block',
    'link',
    'image',
    'align',
  ];

  return (
    <div className="rich-text-editor">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder || 'Write your content here...'}
        className="bg-white"
      />
      <style jsx global>{`
        .rich-text-editor .ql-container {
          min-height: 400px;
          font-size: 16px;
          font-family: inherit;
        }
        .rich-text-editor .ql-editor {
          min-height: 400px;
        }
        .rich-text-editor .ql-toolbar {
          background: #f9fafb;
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
        }
        .rich-text-editor .ql-container {
          border-bottom-left-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
        }
        
        /* Heading styles in editor to match published post */
        .rich-text-editor .ql-editor h1 {
          font-size: 2.25rem;
          font-weight: 700;
          color: #1c2544;
          margin-top: 2rem;
          margin-bottom: 1rem;
          line-height: 1.3;
        }
        .rich-text-editor .ql-editor h2 {
          font-size: 1.875rem;
          font-weight: 700;
          color: #1c2544;
          margin-top: 2rem;
          margin-bottom: 1rem;
          line-height: 1.3;
        }
        .rich-text-editor .ql-editor h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1c2544;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          line-height: 1.3;
        }
        .rich-text-editor .ql-editor h4 {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1c2544;
          margin-top: 1.25rem;
          margin-bottom: 0.5rem;
          line-height: 1.3;
        }
        .rich-text-editor .ql-editor strong,
        .rich-text-editor .ql-editor b {
          font-weight: 700;
          color: #1c2544;
        }
        .rich-text-editor .ql-editor p {
          margin-bottom: 1rem;
          line-height: 1.75;
          word-wrap: break-word;
          overflow-wrap: break-word;
        }
        
        /* Ensure proper line breaking */
        .rich-text-editor .ql-editor {
          word-wrap: break-word;
          overflow-wrap: break-word;
          white-space: normal;
        }
        
        /* Add spacing between paragraphs */
        .rich-text-editor .ql-editor > * + * {
          margin-top: 0.5rem;
        }
      `}</style>
    </div>
  );
}

