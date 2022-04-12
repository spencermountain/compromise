<div align="center">
  <img src="https://cloud.githubusercontent.com/assets/399657/23590290/ede73772-01aa-11e7-8915-181ef21027bc.png" />

  <div>pronounciation metadata plugin for <a href="https://github.com/spencermountain/compromise/">compromise</a></div> 

  <!-- npm version -->
  <a href="https://npmjs.org/package/compromise-speech">
    <img src="https://img.shields.io/npm/v/compromise-speech.svg?style=flat-square" />
  </a>
  
  <!-- file size -->
  <a href="https://unpkg.com/compromise-speech/builds/compromise-speech.min.js">
    <img src="https://badge-size.herokuapp.com/spencermountain/compromise/master/plugins/speech/builds/compromise-speech.min.js" />
  </a>

  <div align="center">
    <code>npm install compromise-speech</code>
  </div>
</div>

<!-- spacer -->
<img height="30px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

### Syllables
Tokenize a word approximately by it's pronounced syllables. We use a custom rule-based alortithm for this.
```js
import plg from 'compromise-speech'
nlp.extend(plg)

let doc = nlp('seventh millenium. white collar')
doc.syllables()
[ [ 'se', 'venth', 'mil', 'le', 'nium' ], [ 'white', 'col', 'lar' ] ]
```

Alternatively, if you'd like to combine syllable information with other properties, you can use `.compute('syllables')`
```js
let doc = nlp('edmonton oilers')
doc.compute('syllables')
doc.json()
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

MIT