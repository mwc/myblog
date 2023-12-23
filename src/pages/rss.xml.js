import rss, { pagesGlobToRssItems } from '@astrojs/rss'

export const GET = async (context) => rss({
    title: "ZiYu's blog",
    description: "ZiYu's blog",
    site: context.site + context.base,
    items: await pagesGlobToRssItems(import.meta.glob('./posts/**/*.{md,mdx}')),
})