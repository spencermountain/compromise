<div align="center">
  <div><b>compromise-html</b></div>
  <div>parse and transform text inside HTML</div>
  <div><code>npm install compromise-html</code></div>
  <div align="center">
    <sub>
      by
      <a href="https://github.com/spencermountain">Spencer Kelly</a>
    </sub>
  </div>
  <img height="25px" src="https://user-images.githubusercontent.com/399657/68221824-09809d80-ffb8-11e9-9ef0-6ed3574b0ce8.png"/>
</div>
<!--2nd row-->
<div align="center">
  <div>
    <a href="https://npmjs.org/package/compromise-html">
    <img src="https://img.shields.io/npm/v/compromise-html.svg?style=flat-square" />
  </a>
  <a href="https://bundlephobia.com/result?p=compromise-html">
    <img src="https://badgen.net/bundlejs/min/compromise-html" />
  </a>
  </div>
</div>
<!-- spacer -->
<img height="20px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

This plugin lets you read and modify text in an **HTML** document, using compromise.

It uses [hast-util-from-html](https://github.com/syntax-tree/hast-util-from-html) to parse HTML and connects compromise terms to the resulting HAST text nodes.

After editing the compromise document, call `updateHast()` to apply supported changes to the AST and `toHtml()` to serialize it.

```js
import nlp from 'compromise'
import htmlPlugin from 'compromise-html'
nlp.plugin(htmlPlugin)

const doc = nlp.fromHtml('She <strong>walks</strong> to <a href="./link">school</a>')

// Match across formatting and link boundaries.
doc.has('walks to') // true

doc.verbs().toPastTense()
doc.updateHast()
doc.toHtml()
// 'She <strong>walked</strong> to <a href="./link">school</a>'
```

### Usage

```js
// Parse an HTML fragment.
const doc = nlp.fromHtml('<p>Hello <em>world</em>.</p>')

// Or connect to an existing HAST tree from another parser.
const other = nlp.fromHast(tree)

doc.match('world').replaceWith('everyone')
doc.updateHast()
doc.toHtml() // '<p>Hello <em>everyone</em>.</p>'

// Inspect which text nodes own the selected terms.
doc.match('everyone').debug('ast')
```

`fromHast()` accepts supported HAST nodes, not browser DOM nodes or arbitrary Unist trees.
It connects to the supplied nodes directly; `updateHast()` changes their text values.
`toHtml()` serializes the last successfully updated tree, without automatically applying edits.

For indented output, use `doc.toHtml({ format: true })`. Formatting operates on a copy,
so the original tree and its term bindings remain available for subsequent edits.
The default, `doc.toHtml()` (or `{ format: false }`), keeps existing source whitespace.

<!-- spacer -->
<img height="20px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

#### Configuration

```js
// passing {fragment: false} ensures the input is wrapped in html/body tags
const snippet = nlp.fromHtml('<p>Hello world.</p>', { fragment: false })
console.log(snippet.toHtml())
// <html><head></head><body><p>Hello world.</p></body></html>
```

- Inline elements contribute their text without markup. Links contribute their labels, not their destinations.
- Block elements such as paragraphs, headings, list items, and blockquotes separate prose. `<br>` and `<hr>` also create boundaries.
- `head`, `script`, `style`, `template`, `table`, `pre`, `code`, `select`, `textarea`, `svg`, and `math` subtrees are excluded from the linguistic text.
- Elements with the `hidden` attribute are excluded. CSS and browser layout are not evaluated.
- Attributes such as `alt`, `title`, and form values are excluded. Comments and doctypes are preserved without contributing text.
- Character references are decoded for matching and escaped as needed during serialization.
- Runs of spaces, tabs, and line breaks collapse to one space for matching, including across inline elements. Write-back preserves the original separators; non-breaking spaces are not collapsed by this normalization.

Skipped content remains in the source tree and serialized output. Matches do not cross
block boundaries or skipped subtrees.

<!-- spacer -->
<img height="20px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

### TypeScript

```ts
import nlp from 'compromise'
import html, { type HtmlNlp, type HtmlOptions } from 'compromise-html'

const htmlNlp: HtmlNlp = nlp.plugin(html)
const options: HtmlOptions = { fragment: true }
const doc = htmlNlp.fromHtml('She <strong>walks</strong> home.', options)

doc.verbs().toPastTense()
doc.updateHast()
const output: string = doc.toHtml()
```

Types are provided for both ESM and CommonJS imports, including `HtmlNode` for HAST input.

### In the browser

Load compromise first, then register the HTML plugin:

Requires **compromise ^14.20.0**, which will include the `onReplace` plugin hook.
The published `14.19.0` release does not include it; use a compatible development
build until `14.20.0` is published. The unpkg example below requires that
compatible release to be available on npm.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>compromise-html example</title>
  </head>
  <body>
    <pre id="output"></pre>
    <script src="https://unpkg.com/compromise/builds/compromise.js"></script>
    <script src="https://unpkg.com/compromise-html/builds/compromise-html.min.js"></script>
    <script>
      nlp.plugin(compromiseHtml)
      const doc = nlp.fromHtml('She <strong>walks</strong> home.')
      doc.verbs().toPastTense()
      doc.updateHast()
      document.getElementById('output').textContent = doc.toHtml()
      // She <strong>walked</strong> home.
    </script>
  </body>
</html>
```

<!-- spacer -->
<img height="20px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

## Parser pedantics

### Many nodes, one term

```js
const doc = nlp.fromHtml('She walk<em>ed</em> to school')
doc.has('walked to') // true

doc.match('walked').replaceWith('ran')
doc.updateHast() // throws; the AST is unchanged
```

A word can belong to several text nodes for matching. Editing that word currently
fails at write-back because ownership of the replacement is ambiguous.

### Replacements across nodes

```js
const doc = nlp.fromHtml('She <strong>walked</strong> to school')
doc.match('walked to').replaceWith('ran toward')
doc.updateHast() // throws; the AST is unchanged
```

Replacements contained in a single text node can grow to multiple terms. Replacements
crossing text nodes are rejected when applying the edit.

### Current limitations

- Deletion, reordering, unbound insertions, and ambiguous cross-node edits throw at `updateHast()`.
- Write-back validates all edits before changing text-node values. A failed update leaves the AST unchanged.
- Original separators are retained; punctuation-only changes are not written back.
- Cloned compromise documents are detached from the source tree.
- Serialization preserves the parsed structure, not the exact original source spelling. Entity spelling, quote styles, and malformed markup may change.

PRs welcome

MIT
