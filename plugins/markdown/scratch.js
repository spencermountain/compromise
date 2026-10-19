import nlp from '../../src/three.js'
import mdPlugin from './src/plugin.js'
nlp.plugin(mdPlugin)
import readFile from './tests/examples/index.js'

const opts = {
  // tables: 'skip',
  // headings: 'skip',
}

let md = `## Walking to class

She **walked** to [school](https://school.org). He walked home.

They walk*ed* together. We enjoy **strong words**, *gentle emphasis*, and **nested *formatting***.

A punctuation example: foo *bar*! Another example: foo *bar!*.

Visit [the library][library] or <https://example.org>. An escaped \*asterisk\* is ordinary text.

  `

// let md = readFile('full-page')

const doc = nlp.fromMarkdown(md, opts)
console.log(doc.text())
