<div align="center">
  <img src="https://cloud.githubusercontent.com/assets/399657/23590290/ede73772-01aa-11e7-8915-181ef21027bc.png" />

  <div>a 'memoization' plugin for <a href="https://github.com/spencermountain/compromise/">compromise</a></div>
  
  <!-- npm version -->
  <a href="https://npmjs.org/package/compromise-keypress">
    <img src="https://img.shields.io/npm/v/compromise-keypress.svg?style=flat-square" />
  </a>
  
  <!-- file size -->
  <a href="https://unpkg.com/compromise-dates/builds/compromise-keypress.min.js">
    <img src="https://badge-size.herokuapp.com/spencermountain/compromise/master/plugins/keypress/builds/compromise-keypress.min.js" />
  </a>
   <hr/>
</div>

If you're parsing a document that's changing in real-time, it's wasteful to re-parse the whole document each time one character changes.

This plugin adds a new function `nlp.keypress()` to the compromise object.
This method works the same as the main `nlp()` object, except it remembers each sentence, and only re-analyses a sentence if it changes.

<div align="center">
  <code>npm install compromise-keypress</code>
</div>

```js
const nlp = require('compromise')
nlp.extend(require('compromise-keypress'))

let doc = nlp.keypress('Seven bottles of beer on the wall.')

doc = nlp.keypress('Seven bottles of beer on the wall. Six bottles of beer...')
// only re-tags the second sentence

nlp.clear() // invalidate the cache
// (free-up any cached sentences from memory)
```

`.keypress()` automatically deletes unused cached sentences, so extended-use shouldn't hog-up memory needlessly.

Work in progress.

### See Also

- [compromise-export](../export)

MIT
