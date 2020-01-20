<div align="center">
  <img src="https://cloud.githubusercontent.com/assets/399657/23590290/ede73772-01aa-11e7-8915-181ef21027bc.png" />

  <div>a plugin for <a href="https://github.com/spencermountain/compromise/">compromise</a></div>
  
  <!-- npm version -->
  <a href="https://npmjs.org/package/compromise-export">
    <img src="https://img.shields.io/npm/v/compromise-ngrams.svg?style=flat-square" />
  </a>
  
  <!-- file size -->
  <a href="https://unpkg.com/compromise-ngrams/builds/compromise-export.min.js">
    <img src="https://badge-size.herokuapp.com/spencermountain/compromise-export/master/builds/compromise-export.min.js" />
  </a>
   <hr/>
</div>

<div align="center">
  <code>npm install compromise-export</code>
</div>

```js
const nlp = require('compromise')
nlp.extend(require('compromise-export'))

let doc = nlp(`bake 'em away, toys`)
let data = doc.export()
//{ . . . }

let doc2 = nlp.import(data)
doc2.debug() // same
```

### [Demo](https://observablehq.com/@spencermountain/compromise-export)

### API:

- **.export()** -

MIT
