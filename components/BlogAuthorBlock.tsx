import Image from "next/image";

import type { SimpleBlogAuthor } from "@/lib/supabase/types";

interface BlogAuthorBlockProps {
  author: SimpleBlogAuthor;
}

export function BlogAuthorBlock({ author }: BlogAuthorBlockProps) {
  if (!author.bio && !author.jobTitle) {
    return null;
  }

  return (
    <aside
      id="author-block"
      className="mt-12 rounded-2xl border border-gray-200 bg-gray-50 p-6 md:p-8"
      aria-label="Sobre o autor"
    >
      <h2 className="text-sm font-semibold uppercase tracking-wide text-[#87c76c] mb-4">
        Sobre o autor
      </h2>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        {author.avatarUrl && (
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-white shadow-md">
            <Image
              src={author.avatarUrl}
              alt={author.name}
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
        )}
        <div className="min-w-0">
          <p className="text-xl font-bold text-[#1c2544]">{author.name}</p>
          {author.jobTitle && (
            <p className="mt-1 text-sm font-medium text-gray-600">{author.jobTitle}</p>
          )}
          {author.bio && (
            <p className="mt-3 text-base leading-relaxed text-gray-700">{author.bio}</p>
          )}
        </div>
      </div>
    </aside>
  );
}
