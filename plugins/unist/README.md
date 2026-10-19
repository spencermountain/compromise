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

These are cool because they provide a standard way for machines to share parsed documents, and to operate on them in consistent and collaborative ways.

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
          data: { compromise: { tags: ['Expression'] } },
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
          ... (details omitted)
*/

// ↓ convert it back to compromise
const doc2 = nlp.fromAst(tree)
doc2.debug()
// ╭─────────
// │ 'Bernardo' - Expression
// │ 'Who's'    - ProperNoun, Noun
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
const doc = nlp(`wow windows! I don't think I can afford this place`)
const tree = doc.toAst()

const doc2 = nlp.fromAst(tree)
doc2.match('#Verb').text()
// "don't think can afford"
```

Import preserves the tree’s word and sentence boundaries, even if they differ from compromise’s usual tokenization. It does not run the tokenizer or tagger. Re-exporting is not yet a structurally identical round-trip.

Tags in `WordNode.data.compromise.tags` are copied onto the imported terms. Pass `{ tags: false }` to skip them.
If not, you may want to run `.tagger()` on the document, after creating it:

```js
import { ParseEnglish } from 'parse-english'
import nlp from 'compromise'
import plugin from 'compromise-unist'
nlp.plugin(plugin)

// use wooorm's parser
const tree = new ParseEnglish().parse(`wow windows! I don't think I can afford this place`)
// ship it to compromise (no tags)
const doc = nlp.fromAst(tree)
// ╭─────────
// │ 'wow'      -
// │ 'windows'  -
// ╭─────────
// │ 'I'        -
// │ 'don't'    -
// │ 'think'    -
// │ 'I'        -
// │ 'can'      -
// │ 'afford'   -
// │ 'this'     -
// │ 'place'    -

// (tag it)
doc.tagger()
// ╭─────────
// │ 'wow'      - Expression
// │ 'windows'  - Noun, Plural
// ╭─────────
// │ 'I'        - Noun, Pronoun
// │ 'don't'    - Verb, PresentTense, Infinitive
// │ 'think'    - Verb, PresentTense, Infinitive
// │ 'I'        - Noun, Pronoun
// │ 'can'      - Verb, Modal, Auxiliary
// │ 'afford'   - Verb, PresentTense, Infinitive
// │ 'this'     - Determiner
// │ 'place'    - Noun, Singular
```

## Known limitations

Contraction text survives export and import, but implicit expansion terms and their tags do not. For example, compromise represents `can't` with an implicit `not` term tagged `Negative`. That term has no written text and is omitted from the tree, so the imported document loses that tag:

```js
const original = nlp("I can't go.")
const restored = nlp.fromAst(original.toAst())

restored.text()             // "I can't go."
original.has('#Negative')  // true
restored.has('#Negative')  // false
```

The importer keeps the supplied `WordNode` boundaries; it does not recreate implicit contraction terms. Until expansion metadata is preserved, text round-trips should not be treated as preserving all linguistic analysis.

PRs welcome

MIT
