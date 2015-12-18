##Noun methods:
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

##Verb methods:
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
##Adjective methods:
```javascript
nlp.adjective("quick").conjugate()
//  { comparative: 'quicker',
//    superlative: 'quickest',
//    adverb: 'quickly',
//    noun: 'quickness'}
```
##Adverb methods
```javascript
nlp.adverb("quickly").conjugate()
//  { adjective: 'quick'}
```

##Doin stuff
### Sentence segmentation
```javascript
nlp.Text("Hi Dr. Miller the price is 4.59 for the U.C.L.A. Ph.Ds.").sentences.length
// 1
nlp.Text("Tony Danza sells sea-shells").terms().length
// 3
```

### Syllable hyphenization
*70% on the [moby hyphenization corpus](http://www.gutenberg.org/dirs/etext02/mhyph10.zip)*
```javascript
nlp.Text("calgary flames").syllables()
// [ 'cal', 'gar', 'y', 'flames']
```

### US-UK Localization
*90% on the [superscript dataset](https://github.com/silentrob/normalizer/blob/master/data/british.txt)*
```javascript
nlp.Term("favourite").americanize()
// favorite
nlp.Term("synthesized").britishize()
// synthesised
```
### N-gram
```javascript
nlp.Text("She sells seashells by the seashore.").ngram({min_count:1, max_size:5})
// [{ word: 'she sells', count: 2, size: 2 }, ...
options.min_count = 1 // throws away seldom-repeated grams
options.max_size = 5 // maximum gram count. prevents the result from becoming gigantic
```
### Date parsing
```javascript
nlp.value("I married April for the 2nd time on June 5th 1998 ").date()
// [Date object]   d.toLocaleString() -> "04/2/1998"
```
### Number parsing
```javascript
nlp.Value("two thousand five hundred and sixty").number
// 2560
-nlp.value("twenty one hundred").number
// 2100
-nlp.Value("nine two hundred").number
// null
```

##Full API
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