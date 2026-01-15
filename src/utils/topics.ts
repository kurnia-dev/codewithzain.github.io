import { CATEGORIES } from "../consts";

export interface TopicInfo {
  name: string;
  slug: string;
  description: string;
  icon: string;
}

const TOPIC_DESCRIPTIONS: Record<string, string> = {
  frontend:
    "Modern web development with React, Vue, and cutting-edge frameworks. Learn about component architecture, state management, and performance optimization.",
  backend:
    "Server-side development, APIs, databases, and system architecture. Dive deep into scalable backend solutions and microservices.",
  mobile:
    "Cross-platform mobile development with Flutter and React Native. Build native experiences for iOS and Android.",
  devops:
    "CI/CD pipelines, cloud infrastructure, containerization, and deployment strategies. Master the art of reliable software delivery.",
  qa: "Testing strategies, automation frameworks, and quality assurance best practices. Ensure your code works flawlessly in production.",
  architecture:
    "Software architecture patterns, system design, and scalability. Build robust and maintainable applications that stand the test of time.",
  design:
    "UI/UX design principles, design systems, and visual aesthetics. Create beautiful and intuitive user experiences.",
  documentation:
    "Technical writing, API documentation, and knowledge sharing. Learn to communicate complex ideas clearly and effectively.",
};

/**
 * Get topic information by slug
 */
export function getTopicInfo(slug: string): TopicInfo | null {
  const category = CATEGORIES.find((cat) => cat.slug === slug);

  if (!category) {
    return null;
  }

  return {
    name: category.name,
    slug: category.slug,
    description:
      TOPIC_DESCRIPTIONS[slug] ||
      "Explore our comprehensive collection of articles and tutorials on this topic.",
    icon: category.icon,
  };
}

/**
 * Get topic description by slug
 */
export function getTopicDescription(slug: string): string {
  return (
    TOPIC_DESCRIPTIONS[slug] ||
    "Explore our comprehensive collection of articles and tutorials on this topic."
  );
}
