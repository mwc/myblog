import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'

export const GET = async (context) => {
    const posts = await getCollection('posts')

    return rss({
        title: "ZiYu's blog",
        description: "ZiYu's blog",
        site: context.site,
        items: posts.map(post => ({
            title: post.data.title,
            pubDate: post.data.pubDate,
            description: post.data.description,
            link: './myblog/' + post.data.link ?? ''
        }))
    })
}