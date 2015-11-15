#welcome to v2!

###Sentence methods
```javascript
  var s= nlp.pos("Tony Danza is dancing").sentences[0]

  s.tense()
  //present

  s.text()
  //"Tony Danza is dancing"

  s.to_past().text()
  //Tony Danza was dancing

  s.to_present().text()
  //Tony Danza is dancing

  s.to_future().text()
  //Tony Danza will be dancing

  s.negate().text()
  //Tony Danza is not dancing

  s.tags()
  //[ 'NNP', 'CP', 'VB' ]

  s.entities()
  //[{text:"Tony Danza"...}]

  s.people()
  //[{text:"Tony Danza"...}]

  s.nouns()
  //[{text:"Tony Danza"...}]

  s.adjectives()
  //[]

  s.adverbs()
  //[]

  s.verbs()
  //[{text:"dancing"}]

  s.values()
  //[]
````

as sugar, these methods can be called on multiple sentences from the nlp.pos() object too, like:
```javascript
nlp.pos("Tony is cool. Jen is happy.").people()
//[{text:"Tony"}, {text:"Jen"}]
```

###Noun methods:
```javascript
nlp.noun("earthquakes").singularize()
//earthquake

nlp.noun("earthquake").pluralize()
//earthquakes

nlp.noun('veggie burger').is_plural()
//false

nlp.noun('tony danza').is_person()
//true
nlp.noun('Tony J. Danza elementary school').is_person()
//false
nlp.noun('SS Tony danza').is_person()
//false

nlp.noun('hour').article()
//an

nlp.noun('mayors of toronto').conjugate()
//{ plural: 'mayors of toronto', singular: 'mayor of toronto' }

nlp.noun("tooth").pronoun()
//it
nlp.noun("teeth").pronoun()
//they
nlp.noun("Tony Hawk").pronoun()
//"he"
nlp.noun("Nancy Hawk").pronoun()
//"she"

var he = nlp.pos("Tony Danza is great. He lives in L.A.").sentences[1].tokens[0]
he.analysis.reference_to()
//{text:"Tony Danza"...}
```

###Verb methods:
```javascript
nlp.verb("walked").conjugate()
//{ infinitive: 'walk',
//  present: 'walks',
//  past: 'walked',
//  gerund: 'walking'}
nlp.verb('swimming').to_past()
//swam
nlp.verb('swimming').to_present()
//swims
nlp.verb('swimming').to_future()
//will swim
```
###Adjective methods:
```javascript
nlp.adjective("quick").conjugate()
//  { comparative: 'quicker',
//    superlative: 'quickest',
//    adverb: 'quickly',
//    noun: 'quickness'}
```
###Adverb methods
```javascript
nlp.adverb("quickly").conjugate()
//  { adjective: 'quick'}
```



## Part-of-speech tagging
86% on the [Penn treebank](http://www.cis.upenn.edu/~treebank/)
```javascript
nlp.pos("Tony Hawk walked quickly to the store.").tags()
// [ [ 'NNP', 'VBD', 'RB', 'IN', 'DT', 'NN' ] ]

nlp.pos("they would swim").tags()
// [ [ 'PRP', 'MD', 'VBP' ] ]
nlp.pos("the obviously good swim").tags()
// [ [ 'DT', 'RB', 'JJ', 'NN' ] ]
```

## Named-Entity recognition
```javascript
nlp.spot("Joe Carter loves Toronto")
// [{text:"Joe Carter"...}, {text:"Toronto"...}]
```

## Sentence segmentation
```javascript
nlp.sentences("Hi Dr. Miller the price is 4.59 for the U.C.L.A. Ph.Ds.").length
//1

nlp.tokenize("she sells sea-shells").length
//3
```

## Syllable hyphenization
70% on the [moby hyphenization corpus](http://www.gutenberg.org/dirs/etext02/mhyph10.zip)  0.5k
```javascript
nlp.syllables("hamburger")
//[ 'ham', 'bur', 'ger' ]
```

## US-UK Localization
```javascript
nlp.americanize("favourite")
//favorite
nlp.britishize("synthesized")
//synthesised
```
## N-gram
```javascript
str= "She sells seashells by the seashore. The shells she sells are surely seashells."
nlp.ngram(str, {min_count:1, max_size:5})
// [{ word: 'she sells', count: 2, size: 2 },
// ...
options.min_count // throws away seldom-repeated grams. defaults to 1
options.max_size // maximum gram count. prevents the result from becoming gigantic. defaults to 5
```
### Date parsing
```javascript
nlp.value("I married April for the 2nd time on June 5th 1998 ").date()
// { text: 'June 5th 1998',
//   from: { year: '1998', month: '06', day: '05' },
//   to: {} }
```
### Number parsing
```javascript
nlp.value("two thousand five hundred and sixty").number()
//2560
-nlp.value("twenty one hundred").number()
-//2100
-nlp.value("nine two hundred").number()
-//null
```
### Unicode Normalisation
a hugely-ignorant, and widely subjective transliteration of latin, cryllic, greek unicode characters to english ascii.
```javascript
nlp.normalize("Björk")
//Bjork
```
and for fun,
```javascript
nlp.denormalize("The quick brown fox jumps over the lazy dog", {percentage:50})
// The ɋӈїck brown fox juӎÞs over tӊe laζy dog
```
