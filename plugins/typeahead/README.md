<div align="center">
  <img src="https://cloud.githubusercontent.com/assets/399657/23590290/ede73772-01aa-11e7-8915-181ef21027bc.png" />

  <div>a plugin for <a href="https://github.com/spencermountain/compromise/">compromise</a></div>
  
  <!-- npm version -->
  <a href="https://npmjs.org/package/compromise-typeahead">
    <img src="https://img.shields.io/npm/v/compromise-typeahead.svg?style=flat-square" />
  </a>
  
  <!-- file size -->
  <a href="https://unpkg.com/compromise-typeahead/builds/compromise-typeahead.min.js">
    <img src="https://badge-size.herokuapp.com/spencermountain/compromise/master/plugins/scan/builds/compromise-typeahead.min.js" />
  </a>
  <div align="center">
    <div >Work in progress</div>
    <code>npm install compromise-typeahead</code>
  </div>
   <hr/>
</div>
<!-- spacer -->
<div >
  <img height="50px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>
</div>

a plugin that allows assuming a word, before it is fully-typed.
<div align="center">
  <h4><a href="https://observablehq.com/@spencermountain/compromise-typeahead">Demo</a></h4>
</div>

```js
const nlp = require('compromise') //load the plugin
nlp.extend(require('compromise-typeahead'))

// a bunch of words we're expecting
const lexicon = {
  bedfordshire: 'Town',
  aberdeenshire: 'Town',
  buckinghamshire: 'Town',
  argyllshire: 'Town',
  bambridgeshire: 'Town',
  cheshire: 'Town',
  ayrshire: 'Town',
}
// throw them in
nlp.typeahead(lexicon, { min: 3 })

// ok, create a document
let doc = nlp('i went to bucking', lexicon)

doc.has('buckinghamshire') 
//true!

let m = doc.match('#Town')
console.log(m.text())
// 'bucking'

console.log(m.text('implicit'))
// 'buckinghamshire'
```
You can see, it just kind of pretends the word is there. It uses the same 'implicit' scheme that [contractions do](https://observablehq.com/@spencermountain/compromise-contractions).

In addition to assuming the word, a passed-in [lexicon](https://observablehq.com/@spencermountain/compromise-lexicon) will also tag it automatically. If this is not required, you can simply pass-in an array of terms instead.

cool!
<!-- spacer -->
<div >
  <img height="50px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>
</div>

### Notes
Typeahead is a dangerous game. Making assumptions about a text, based on prefix, is very error-prone, especially for small-prefixes.

Great care should be taken when selecting words for typeahead. 

[This tool](https://observablehq.com/@spencermountain/prefix-word-lookup) may help reviewing a list of prefix-collisions. 

...but even then, it's nearly impossible to predict misunderstandings when the interpreter is being greedy.

<!-- spacer -->
<div >
  <img height="30px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>
</div>

There are three things this plugin does to decrease false-positive matches - 

##### Block the overlap:
* The plugin will not make predictions for any overlapping prefixes, in the given terms.
if **'milan'** and **'milwaukee'** are both given, **'mil'** will not be triggered for anything.
```js
nlp.typeahead(['milan', 'milwaukee'])
nlp('mil').has('(milan|milwaukee)') //false
```

##### Ignore 2-char prefixes:
* by default, prefixes shorter than 3 chars will be ignored.
you can set a lower, or higher minimum with:
```js
nlp.typeahead(['toronto'], { min: 4 })
nlp('tor').has('toronto') //false
nlp('toro').has('toronto') //true
```

##### Block known words:
* by default, any prefixes that exist in the compromise lexicon will also be ignored.
these are assumed to be pretty common, full words.

You can disable this by passing-in `safe:false`
```js
// 'swim' is it's own word.
nlp.typeahead(['swimsuit'])
nlp('swim').has('swimsuit') //false
nlp('swimsu').has('swimsuit') //true

// who cares - do it anyways
nlp.typeahead(['swimsuit'], { safe:false })
nlp('swim').has('swimsuit') //true
```
the compromise lexicon includes ~14k words, but very-few common nouns, and is not meant to be a perfect-guard against prefix-collisions, like this.
So please don't lean on this feature too-hard.

<!-- spacer -->
<div >
  <img height="20px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>
</div>
---

<!-- spacer -->
<div >
  <img height="30px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>
</div>

Work in progress!

### See Also
* [compromise-keypress](../keypress) - a on-type caching plugin

MIT
