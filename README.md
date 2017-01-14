<div align="center">
  <img src="https://cloud.githubusercontent.com/assets/399657/21955696/46e882d4-da3e-11e6-94a6-720c34e27df7.jpg" />
  <div>natural language processing, actually in the browser</div>
  <a href="https://www.codacy.com/app/spencerkelly86/nlp_compromise">
    <img src="https://api.codacy.com/project/badge/grade/82cc8ebd98b64ed199d7be6021488062" />
  </a>
  <a href="https://npmjs.org/package/compromise">
    <img src="https://img.shields.io/npm/v/compromise.svg?style=flat-square" />
  </a>
  <a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
    <img src="https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square" />
  </a>
</div>
<div align="center">
  <sub>
    by
    <a href="https://github.com/spencermountain">Spencer Kelly</a> and
    <a href="https://github.com/nlp-compromise/compromise/graphs/contributors">
      contributors
    </a>
  </sub>
</div>
<div align="center">
  <sub>(formerly nlp_compromise)</sub>
</div>
<div align="center">
  <code>npm install compromise</code>
</div>
<br/>
<div align="center">
  inspect and play with english text
  <div>
    focus on being <a href="https://github.com/nlp-compromise/compromise/wiki/Justification">handy, and not overly-fancy.</a>
  </div>
  <code>
  nlp('I look just like buddy holly').sentences().toPastTense().out('text')
  // "I looked just like buddy holly."
  </code>
</div>
<br/>



<h3 align="center">
  <a href="http://nlpcompromise.com">Demos</a>
  <span>&nbsp; | &nbsp;</span>
  <a href="https://github.com/nlp-compromise/compromise/wiki/Getting-Started">Quick-start</a>
  <span>&nbsp; | &nbsp;</span>
  <a href="https://github.com/nlp-compromise/compromise/wiki/API">Docs</a>
  <span>&nbsp; | &nbsp;</span>
  <a href="https://github.com/nlp-compromise/compromise/wiki/Accuracy">Accuracy</a>
</h3>

<div align="center">
  :boom:Welcome to <b>v7</b>:boom:
  <div>
    <a href="https://github.com/nlp-compromise/compromise/wiki/v7-upgrade-instructions">a lot</a>
    has changed!
  </div>
</div>

### Yup,
* a [200k js file](https://unpkg.com/compromise@latest/builds/compromise.min.js)
* **[86%](https://github.com/nlp-compromise/compromise/wiki/Accuracy)** on the **Penn treebank**
* [keypress speed](https://github.com/nlp-compromise/compromise/wiki/Performance), constant-time.
* caniuse, uhuh. **IE9+**
* [no dependencies](https://github.com/nlp-compromise/compromise/wiki/Getting-Started), training, configuration, or prolog

###Grammar, for the win:
```javascript
r = nlp('john is really nice. sara quickly walks.')

//pluck-out some parts
r.remove('#Adverb')

//reach-in and transform parts
r.match('#Person').toTitleCase()

r.plaintext()
// 'John is nice. Sara walks.'
```

###Conjugation:
```javascript
r = nlp('she sells seashells by the seashore.').sentences().toFuture().text()
//'she will sell seashells...'

r.verbs().conjugate()
// [{ PastTense: 'sold',
//    Infinitive: 'sell',
//    Gerund: 'selling', ...
// }]
```

###Plural/singular:
```javascript
r = nlp('a bottle of beer on the wall.')
r.nouns().first().toPlural()
r.text()
//'The bottles of beer on the wall.'
```

###Negation:
```javascript
r = nlp('london is calling')
r.sentences().toNegative()
// 'london is not calling'
```

###Number interpretation:
```javascript
r = nlp('fifth of december')

r.values().toCardinal().text()
// 'five of december'

r.values().toNumber().text()
// '5 of december'
```

###Clever normalization:
```javascript
r = nlp("the guest-singer's björk at seven thirty.").normalize().text()
// 'The guest singer is Bjork at 7:30.'
```

###Named-entity recognition:
```javascript
r = nlp('the opera about richard nixon visiting china')
r.match('(#Person|#Place|#Organization)').data()
// [
//   { text: 'richard nixon', tags: ['Person'] },
//   { text: 'china', tags: ['Place', 'Country'] }
// ]
```

###Fancy outputs:
```javascript
r = nlp('Tony Hawk won').asHtml()
/*
<span>
  <span class="Person Noun MalePerson">Tony Hawk</span>
  <span>&nbsp;</span>
  <span class="Verb PastTense">won</span>
</span>
*/
```
<h3 align="center">
  and yes, ofcourse, there's <a href="https://github.com/nlp-compromise/compromise/wiki/API">a lot more stuff</a>.
</h3>

###Join-in:
<div align="center">
  we're fun, we're using <b>semver</b>, and moving fast.
  <a href="https://github.com/nlp-compromise/compromise/wiki/Contributing">
  :hammer_and_wrench: get involved :dancer: </a>
</div>
<br/>
<div align="center">
  <a href="https://www.youtube.com/watch?v=tk_JGu2AbJY">
    <img src="http://img.youtube.com/vi/tk_JGu2AbJY/mqdefault.jpg"/>
  </a>
  <span> &nbsp; </span>
  <a href="https://www.youtube.com/watch?v=WuPVS2tCg8s">
    <img src="http://img.youtube.com/vi/WuPVS2tCg8s/mqdefault.jpg"/>
  </a>
</div>

#See also
For the former promise-library, see [jnewman/compromise](https://github.com/jnewman/compromise)
(Thanks to the awesome [jnewman](https://github.com/jnewman) for the npm package!)
* **[naturalNode](https://github.com/NaturalNode/natural)** - decidedly fancier, statistical nlp in javascript
* **[SuperScript](http://superscriptjs.com/)** - clever conversation engine in javascript
* **[NodeBox Linguistics](https://www.nodebox.net/code/index.php/Linguistics)** - conjugation, inflection in javascript
* **[reText](https://github.com/wooorm/retext)** - very impressive [text utilities](https://github.com/wooorm/retext/blob/master/doc/plugins.md) in javascript
* **[jsPos](https://code.google.com/archive/p/jspos/)** - js-build of the time-tested Brill-tagger
* **[spaCy](https://spacy.io/)** - speedy, multilingual tagger in C/python

(don't forget
[NLTK](http://www.nltk.org/),
[GATE](https://gate.ac.uk),
[Stanford](http://nlp.stanford.edu/software/lex-parser.shtml),
and
[Illinois toolkit](http://cogcomp.cs.illinois.edu/page/software/)
)
