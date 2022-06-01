<div align="center">
  <img src="https://cloud.githubusercontent.com/assets/399657/23590290/ede73772-01aa-11e7-8915-181ef21027bc.png" />

  <div>nlp statistics plugin for <a href="https://github.com/spencermountain/compromise/">compromise</a></div> 

  <!-- npm version -->
  <a href="https://npmjs.org/package/compromise-stats">
    <img src="https://img.shields.io/npm/v/compromise-stats.svg?style=flat-square" />
  </a>
  
  <!-- file size -->
  <a href="https://unpkg.com/compromise-stats/builds/compromise-stats.min.js">
    <img src="https://badge-size.herokuapp.com/spencermountain/compromise/master/plugins/plugin-stats/builds/compromise-stats.min.js" />
  </a>

  <div align="center">
    <code>npm install compromise-stats</code>
  </div>
</div>

<!-- spacer -->
<img height="30px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>


##### TFIDF
[tf-idf](https://en.wikipedia.org/wiki/Tf%E2%80%93idf) is a type of word-analysis that can discover the most-characteristic, or unique words in a text.
It combines uniqueness of words, and their frequency in the document.
This plugin comes pre-built with a standard english model, so you can fingerprint an arbitrary text with `.tfidif()`

- **.tfidf(opts, model?)** - 

alternatively, you can build your own model, from a compromise document:
- **.buildIDF()** - 

```js
let model=nlp(shakespeareWords)
let doc = nlp('thou art so sus.')
doc.tfidf()
// [ [ 'sus', 5.78 ], [ 'thou', 2.3 ], [ 'art', 1.75 ], [ 'so', 0.44 ] ]
```

if you want to combine tfidf with other analysis, you can add numbers to individual terms, like this:
```js
let doc = nlp('no, my son is also named Bort')
doc.compute('tfidf')
let json = doc.json()
json[0].terms[6]
// {"text":"Bort", "tags":[], "tfidf":5.78, ... }
```

TF-IDF values are scaled, but have an unbounded maximum. The result for 'foo foo foo foo' would increase every with repitition.

##### Ngrams

- **[.ngrams({})](https://observablehq.com/@spencermountain/compromise-ngram)** - list all repeating sub-phrases, by word-count
- **[.unigrams()](https://observablehq.com/@spencermountain/compromise-ngram)** - n-grams with one word
- **[.bigrams()](https://observablehq.com/@spencermountain/compromise-ngram)** - n-grams with two words
- **[.trigrams()](https://observablehq.com/@spencermountain/compromise-ngram)** - n-grams with three words
- **[.startgrams()](https://observablehq.com/@spencermountain/compromise-ngram)** - n-grams including the first term of a phrase
- **[.endgrams()](https://observablehq.com/@spencermountain/compromise-ngram)** - n-grams including the last term of a phrase
- **[.edgegrams()](https://observablehq.com/@spencermountain/compromise-ngram)** - n-grams including the first or last term of a phrase

all methods support the same option params:
```js
let doc = nlp('one two three. one two foo.')
doc.ngrams({ size: 2 }) // only two-word grams
/*[
  { size: 2, count: 2, normal: 'one two' },
  { size: 2, count: 1, normal: 'two three' },
  { size: 2, count: 1, normal: 'two foo' }
]
*/
```

or all gram-sizes under/over a limit:
```js
let doc = nlp('one two three. one two foo.')
let res = doc.ngrams({ min: 3 }) // or max:2
/*[
  { size: 3, count: 1, normal: 'one two three' },
  { size: 3, count: 1, normal: 'one two foo' }
]
*/
```

MIT