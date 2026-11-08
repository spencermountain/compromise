import test from 'tape'
import nlp from './_lib.js'

test('markdown - misc', t => {
  const md = `## Walking to class

  She **walked** to [school](https://school.org). He walked home.

  They walk*ed* together. We enjoy **strong words**, *gentle emphasis*, and **nested *formatting***.

  A punctuation example: foo *bar*! Another example: foo *bar!*.

  Visit [the library][library] or <https://example.org>. An escaped \*asterisk\* is ordinary text.

    `
  const doc = nlp.fromMarkdown(md)
  const want = `Walking to class

She walked to school. He walked home.

They walked together. We enjoy strong words, gentle emphasis, and nested formatting.

A punctuation example: foo bar! Another example: foo bar!.

Visit [the library][library] or https://example.org. An escaped asterisk is ordinary text.`
  t.equal(doc.text(), want, 'plaintext basic')
  t.end()
})

test('markdown - hide-headings', t => {
  const md = `
### A smaller heading

#### Fourth level

##### Fifth level

###### Sixth level

Setext heading
--------------

## Lists and quotations

  `
  const doc = nlp.fromMarkdown(md, { headings: 'skip' })
  t.equal(doc.text(), '', 'hide-headings')
  t.end()
})
