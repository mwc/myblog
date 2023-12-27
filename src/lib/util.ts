export function sortPosts(posts) {
    return posts.sort((a, b) => {
        return new Date(b.frontmatter.pubDate).getTime() - new Date(a.frontmatter.pubDate).getTime()
    })
}

export function getTags(posts) {
    return posts.reduce((set, post) => {
        let tag = new Set<string>(post.frontmatter?.tag)

        for (const item of tag) {
            set[item] = (set[item] ?? 0) + 1
        }

        return set
    }, {})
}