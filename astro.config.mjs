// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel";
import { defineConfig } from "astro/config";
import { transformerMetaHighlight } from "@shikijs/transformers";

// https://astro.build/config
export default defineConfig({
  site: "https://kurnia-dev.github.io",
  adapter: vercel(),
  image: {
    // Enable image optimization
    domains: ["lh3.googleusercontent.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  integrations: [
    mdx(),
    sitemap(),
    tailwind({
      applyBaseStyles: false, // We'll handle base styles ourselves
    }),
  ],
  build: {
    inlineStylesheets: "never",
  },
  markdown: {
    shikiConfig: {
      themes: {
        light: "catppuccin-mocha",
        dark: "catppuccin-mocha",
      },
      transformers: [
        {
          // Pass metadata and source code to the pre element
          pre(hast) {
            // Pass the raw metadata string
            hast.properties["data-meta"] = this.options.meta?.__raw;
            // Pass the original source code for copy functionality
            hast.properties["data-code"] = this.source;
          },
        },
        // Enable line highlighting with {1,3-5} syntax
        transformerMetaHighlight(),
      ],
    },
  },
});
