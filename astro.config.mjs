import { defineConfig } from 'astro/config';

import svelte from "@astrojs/svelte";
import react from "@astrojs/react";
import vue from "@astrojs/vue";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), react(), vue(), tailwind()],
  site: "https://mwc.github.io",
  base: "/myblog",
});