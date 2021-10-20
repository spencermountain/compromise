<div align="center">
  <img src="https://cloud.githubusercontent.com/assets/399657/23590290/ede73772-01aa-11e7-8915-181ef21027bc.png" />

  <div>an export/import plugin for <a href="https://github.com/spencermountain/compromise/">compromise</a></div>
  
  <!-- npm version -->
  <a href="https://npmjs.org/package/compromise-export">
    <img src="https://img.shields.io/npm/v/compromise-ngrams.svg?style=flat-square" />
  </a>
  
  <!-- file size -->
  <a href="https://unpkg.com/compromise-ngrams/builds/compromise-export.min.js">
    <img src="https://badge-size.herokuapp.com/spencermountain/compromise/master/plugins/export/builds/compromise-export.min.js" />
  </a>
   <hr/>
</div>

Compromise documents include a lot of methods, circular, and denormalized data. This plugin adds two methods, (**.export** and **.import**) that allow you to serialize and compress a document into a JSON object, which can easily be written to a database or text-file.

It also allows sending parsed documents in/out of [web-workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers), which can massively speed-up performance.

You can always call `.text()` on a compromise object to get its text back out, to store it, and then re-parse the text at a later time.
But in terms of performance, parsing and tagging a document is [quite involved](https://observablehq.com/@spencermountain/compromise-tagger), and can be avoided using `.export()` and `.import()`.

#### Tradeoffs:

In rough terms, storing an exported document is around 3x larger than the text itself.
However, using `import()` to 'pop it back' into a document is about 10x faster than re-parsing it.

### Install

<div align="center">
  <code>npm install compromise-export</code>
</div>

```js
const nlp = require('compromise')
nlp.extend(require('compromise-export'))

let doc = nlp(`bake 'em away, toys`)
let data = doc.export()
//{ tags:[..], words:[..], list:[] }

let doc2 = nlp.import(data)
doc2.debug() // same
```

### [Demo](https://observablehq.com/@spencermountain/compromise-export)

### API:

- **.export()** - serialize and compress a document into JSON
-
- **.import()** - uncompress JSON data into a compromise object.

### See Also

- [compromise-keypress](../keypress)

MIT
