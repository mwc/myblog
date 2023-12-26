import { defineConfig } from 'astro/config';
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
  site: "https://mwc.github.io",
  base: "/myblog/",
  trailingSlash: "always",
  prefetch: true
});