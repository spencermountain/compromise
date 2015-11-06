'use strict';
const Term = require('./term/term.js');
const Text = require('./text/text.js');
const Verb = require('./term/verb/verb.js');
const Adjective = require('./term/adjective/adjective.js');
const Adverb = require('./term/adverb/adverb.js');

const Noun = require('./term/noun/noun.js');
const Value = require('./term/noun/value/value.js');
const Person = require('./term/noun/person/person.js');
const Place = require('./term/noun/place/place.js');
const _Date = require('./term/noun/date/date.js');
const Organisation = require('./term/noun/organisation/organisation.js');


//function returns a text object if there's a param, otherwise
const API = function(str) {
  this.Term = function(s) {
    return new Term(s);
  };
  this.Verb = function(s) {
    return new Verb(s);
  };
  this.Adverb = function(s) {
    return new Adverb(s);
  };
  this.Adjective = function(s) {
    return new Adjective(s);
  };
  this.Text = function(s) {
    return new Text(s);
  };

  this.Noun = function(s) {
    return new Noun(s);
  };
  this.Person = function(s) {
    return new Person(s);
  };
  this.Date = function(s) {
    return new _Date(s);
  };
  this.Value = function(s) {
    return new Value(s);
  };
  this.Place = function(s) {
    return new Place(s);
  };
  this.Organisation = function(s) {
    return new Organisation(s);
  };
  if (str) {
    return new Text(str);
  }
};

let nlp = new API;
if (typeof window === 'object') {
  window.nlp = nlp;
}
module.exports = nlp;

// console.log(nlp.Text('John Smith is in Canada').terms());

// let n = nlp.Value('five hundred feet');
// console.log(p instanceof Noun);
// console.log(n);
