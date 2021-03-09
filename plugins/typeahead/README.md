<div align="center">
  <img src="https://cloud.githubusercontent.com/assets/399657/23590290/ede73772-01aa-11e7-8915-181ef21027bc.png" />

  <div>a plugin for <a href="https://github.com/spencermountain/compromise/">compromise</a></div>
  
  <!-- npm version -->
  <a href="https://npmjs.org/package/compromise-typeahead">
    <img src="https://img.shields.io/npm/v/compromise-typeahead.svg?style=flat-square" />
  </a>
  
  <!-- file size -->
  <a href="https://unpkg.com/compromise-typeahead/builds/compromise-typeahead.min.js">
    <img src="https://badge-size.herokuapp.com/spencermountain/compromise/master/plugins/scan/builds/compromise-typeahead.min.js" />
  </a>
   <hr/>
</div>

<div align="center">
<div >Work in progress</div>
  <code>npm install compromise-typeahead</code>
</div>

a plugin to allow interpreting a word before it is fully-typed.

```js
const nlp = require('compromise')
nlp.extend(require('compromise-typeahead'))

const lexicon = {
  bedfordshire: 'Town',
  aberdeenshire: 'Town',
  buckinghamshire: 'Town',
  argyllshire: 'Town',
  bambridgeshire: 'Town',
  cheshire: 'Town',
  ayrshire: 'Town',
}
// add the words we should predict from
nlp.typeahead(lexicon, { min: 3 })
// create a document
let doc = nlp('i went to bucking', lexicon)
let m = doc.match('#Town')
console.log(m.text())
// 'bucking'
console.log(m.text('implicit'))
// 'buckinghamshire'
```

Work in progress!

### See Also
* [compromise-keypress](../keypress) - a on-type caching plugin

MIT
