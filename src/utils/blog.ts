import { getCollection, type CollectionEntry } from "astro:content";
import { CATEGORIES } from "../consts";

export const POSTS_PER_PAGE = 9;

/**
 * Get all blog posts sorted by date (newest first)
 */
export async function getAllPosts() {
  const allPosts = await getCollection("blog");
  return allPosts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
}

/**
 * Filter posts by category slug
 */
export function filterPostsByCategory(
  posts: CollectionEntry<"blog">[],
  categorySlug: string
): CollectionEntry<"blog">[] {
  if (categorySlug === "all") {
    return posts;
  }

  return posts.filter((post) => {
    const postCategorySlug = post.data.category
      .toLowerCase()
      .replace(/\s+/g, "-");
    return postCategorySlug === categorySlug;
  });
}

/**
 * Paginate posts
 */
export function paginatePosts(
  posts: CollectionEntry<"blog">[],
  page: number,
  perPage: number = POSTS_PER_PAGE
) {
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedPosts = posts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(posts.length / perPage);

  return {
    posts: paginatedPosts,
    totalPages,
    currentPage: page,
    totalPosts: posts.length,
  };
}

/**
 * Get category by slug
 */
export function getCategoryBySlug(slug: string) {
  return CATEGORIES.find((cat) => cat.slug === slug);
}

/**
 * Transform posts to article format for ArticleCard
 */
export function transformPostsToArticles(
  posts: CollectionEntry<"blog">[],
  formatDate: (date: Date) => string
) {
  return posts.map((post) => ({
    title: post.data.title,
    excerpt: post.data.excerpt,
    category: post.data.category,
    date: formatDate(post.data.pubDate),
    readTime: post.data.readTime,
    image: post.data.image,
    slug: post.id,
  }));
}
