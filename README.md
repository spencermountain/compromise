
A Natural-Language-Processing library *in Javascript*, small-enough for the browser, and quick-enough to run on keypress :two_men_holding_hands:

> Welcome to v2.0!
> Please [file an issue](https://github.com/spencermountain/nlp_compromise/issues/new) if you find something

[![Video](http://i.vimeocdn.com/video/493948602_640.jpg)](https://vimeo.com/109880250)

[![npm version](https://badge.fury.io/js/nlp_compromise.svg)](http://badge.fury.io/js/nlp_compromise)

[Changelog](https://github.com/spencermountain/nlp_compromise/blob/master/docs/changelog.md)
[Development](https://github.com/spencermountain/nlp_compromise/blob/master/docs/development.md)

# Install
```javascript
$ npm install nlp_compromise

nlp = require("nlp_compromise")
nlp.Term("hamburger").syllables()
//[ 'ham', 'bur', 'ger' ]
```

```javascript
<script src="https://rawgit.com/spencermountain/nlp_compromise/master/client_side/nlp.min.js"> </script>
<script>
  nlp.Noun("dinosaur").pluralize()
  //dinosaurs
</script>
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
    ngram({max_size:2, min_count:1}),      //she sells seashells -> [she sells, sells seashells]
    terms(),
    normalised(),
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

## Licence
MIT