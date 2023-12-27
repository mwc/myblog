export { default as Subject } from './subject.astro'
export { default as Pager } from './pager.astro'
export { default as Page } from './page.astro'

import { default as H1 } from './headings/h1.astro'
import { default as H2 } from './headings/h2.astro'
import { default as H3 } from './headings/h3.astro'
import { default as H4 } from './headings/h4.astro'
import { default as H5 } from './headings/h5.astro'
import { default as H6 } from './headings/h6.astro'

export const components = { h1: H1, h2: H2, h3: H3, h4: H4, h5: H5, h6: H6 }