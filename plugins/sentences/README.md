<div align="center">
  <img src="https://cloud.githubusercontent.com/assets/399657/23590290/ede73772-01aa-11e7-8915-181ef21027bc.png" />

  <div>a plugin for <a href="https://github.com/spencermountain/compromise/">compromise</a></div>
  
  <!-- npm version -->
  <a href="https://npmjs.org/package/compromise-sentences">
    <img src="https://img.shields.io/npm/v/compromise-sentences.svg?style=flat-square" />
  </a>
  
  <!-- file size -->
  <a href="https://unpkg.com/spacetime/builds/compromise-sentences.min.js">
    <img src="https://badge-size.herokuapp.com/spencermountain/compromise-sentences/master/builds/compromise-sentences.min.js" />
  </a>
   <hr/>
</div>

<div align="center">
  <code>npm install compromise-sentences</code>
</div>

```js
const nlp = require('compromise')
nlp.extend(require('compromise-sentences'))

let doc = nlp('Are you shouting boo, or boo-urns? Booo! I was saying boo-urns.')
doc.sentences().length
// 3
```


MIT