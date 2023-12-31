import { z, defineCollection } from 'astro:content'
const { object, string, array, number } = z

export default defineCollection({
    type: 'content',
    schema: object({
        title: string(),
        pubDate: string().transform(str => new Date(str)),
        description: string(),
        author: string(),
        link: string(),
        cover: string(),
        tag: array(string()),
        readingTime: object({
            words: number(),
            minutes: number()
        }).optional()
    })
})