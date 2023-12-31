export function sortPosts(posts) {
    return posts.sort((a, b) => {
        return b.data.pubDate.getTime() - a.data.pubDate.getTime()
    })
}

export function getTags(posts) {
    return posts.reduce((set, post) => {
        let tag = new Set<string>(post.data?.tag)

        for (const item of tag) {
            set[item] = (set[item] ?? 0) + 1
        }

        return set
    }, {})
}