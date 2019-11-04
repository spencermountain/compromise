<div align="center">
  <img src="https://cloud.githubusercontent.com/assets/399657/23590290/ede73772-01aa-11e7-8915-181ef21027bc.png" />

  <div>a smart-replace plugin for <a href="https://github.com/spencermountain/compromise/">compromise</a></div>
  
  <!-- npm version -->
  <a href="https://npmjs.org/package/compromise-swap">
    <img src="https://img.shields.io/npm/v/compromise-swap.svg?style=flat-square" />
  </a>
  
  <!-- file size -->
  <a href="https://unpkg.com/spacetime/builds/compromise-swap.min.js">
    <img src="https://badge-size.herokuapp.com/spencermountain/compromise-swap/master/builds/compromise-swap.min.js" />
  </a>
   <hr/>
</div>

<div align="center">
  <code>npm install compromise-swap</code>
</div>

```js
const nlp = require('compromise')
nlp.extend(require('compromise-swap'))

let doc = nlp('a priest walked into a bar...')
// first, cache the root form of all the words
doc.cache({ root: true })
// replace '~walk~' with '~run~'
doc.swap('walk', 'run')
doc.text()
// 'a priest ran into a bar...'

```

work-in-progress

MIT