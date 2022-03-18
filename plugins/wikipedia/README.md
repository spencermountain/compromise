<div align="center">
  <img src="https://cloud.githubusercontent.com/assets/399657/23590290/ede73772-01aa-11e7-8915-181ef21027bc.png" />

  <div>Efficient Named-entity Recognition for <a href="https://github.com/spencermountain/compromise/">compromise</a></div> 

  <!-- npm version -->
  <a href="https://npmjs.org/package/compromise-plugin-wikipedia">
    <img src="https://img.shields.io/npm/v/compromise-plugin-wikipedia.svg?style=flat-square" />
  </a>
  
  <!-- file size -->
  <a href="https://unpkg.com/compromise-plugin-wikipedia/builds/compromise-plugin-wikipedia.min.js">
    <img src="https://badge-size.herokuapp.com/spencermountain/compromise/master/plugins/plugin-wikipedia/builds/compromise-plugin-wikipedia.min.js" />
  </a>

  <div align="center">
    <code>npm install compromise-plugin-wikipedia</code>
  </div>
</div>

<!-- spacer -->
<img height="30px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

This plugin provides a highly-compressed list of ~38 thousand popular wikipedia articles, and efficiently scans a text for them.

The plugin is approximately 300kb, minified.

### Wikipedia
```js
import plg from 'compromise-plugin-wikipedia'
nlp.extend(plg)

let doc = nlp('You could always go to McGill, the Harvard of Canada!')
let m = doc.wikipedia()
m.json()
// [...]
```


MIT