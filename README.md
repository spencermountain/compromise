<div align="center">
  <div>compromise</div>
  <img src="https://user-images.githubusercontent.com/399657/68222691-6597f180-ffb9-11e9-8a32-a7f38aa8bded.png"/>
  <div>modest natural language processing</div>

  <sub>
    by
    <a href="https://github.com/spencermountain">Spencer Kelly</a> and
    <a href="https://github.com/spencermountain/compromise/graphs/contributors">
      many contributors
    </a>
  </sub>

  <div>
    <a href="https://npmjs.org/package/compromise">
    <img src="https://img.shields.io/npm/v/compromise.svg?style=flat-square" />
  </a>
  <a href="https://www.codacy.com/app/spencerkelly86/nlp_compromise">
    <img src="https://api.codacy.com/project/badge/Coverage/82cc8ebd98b64ed199d7be6021488062" />
  </a>
  <a href="https://unpkg.com/compromise">
    <img src="https://badge-size.herokuapp.com/spencermountain/compromise/master/builds/compromise.min.js" />
  </a>
  </div>
</div>

<!-- spacer -->
<img src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

### .match():
```js
let doc = nlp(entireNovel)
doc.if('the #Adjective of times').text()
// "it was the blurst of times??"
```
```js
if(doc.has('^simon says #Verb+')){
  doThis(doc.match('#Verb+ .*').text())
}else{
  doThis('')
}
```
<div align="center">
  <img height="50px" src="https://user-images.githubusercontent.com/399657/68221837-0d142480-ffb8-11e9-9d30-90669f1b897c.png"/>
</div>

### .verbs():
```js
let doc = nlp().verbs().toPastTense()
doc.text()
// ''
```
<div align="center">
  <img height="50px" src="https://user-images.githubusercontent.com/399657/68221824-09809d80-ffb8-11e9-9ef0-6ed3574b0ce8.png"/>
</div>

### .nouns():
```js
let doc = nlp().nouns().toPlural()
doc.text()
// ''
```
<div align="center">
  <img height="50px" src="https://user-images.githubusercontent.com/399657/68221731-e8b84800-ffb7-11e9-8453-6395e0e903fa.png"/>
</div>


### .numbers():
```js
nlp.extend(require('compromise-numbers'))

let doc = nlp().numbers().add(2)
doc.text()
// ''
```
<div align="center">
  <img height="50px" src="https://user-images.githubusercontent.com/399657/68221814-05ed1680-ffb8-11e9-8b6b-c7528d163871.png"/>
</div>

### .topics():
```js
nlp.extend(require('compromise-entities'))

nlp(buddyHolly).people().if('#MiddleName').json()
// [{text:'Marry Tyler Moore'}]

nlp(freshPrince).places().first().text()
// 'West Phillidelphia'
```
<div align="center">
  <img height="50px" src="https://user-images.githubusercontent.com/399657/68221731-e8b84800-ffb7-11e9-8453-6395e0e903fa.png"/>
</div>


<!-- spacer -->
<div >
  <img height="50px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>
  <hr/>
  <img height="25px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>
</div>

Use on the client-side:
```html
<script src="https://unpkg.com/compromise"></script>
<script>
  var doc = nlp('dinosaur')

  var str = doc.nouns().toPlural().out('text')
  console.log(str)
  // 'dinosaurs'
</script>
```
Or in an esmodule:
```typescript
import nlp from 'compromise'

var doc = nlp('London is calling')
doc.verbs().toNegative()
// 'London is not calling'
```

<!-- spacer -->
<div >
  <img height="25px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>
  <hr/>
  <img height="25px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>
</div>

### API:

##### Whitespace:
* **[.trim()](http://compromise.cool)**  -  remove start and end whitespace
* **[.hyphenate()](http://compromise.cool)** -  connect words with hyphen, and remove whitespace
* **[.dehyphenate()](http://compromise.cool)**  -  remove hyphens between words, and set whitespace


<!-- spacer -->
<div >
  <img height="25px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>
  <hr/>
  <img height="25px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>
</div>

### .extend():
There are two ways to configure compromise:

the first is to pass-in an object of your own words:
```js
let doc = nlp('', {})
```

the second is more powerful:
```js
const nlp = require('compromise')

nlp.extend((Doc, world) => {
  // methods to run after the tagger
  world.postProcess()
  // change the internal lexicon
  world.addWords()
  // augment the compromise tagset
  world.addTags()
})
```
<div align="center">
  <img height="50px" src="https://user-images.githubusercontent.com/399657/68221848-11404200-ffb8-11e9-90cd-3adee8d8564f.png"/>
</div>


<!-- spacer -->
<div >
  <img height="50px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>
</div>

### Docs:
##### Tutorials:
* **[Tutorial #1](http://compromise.cool)**  -  Input → output 
* **[Tutorial #2](http://compromise.cool)**  -  Match & transform 
* **[Tutorial #3](http://compromise.cool)**  -  Making a bot
* **[Tutorial #4](http://compromise.cool)**  -  Making a plugin
##### 3rd party:
* **[Geocoding Social Conversations with NLP and JavaScript](http://compromise.cool)**  -  by Microsoft
* **[Microservice Recipe: Text Parsing With NLP Compromise Library](https://eventn.com/recipes/text-parsing-with-nlp-compromise)**  -  by Eventn

* **[Building Text-Based Games with Compromise](https://killalldefects.com/2019/09/24/building-text-based-games-with-compromise-nlp/)**  -  by Matt Eland
* **[Fun with javascript in BigQuery](https://medium.com/@hoffa/new-in-bigquery-persistent-udfs-c9ea4100fd83#6e09)**  -  by Felipe Hoffa
##### Talks:
* **[Language as an Interface](https://www.youtube.com/watch?v=WuPVS2tCg8s)**  -  by Spencer Kelly
* **[Coding Chat Bots](https://www.youtube.com/watch?v=c_hmwFwvO0U)**  -  by KahWee Teng

<div align="center">
  <img height="50px" src="https://user-images.githubusercontent.com/399657/68221824-09809d80-ffb8-11e9-9ef0-6ed3574b0ce8.png"/>
</div>

##### Some Applications:
* **[SuperScript](http://superscriptjs.com/)** chatbot framework -  by Rob Ellis
* **[Automated Bechdel Test]([cool.com](https://github.com/guardian/bechdel-test))**  -  by The Guardian

<!-- spacer -->
<div >
  <img height="25px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>
  <hr/>
  <img height="25px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>
</div>

#### See Also:
* &nbsp; **[naturalNode](https://github.com/NaturalNode/natural)** - fancier statistical nlp in javascript
* &nbsp; **[superScript](http://superscriptjs.com/)** - clever conversation engine in js
* &nbsp; **[nodeBox linguistics](https://www.nodebox.net/code/index.php/Linguistics)** - conjugation, inflection in javascript
* &nbsp; **[reText](https://github.com/wooorm/retext)** - very impressive [text utilities](https://github.com/wooorm/retext/blob/master/doc/plugins.md) in javascript
* &nbsp; **[jsPos](https://code.google.com/archive/p/jspos/)** - javascript build of the time-tested Brill-tagger
* &nbsp; **[spaCy](https://spacy.io/)** - speedy, multilingual tagger in C/python

MIT
