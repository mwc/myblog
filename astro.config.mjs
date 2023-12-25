import { defineConfig } from 'astro/config';
import svelte from "@astrojs/svelte";
import react from "@astrojs/react";
import vue from "@astrojs/vue";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";

import expressiveCode from "astro-expressive-code";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), react(), vue(), tailwind(), expressiveCode({
    themes: ['one-dark-pro', 'light-plus']
  }), mdx()],
  site: "https://mwc.github.io",
  base: "/myblog/",
  trailingSlash: "always",
  prefetch: true
});