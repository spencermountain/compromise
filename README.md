# Natural Language Processing with no guff

* Scores 86% on the [Penn treebank](http://www.cis.upenn.edu/~treebank/)
* Smaller than jQuery *(100k)*
* Key-press speed, constant time.
* No dependencies, training, or configuring

[![npm version](https://badge.fury.io/js/nlp_compromise.svg)](https://www.npmjs.com/package/nlp_compromise)
[![downloads](https://img.shields.io/npm/dm/nlp_compromise.svg)](https://www.npmjs.com/package/nlp_compromise)

```javascript
nlp.Text('she sells seashells').to_past().text()
//she sold seashells
```
> Welcome to v2.0!
> Please [file an issue](https://github.com/spencermountain/nlp_compromise/issues/new) if you find something

* [Long Text Demo](http://rawgit.com/spencermountain/nlp_compromise/2.0/demos/state_of_the_union/index.html)
* [Conjugation Demo](http://rawgit.com/spencermountain/nlp_compromise/2.0/demos/conjugation/index.html)

# Install
> npm install nlp_compromise

```javascript
nlp = require("nlp_compromise")
nlp.Text("she sells seashells").negate().text()
// she didn't sell seashells
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

*70% on the [moby hyphenization corpus](http://www.gutenberg.org/dirs/etext02/mhyph10.zip)*
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
options.min_count = 1 // throws away seldom-repeated grams
options.max_size = 5 // maximum gram count. prevents the result from becoming gigantic
```
* Date parsing
```javascript
nlp.value("I married April for the 2nd time on June 5th 1998 ").date()
//[Date object]   d.toLocaleString() -> "04/2/1998"
```
* Number parsing
```javascript
nlp.Value("two thousand five hundred and sixty").number
// 2560
-nlp.value("twenty one hundred").number
-// 2100
-nlp.Value("nine two hundred").number
-// null
```


#API
```javascript
nlp_compromise={
  Text :{
    to_past: function()    //she sold seashells
    to_present: function() //she sells seashells
    to_future: function()  //she will sell seashells
    negate: function()     //she doesn't sell seashells
    tags: function()       //she sells seashells -> [Noun, Verb, Noun]
    terms: function()
    normalised: function()
    ngram({max_size:2}),//[[she sells, sells seashells],[she, sells, seashells]]
  },
  Term :{
    syllables: function()   //hamburger -> ['ham','bur','ger']
    britishize: function()  //favorite -> favourite
    americanize: function() //synthesised -> synthesized
    is_capital: function()  //Tony Danza -> true
  },
  Sentence :{
    sentence_type: function() //declarative, interrogative, exclamative
    terminator: function()    //the sentence-ending punctuation
    to_past: function()       //she sold seashells
    to_present: function()    //she sells seashells
    to_future: function()     //she will sell seashells
    negate: function()        //she doesn't sell seashells
    tags: function()          //she sells seashells -> [Noun, Verb, Noun]
    normalised: function()
    text: function()
  },
  Verb :{
    to_past: function()     //walk -> walked
    to_present: function()  //walking -> walk
    to_future: function()   //walk -> will walk
    conjugate: function()   //all forms {}
    conjugation: function() //infinitive,present,past,future
    negate: function()      //walk -> didn't walk
    isNegative: function()  //is the verb already negated
  },
  Adjective :{
    to_comparative: function() //quick -> quicker
    to_superlative: function() //quick -> quickest
    to_noun: function()        //quick -> quickness
    to_adverb: function()      //quick -> quickly
    conjugate: function()      //all forms {}
  },
  Adverb :{
    to_adjective: function()  //quickly -> quick
  },
  Noun :{
    article: function()        //ostrich -> an
    is_uncountable: function() //(doesn't inflect) knowledge -> true
    pluralize: function()      //hamburger -> hamburgers
    singularize: function()    //hamburgers -> hamburger
    is_plural: function()      //humburgers -> true
    is_person: function()      //tony hawk -> true
    is_place: function()       //Baghdad -> true
    is_organisation: function()//C.I.A. -> true
    is_date: function()        //January 5th -> true
    is_value: function()       //fifteen books -> true
  },
  Value :{
    number: Number,     //fifty kilometers -> 50
    unit: String,       //fifty km -> km
    unit_name: String,  //fifty km -> kilometer
    measurement: String,//fifty km -> distance
  },
  Person :{
    gender: function()   //Tony Hawk -> Male
    honourific: String, //Dr. Tony Hawk -> Dr
    firstName: String,  //Homer J. Simpson -> Homer
    middleName: String, //Homer Jay Simpson -> Jay
    lastName: String    //Homer Jay Simpson -> Simpson
  },
  Date :{
    date: Date  //Tuesday July 5th, 1974 -> Date()
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

