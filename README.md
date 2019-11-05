<div align="center">
  <div><b>compromise</b></div>
  <img src="https://user-images.githubusercontent.com/399657/68222691-6597f180-ffb9-11e9-8a32-a7f38aa8bded.png"/>
  <div>modest natural language processing</div>

  <div align="center">
    <sub>
      by
      <a href="https://github.com/spencermountain">Spencer Kelly</a> and
      <a href="https://github.com/spencermountain/compromise/graphs/contributors">
        many contributors
      </a>
    </sub>
  </div>
  <img height="25px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>
</div>

<div align="center">
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


<div align="center">
  compromise is not <a href="https://github.com/spencermountain/compromise/wiki/Justification">the cleverest</a>.
  <br/>
  but it is
  <a href="https://beta.observablehq.com/@spencermountain/compromise-filesize">small,
  <a href="https://beta.observablehq.com/@spencermountain/compromise-performance">quick</a>,
  and <a href="https://beta.observablehq.com/@spencermountain/compromise-accuracy">good-enough</a> for a bunch of stuff.
</div>


### .match():
compromise makes it simple to interpret and match text:
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
it can reliably conjugate and negate verbs in any tense:
```js
let doc = nlp('she sells seashells by the seashore.').verbs().toPastTense()
doc.text()
// 'she sold seashells by the seashore.'
```
<div align="center">
  <img height="50px" src="https://user-images.githubusercontent.com/399657/68221824-09809d80-ffb8-11e9-9ef0-6ed3574b0ce8.png"/>
</div>

### .nouns():
it can transform nouns to plural and possessive forms:
```js
let doc = nlp('the purple dinosaur').nouns().toPlural()
doc.text()
// 'the purple dinosaurs'
```
<div align="center">
  <img height="50px" src="https://user-images.githubusercontent.com/399657/68221731-e8b84800-ffb7-11e9-8453-6395e0e903fa.png"/>
</div>


### .numbers():
it can interpret plaintext numbers
```js
nlp.extend(require('compromise-numbers'))

let doc = nlp('ninety five thousand and fifty two')
doc.numbers().toNumber().add(2)
doc.text()
// '95054'
```
<div align="center">
  <img height="50px" src="https://user-images.githubusercontent.com/399657/68221814-05ed1680-ffb8-11e9-8b6b-c7528d163871.png"/>
</div>

### .topics():
grabbing subjects is a one-liner:
```js
nlp.extend(require('compromise-entities'))

nlp(buddyHolly).people().if('mary').json()
// [{text:'Marry Tyler Moore'}]

nlp(freshPrince).places().first().text()
// 'West Phillidelphia'

doc = nlp('the opera about richard nixon visiting china')
doc.topics().json()
// [
//   { text: 'richard nixon' },
//   { text: 'china' }
// ]
```
<div align="center">
  <img height="50px" src="https://user-images.githubusercontent.com/399657/68221632-b9094000-ffb7-11e9-99e0-b48edd6cdf8a.png"/>
</div>

### .contractions():
these always confuse every plaintext regex:
```js
let doc =nlp("we're not gonna take it, no we ain't gonna take it.")

// match within a contraction
doc.has('going') // true

// transform 
doc.contractions().expand()
dox.text()
// 'we are not going to take it, no we are not going to take it.'
```

<div align="center">
  <img src="https://user-images.githubusercontent.com/399657/68221731-e8b84800-ffb7-11e9-8453-6395e0e903fa.png"/>
  <!-- spacer -->
  <img height="30" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>
</div>

Use it on the client-side: 
```html
<script src="https://unpkg.com/compromise"></script>
<script>
  var doc = nlp('dinosaur')

  var str = doc.nouns().toPlural().out('text')
  console.log(str)
  // 'dinosaurs'
</script>
```
or as an esmodule:
```typescript
import nlp from 'compromise'

var doc = nlp('London is calling')
doc.verbs().toNegative()
// 'London is not calling'
```

<!-- spacer -->
<img height="30" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

compromise is **170kb**:
<div align="center">
  <!-- filesize -->
  <img width="600" src="https://user-images.githubusercontent.com/399657/68234819-14dfc300-ffd0-11e9-8b30-cb8545707b29.png"/>
</div>

it's pretty fast. It can run on keypress:
<div align="center">
  <img width="600" src="https://user-images.githubusercontent.com/399657/68234798-0abdc480-ffd0-11e9-9ac5-8875d185a631.png"/>
</div>

it works mainly by conjugating/inflecting many forms a base word list. 

The final lexicon is 14,000 words:
<div align="center">
  <img width="600" src="https://user-images.githubusercontent.com/399657/68234805-0d201e80-ffd0-11e9-8dc6-f7a600352555.png"/>
