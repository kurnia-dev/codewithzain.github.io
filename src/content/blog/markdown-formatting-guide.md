---
title: "Complete Markdown Formatting Guide"
description: "A comprehensive showcase of all markdown formatting elements including headings, code blocks, blockquotes, lists, media, and inline messages."
excerpt: "Master every markdown formatting technique with this complete guide showcasing headings, code blocks, blockquotes, lists, media embedding, and more."
category: "Documentation"
pubDate: "2023-12-26"
readTime: "15 min read"
image: "https://picsum.photos/800/400?random=3"
---

# Complete Markdown Formatting Guide

This comprehensive guide demonstrates every markdown formatting element available in our blog system. Use this as a reference for creating beautifully formatted technical content.

## Headings Hierarchy

Headings create structure and hierarchy in your content. Here are all available heading levels:

## Heading Level 2 (H2)
### Heading Level 3 (H3)
#### Heading Level 4 (H4)
##### Heading Level 5 (H5)
###### Heading Level 6 (H6)

## Text Formatting

### Basic Text Styling

You can format text using various inline styles:

- **Bold text** using `**bold**` or `__bold__`
- *Italic text* using `*italic*` or `_italic_`
- ***Bold and italic*** using `***bold italic***`
- ~~Strikethrough text~~ using `~~strikethrough~~`
- <u>Underlined text</u> using `<u>underlined</u>`

### Inline Code

Use `inline code` for highlighting code snippets, variables, or commands within sentences. For example, the `useState` hook or the `npm install` command.

## Code Blocks with macOS-Style Headers

### Basic Code Block

```
This is a basic code block without syntax highlighting.
You can use it for plain text or pseudo-code.
```

### JavaScript with macOS-Style Header

<div class="code-header">
  <div class="code-dots">
    <div class="code-dot red"></div>
    <div class="code-dot yellow"></div>
    <div class="code-dot green"></div>
  </div>
  <div class="code-filename">greeting.js</div>
  <div class="code-copy">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
      <path d="m5 15-4-4 4-4"></path>
    </svg>
    Copy
  </div>
</div>

```javascript
// JavaScript example with syntax highlighting
const greeting = "Hello, World!";

function greetUser(name) {
  return `Hello, ${name}! Welcome to our blog.`;
}

// Using the function
const message = greetUser("Developer");
console.log(message);

// Arrow function example
const multiply = (a, b) => a * b;
const result = multiply(5, 3);
```

### Python with macOS-Style Header

<div class="code-header">
  <div class="code-dots">
    <div class="code-dot red"></div>
    <div class="code-dot yellow"></div>
    <div class="code-dot green"></div>
  </div>
  <div class="code-filename">blog_post.py</div>
  <div class="code-copy">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
      <path d="m5 15-4-4 4-4"></path>
    </svg>
    Copy
  </div>
</div>

```python
# Python example with syntax highlighting
import datetime

class BlogPost:
    def __init__(self, title, author, content):
        self.title = title
        self.author = author
        self.content = content
        self.created_at = datetime.datetime.now()
    
    def publish(self):
        print(f"Publishing '{self.title}' by {self.author}")
        return True

# Create and publish a post
post = BlogPost("My First Post", "John Doe", "This is the content...")
post.publish()
```

