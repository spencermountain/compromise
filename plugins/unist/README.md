<div align="center">
  <div><b>compromise-unist</b></div>
  <div>parse and transform text in markdown/html</div>
  <div><code>npm install compromise-unist</code></div>
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
    <a href="https://npmjs.org/package/compromise-unist">
    <img src="https://img.shields.io/npm/v/compromise-unist.svg?style=flat-square" />
  </a>
  <a href="https://bundlephobia.com/result?p=compromise-unist">
    <img src="https://badgen.net/bundlejs/min/compromise-unist" />
  </a>
  </div>
</div>
<!-- spacer -->
<img height="20px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

### Usage

```js
import nlp from 'compromise'
import mdPlugin from 'compromise-unist/markdown'
nlp.plugin(mdPlugin)

const md = 'She **walked** to [school](https://school.org)'
const doc = nlp.fromMarkdown(md)

doc.has('walked to') // true

doc.verbs().toPresentTense()
doc.updateTree()

doc.markdown()
// 'She **walks** to [school](https://school.org)'
```

---

## Details

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
