'use strict';
const Text = require('./text/text.js');
const Term = require('./term/term.js');
const Verb = require('./term/verb/verb.js');
const Noun = require('./term/noun/noun.js');
const Value = require('./term/noun/value/value.js');
const DateClass = require('./term/noun/date/date.js');
const Adjective = require('./term/adjective/adjective.js');
const Adverb = require('./term/adverb/adverb.js');
const Person = require('./term/noun/person/person.js');

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
  this.Noun = function(s) {
    return new Noun(s);
  };
  this.Person = function(s) {
    return new Person(s);
  };
  this.Date = function(s) {
    return new DateClass(s);
  };
  this.Value = function(s) {
    return new Value(s);
  };
  this.Adjective = function(s) {
    return new Adjective(s);
  };
  this.Text = function(s) {
    return new Text(s);
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

// let n = nlp.Value('five hundred feet');
// console.log(p instanceof Noun);
// console.log(n);
