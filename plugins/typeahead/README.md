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
    <code>npm install compromise-typeahead</code>
    <div >Work in progress</div>
  </div>
   <hr/>
</div>
<!-- spacer -->
<div >
  <img height="50px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>
</div>

a plugin that allows *assuming a word*, before it is fully-typed.
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

It only applies to the end of the document, for now.

In addition to assuming the word, a passed-in [lexicon](https://observablehq.com/@spencermountain/compromise-lexicon) will also tag it automatically. If this is not required, you can simply pass-in an array of terms instead.

<!-- spacer -->
<div >
  <img height="15px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>
</div>
cool!
<!-- spacer -->
<div >
  <img height="50px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>
</div>

## Notes:
Typeahead is a dangerous game. Making assumptions about a user's text based on prefix, is very error-prone, especially for small-prefixes.

Great care should be taken when selecting your words for typeahead. 

**[This tool](https://observablehq.com/@spencermountain/prefix-word-lookup)** may help in reviewing a list of potential prefix-collisions. 

...ya but even then, - it's nearly impossible to predict misunderstandings when the interpreter is being greedy.

<!-- spacer -->
<div >
  <img height="30px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>
</div>

So, heads-up.

Three things it does to decrease false-positives - 

##### Block any overlap:
The plugin will not make predictions for any overlapping prefixes, in the given terms.
if **'milan'** and **'milwaukee'** are both given, **'mil'** will not be triggered for anything.
```js
nlp.typeahead(['milan', 'milwaukee'])
nlp('mil').has('(milan|milwaukee)') //false
```

##### Ignore 2-char prefixes:
Prefixes shorter than 3 chars will be ignored.

you can set a lower, or higher minimum with:
```js
nlp.typeahead(['toronto'], { min: 4 })
nlp('tor').has('toronto') //false
nlp('toro').has('toronto') //true
```

##### Block known words:
Prefixes that exist in the compromise lexicon will also be ignored.

these are assumed to be pretty common, full words.

You can disable this by passing-in `safe:false`.
```js
// 'swim' is it's own word.
nlp.typeahead(['swimsuit'])
nlp('swim').has('swimsuit') //false
nlp('swimsu').has('swimsuit') //true

// who cares - do it anyways
nlp.typeahead(['swimsuit'], { safe:false })
nlp('swim').has('swimsuit') //true
```
the compromise lexicon includes ~14k words, but very few common nouns. It is not meant to be a perfect-guard against prefix-collisions, like this.
So please don't lean on this safe feature too-hard.


#### Layering prefixes carefully
you may want to conjure-up a scheme where some words are matched greedier than others.
```js
// layer-one, quite-greedy
nlp.typeahead(['grey', 'gold', 'red'], { min: 2 })
// layer-two, a little safer
nlp.typeahead(['greyhound', 'goldendoodle', 'poodle'], { min: 3 })

nlp('re').has('red')//true
nlp('po').has('poodle')//false

nlp('gr').has('grey')//true
nlp('gre').has('(grey|greyhound)')//false (collision of terms)
nlp('golde').has('goldendoodle')//true
```
Adding more matches will merge into existing prefixes, and automatically remove collisions. 

If you want to get rid of them, you can set the property on the [World object](https://observablehq.com/@spencermountain/compromise-world) directly:
```js
nlp('').world.prefixes = {} //whoosh!
```

<!-- spacer -->
<div >
  <img height="20px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>
</div>
---

<!-- spacer -->
<div >
  <img height="30px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>
</div>


## See Also
* [compromise-keypress](../keypress) - a caching plugin for on-type parsing

**MIT**
