# A personal blog written by Astro.

## 🚀 Project Structure

Inside of my Astro project, you'll see the following folders and files:

```text
/
├── .github/workflows/
│    └── deploy.yml
├── public/
└── src/
     ├── lib/
     │    └── components
     │    └── layouts
     ├── pages/
     │    └── [...page]/ 
     │    └── posts/
     │    └── tags/[path]/[...page]/
     └── styles/
          └── global.scss 
          └── md.scss
```

**Descriptions:**

| folder                    | descriptions                                     |
| :------------------------ | :----------------------------------------------- |
| `.github/workflows/`      | Github deploy file                               |
| `public`                  | images .e.c `logo.png`                           |
| `src/lib/`                | common `components` and `layouts`                |
| `src/styles/`             | includes layout and markdown page's styles.      |
| `src/pages/[...page]`     | this route will match the main page `index.html`, why use `[...page]` here? course have paginate in index.html, `[...page]` will get the page number.                   |
| `src/pages/posts/`        | all markdown article pages.                      |
| `src/pages/tags/[path]/[...page]/` | multi-level routes for tags list, first, `path` route match which `tag`, then `[...page]` route match the page number of list |

## 👀 How to use thie blog template?

1. `Delete` all files in `src/pages/posts/` folder.
2. Write your blog post in `src/pages/posts/`.
3. `*.md` file use `src/lib/layouts/md.astro` as layout.
