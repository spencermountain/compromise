<div align="center">
  <img src="https://cloud.githubusercontent.com/assets/399657/23590290/ede73772-01aa-11e7-8915-181ef21027bc.png" />

  <div>a plugin for <a href="https://github.com/spencermountain/compromise/">compromise</a></div>
  
  <!-- npm version -->
  <a href="https://npmjs.org/package/compromise-syllables">
    <img src="https://img.shields.io/npm/v/compromise-syllables.svg?style=flat-square" />
  </a>
  
  <!-- file size -->
  <a href="https://unpkg.com/compromise-syllables/builds/compromise-syllables.min.js">
    <img src="https://badge-size.herokuapp.com/spencermountain/compromise-syllables/master/builds/compromise-syllables.min.js" />
  </a>
   <hr/>
</div>

This is a naive syllable tokenizer, and simply splits a compromise document, according to some simple, biased interpretation.

It makes some judgement-calls about pronunciation, but also where splits make the most sense.

<div align="center">
  <code>npm install compromise-syllables</code>
</div>

<h3>
  <a href="https://observablehq.com/@spencermountain/compromise-syllables">Demo</a>
</h3>

```js
const nlp = require('compromise')
nlp.extend(require('compromise-syllables'))

let doc = nlp('Chocolate microscopes?')
doc.terms().syllables()
/*[
  {text:'Chocolate', syllables:['cho', 'co', 'late']},
  {text:'microscopes?', syllables:['mic', 'ro', 'scope']}
]*/
```

`.syllables( {options} )` will pass it's optional first parameter to `.json()`. You can see the full set of options [here](https://observablehq.com/@spencermountain/compromise-json).

Keep in mind there are cultural-differences in syllable pronunciation, which this library has a certain bias.

MIT
