// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import { transformerMetaHighlight } from '@shikijs/transformers';

// https://astro.build/config
export default defineConfig({
	site: 'https://kurnia-dev.github.io',
	integrations: [
		mdx(), 
		sitemap(),
		tailwind({
			applyBaseStyles: false, // We'll handle base styles ourselves
		})
	],
	vite: {
		build: {
			rollupOptions: {
				output: {
					assetFileNames: (assetInfo) => {
						// Split CSS by type/component
						if (assetInfo.name?.endsWith('.css')) {
							if (assetInfo.name.includes('global')) {
								return 'assets/css/global-[hash][extname]';
							}
							if (assetInfo.name.includes('article')) {
								return 'assets/css/article-[hash][extname]';
							}
							if (assetInfo.name.includes('code-snippet')) {
								return 'assets/css/code-snippet-[hash][extname]';
							}
							if (assetInfo.name.includes('icons')) {
								return 'assets/css/icons-[hash][extname]';
							}
							return 'assets/css/[name]-[hash][extname]';
						}
						return 'assets/[name]-[hash][extname]';
					}
				}
			},
			cssCodeSplit: true, // Enable CSS code splitting
			assetsInlineLimit: 0 // Prevent CSS inlining
		}
	},
	markdown: {
		shikiConfig: {
			themes: {
				light: 'catppuccin-mocha',
				dark: 'catppuccin-mocha',
			},
			transformers: [
				{
					// Pass metadata and source code to the pre element
					pre(hast) {
						// Pass the raw metadata string
						hast.properties['data-meta'] = this.options.meta?.__raw;
						// Pass the original source code for copy functionality
						hast.properties['data-code'] = this.source;
					}
				},
				// Enable line highlighting with {1,3-5} syntax
				transformerMetaHighlight(),
			]
		}
	},
});
