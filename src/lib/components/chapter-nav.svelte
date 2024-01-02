<script>
    const { headings } = $props()
    let current = $state('本文章节')

    $effect.pre(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const id = entry.target.getAttribute('id')
                const text = id == '__page-chapter-selector' ? '本文章节' : entry.target.childNodes[0].textContent.trim()

                if (entry.intersectionRatio > 0) {
                    current = text
                }
            })
        })

        document
            .querySelectorAll(
                '#__page-chapter-selector, #__page-article h1[id], #__page-article h2[id], #__page-article h3[id], #__page-article h4[id], #__page-article h5[id], #__page-article h6[id]',
            )
            .forEach((h) => {
                observer.observe(h)
            })
    })
</script>

<span id="__page-chapter-selector"></span>
<button
    class="border dark:border-[#505050] sticky w-full top-0 z-50 box-border text-sm bg-gray-50 dark:bg-[#3f3f3f] rounded-md shadow-sm focus-within:rounded-b-none px-3 py-1 cursor-pointer flex items-center justify-between group"
>
    <div class="text-gray-600 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white">{current}</div>
    <svg
        viewBox="0 0 1024 1024"
        class="h-8 w-8 text-gray-500 dark:text-gray-300 transition-all group-hover:text-black dark:group-hover:text-white group-focus:rotate-180"
    >
        <path
            fill="currentColor"
            d="M512 608c-6.4 0-19.2 0-25.6-6.4l-128-128c-12.8-12.8-12.8-32 0-44.8s32-12.8 44.8 0L512 531.2l102.4-102.4c12.8-12.8 32-12.8 44.8 0s12.8 32 0 44.8l-128 128C531.2 608 518.4 608 512 608z"
        ></path>
    </svg>
    <ul
        class="absolute hidden text-left group-focus-within:block bg-white dark:bg-[#3f3f3f] max-h-[50vh] overflow-y-auto box-border shadow-sm rounded-b-md -left-px -right-px top-10 py-2 border dark:border-[#505050]"
    >
        <li>
            <a
                class="block dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-black/15 !no-underline px-3 py-2"
                href="#__page-top"
                onclick={() => (current = '本文章节')}
            >
                &UpArrow; 回到顶部
            </a>
        </li>
        {#each headings as h (h.slug)}
            <li>
                <a class={`block dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-black/15 !no-underline px-${h.depth * 3} py-2`} href={`#${h.slug}`}>
                    {h.text}
                </a>
            </li>
        {/each}
    </ul>
</button>
