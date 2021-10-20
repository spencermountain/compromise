<div align="center">
  <img src="https://cloud.githubusercontent.com/assets/399657/23590290/ede73772-01aa-11e7-8915-181ef21027bc.png" />

  <div>a plugin for <a href="https://github.com/spencermountain/compromise/">compromise</a></div>
  
  <!-- npm version -->
  <a href="https://npmjs.org/package/compromise-scan">
    <img src="https://img.shields.io/npm/v/compromise-scan.svg?style=flat-square" />
  </a>
  
  <!-- file size -->
  <a href="https://unpkg.com/compromise-scan/builds/compromise-scan.min.js">
    <img src="https://badge-size.herokuapp.com/spencermountain/compromise/master/plugins/scan/builds/compromise-scan.min.js" />
  </a>
   <hr/>
</div>

<div align="center">
  <code>npm install compromise-scan</code>
</div>

a very-fast lookup for compromise documents, when you have a lot of terms to look up.

```js
const nlp = require('compromise')
nlp.extend(require('compromise-scan'))

// create a compressed lookup trie
let trie = nlp.buildTrie(['two three four', 'three'])
// create a document
let doc = nlp('one two three four five.')
// throw it at a document
let m = doc.scan(trie)
m.debug()

// throw it at other documents
nlp('three four five six.').scan(trie)
nlp('one two. seven eight nine.').scan(trie)
```

compared to our typical lookup function, it's outrageously fast.

based on [BrunoRB/ahocorasick](https://github.com/BrunoRB/ahocorasick) by Bruno Roberto Búrigo.

MIT
