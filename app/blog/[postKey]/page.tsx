import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostContent } from "@/components/BlogPostContent";

type PostKey = "post1" | "post2" | "post3" | "post4" | "post5" | "post6";

interface BlogPostPageProps {
  params: {
    postKey: string;
  };
}

const VALID_KEYS: PostKey[] = [
  "post1",
  "post2",
  "post3",
  "post4",
  "post5",
  "post6",
];

export const metadata: Metadata = {
  title: "Artigo - Neomarca",
  description:
    "Artigo do blog da Neomarca sobre fundos europeus, incentivos e empreendedorismo em Portugal.",
};

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const key = params.postKey as PostKey;

  if (!VALID_KEYS.includes(key)) {
    notFound();
  }

  return <BlogPostContent postKey={key} />;
}


