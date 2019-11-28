<div align="center">
  <img src="https://cloud.githubusercontent.com/assets/399657/23590290/ede73772-01aa-11e7-8915-181ef21027bc.png" />

  <div>a plugin for <a href="https://github.com/spencermountain/compromise/">compromise</a></div>
  
  <!-- npm version -->
  <a href="https://npmjs.org/package/compromise-paragraphs">
    <img src="https://img.shields.io/npm/v/compromise-paragraphs.svg?style=flat-square" />
  </a>
  v
  <!-- file size -->
  <a href="https://unpkg.com/compromise-paragraphs/builds/compromise-paragraphs.min.js">
    <img src="https://badge-size.herokuapp.com/spencermountain/compromise-paragraphs/master/builds/compromise-paragraphs.min.js" />
  </a>
   <hr/>
</div>

<div align="center">
  <code>npm install compromise-paragraphs</code>
</div>

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
/*[
  {text:'What's with these ...', sentences:[{},{}]}
  {text:'What did we ever ...', sentences:[{}]}
]*/

// get the second paragraph
doc.eq(1).text()
// 'What did we ever ...'

// get the first two sentences of the first paragraph
doc
  .first()
  .sentences()
  .slice(0, 2)
```

This is a tentative implementation of `.paragraphs()` and associated methods, for compromise.

This is tricky because a sentence is a top-level structure to compromise, (and english grammar!), and combining sentences together would have some consequences about grammatical tags.

Instead, this plugin is a (partially-complete) wrapper for sentence objects, so that you can call things like `.text()` and `.json()` on a paragraph, but then drop back down to `.sentences()` after, and work as normal.

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

outputs:

- .text()
- .json()

matches:

- .match()
- .not()
- .if()
- .ifNo()
- .has()

selectors:

- .sentences()
- .terms()

accessors:

- .eq()
- .first()
- .last()

loops:

- .forEach()
- .map()
- .filter()

MIT
