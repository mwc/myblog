import getReadingTime from 'reading-time'
import { toString } from 'mdast-util-to-string'

export const remarkReadingTime = () => (tree, { data }) => {
    data.astro.frontmatter.readingTime = getReadingTime(toString(tree), { wordsPerMinute: 120 })
}