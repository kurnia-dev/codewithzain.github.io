# CodeWithZain Blog

A modern, responsive blog built with Astro, featuring light/dark mode toggle and reusable components.

## 🚀 Features

- **Light/Dark Mode**: Seamless theme switching with system preference detection
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Component-Based**: Reusable Astro components for maintainable code
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Fast Performance**: Static site generation with Astro
- **Modern UI**: Clean, professional design inspired by modern tech blogs

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Iconify](https://iconify.design/) (Optimized loading)
- **Fonts**: [Inter](https://fonts.google.com/specimen/Inter)
- **Package Manager**: pnpm

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ArticleCard.astro
│   ├── CategoryFilter.astro
│   ├── Footer.astro
│   ├── Header.astro
│   ├── Newsletter.astro
│   ├── Pagination.astro
│   ├── SearchBox.astro
│   └── ThemeToggle.astro
├── layouts/             # Page layouts
│   └── BaseLayout.astro
├── pages/               # Route pages
│   ├── blog/
│   │   ├── [slug].astro # Dynamic blog post pages
│   │   └── index.astro
│   ├── about.astro
│   └── index.astro      # Homepage
├── scripts/             # Client-side scripts
├── styles/              # Global styles
│   └── global.css
└── consts.ts           # Site constants and configuration
```

## 🎨 Components

### Core Components

- **BaseLayout**: Main layout wrapper with head, navigation, and footer
- **Header**: Navigation bar with theme toggle and responsive menu
- **Footer**: Site footer with links and social media
- **ThemeToggle**: Light/dark mode switcher

### Blog Components

- **ArticleCard**: Blog post preview card with image, metadata, and author
- **CategoryFilter**: Sidebar category navigation with post counts
- **SearchBox**: Article search functionality
- **Newsletter**: Email subscription widget
- **Pagination**: Page navigation for blog listings

### Page Templates

- **Homepage** (`/`): Article listing with sidebar filters
- **Blog Post** (`/blog/[slug]`): Individual article with TOC and related posts
- **About Page** (`/about`): Author profile and experience

## 🌙 Theme System

The blog features a sophisticated, event-driven theme system that:

- **Self-Contained Components**: Each component manages its own theme logic
- **Event-Driven Architecture**: Uses custom events for component communication
- **No Manual DOM Queries**: Components handle their own DOM updates
- **Prevents FOUC**: Inline script for immediate theme application
- **Extensible**: Easy to add new theme-aware components
- **Smooth Transitions**: CSS transitions between themes
- **Persistent Storage**: Remembers user preference in localStorage

### Architecture
- **BaseLayout**: Handles initial theme setup and FOUC prevention
- **ThemeToggle**: Self-contained component with internal state management
- **Custom Events**: `theme-changed` event for component communication

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd codewithzain
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   ```

4. **Build for production**
   ```bash
   pnpm build
   ```

## 📝 Content Management

Currently using sample data in components. To integrate with a CMS or markdown files:

1. Set up Astro Content Collections in `src/content/`
2. Update components to use real data
3. Configure dynamic routing for blog posts

## 🎯 Customization

### Colors and Branding

Update the color scheme in `tailwind.config.mjs`:

```js
colors: {
  "primary": "#135bec",        // Main brand color
  "primary-dark": "#0f4bc4",   // Darker variant
  // ... other colors
}
```

### Site Information

Modify site details in `src/consts.ts`:

```ts
export const SITE_TITLE = 'Your Blog Name';
export const SITE_DESCRIPTION = 'Your blog description';
export const AUTHOR = {
  name: 'Your Name',
  // ... other author details
};
```

### Navigation

Update navigation items in `src/components/Header.astro`.

## 📱 Responsive Design

The blog is fully responsive with:

- Mobile-first CSS approach
- Collapsible navigation on mobile
- Responsive grid layouts
- Touch-friendly interactive elements
- Optimized typography scaling

## ⚡ Performance

- Static site generation for fast loading
- Optimized images and assets
- Minimal JavaScript footprint
- Efficient CSS with Tailwind's purging
- Proper caching headers

## 🔧 Development

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm generate-icons` - Generate optimized icon CSS
- `pnpm replace-icons` - Replace material-symbols with Icon components

### Code Style

- TypeScript for type safety
- Astro components for UI
- Tailwind for styling
- ESLint and Prettier (recommended)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using [Astro](https://astro.build/)