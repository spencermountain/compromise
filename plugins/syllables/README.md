<div align="center">
  <img src="https://cloud.githubusercontent.com/assets/399657/23590290/ede73772-01aa-11e7-8915-181ef21027bc.png" />

  <div>a plugin for <a href="https://github.com/spencermountain/compromise/">compromise</a></div>
  
  <!-- npm version -->
  <a href="https://npmjs.org/package/compromise-syllables">
    <img src="https://img.shields.io/npm/v/compromise-syllables.svg?style=flat-square" />
  </a>
  
  <!-- file size -->
  <a href="https://unpkg.com/spacetime/builds/compromise-syllables.min.js">
    <img src="https://badge-size.herokuapp.com/spencermountain/compromise-syllables/master/builds/compromise-verbs.min.js" />
  </a>
   <hr/>
</div>

This is a naiive syllable tokenizer, and simply splits a compromise document, according to some simple, biased interpretation.

It makes some judgement-calls, about prononciation, but also where splits make the most sense.

<div align="center">
  <code>npm install compromise-syllables</code>
</div>

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



MIT