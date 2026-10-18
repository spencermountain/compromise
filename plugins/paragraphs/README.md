<div align="center">
  <div><b>compromise-paragraphs</b></div>
  <div>paragraph support for <a href="https://github.com/spencermountain/compromise/">compromise</a></div>
  <div><code>npm install compromise-paragraphs</code></div>
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
    <a href="https://npmjs.org/package/compromise-paragraphs">
    <img src="https://img.shields.io/npm/v/compromise-paragraphs.svg?style=flat-square" />
  </a>
  <a href="https://bundlephobia.com/result?p=compromise-paragraphs">
    <img src="https://badgen.net/bundlejs/min/compromise-paragraphs" />
  </a>
  </div>
</div>
<!-- spacer -->
<img height="20px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

```js
let str = `What's with these homies dissin' my girl? Why do they gotta front? 

What did we ever do to these guys that made them so violent?

Woo-hoo, but you know I'm yours.
Woo-hoo, and I know you're mine.
Woo-hoo, and that's for all time
`

let doc = nlp(str).paragraphs()

doc.length
// 3

doc.json(options)
/*
[
  { text: 'What's with these ...', sentences: [{}, {}] },
  { text: 'What did we ever ...', sentences: [{}] }
]
*/

// get the second paragraph
doc.eq(1).text()
// 'What did we ever ...'

// get the first two sentences of the first paragraph
doc.first().sentences().slice(0, 2)
```

This obvious-seeming feature is tricky because a sentence is a top-level structure to compromise, _(and english grammar!)_, so concatenating sentences together into one thing would have consequences for grammatical tags.

This is a implementation of `.paragraphs()` and associated wrapper methods, for compromise.

This plugin is a (partially-complete) wrapper for sentence objects, so that you can call things like `.text()` and `.json()` on a paragraph, but then drop back down to `.sentences()` after, and work as normal.

The term objects passed into `.paragraphs()` are mutable, so they will actually change when you transform them:

```js
let doc = nlp(str).paragraphs()

doc = doc.filter(p => {
  return p.has('#Determiner guys')
})
// What did we ever do to these guys that made them so violent?
```

### [Demo](https://observablehq.com/@spencermountain/compromise-paragraphs)

## API:

```js
// outputs:
doc.text()
doc.json()

// matches:
doc.match()
doc.not()
doc.if()
doc.ifNo()
doc.has()

// selectors:
doc.sentences()
doc.terms()

// accessors:
doc.eq()
doc.first()
doc.last()

// loops:
doc.forEach()
doc.map()
doc.filter()
```

PRs welcome

MIT
