<div align="center">
  <img src="https://cloud.githubusercontent.com/assets/399657/23590290/ede73772-01aa-11e7-8915-181ef21027bc.png" />

  <div>date-parsing plugin for <a href="https://github.com/spencermountain/compromise/">compromise</a></div>
  
  <!-- npm version -->
  <a href="https://npmjs.org/package/compromise-dates">
    <img src="https://img.shields.io/npm/v/compromise-things.svg?style=flat-square" />
  </a>
  
  <!-- file size -->
  <a href="https://unpkg.com/spacetime/builds/compromise-dates.min.js">
    <img src="https://badge-size.herokuapp.com/spencermountain/compromise-dates/master/builds/compromise-entities.min.js" />
  </a>
   <hr/>
</div>

<div align="center">
  <code>npm install compromise-dates</code>
</div>

```js
const nlp = require('compromise')
nlp.extend(require('compromise-dates'))

let doc = nlp('my birthday is June 5th 1998')
doc.dates().data()
/*[
  {text:'June 5th 1998', normal:'june 5th 1998'}
]*/
```


MIT