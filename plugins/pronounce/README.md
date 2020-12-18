<div align="center">
  <img src="https://cloud.githubusercontent.com/assets/399657/23590290/ede73772-01aa-11e7-8915-181ef21027bc.png" />

  <div>a plugin for <a href="https://github.com/spencermountain/compromise/">compromise</a></div>
  
  <!-- npm version -->
  <a href="https://npmjs.org/package/compromise-pronounce">
    <img src="https://img.shields.io/npm/v/compromise-pronounce.svg?style=flat-square" />
  </a>
  
  <!-- file size -->
  <a href="https://unpkg.com/compromise-pronounce/builds/compromise-pronounce.min.js">
    <img src="https://badge-size.herokuapp.com/spencermountain/compromise/master/plugins/pronounce/builds/compromise-pronounce.min.js" />
  </a>
   <hr/>
</div>

<div align="center">
  <code>npm install compromise-pronounce</code>
</div>
an [nlp_compromise](https://github.com/nlp-compromise/nlp_compromise) plugin for a phonetic spelling of text.

it is a [metaphone](https://en.wikipedia.org/wiki/Metaphone) implementation in javascript, based on Chris Umbel's great work in [naturalNode](https://github.com/NaturalNode/natural/blob/master/lib/natural/phonetics/metaphone.js)

```javascript
var nlp = require('compromise')
var plugin = require('compromise-pronounce')
nlp.extend(plugin)

var doc = nlp('Phil Collins')
console.log(doc.pronounce())
/*[{
    text: 'Phil Collins',
    pronounce: 'fil kolins'
  }]
*/
```

it also takes advantage of the tokenization & cleverness of nlp_compromise.

it's not been properly tested.

Note that 'th' is transformed to `0` [1](https://en.wikipedia.org/wiki/Metaphone)

MIT