### HTML/CSS Code Block

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sample Page</title>
    <style>
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .highlight {
            background-color: #f0f8ff;
            padding: 10px;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to Our Blog</h1>
        <p class="highlight">This is a highlighted paragraph.</p>
    </div>
</body>
</html>
```

### Shell/Bash Commands

```bash
# Install dependencies
npm install express mongoose dotenv

# Start development server
npm run dev

# Build for production
npm run build

# Deploy to server
ssh user@server.com "cd /var/www && git pull origin main"
```

### SQL Code Block

```sql
-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO users (username, email, password_hash) VALUES
('johndoe', 'john@example.com', 'hashed_password_123'),
('janedoe', 'jane@example.com', 'hashed_password_456');

-- Query with joins
SELECT u.username, p.title, p.created_at
FROM users u
JOIN posts p ON u.id = p.author_id
WHERE p.published = true
ORDER BY p.created_at DESC
LIMIT 10;
```

## Blockquotes

### Simple Blockquote

> This is a simple blockquote. It's perfect for highlighting important information, quotes from other sources, or key takeaways from your content.

### Nested Blockquote

> This is the first level of blockquote.
> 
> > This is a nested blockquote inside the first one.
> > It's useful for showing quotes within quotes.
> 
> Back to the first level of blockquote.

### Blockquote with Attribution

> "The best way to predict the future is to invent it."
> 
> — Alan Kay, Computer Scientist

## Inline Messages (Callouts)

### Info Message

<div class="info-box">
  <div class="info-header">
    <span class="material-symbols-outlined info-icon">info</span>
    <div>
      <h4>Information</h4>
      <p>This is an informational message. Use it to provide helpful context, tips, or additional information that supports your main content.</p>
    </div>
  </div>
</div>

### Warning Message

<div class="info-box warning">
  <div class="info-header">
    <span class="material-symbols-outlined info-icon">warning</span>
    <div>
      <h4>Warning</h4>
      <p>This is a warning message. Use it to alert readers about potential issues, deprecated features, or important considerations.</p>
    </div>
  </div>
</div>

### Error/Danger Message

<div class="info-box error">
  <div class="info-header">
    <span class="material-symbols-outlined info-icon">error</span>
    <div>
      <h4>Danger</h4>
      <p>This is an error or danger message. Use it to highlight critical issues, security concerns, or actions that could cause problems.</p>
    </div>
  </div>
</div>

### Success Message

<div class="info-box success">
  <div class="info-header">
    <span class="material-symbols-outlined info-icon">check_circle</span>
    <div>
      <h4>Success</h4>
      <p>This is a success message. Use it to confirm completed actions, highlight achievements, or show positive outcomes.</p>
    </div>
  </div>
</div>

## Lists

### Unordered Lists

- First item in unordered list
- Second item with some **bold text**
- Third item with `inline code`
- Fourth item with a [link to example](https://example.com)

### Ordered Lists

1. First step in the process
2. Second step with detailed explanation
3. Third step with multiple components:
   - Sub-component A
   - Sub-component B
   - Sub-component C
4. Final step to complete the process

### Nested Lists

1. **Frontend Development**
   - HTML & CSS
     - Semantic HTML5
     - CSS Grid & Flexbox
     - Responsive Design
   - JavaScript
     - ES6+ Features
     - DOM Manipulation
     - Async/Await
   - Frameworks
     - React
       - Hooks
       - Context API
       - Redux
     - Vue.js
     - Angular

2. **Backend Development**
   - Server Technologies
     - Node.js
     - Python (Django/Flask)
     - PHP (Laravel)
   - Databases
     - SQL Databases
       - PostgreSQL
       - MySQL
     - NoSQL Databases
       - MongoDB
       - Redis

3. **DevOps & Deployment**
   - Version Control
     - Git
     - GitHub/GitLab
   - Containerization
     - Docker
     - Kubernetes
   - Cloud Platforms
     - AWS
     - Google Cloud
     - Azure

### Task Lists (Checkboxes)

- [x] Complete project setup
- [x] Write initial documentation
- [ ] Implement user authentication
- [ ] Add payment integration
- [ ] Deploy to production
- [ ] Monitor performance metrics

## Links

### Basic Links

Here are different types of links you can use:

- [External link to Google](https://www.google.com)
- [Link to another article](/blog/react-server-components-deep-dive)
- [Link with title attribute](https://github.com "GitHub Homepage")
- [Reference-style link][1]

[1]: https://www.example.com "Reference link example"

### Automatic Links

You can also use automatic links:
- https://www.example.com
- contact@example.com

## Tables

### Basic Table

| Feature | Description | Status |
|---------|-------------|--------|
| Authentication | User login/logout | ✅ Complete |
| Dashboard | User dashboard | 🚧 In Progress |
| Analytics | Usage analytics | ❌ Not Started |
| API Integration | Third-party APIs | ✅ Complete |

### Advanced Table with Alignment

| Left Aligned | Center Aligned | Right Aligned | 
|:-------------|:--------------:|--------------:|
| Left text | Center text | Right text |
| More left | More center | More right |
| Even more | Even more center | Even more right |

### Table with Code and Links

| Technology | Description | Documentation |
|------------|-------------|---------------|
| `React` | JavaScript library for building UIs | [React Docs](https://reactjs.org) |
| `Node.js` | JavaScript runtime for server-side | [Node.js Docs](https://nodejs.org) |
| `MongoDB` | NoSQL document database | [MongoDB Docs](https://docs.mongodb.com) |
| `Docker` | Containerization platform | [Docker Docs](https://docs.docker.com) |

## Media Embedding

### Images with Captions

![Beautiful landscape with mountains and lake](https://picsum.photos/800/400?random=4)
*Figure 1: A beautiful landscape showcasing natural beauty and serene environment*

### Image with Link

[![Click to visit our homepage](https://picsum.photos/800/400?random=2)](/)
*Figure 2: Click the image above to visit our homepage*

## Horizontal Rules

You can create horizontal rules (dividers) using three or more hyphens, asterisks, or underscores:

---

***

___

## Escape Characters

Sometimes you need to display markdown characters literally. Use backslashes to escape them:

- \*This text is not italic\*
- \`This is not inline code\`
- \# This is not a heading
- \[This is not a link\](example.com)

## HTML Elements

You can also use HTML elements directly in markdown:

<details>
<summary>Click to expand this section</summary>

This content is hidden by default and can be expanded by clicking the summary above. This is useful for:

- FAQ sections
- Optional detailed explanations
- Code examples that might be too long
- Additional resources

</details>

<kbd>Ctrl</kbd> + <kbd>C</kbd> to copy
<kbd>Ctrl</kbd> + <kbd>V</kbd> to paste

<mark>This text is highlighted</mark> using the HTML mark element.

## Mathematical Expressions

For mathematical expressions, you can use LaTeX syntax:

Inline math: $E = mc^2$

Block math:
$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$

## Footnotes

Here's a sentence with a footnote[^1]. And here's another one[^2].

[^1]: This is the first footnote. It provides additional information without cluttering the main text.

[^2]: This is the second footnote. Footnotes are automatically numbered and linked.

## Conclusion

This guide covers all the major markdown formatting elements available in our blog system. Use these formatting options to create engaging, well-structured, and visually appealing technical content.

### Quick Reference

- **Headings**: Use `#` to `######` for different levels
- **Emphasis**: `*italic*`, `**bold**`, `***bold italic***`
- **Code**: `` `inline` `` or ``` for blocks
- **Links**: `[text](url)` or `[text][ref]`
- **Images**: `![alt](url)` with optional caption
- **Lists**: `-` or `*` for unordered, `1.` for ordered
- **Blockquotes**: `>` at the beginning of lines
- **Tables**: Use `|` to separate columns
- **Info boxes**: Use HTML `<div>` elements with classes

Remember to preview your content before publishing to ensure all formatting renders correctly!