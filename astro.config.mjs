import { defineConfig } from 'astro/config';
import { remarkReadingTime } from './src/lib/plugins/remark-reading-time.js';
// import rehypeSlug from 'rehype-slug'
// import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import expressiveCode from "astro-expressive-code";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import react from "@astrojs/react";
import vue from "@astrojs/vue";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [
    svelte(),
    react(),
    vue(),
    tailwind(),
    expressiveCode({
      themes: ['one-dark-pro', 'light-plus']
    }),
    mdx()
  ],
  markdown: {
    remarkPlugins: [remarkReadingTime],
    // rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings]
  },
  site: "https://mwc.github.io",
  base: "/myblog/",
  trailingSlash: "always",
  prefetch: true
});