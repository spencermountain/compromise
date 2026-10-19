<div align="center">
  <div><b>compromise-unist</b></div>
  <div>read and write Abstract Syntax Trees in <a href="https://github.com/spencermountain/compromise/">compromise</a></div>
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

This plugin allows reading and writing Abstract Syntax Trees in [Unist](https://github.com/syntax-tree/unist)-style [NLCST Format](https://github.com/syntax-tree/nlcst)

These are cool because they provide a standard way for machines to share parsed documents, and to operate on them in consistent and collabertaive ways.

The NLCST format is a natural-language specific AST, with support for defining tokenization, offsets, and word metadata.

```js
import nlp from 'compromise'
import plugin from 'compromise-unist'
nlp.plugin(plugin)

const doc = nlp(`Bernardo: Who's there?`)
const tree = doc.toAst()
/* 
{
  type: 'RootNode',
  children: [{
    type: 'ParagraphNode',
    children: [{
      type: 'SentenceNode',
      children: [{
          type: 'WordNode',
          children: [{
            type: 'TextNode',
            value: 'Bernardo',
            position: {
              start: { line: 1, column: 1, offset: 0 },
              end: { line: 1, column: 9, offset: 8 },
            },
          }],
          data: { compromise: { tags: ['Noun','Person','FirstName'] } },
        },
        { type: 'PunctuationNode', value: ':' },
        { type: 'WhiteSpaceNode', value: ' ' },
        {
          type: 'WordNode',
          children: [
            { type: 'TextNode', value: 'Who' },
            { type: 'PunctuationNode', value: "'" },
            { type: 'TextNode', value: 's' },
          ],
          ... (details ommitted)
*/

// ↓ convert it back to compromise
const doc2 = nlp.fromAst(tree)
doc2.debug()
// ╭─────────
// │ 'Bernardo'  - Person, FirstName, Noun
// │ '[who]'    - ProperNoun, Noun
// │ '[is]'     - Verb, Copula, PresentTense
// │ 'there'    - Noun, Uncountable
```

## Usage

##### .toAst()

This method converts the compromise document as-is, into a valid NLCST tree.

The tree follows **document → paragraphs → sentences → words**, with punctuation and whitespace preserved.

By default, we add optional position offsets to every node, and compromise tags on every WordNode.

You can turn this off with:

```js
const tree = nlp('Hello world!').toAst({ tags: false, positions: false })
// {
//   type: 'RootNode',
//   children: [{
//     type: 'ParagraphNode',
//     children: [{
//       type: 'SentenceNode',
//       children: [
//         { type: 'WordNode', children: [{ type: 'TextNode', value: 'Hello' }] },
//         { type: 'WhiteSpaceNode', value: ' ' },
//         { type: 'WordNode', children: [{ type: 'TextNode', value: 'world' }] },
//         { type: 'PunctuationNode', value: '!' },
//       ],
//     }],
//   }],
// }
```

#### .fromAst()

Likewise, NLCST trees can be ingested into compromise, like so:

```js
const doc1 = nlp(`wow windows! I don't think I can afford this place`)
const tree.toAst()

const doc = nlp.fromAst(myTree)
doc.match('#Verb').text()
// 'afford'
```

If the AST comes from compromise, it will grab the tags for the terms, and set them automatically.
If not, you may want to run `.tagger()`

```js
const otherTree
```

PRs welcome

MIT
