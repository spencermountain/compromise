<div align="center">
  <img src="https://cloud.githubusercontent.com/assets/399657/23590290/ede73772-01aa-11e7-8915-181ef21027bc.png" />

  <div>a plugin for <a href="https://github.com/spencermountain/compromise/">compromise</a></div>
  
  <!-- npm version -->
  <a href="https://npmjs.org/package/compromise-ngrams">
    <img src="https://img.shields.io/npm/v/compromise-ngrams.svg?style=flat-square" />
  </a>
  
  <!-- file size -->
  <a href="https://unpkg.com/compromise-ngrams/builds/compromise-ngrams.min.js">
    <img src="https://badge-size.herokuapp.com/spencermountain/compromise/master/plugins/ngrams/builds/compromise-ngrams.min.js" />
  </a>
   <hr/>
</div>

<div align="center">
  <code>npm install compromise-ngrams</code>
</div>

```js
const nlp = require('compromise')
nlp.extend(require('compromise-ngrams'))

let doc = nlp(`bake 'em away, toys`)
doc.bigrams().data()
//[{normal:'bake em', size:2, count:1}, {normal:'em away', size:2, count:1}, {normal:'em toys', size:2, count:1}]

//same for:
doc.unigrams()
doc.trigrams()
doc.ngrams({ size: 3 })
```

### [Demo](https://observablehq.com/@spencermountain/compromise-ngram)

### API:

- **.ngrams({})** - list all repeating sub-phrases, by word-count
- **.unigrams(n)** - n-grams with one word
- **.bigrams(n)** - n-grams with two words
- **.trigrams(n)** - n-grams with three words
- **.startgrams({})** - n-grams including the first term of a phrase
- **.endgrams({})** - n-grams including the last term of a phrase
- **.edgegrams({})** - n-grams including the first or last term of a phrase

MIT
