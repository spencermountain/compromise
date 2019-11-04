<div align="center">
  <img src="https://cloud.githubusercontent.com/assets/399657/23590290/ede73772-01aa-11e7-8915-181ef21027bc.png" />

  <div>an emoji plugin for <a href="https://github.com/spencermountain/compromise/">compromise</a></div>
  
  <!-- npm version -->
  <a href="https://npmjs.org/package/compromise-emoji">
    <img src="https://img.shields.io/npm/v/compromise-emoji.svg?style=flat-square" />
  </a>
  
  <!-- file size -->
  <a href="https://unpkg.com/spacetime/builds/compromise-emoji.min.js">
    <img src="https://badge-size.herokuapp.com/spencermountain/compromise-emoji/master/builds/compromise-emoji.min.js" />
  </a>
   <hr/>
</div>

<div align="center">
  <code>npm install compromise-emoji</code>
</div>

This plugin tags all emojis and emoticons with an `Emoji` tag.

```js
const nlp = require('compromise')
nlp.extend(require('compromise-emoji'))

let doc = nlp('i ate the chocolate cake ;)')
doc.emoji('walk', 'run')

```

work-in-progress

MIT