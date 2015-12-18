'use strict';
const Term = require('./term/term.js');
const Text = require('./text/text.js');
const Sentence = require('./sentence/sentence.js');
const Verb = require('./term/verb/verb.js');
const Adjective = require('./term/adjective/adjective.js');
const Adverb = require('./term/adverb/adverb.js');

const Noun = require('./term/noun/noun.js');
const Value = require('./term/noun/value/value.js');
const Person = require('./term/noun/person/person.js');
const Place = require('./term/noun/place/place.js');
const _Date = require('./term/noun/date/date.js');
const Organisation = require('./term/noun/organisation/organisation.js');

const Lexicon = require('./lexicon.js');

//function returns a text object if there's a param, otherwise
const API = {
  models : {
    Term: Term,
    Sentence: Sentence,
    Text: Text
  },
  Term : function(s) {
    return new Term(s);
  },
  Verb : function(s) {
    return new Verb(s);
  },
  Adverb : function(s) {
    return new Adverb(s);
  },
  Adjective : function(s) {
    return new Adjective(s);
  },
  Sentence : function(s) {
    return new Sentence(s);
  },
  Text : function(s) {
    return new Text(s);
  },
  Noun : function(s) {
    return new Noun(s);
  },
  Person : function(s) {
    return new Person(s);
  },
  Date : function(s) {
    return new _Date(s);
  },
  Value : function(s) {
    return new Value(s);
  },
  Place : function(s) {
    return new Place(s);
  },
  Organisation : function(s) {
    return new Organisation(s);
  },
  Lexicon: Lexicon
};

let nlp = API;
// nlp.Term.capitalise = function() {
//   return this.text.toUpperCase();
// };

//export to window or webworker
if (typeof window === 'object' || typeof DedicatedWorkerGlobalScope === 'function') {
  self.nlp = nlp;
}
module.exports = nlp;

// let n = nlp.Date('2012');
// console.log(n.date());
