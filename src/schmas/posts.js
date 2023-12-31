import { z, defineCollection } from 'astro:content'

export default defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        pubDate: z.string().transform(str => new Date(str)),
        description: z.string(),
        author: z.string(),
        link: z.string(),
        cover: z.string(),
        tag: z.array(z.string()),
        readingTime: z.object({
            words: z.number(),
            minutes: z.number()
        }).optional()
    })
})