</div>
you can read more about how it works, [here](http://blog.spencermounta.in/2019/building-compromise/index.html)

<!-- spacer -->
  <!-- <img height="25px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/> -->
<div align="center">
  <img src="https://user-images.githubusercontent.com/399657/68221814-05ed1680-ffb8-11e9-8b6b-c7528d163871.png"/>
</div>

### .extend():
There are two ways to configure compromise results -

**One** is to pass-in an object with your own words:
```js
let doc = nlp(muppetText, {kermit:'FirstName', fozzie:'FirstName'})
```

the **second** is more powerful:
```js
const nlp = require('compromise')

nlp.extend((Doc, world) => {
  
  // augment the internal tagset
  world.addTags({
    Character: {
      isA: 'Person',
      notA: 'Adjective',
    },
  })

  // add some words to the lexicon
  world.addWords({
    kermit: 'Character',
    gonzo: 'Character',
  })

  // methods to run after the tagger
  world.postProcess(doc => {
    doc.match('light the lights').tag('#Verb . #Plural')
  })

  // add a new method
  Doc.prototype.kermitVoice = function() {
    this.sentences().prepend('well,')
    this.match('i [(am|was)]').prepend('um,')
    return this
  }
})
```
you can read more about [.extend() here](https://observablehq.com/@spencermountain/compromise-plugins) .
<div align="center">
  <img height="50px" src="https://user-images.githubusercontent.com/399657/68221848-11404200-ffb8-11e9-90cd-3adee8d8564f.png"/>
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
* **[Microservice Recipe](https://eventn.com/recipes/text-parsing-with-nlp-compromise)**  -  by Eventn

* **[Building Text-Based Games](https://killalldefects.com/2019/09/24/building-text-based-games-with-compromise-nlp/)**  -  by Matt Eland
* **[Fun with javascript in BigQuery](https://medium.com/@hoffa/new-in-bigquery-persistent-udfs-c9ea4100fd83#6e09)**  -  by Felipe Hoffa
##### Talks:
* **[Language as an Interface](https://www.youtube.com/watch?v=WuPVS2tCg8s)**  -  by Spencer Kelly
* **[Coding Chat Bots](https://www.youtube.com/watch?v=c_hmwFwvO0U)**  -  by KahWee Teng

<div align="center">
  <img height="50px" src="https://user-images.githubusercontent.com/399657/68221824-09809d80-ffb8-11e9-9ef0-6ed3574b0ce8.png"/>
</div>

##### Some Cool Applications:
* **[Chat dialogue framework](http://superscriptjs.com/)**  -  by Rob Ellis
* **[Automated Bechdel Test](https://github.com/guardian/bechdel-test)**  -  by The Guardian
* **[Tumbler blog of lists](https://leanstooneside.tumblr.com/)**  -  horse-ebooks-like lists -  by Michael Paulukonis
* **[Story generation](https://perchance.org/welcome)**  -  by Jose Phrocca
* **[Browser extension Fact-checking](https://github.com/AlexanderKidd/FactoidL)**  -  by Alexander Kidd
* **[Video Transcription and Editing](https://newtheory.io/)** -  by New Theory
* **[Siri shortcut](https://routinehub.co/shortcut/3260)**  -  by Michael Byrns 
* **[Amazon skill](https://github.com/tajddin/voiceplay)**  -  by Tajddin Maghni
* **[Tasking slack-bot](https://github.com/kevinsuh/toki)**  -  by Kevin Suh

<!-- spacer -->
<div align="center">
  <img height="25px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>
  <hr/>
</div>

#### FAQ

<ul align="left">
  <p>
    <details>
      <summary>☂️ Isn't javascript too...</summary>
      <p></p>
      <ul>
        yeah it is!
        <br/>
        it wasn't built to compete with NLTK, and may not fit every project.
        <br/>
        string processing is synchronous too, and parallelizing node processes is weird.
        <br/>
        See <a href="https://beta.observablehq.com/@spencermountain/compromise-performance">here</a> for information about speed & performance, and
        <a href="https://github.com/spencermountain/compromise/wiki/Justification">here></a> for project motivations
      </ul>
      <p></p>
    </details>
  </p>  
  <p>
    <details>
      <summary>💃 Can it run on my arduino-watch?</summary>
      <p></p>
      <ul>
        Only if it's water-proof!
        <br/>
        Read <a href="https://github.com/spencermountain/compromise/wiki/QuickStart">quickStart</a> for all sorts of funny environments.
      </ul>
      <p></p>
    </details>
  </p>
  <p>
    <details>
      <summary>🌎 Compromise in other Languages?</summary>
      <p></p>
      <ul>
        okay! <br/>
        we've got work-in-progress forks for <a href="https://github.com/nlp-compromise/de-compromise">German</a> and <a href="https://github.com/nlp-compromise/fr-compromise">French</a>, in the same philosophy.
        <br/>
        Get involved!
      </ul>
      <p></p>
    </details>
  </p>
  <p>
    <details>
      <summary>✨ Partial builds?</summary>
      <p></p>
      <ul>
        compromise is one function so can't really be tree-shaken.
        <br/> .. and the tagging methods are competitive, so it's not recommended to pull things out.
        <br/>
        It's best to load the library fully, given it's smaller than <a href="https://68.media.tumblr.com/tumblr_m674jlpyPT1ry8fquo1_250.gif">this gif</a>.
        <br/>
        A plug-in scheme is in the works.
      </ul>
      <p></p>
    </details>
  </p>
</ul>



<div align="center">
  <img src="https://user-images.githubusercontent.com/399657/68221731-e8b84800-ffb7-11e9-8453-6395e0e903fa.png"/>
</div>

#### See Also:
* &nbsp; **[naturalNode](https://github.com/NaturalNode/natural)** - fancier statistical nlp in javascript
* &nbsp; **[superScript](http://superscriptjs.com/)** - clever conversation engine in js
* &nbsp; **[nodeBox linguistics](https://www.nodebox.net/code/index.php/Linguistics)** - conjugation, inflection in javascript
* &nbsp; **[reText](https://github.com/wooorm/retext)** - very impressive [text utilities](https://github.com/wooorm/retext/blob/master/doc/plugins.md) in javascript
* &nbsp; **[jsPos](https://code.google.com/archive/p/jspos/)** - javascript build of the time-tested Brill-tagger
* &nbsp; **[spaCy](https://spacy.io/)** - speedy, multilingual tagger in C/python

<img height="25px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

**MIT**
