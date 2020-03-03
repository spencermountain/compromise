<div align="center">
  <img src="https://cloud.githubusercontent.com/assets/399657/23590290/ede73772-01aa-11e7-8915-181ef21027bc.png" />

  <div>a plugin for <a href="https://github.com/spencermountain/compromise/">compromise</a></div>
  
  <!-- npm version -->
  <a href="https://npmjs.org/package/compromise-hash">
    <img src="https://img.shields.io/npm/v/compromise-hash.svg?style=flat-square" />
  </a>
  
  <!-- file size -->
  <a href="https://unpkg.com/compromise-hash/builds/compromise-hash.min.js">
    <img src="https://badge-size.herokuapp.com/spencermountain/compromise/master/plugins/hash/builds/compromise-hash.min.js" />
  </a>
   <hr/>
</div>

<div align="center">
  <code>npm install compromise-hash</code>
</div>

### [Demo](https://observablehq.com/@spencermountain/compromise-hash)

```js
const nlp = require('compromise')
nlp.extend(require('compromise-hash'))

let doc = nlp('The Children are right to laugh at you, Ralph')

// generate an md5 hash for the document
doc.hash()
// 'KD83KH3L2B39_UI3N1X'

let b = doc.clone()
doc.isEqual(b)
//true
```

### .hash()

this hash function incorporates the term pos-tags, and whitespace, so that tagging or normalizing the document will change the hash.

Md5 is not considered a very-secure hash, so heads-up if you're doing some top-secret work.

It can though, be used successfully to compare two documents, without looping through tags:

```js
let docA = nlp('hello there')
let docB = nlp('hello there')
console.log(docA.hash() === docB.hash())
// true

docB.match('hello').tag('Greeting')
console.log(docA.hash() === docB.hash())
// false
```

if you're looking for insensitivity to punctuation, or case, you can normalize or transform your document before making the hash.

```js
let doc = nlp(`He isn't... working  `)
doc.normalize({
  case: true,
  punctuation: true,
  contractions: true,
})

nlp('he is not working').hash() === doc.hash()
// true
```

MIT
