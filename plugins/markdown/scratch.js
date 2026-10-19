import nlp from '../../src/three.js'
import mdPlugin from './src/plugin.js'
nlp.plugin(mdPlugin)
import readFile from './tests/examples/index.js'

const opts = {
  // tables: 'skip',
  // headings: 'skip',
}

let md = `
- Apples are fresh.
- Oranges are sweet.
  - Lemons are sour.

1. Open the notebook.
2. Write a sentence.

> A thoughtful quotation.
>
> Another paragraph with **important words**.
>
> > A nested quotation.
  `

// let md = readFile('full-page')

const doc = nlp.fromMarkdown(md, { lists: 'skip', quotations: 'skip' })
console.log(doc.text())
