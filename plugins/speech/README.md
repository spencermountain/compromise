<div align="center">
  <div><b>compromise-speech</b></div>
  <div>pronounciation plugin for <a href="https://github.com/spencermountain/compromise/">compromise</a></div>
  <div><code>npm install compromise-speech</code></div>
  <div align="center">
    <sub>
      by
      <a href="https://github.com/spencermountain">Spencer Kelly</a>
    </sub>
  </div>
  <img height="25px" src="https://user-images.githubusercontent.com/399657/68221824-09809d80-ffb8-11e9-9ef0-6ed3574b0ce8.png"/>
</div>
<!--2nd row-->
<div align="center">
  <div>
    <a href="https://npmjs.org/package/compromise-speech">
    <img src="https://img.shields.io/npm/v/compromise-speech.svg?style=flat-square" />
  </a>
  <a href="https://bundlephobia.com/result?p=compromise-speech">
    <img src="https://badgen.net/bundlejs/min/compromise-speech" />
  </a>
  </div>
</div>
<!-- spacer -->
<img height="20px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

### Syllables

Tokenize a word approximately by it's pronounced syllables.
We use a custom rule-based alortithm for this, to split the words into intuitive, readable syllable chunks.

```js
import plg from 'compromise-speech'
nlp.extend(plg)

const doc = nlp(`Albertville, Saskatchewan`)
doc.syllables()
/*
[
  [
    'Al',
    'bert',
    'ville,',
    'Sa',
    'skat',
    'che',
    'wan'
  ]
]
*/
```

Results are returned as an array of sentences, split by syllable.

If you want to return the individual words, or any other custom splitting:

```js
const doc = nlp(`Calgary Flames`)
const byTerm = doc.terms().syllables()
// [ [ 'Cal', 'ga', 'ry' ], [ 'Flames' ] ]

const doc = nlp(`it stars Alicia Silverstone and Paul Rudd`)
const pronounceNames = doc.people().syllables()
//[
// [ 'A', 'li', 'cia', 'Sil', 'ver', 'stone' ],
// [ 'Paul', 'Rudd' ]
// ]
```

you can have it operate on normalized words as well:

```js
const doc = nlp(`BACK to Winnipeg!`)
doc.syllables({ normalize: true })
// [ [ 'back', 'to', 'win', 'ni', 'peg' ] ]
```

if you'd like to combine syllable information with other properties, you can use `.compute('syllables')`

```js
let doc = nlp('edmonton oilers')
doc.compute('syllables')
const json = doc.json()
/*[{
  "terms": [
    {
      "normal": "edmonton",
      "syllables": ["ed", "mon", "ton"]
    },
    {
      "normal": "oilers",
      "syllables": ["oi", "lers"]
    }
  ]
}]
*/
```

<!-- spacer -->
<img height="30px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>
<div align="center">
  <img height="50px" src="https://user-images.githubusercontent.com/399657/68221814-05ed1680-ffb8-11e9-8b6b-c7528d163871.png"/>
</div>

### SoundsLike

Generate an expected pronounciation for the word, as a normalized string.
We use the [metaphone implementation](https://en.wikipedia.org/wiki/Metaphone), which is a simple rule-based pronounciation system.

```js
import plg from 'compromise-speech'
nlp.extend(plg)

let doc = nlp('seventh millenium. white collar')
doc.soundsLike()
// [ [ 'sefenth', 'milenium' ], [ 'wite', 'kolar' ] ]
```

Alternatively, if you'd like to combine syllable information with other properties, you can use `.compute('syllables')`

```js
let doc = nlp('edmonton oilers')
doc.compute('soundsLike')
doc.json()
/*[{
  "terms": [
    {
      "normal": "edmonton",
      "soundsLike": "etmonton"
    },
    {
      "normal": "oilers",
      "soundsLike": "oilers"
    }
  ]
}]
*/
```

<!-- spacer -->
<img height="20px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

### Note

Pronunciation is regional, cultural, and even varies person-to-person. Some efforts have been made to support a wide variety of linguistic interpretations, but this may not be very wide indeed.
Please refer to more sophisticated libraries if your application requires it, or help us improve.

### See also

- [Talisman syllable tokenizers](https://yomguithereal.github.io/talisman/tokenizers/syllables) (JavaScript) — returns word chunks using SonoriPy's sonority rules or LegaliPy's onset rules learned from a text corpus. A close comparison for splitting the original spelling.
- [NLTK SyllableTokenizer](https://www.nltk.org/api/nltk.tokenize.sonority_sequencing.html) (Python) — splits words using the Sonority Sequencing Principle, with an English alphabet hierarchy by default; for example, `justification` becomes `jus / ti / fi / ca / tion`.
- [words/syllable](https://github.com/words/syllable) (JavaScript) — estimates English syllable counts, returning a number rather than word chunks.
- [hyphen](https://github.com/ytiurin/hyphen) (JavaScript) — uses Liang's hyphenation algorithm and language-specific patterns to insert line-break opportunities into written words.
- [Hyphenopoly](https://github.com/mnater/Hyphenopoly) (JavaScript/WebAssembly) — hyphenation for browsers and Node. Its [syllabification notes](https://mnater.github.io/Hyphenopoly/Special-use-cases.html#syllabification) explain why line breaks differ from syllable boundaries and describe a German-specific syllable pattern set.

MIT
