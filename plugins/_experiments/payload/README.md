<div align="center">
  <img src="https://cloud.githubusercontent.com/assets/399657/23590290/ede73772-01aa-11e7-8915-181ef21027bc.png" />

  <div>An ad-hoc datastore for <a href="https://github.com/spencermountain/compromise/">compromise</a></div>

  <!-- npm version -->
  <a href="https://npmjs.org/package/compromise-payload">
    <img src="https://img.shields.io/npm/v/compromise-payload.svg?style=flat-square" />
  </a>
  
  <!-- file size -->
  <a href="https://unpkg.com/compromise-payload/builds/compromise-payload.min.js">
    <img src="https://badge-size.herokuapp.com/spencermountain/compromise/master/plugins/plugin-payload/builds/compromise-payload.min.js" />
  </a>

  <div align="center">
    <code>npm install compromise-payload</code>
  </div>
</div>

<!-- spacer -->
<img height="30px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

This plugin provides a facilty for storing a retreiving more complex data than tags, for compromise documents and matches.

### payload

```js
import plg from 'compromise-payload'
nlp.extend(plg)

let doc = nlp('i saw John Lennon play the guitar')
doc.people().forEach(m => {
  if (m.has('lennon')) {
    m.addPayload({ height: `5'11` })
  }
  if (m.has('ringo')) {
    m.addPayload({ height: `5'8` })
  }
})
doc.getPayloads()
// [...]
```

MIT
