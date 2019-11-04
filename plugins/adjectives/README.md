<div align="center">
  <img src="https://cloud.githubusercontent.com/assets/399657/23590290/ede73772-01aa-11e7-8915-181ef21027bc.png" />

  <div>a plugin for <a href="https://github.com/spencermountain/compromise/">compromise</a></div>
  
  <!-- npm version -->
  <a href="https://npmjs.org/package/compromise-adjectives">
    <img src="https://img.shields.io/npm/v/compromise-adjectives.svg?style=flat-square" />
  </a>
  
  <!-- file size -->
  <a href="https://unpkg.com/spacetime/builds/compromise-adjectives.min.js">
    <img src="https://badge-size.herokuapp.com/spencermountain/compromise-adjectives/master/builds/compromise-adjectives.min.js" />
  </a>
   <hr/>
</div>

<div align="center">
  <code>npm install compromise-adjectives</code>
</div>

Some additional conjugation of adjectives

```js
const nlp = require('compromise')
nlp.extend(require('compromise-adjectives'))

let doc = nlp('quick')
doc.adjectives().json()
/*
  [{
    text:'quick',
    toNoun:'quickness',
    toAdverb:'quickly'
    toVerb:'quicken'
    toComparative:'quicker'
    toSuperlative:'quickest'
  }]
*/

```

work-in-progress

MIT