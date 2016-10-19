<div align="center">
  <strong>nlp_compromise</strong>
  <div>natural-language processing in the browser</div>

  <a href="https://www.codacy.com/app/spencerkelly86/nlp_compromise">
    <img src="https://api.codacy.com/project/badge/grade/82cc8ebd98b64ed199d7be6021488062" />
  </a>
  <a href="https://npmjs.org/package/nlp_compromise">
    <img src="https://img.shields.io/npm/v/nlp_compromise.svg?style=flat-square" />
  </a>
  <a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
    <img src="https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square" />
  </a>
</div>

<div align="center">
  <sub>
    by
    <a href="https://github.com/spencermountain">Spencer Kelly</a> and
    <a href="https://github.com/nlp-compromise/nlp_compromise/graphs/contributors">
      contributors
    </a>
  </sub>
</div>

<div align="center">
  <code>npm install nlp_compromise</code>
</div>
<br/>
```javascript
nlp('Wee-ooh, I look just like buddy holly').toPast().text()
// "Wee-ooh, I looked just like buddy holly."
```
<div align="center">
  <div>a fun way to inspect and play-with english text</div>
  <div>a focus on being [handy, and not overly-fancy](https://github.com/nlp-compromise/nlp_compromise/wiki/Justification)</div>
</div>

### Yup,
* ~**140k** js file
* **86%** on the **Penn treebank** POS-tag test
* keypress speed, constant-time.
* caniuse, uhuh. **IE9+**
* no dependencies, training, configuration, or prolog.

##Grammatical 'reach-in'
```javascript
r = nlp('john is really nice. sara quickly walks.')

//pluck-out some parts
r.remove('#Adverb')

//reach-in and transform parts
r.match('#Person').toTitleCase()

r.plaintext()
// 'John is nice. Sara walks.'
```

##Verb conjugation
```javascript
r = nlp('she sells seashells by the seashore.')
//finds the correct verb to conjugate
r.toFuture().text()
//'she will sell seashells...'

//blast-out all conjugations
r.verbs().conjugate()
// {
//   PastTense: 'sold',
//   Infinitive: 'sell',
//   Gerund: 'selling'
//   ...
// }
```

##Plural/singular
```javascript
r = nlp('a bottle of beer on the wall.')
r.match('bottle').toPlural()
r.text()
//'The bottles of beer on the wall.'
```

##Negation
```javascript
r = nlp('london is calling')
r.toNegative()
//'london is not calling'
```

##Value interpretation
```javascript
r = nlp('fifth of december')

r.values().toNumber().text()
// '5 of december'

r.values().toCardinal().text()
// 'five of december'
```

##Clever normalization
```javascript
r = nlp("björk's the guest-singer at seven thirty.").normalize({contrations:true, case:true, unicode:true, hyphens:true}).text()
//'Bjork is the guest singer at 7:30.'
```

##Ad-hoc output
```javascript
r = nlp('Tony Hawk won.').asHtml()
//<span>
//  <span class="Person Noun MalePerson">Tony Hawk</span>
//  &nbsp;
//  <span class="Verb PastTense">won</span>
//</span>
```

#See also
* [naturalNode](https://github.com/NaturalNode/natural) - decidedly fancier statistical nlp in javascript
* [SuperScript](http://superscriptjs.com/) - clever conversation engine in javascript
* [NodeBox Linguistics](https://www.nodebox.net/code/index.php/Linguistics) - conjugation, inflection, correction etc in javascript
* [reText](https://github.com/wooorm/retext) - very impressive [text utilities](https://github.com/wooorm/retext/blob/master/doc/plugins.md) in javascript
* [jsPos](https://code.google.com/archive/p/jspos/) - the time-tested Brill-tagger in js
* [spaCy](https://spacy.io/) - speedy, multilingual tagger in Python/Cython

(don't forget
[NLTK](http://www.nltk.org/),
[GATE](https://gate.ac.uk),
the [Stanford Parser](http://nlp.stanford.edu/software/lex-parser.shtml),
and
the [Illinois toolkit](http://cogcomp.cs.illinois.edu/page/software/)
)
