<div align="center">
  <div><b>compromise-markdown</b></div>
  <div>parse and transform text inside markdown</div>
  <div><code>npm install compromise-markdown</code></div>
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
    <a href="https://npmjs.org/package/compromise-markdown">
    <img src="https://img.shields.io/npm/v/compromise-markdown.svg?style=flat-square" />
  </a>
  <a href="https://bundlephobia.com/result?p=compromise-markdown">
    <img src="https://badgen.net/bundlejs/min/compromise-markdown" />
  </a>
  </div>
</div>
<!-- spacer -->
<img height="20px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

This plugin lets you read and modify text in a **Markdown** document, using compromise.

It uses [mdast-util-from-markdown](https://github.com/syntax-tree/mdast-util-from-markdown) to parse Markdown and connects compromise terms to the resulting AST nodes.

After editing the compromise document, call `updateTree()` to apply supported changes to the AST and `markdown()` to serialize it.

There are admittedly some complexities, but first:

```js
import nlp from 'compromise'
import mdPlugin from 'compromise-markdown'
nlp.plugin(mdPlugin)

const md = 'She **walks** to [school](./link)'
const doc = nlp.fromMarkdown(md)

// match across a formatting block:
doc.has('walks to')
// true

// convert the document
doc.verbs().toPastTense()
// write it back to the AST,
doc.updateTree()
// serialize the updated tree
doc.markdown()
// 'She **walked** to [school](./link)\n'
```

<!-- spacer -->
<img height="20px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

### In the browser

Load compromise first, then register the Markdown plugin. No bundler is required:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>compromise-markdown example</title>
  </head>
  <body>
    <pre id="output"></pre>

    <script src="https://unpkg.com/compromise/builds/compromise.js"></script>
    <script src="https://unpkg.com/compromise-markdown/builds/compromise-markdown.min.js"></script>
    <script>
      nlp.plugin(compromiseMarkdown)

      const doc = nlp.fromMarkdown('She **walks** to [school](./link)')
      doc.verbs().toPastTense()
      doc.updateTree()

      document.getElementById('output').textContent = doc.markdown()
      // She **walked** to [school](./link)
    </script>
  </body>
</html>
```

These URLs use the latest published packages. For deployment, pin compatible package
versions using `package-name@version` in each URL. Write-back requires a compromise
release with the `onReplace` plugin hook.

### Usage

Registering the plugin adds the following methods:

```js
// we parse the markdown for you
nlp.fromMarkdown('hello [world](./world)')
// use your own parser to produce an mdast tree
nlp.fromMdast(tree)

// update the tree, after an edit
doc.updateTree()
// output document back to markdown
doc.markdown()
```

By default, the library supports the following Markdown forms:

- [CommonMark](https://spec.commonmark.org/) — _Headings, paragraphs, emphasis, strong text, links, images, lists, blockquotes, code, thematic breaks, and raw HTML_.
- [GitHub Flavored Markdown](https://github.com/micromark/micromark-extension-gfm) — _Tables, task lists, strikethrough, footnotes, and bare URLs_
- [Frontmatter](https://github.com/micromark/micromark-extension-frontmatter) — _YAML (`---`) and TOML (`+++`) metadata blocks at the start of a document._

To use another parser, pass its mdast tree to `nlp.fromMdast(tree, options)`. This accepts supported Markdown node types, not arbitrary Unist trees. Custom node types require reader and serializer support.

#### Configuration

There are subjective decisions when making plaintext, and we've allowed configuring these carefully:

````js
const doc = nlp.fromMarkdown(md, {
  headings: 'inline', // ### hello
  strongs: 'inline', // **hello**
  emphases: 'inline', // *hello*
  deletions: 'inline', // ~~hello~~
  links: 'inline', // [hello](./world)
  autolinks: 'inline', // www.example.com
  blockquotes: 'inline', // > hello
  lists: 'keep', // - hello
  taskLists: 'keep', // - [x] hello
  tables: 'skip', // | Name |\n| --- |\n| hello |
  codeBlocks: 'skip', // ``` ...
  inlineCode: 'inline', // `hello`
  htmlBlocks: 'skip', // <b>hello</b>
  images: 'skip', // ![hello](hello.jpg)
  thematicBreaks: 'skip', // ---
  breaks: 'keep', // two trailing spaces followed by a newline
  definitions: 'inline', // [hello]: https://example.com
  footnotes: 'inline', // sets both footnote modes unless specifically overridden
  frontmatter: 'skip', // sets YAML/TOML modes unless specifically overridden
})
````

Both `nlp.fromMarkdown(md, options)` and `nlp.fromMdast(tree, options)` accept these modes:

- `'skip'`: exclude the node and its descendants
- `'inline'`: include readable content.
- `'keep'`: include approximate Markdown syntax

The example above shows the defaults. `footnoteDefinitions`
and `footnoteReferences` override `footnotes`; `yamlBlocks` and `tomlBlocks` override
`frontmatter`. To use a group setting, omit the corresponding specific settings.
`taskLists` overrides task items, while `autolinks` overrides automatically recognized links.
Autolink detection relies on parser positions; external trees without positions use `links`.
`true` and `false` remain aliases for `'keep'` and `'skip'`.

### TypeScript

```ts
import nlp from 'compromise'
import markdown, { type MarkdownNlp, type MarkdownOptions } from 'compromise-markdown'

const mdNlp: MarkdownNlp = nlp.plugin(markdown)
const options: MarkdownOptions = { headings: 'inline', taskLists: 'keep' }
const doc = mdNlp.fromMarkdown('She **walks** home.', options)

doc.verbs().toPastTense()
doc.updateTree()
const output: string = doc.markdown()
```

<!-- spacer -->
<img height="20px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

## Parser pedantics

### many nodes, one term:

```js
// inter-term nodes
const doc = nlp.fromMarkdown('She walk*ed* to school')
doc.match('walked') // found

// punctuation
const punctuation = nlp.fromMarkdown('foo _bar_! and foo _bar!_')
punctuation.text()
// 'foo bar! and foo bar!'
```

Editing a word split across nodes currently fails at write-back:

```js
const doc = nlp.fromMarkdown('She walk*ed*')
doc.match('walked').replaceWith('ran')

doc.updateTree() // throws; the AST is unchanged
```

### many terms, between-nodes

```js
const doc = nlp.fromMarkdown('She **walked** to school')

doc.match('walked to').replaceWith('ran toward') // (works)

doc.updateTree() // throws; the AST is unchanged
```

### Current limitations

- Deletion, reordering, unbound insertions, and ambiguous cross-node edits throw at `updateTree()`.
- Write-back validates all edits before changing text-node values. A failed update leaves the AST unchanged.
- Original spaces and punctuation are preserved; punctuation-only changes are not written back.
- Cloned compromise documents are detached from the source tree.

PRs welcome

MIT
