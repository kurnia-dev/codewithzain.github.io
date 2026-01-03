// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'CodeWithZain';
export const SITE_DESCRIPTION = 'Deep dives into code, architecture, and the future of software development. Curated by engineers, for engineers.';
export const SITE_URL = 'https://codewithzain.com';

// Author information
export const AUTHOR = {
  name: 'Zain Kurnia',
  title: 'Software Engineer',
  bio: 'I build scalable applications across the full stack. From pixel-perfect front-ends to robust back-end systems and reliable QA automation.',
  avatar: {
    small: '/profile-48x48.webp',    // For Post Meta component
    medium: '/profile-80x80.webp',    // For AuthorBio component
    large: '/profile-312x312.webp'   // For About page
  },
  social: {
    github: '#',
    linkedin: '#',
    twitter: '#',
    email: 'zain@codewithzain.com'
  }
};

// Categories
export const CATEGORIES = [
  { name: 'All Posts', slug: 'all', icon: 'grid_view', count: 8 },
  { name: 'DevOps', slug: 'devops', icon: 'rocket_launch', count: 1 },
  { name: 'Front-end', slug: 'frontend', icon: 'code', count: 1 },
  { name: 'Mobile', slug: 'mobile', icon: 'smartphone', count: 1 },
  { name: 'Back-end', slug: 'backend', icon: 'dns', count: 1 },
  { name: 'Architecture', slug: 'architecture', icon: 'account_tree', count: 1 },
  { name: 'QA', slug: 'qa', icon: 'bug_report', count: 1 },
  { name: 'Design', slug: 'design', icon: 'palette', count: 1 },
  { name: 'Documentation', slug: 'documentation', icon: 'description', count: 1 }
];