import { getCollection } from "astro:content";
import { CATEGORIES } from "../consts";

export async function getCategories() {
  const posts = await getCollection("blog");

  const categoryCounts = posts.reduce((acc, post) => {
    // Normalize category slug
    const categoryslug = post.data.category.toLowerCase().replace(/\s+/g, "-");
    acc[categoryslug] = (acc[categoryslug] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return CATEGORIES.map((category) => {
    if (category.slug === "all") {
      return { ...category, count: posts.length };
    }
    return {
      ...category,
      count: categoryCounts[category.slug] || 0,
    };
  });
}
