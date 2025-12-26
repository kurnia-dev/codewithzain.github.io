# Enhanced Code Snippet Component Usage

This document explains how to use the new enhanced code snippet component that provides macOS-style headers, line numbers, and copy functionality.

## Features

- ✅ **macOS-style header** with red, yellow, green dots
- ✅ **Filename display** in header when specified
- ✅ **Language indicator** when no filename provided
- ✅ **Copy to clipboard** with visual feedback
- ✅ **Optional line numbers** (enabled by default)
- ✅ **Line highlighting** support
- ✅ **Dark/light theme** support
- ✅ **Responsive design** with horizontal scrolling
- ✅ **Global configuration** - No imports needed!

## Setup - Already Done! ✅

The enhanced code snippets are **automatically enabled** for all MDX files through global configuration in `astro.config.mjs`. No imports needed in individual files!

## Usage Examples

### Basic Code Block

```javascript
const greeting = "Hello, World!";
console.log(greeting);
```

### With Filename

```javascript filename=app.js
import express from 'express';
const app = express();
app.listen(3000);
```

### Without Line Numbers

```python lines=false
def hello():
    print("Hello, World!")
```

### With Line Highlighting

```typescript filename=user.service.ts {2,4-6}
import { Injectable } from '@nestjs/common';
import { User } from './user.entity'; // highlighted

@Injectable()
export class UserService { // highlighted
  private users: User[] = []; // highlighted
  // highlighted

  async findAll(): Promise<User[]> {
    return this.users;
  }
}
```

## Metadata Options

Add metadata after the language identifier:

| Option | Description | Example |
|--------|-------------|---------|
| `filename=name.ext` | Shows filename in header | `filename=app.js` |
| `lines=false` | Disables line numbers | `lines=false` |
| `{1,3-5}` | Highlights specific lines | `{1,3-5}` |

## Converting Existing Files

Use the conversion script to convert markdown files to MDX (no imports needed!):

```bash
node scripts/convert-to-mdx.js src/content/blog/my-post.md
```

This will simply rename `.md` to `.mdx` - the enhanced code snippets work automatically!

## CSS Customization

The component uses Tailwind CSS classes and can be customized by modifying `src/styles/code-snippet.css`.

### Key CSS Classes

- `.code-snippet-wrapper` - Main container
- `.code-header` - Header with dots and filename
- `.code-dots` - macOS-style dots
- `.code-copy-btn` - Copy button
- `.with-line-numbers` - Enables line numbering

## Browser Support

- ✅ Modern browsers with Clipboard API support
- ✅ Fallback for browsers without clipboard access
- ✅ Responsive design for mobile devices

## Troubleshooting

### Copy Button Not Working

Make sure your site is served over HTTPS or localhost, as the Clipboard API requires a secure context.

### Line Numbers Not Showing

Ensure the `with-line-numbers` class is applied and the CSS is properly imported.

### Styling Issues

Check that `src/styles/code-snippet.css` is imported in your layout file.