<div align="center">
  <img src="https://cloud.githubusercontent.com/assets/399657/23590290/ede73772-01aa-11e7-8915-181ef21027bc.png" />

  <div>a plugin for <a href="https://github.com/spencermountain/compromise/">compromise</a></div>
  
  <!-- npm version -->
  <a href="https://npmjs.org/package/compromise-output">
    <img src="https://img.shields.io/npm/v/compromise-verbs.svg?style=flat-square" />
  </a>
  
  <!-- file size -->
  <a href="https://unpkg.com/spacetime/builds/compromise-output.min.js">
    <img src="https://badge-size.herokuapp.com/spencermountain/compromise-verbs/master/builds/compromise-output.min.js" />
  </a>
   <hr/>
</div>

<div align="center">
  <code>npm install compromise-output</code>
</div>

```js
const nlp = require('compromise')
nlp.extend(require('compromise-output'))

let doc = nlp('The Children are right to laugh at you, Ralph')

// generate an md5 hash for the document
doc.hash()
// 'KD83KH3L2B39_UI3N1X'

// create sanitized html from document
doc.html({Person:'red'})
/*
<div>
  <span>The Children are right to laugh at you, <span class="red">Ralph</span></span>
</div>
*/
```

### .hash()
this hash function incorporates the term pos-tags, and whitespace, so that tagging or normalizing the document will change the hash.

Md5 is not considered a very-secure hash, so heads-up if you're doing some top-secret work.

It can though, be used successfully to compare two documents, without looping through tags:
```js
let docA = nlp('hello there')
let docB = nlp('hello there')
console.log(docA.hash() === docB.hash())
// same!

docB.match('hello').tag('Greeting')
console.log(docA.hash() === docB.hash())
// false
```

MIT