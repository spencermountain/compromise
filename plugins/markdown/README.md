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

This plugin lets you read, and modify a **markdown** document, using compromise.

It uses the [unified/remark](https://unifiedjs.com/explore/package/remark/) parser, and aligns the compromise document with the AST nodes.

When the document changes, it allows writing the modified document back to original markdown.

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
// letsgoo
doc.markdown()
// 'She **walked** to [school](./link)'
```

<!-- spacer -->
<img height="20px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

### Usage

applying the compromise plugin gives you the following methods:

```js
// we parse the markdown for you
nlp.fromMarkdown('hello [world](./world)')
//use your own remark workflow
nlp.fromAst(tree)

// update the tree, after an edit
doc.updateTree()
// output document back to markdown
doc.markdown()
```

By default, the library supports the following Markdown forms:

- [CommonMark](https://spec.commonmark.org/) — _Headings, paragraphs, emphasis, strong text, links, images, lists, blockquotes, code, thematic breaks, and raw HTML_.
- [GitHub Flavored Markdown](https://github.com/micromark/micromark-extension-gfm) — _Tables, task lists, strikethrough, footnotes, and bare URLs_
- [Frontmatter](https://github.com/micromark/micromark-extension-frontmatter) — _YAML (`---`) and TOML (`+++`) metadata blocks at the start of a document._

If you want something more, you can generate a unist tree yourself and use `.fromTree()`.
Note that some markdown syntaxes will gladly pass-through, and compromise wont mind having them.

#### Configuration

There are subjective decisions when making plaintext, and we've allowed configuring these carefully:

````js
const doc = nlp.fromMarkdown(md, {
  headings: 'inline', // ### hello
  strongs: 'inline', // **hello**
  emphases: 'inline', // *hello*
  deletions: 'inline', // ~~hello~~
  links: 'inline', // [hello](./world)
  blockquotes: 'inline', // > hello
  lists: 'inline', // - hello
  paragraphs: 'inline', // hello\nworld
  tables: 'skip', // | Name |\n| --- |\n| hello |
  codeBlocks: 'skip', // ``` ...
  inlineCodes: 'skip', // `hello`
  htmlBlocks: 'skip', // <b>hello</b>
  images: 'skip', // ![hello](hello.jpg)
  thematicBreaks: 'skip', // ---
  breaks: 'skip', // hello \n
  definitions: 'skip', // [hello]: https://example.com
  footnoteDefinitions: 'inline', // [^hello]: A footnote explanation.
  footnoteReferences: 'skip', // hello[^hello]
  yamlBlocks: 'skip', // --- ...
  tomlBlocks: 'skip', // +++ ...
})
````

Both `nlp.fromMarkdown(md, options)` and `nlp.fromAst(tree, options)` accept these modes:

- `'skip'`: exclude the node and its descendants
- `'inline'`: include readable content.
- `'keep'`: include re-constructed markdown syntax

<!-- spacer -->
<img height="20px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

## Parser pedantics

### many nodes, one term:

```js
// inter-term nodes
const doc = nlp.fromMarkdown('She walk*ed* to school')
doc.match('walked') // found

// punctuation
const doc = nlp.fromMarkdown('foo _bar_! and foo _bar!_')
doc.text()
// foo bar! foo bar!
```

updates on these terms will fail:

```js
const doc = nlp.fromMarkdown('She walk*ed*')
doc.match('walked').replaceWith('ran')

doc.updateTree() // fails, or struggles
```

### many terms, between-nodes

```js
const doc = nlp.fromMarkdown('She **walked** to school')

doc.match('walked to').replaceWith('ran toward') // (works)

doc.updateTree() // fails, or struggles
```

buffering while walking tree:

```
Node A: "She walk"
  buffer: "She walk"                 → hold

Node B: "ed"
  buffer: "She walked"               → hold

Node C: " to school. He "
  buffer: "She walked to school. He "
  completed: "She walked to school." → bind its Terms
  remainder: "He "                   → hold
```

PRs welcome

MIT
