
A ***Natural-Language-Processing*** library *in Javascript*, small-enough for the browser, and quick-enough to run on keypress :two_men_holding_hands:

It does [tons of clever things](http://rawgit.com/spencermountain/nlp_compromise/master/client_side/basic_demo/index.html). it's smaller than jquery, and scores 86% on the [Penn treebank](http://www.cis.upenn.edu/~treebank/).
```javascript
nlp.Text('she sells seashells by the seashore').to_past().text()
//she sold seashells by the seashore
```
[![npm version](https://badge.fury.io/js/nlp_compromise.svg)](https://www.npmjs.com/package/nlp_compromise)
[![downloads](https://img.shields.io/npm/dm/nlp_compromise.svg)](https://www.npmjs.com/package/nlp_compromise)

##Check it out
* [Long Text Demo](http://rawgit.com/spencermountain/nlp_compromise/2.0/demos/state_of_the_union/index.html)
* [Verb Conjugation](http://rawgit.com/spencermountain/nlp_compromise/2.0/demos/conjugation/index.html)

> Welcome to v2.0!
> Please [file an issue](https://github.com/spencermountain/nlp_compromise/issues/new) if you find something

# Install
```npm install nlp_compromise```
```javascript
nlp = require("nlp_compromise")
nlp.Text("she sells seashells").to_past().text()
// she sold seashells
nlp.Term("hamburger").syllables()
//[ 'ham', 'bur', 'ger' ]
```

```javascript
<script src="https://rawgit.com/spencermountain/nlp_compromise/2.0/builds/nlp_compromise.es5.js"> </script>
<script>
  nlp.Noun("dinosaur").pluralize()
  //dinosaurs
</script>
```

* Sentence segmentation
```javascript
nlp.Text("Hi Dr. Miller the price is 4.59 for the U.C.L.A. Ph.Ds.").sentences.length
//1
nlp.Text("Tony Danza sells sea-shells").terms().length
//3
```

* Syllable hyphenization
70% on the [moby hyphenization corpus](http://www.gutenberg.org/dirs/etext02/mhyph10.zip)  0.5k
```javascript
nlp.Text("calgary flames").syllables()
//[ 'cal', 'gar', 'y', 'flames']
```

* US-UK Localization
```javascript
nlp.Term("favourite").americanize()
//favorite
nlp.Term("synthesized").britishize()
//synthesised
```
* N-gram
```javascript
nlp.Text("She sells seashells by the seashore.").ngram({min_count:1, max_size:5})
// [{ word: 'she sells', count: 2, size: 2 }, ...
options.min_count // throws away seldom-repeated grams. defaults to 1
options.max_size // maximum gram count. prevents the result from becoming gigantic. defaults to 5
```
* Date parsing
```javascript
nlp.value("I married April for the 2nd time on June 5th 1998 ").date()
// { text: 'June 5th 1998',
//   from: { year: '1998', month: '06', day: '05' },
//   to: {} }
```
* Number parsing
```javascript
nlp.Value("two thousand five hundred and sixty").number
//2560
-nlp.value("twenty one hundred").number
-//2100
-nlp.Value("nine two hundred").number
-//null
```


#API
```javascript
nlp_compromise={
  Text :{
    to_past(),    //she sold seashells
    to_present(), //she sells seashells
    to_future(),  //she will sell seashells
    negate(),     //she doesn't sell seashells
    tags(),       //she sells seashells -> [Noun, Verb, Noun]
    terms(),
    normalised(),
    ngram({max_size:2}),//[[she sells, sells seashells],[she, sells, seashells]]
  },
  Term :{
    syllables(),   //hamburger -> ['ham','bur','ger']
    britishize(),  //favorite -> favourite
    americanize(), //synthesised -> synthesized
    is_capital(),  //Tony Danza -> true
  },
  Sentence :{
    sentence_type(), //declarative, interrogative, exclamative
    terminator(),    //the sentence-ending punctuation
    to_past(),       //she sold seashells
    to_present(),    //she sells seashells
    to_future(),     //she will sell seashells
    negate(),        //she doesn't sell seashells
    tags(),          //she sells seashells -> [Noun, Verb, Noun]
    normalised(),
    text(),
  },
  Verb :{
    to_past(),     //walk -> walked
    to_present(),  //walking -> walk
    to_future(),   //walk -> will walk
    conjugate(),   //all forms {}
    conjugation(), //infinitive,present,past,future
    negate(),      //walk -> didn't walk
    isNegative(),  //is the verb already negated
  },
  Adjective :{
    to_comparative(), //quick -> quicker
    to_superlative(), //quick -> quickest
    to_noun(),        //quick -> quickness
    to_adverb(),      //quick -> quickly
    conjugate(),      //all forms {}
  },
  Adverb :{
    to_adjective()  // quickly -> quick
  },
  Noun :{
    article(),        //ostrich -> an
    is_uncountable(), //(doesn't inflect) knowledge -> true
    pluralize(),      //hamburger -> hamburgers
    singularize(),    //hamburgers -> hamburger
    is_plural(),      //humburgers -> true
    is_person(),      //tony hawk -> true
    is_place(),       //Baghdad -> true
    is_organisation(),//C.I.A. -> true
    is_date(),        //January 5th -> true
    is_value(),       //fifteen books -> true
  },
  Value :{
    number,     //fifty kilometers -> 50
    unit,       //fifty km -> km
    unit_name,  //fifty km -> kilometer
    measurement,//fifty km -> distance
  },
  Person :{
    gender(),   //Tony Hawk -> Male
    honourific, //Dr. Tony Hawk -> Dr
    firstName,  //Homer J. Simpson -> Homer
    middleName, //Homer Jay Simpson -> Jay
    lastName    //Homer Jay Simpson -> Simpson
  },
  Date :{
    date  //Tuesday July 5th, 1974 -> Date()
  },
  Place :{},
  Organisation :{}
}
```

#Help
[![slack](https://img.shields.io/badge/slack-superscriptjs-brightgreen.svg)](superscriptjs.slack.com/messages/nlp_compromise/)

#Contribution
[![Issue Stats](http://issuestats.com/github/spencermountain/nlp_compromise/badge/pr)](http://issuestats.com/github/spencermountain/nlp_compromise)
[![Issue Stats](http://issuestats.com/github/spencermountain/nlp_compromise/badge/issue)](http://issuestats.com/github/spencermountain/nlp_compromise)

* [Changelog](https://github.com/spencermountain/nlp_compromise/blob/master/docs/changelog.md)
* [Development](https://github.com/spencermountain/nlp_compromise/blob/master/docs/development.md)

[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

