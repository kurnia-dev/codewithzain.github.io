// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

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
});
