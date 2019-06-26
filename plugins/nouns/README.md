<div align="center">
  <img src="https://cloud.githubusercontent.com/assets/399657/23590290/ede73772-01aa-11e7-8915-181ef21027bc.png" />

  <div>a plugin for <a href="https://github.com/spencermountain/compromise/">compromise</a></div>
  
  <!-- npm version -->
  <a href="https://npmjs.org/package/compromise-nouns">
    <img src="https://img.shields.io/npm/v/compromise-nouns.svg?style=flat-square" />
  </a>
  
  <!-- file size -->
  <a href="https://unpkg.com/spacetime/builds/compromise-nouns.min.js">
    <img src="https://badge-size.herokuapp.com/spencermountain/compromise-nouns/master/builds/compromise-nouns.min.js" />
  </a>
   <hr/>
</div>

<div align="center">
  <code>npm install compromise-nouns</code>
</div>

```js
const nlp = require('compromise')
nlp.extend(require('compromise-nouns'))

let doc = nlp('The Children are right to laugh at you, Ralph')
doc.nouns().debug()
// 'are'
// 'laugh at'
```


MIT