import { getRecentPosts, getCategories } from "@/lib/supabase/blog";
import { HomePageContent } from "@/components/HomePageContent";

export default async function Home() {
  // Fetch recent blog posts and categories for the homepage
  const [recentPosts, allCategories] = await Promise.all([
    getRecentPosts(6),
    getCategories()
  ]);

  // Filter out "fundos-europeus" category and keep only the 3 we want
  const categories = allCategories
    .filter(cat => cat.slug !== 'fundos-europeus')
    .slice(0, 3);

  return <HomePageContent recentPosts={recentPosts} categories={categories} />;
}
