*nlp_compromise* has three main classes, *Term*, *Sentence*, and *Text*:
```coffeescript
Term => # A word/token with a Part-of-speech
  Adjective =>
  Adverb =>
  Verb =>
  Noun =>
    Person =>
    Place =>
    Date =>
    Organization =>
    Value =>

Sentence => # A list of Terms and their methods
  Statement =>
  Question =>

Text => # A list of Sentences and their methods
```

##Full API
```javascript
nlp_compromise={
  text :{
    to_past: function()    //she sold seashells
    to_present: function() //she sells seashells
    to_future: function()  //she will sell seashells
    negate: function()     //she doesn't sell seashells
    tags: function()       //she sells seashells -> [Noun, Verb, Noun]
    terms: function()
    normalized: function()
    contractions:{
      expand: function()     // i'll -> i will
      contract: function()   // i will -> i'll
    }
    root: function()        // she sold seashells -> "she sell seashell"
  },
  sentence :{
    sentence_type: function() //declarative, interrogative, exclamative
    terminator: function()    //the sentence-ending punctuation
    to_past: function()       //she sold seashells
    to_present: function()    //she sells seashells
    to_future: function()     //she will sell seashells
    negate: function()        //she doesn't sell seashells
    tags: function()          //she sells seashells -> [Noun, Verb, Noun]
    normalized: function()
    text: function()
    contractions:{
      expand: function()     // i'll -> i will
      contract: function()   // i will -> i'll
    }
    root: function()        // she sold seashells -> "she sell seashell"
  },
  term :{
    is_capital: function()  //Tony Danza -> true
    is_acronym: function()  //FBI -> true
    normalize: function()   //Dr. King -> "dr king"
    changeTo: function()    // nlp.term("Mr. Jones").changeTo("Mrs. Jones")
    root: function()        // just the normalised form
  },
  verb :{
    to_past: function()     //walk -> walked
    to_present: function()  //walking -> walk
    to_future: function()   //walk -> will walk
    conjugate: function()   //all forms {}
    conjugation: function() //infinitive,present,past,future
    negate: function()      //walk -> didn't walk
    isNegative: function()  //is the verb already negated
    root: function()        //infinitive form
  },
  adjective :{
    to_comparative: function() //quick -> quicker
    to_superlative: function() //quick -> quickest
    to_noun: function()        //quick -> quickness
    to_adverb: function()      //quick -> quickly
    conjugate: function()      //all forms {}
  },
  adverb :{
    to_adjective: function()  //quickly -> quick
  },
  noun :{
    article: function()        //ostrich -> an
    is_uncountable: function() //(doesn't inflect) knowledge -> true
    pluralize: function()      //hamburger -> hamburgers
    singularize: function()    //hamburgers -> hamburger
    is_plural: function()      //humburgers -> true
    is_person: function()      //tony hawk -> true
    is_place: function()       //Baghdad -> true
    is_organization: function()//C.I.A. -> true
    is_date: function()        //January 5th -> true
    is_value: function()       //fifteen books -> true
    root: function()           // singular form
  },
  value :{
    number: Number,     //fifty kilometers -> 50
    unit: String,       //fifty km -> km
    unit_name: String,  //fifty km -> kilometer
    measurement: String,//fifty km -> distance
  },
  person :{
    gender: function()   //Tony Hawk -> Male
    honourific: String, //Dr. Tony Hawk -> Dr
    firstName: String,  //Homer J. Simpson -> Homer
    middleName: String, //Homer Jay Simpson -> Jay
    lastName: String,    //Homer Jay Simpson -> Simpson
    root: function()   // "{firstName} {lastName}"
  },
  date :{
    date: Date  //Tuesday July 5th, 1974 -> Date()
  },
  place :{
    city: String,     // Toronto, Canada -> Toronto
    region: String,   // Toronto, Ontario -> Ontario
    country: String,  // Toronto canada -> Canada
    title: String,    // minus the location info
    root: String      // the title
  },
  organization :{}
}
```

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
nlp.text("Hi Dr. Miller the price is 4.59 for the U.C.L.A. Ph.Ds.").sentences.length
// 1
nlp.text("Tony Danza sells sea-shells").terms().length
// 3
```

### Contractions
```javascript
let t = nlp.text(`i'll be there`);
t.text()
// "i'll be there"
t.contractions.expand();
t.text()
// "i will be there"
```

### Normalization
nlp_compromise is useful for reducing/normalizing text to specific levels:
```javascript
let t = nlp.text(`Dr. John Smith is   five feet tall.`);
t.text()
// "Dr. John Smith is   five feet tall."
t.normal()
// "dr john smith is 5 feet tall"
t.root()
// "john smith is 5 feet tall"
```
* *.text()*  - returns a pixel-perfect recreation of the input text.
* *.normal()*  - returns a highly-standardized but readable version of the text. Punctuation, whitespace, numbers, and case are coerced.
* *.root()*  - returns an 'aggressive-but-accurate' machine-readable reduction. Ordinals -> cardinals, verbs -> infinitive...

Every Term has these methods individually, so may be interpreted more specifically.
if you'd like to reduce things even further, `.strip_conditions()` may be helpful.

### Named-Entity Recognition
```javascript
let str="Oo-ee-oo I look just like Buddy Holly. Oh-oh, and you're Mary Tyler Moore"
nlp.text(str).topics()
// [ { count: 1, text: 'mary tyler moore' },
//   { count: 1, text: 'buddy holly' }
// ]
```
A `Named-Entity` is not always agreed-upon, but it shouldn't be too hard to cherry-pick what you'd like:
```javascript
nlp.text('').people()
nlp.text('').organizations()
nlp.text('').places()
```

### Date parsing
```javascript
nlp.value("I married April for the 2nd time on June 5th 1998 ").date()
// [Date object]   d.toLocaleString() -> "04/2/1998"
```
### Number parsing
```javascript
nlp.value("two thousand five hundred and sixty").number
// 2560
-nlp.value("twenty one hundred").number
// 2100
-nlp.value("nine two hundred").number
// null
```

#Augmenting the lexicon
you can pass in your own lexicon, or an augmented version

```javascript
 // fetch the current one
 let lexicon = nlp.lexicon()
 // augment it
 lexicon["apple"] = "Person"
 // use it for the pos-tagging
 let s = nlp.sentence('apple', {lexicon:lexicon});
 console.log(s.tags());
 // ['Person']
```

#Question classification
### easier ones
* who
  - who is..
* where;
  - where is..
* when;  - **sometimes a conditional**
  - when is..
* why;  - **sometimes a conditional**
  - why is..

### hard ones
* yesNo;
  - is she..
  - do they..
* what;
  - what is..
* which
  - which is ..
* selection
    - what person  [who]
    - what year  [when]
    - which actor [who]
    - which material
* how;
  - how is..
* number
  - how many
  - how fast
  - how old
  - what amount
