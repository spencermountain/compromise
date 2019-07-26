<div align="center">
  <img src="https://cloud.githubusercontent.com/assets/399657/23590290/ede73772-01aa-11e7-8915-181ef21027bc.png" />

  <div>named-entities recognition plugin for <a href="https://github.com/spencermountain/compromise/">compromise</a></div>
  
  <!-- npm version -->
  <a href="https://npmjs.org/package/compromise-things">
    <img src="https://img.shields.io/npm/v/compromise-things.svg?style=flat-square" />
  </a>
  
  <!-- file size -->
  <a href="https://unpkg.com/spacetime/builds/compromise-things.min.js">
    <img src="https://badge-size.herokuapp.com/spencermountain/compromise-things/master/builds/compromise-entities.min.js" />
  </a>
   <hr/>
</div>

<div align="center">
  <code>npm install compromise-things</code>
</div>

```js
const nlp = require('compromise')
nlp.extend(require('compromise-things'))

let doc = nlp('The Children are right to laugh at you, Ralph')
doc.things().debug()
// 'Ralf'
```


MIT