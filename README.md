
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
module.exports={
  Text :{
    ngram(),
    terms(),
    normalised(),
    tags(),
    to_past(),
    to_present(),
    to_future(),
  },
  Term :{
    syllables(),
    americanize(),
    britishize(),
    is_capital(),
  },
  Sentence :{
    terminator(),
    sentence_type(),
    to_past(),
    to_present(),
    to_future(),
    normalised(),
    text(),
    tags(),
  },
  Verb :{
    conjugate(),
    conjugation(),
    to_past(),
    to_present(),
    to_future(),
    isNegative(),
    negate(),
  },
  Adjective :{
    to_comparative(), //quick -> quicker
    to_superlative(), //quick -> quickest
    to_noun(), //quick -> quickness
    to_adverb(), //quick -> quickly
    conjugate(), //all forms {}
  },
  Adverb :{
    to_adjective()
  },
  Noun :{
    article(),
    is_plural(),
    is_uncountable(),
    pluralize(),
    singularize(),
    is_person(),
    is_place(),
    is_organisation(),
    is_date(),
    is_value(),
  },
  Value :{
    number,
    unit,
    unit_name,
    measurement,
  },
  Person :{
    honourific,
    firstName,
    middleName,
    lastName
  },
  Date :{
    date
  },
  Place :{},
  Organisation :{},
}
```

## Licence
MIT