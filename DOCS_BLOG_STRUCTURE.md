# Blog Structure Documentation

This document outlines the architecture and implementation of the blog system in **CodeWithZain**.

## 1. Unified URL Scheme

The blog uses a query-parameter driven routing system to provide a seamless filtering and search experience while maintaining a single primary entry point.

| Path                | Query Parameters               | Description                                                        |
| :------------------ | :----------------------------- | :----------------------------------------------------------------- |
| `/blog`             | None                           | Main listing of all articles (Page 1).                             |
| `/blog`             | `?topic=slug`                  | Filter articles by a specific topic.                               |
| `/blog`             | `?search=query`                | Search articles by title or description.                           |
| `/blog`             | `?page=N`                      | Paginate through the filtered/searched list.                       |
| `/blog`             | `?topic=qa&search=test&page=2` | Combined filtering, search, and pagination.                        |
| `/blog/topics`      | None                           | Overview page showing all available categories and article counts. |
| `/blog/page/[page]` | `[page]` (path)                | Static/legacy pagination for "All Posts" (SEO friendly).           |
| `/blog/[slug]`      | `[slug]` (path)                | Individual blog post page.                                         |

---

## 2. Core Components

### `BlogListing.astro`

The main orchestrator for the blog frontend.

- **Sticky Sidebar**: Contains Search, Category Filter, and Newsletter.
- **Dynamic Headers**: Displays topic-specific headlines and descriptions.
- **Empty State**: Integrated "No Results" UI with a clear-filters recovery path.
- **Responsiveness**: Switches to tab-style filtering on mobile.

### `SearchBox.astro`

A native `<form>` based search component.

- Uses `GET` submission to `/blog`.
- Automatically preserves active `topic` filters during search.
- Pre-fills input value from URL on page load.

### `CategoryFilter.astro`

Sidebar navigation for topics.

- Highlighting for the active category.
- Dynamic article counts displayed next to each name.

### `Pagination.astro`

Query-aware pagination logic.

- Generates `/blog/page/N` for the default view.
- Generates query-based URLs (`?topic=...&page=...`) when filters are active.

---

## 3. Server-Side Logic & Utilities

The blog uses **Server-Side Rendering (SSR)** for the index page to handle dynamic queries efficiently.

### `src/utils/blog.ts`

- `getAllPosts()`: Fetches all articles from the Content Layer.
- `filterPostsByCategory()`: Filters by category slug (handling the "all" case).
- `paginatePosts()`: Slice logic for current page/size.
- `transformPostsToArticles()`: Formats raw content data for UI consumption.

### `src/utils/topics.ts`

Centralized metadata for all blog categories.

- Professional descriptions for SEO and UI headlines.
- Icon mapping for the topics overview page.

### `src/utils/categories.ts`

Calculates dynamic counts for each category at build/request time to ensure sidebar statistics are always accurate.

---

## 4. UI Patterns

- **No Results State**: A stylized dashed box with a `search_off` icon that appears when a query yields zero results.
- **Sticky Sidebar**: Implemented via `sticky top-24` to keep navigation accessible during long scrolls.
- **Icon Mapping**: Custom Material Symbols to Iconify mapping for consistent iconography.

## 5. Implementation Roadmap Refed

- [x] Convert `/blog` to SSR.
- [x] Implement query-based filtering and pagination.
- [x] Add dynamic topic descriptions.
- [x] Implement search filtering.
- [x] Add "No Results" state.
- [x] Centralized topic utility.
