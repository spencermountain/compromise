'use strict';
const Text = require('./text/text.js');
const Term = require('./term/term.js');
const Verb = require('./term/verb/verb.js');
const Noun = require('./term/noun/noun.js');
const Value = require('./term/value/value.js');
const Adjective = require('./term/adjective/adjective.js');
const Adverb = require('./term/adverb/adverb.js');
const Person = require('./term/noun/person/person.js');

//function returns a text object if there's a param, otherwise
const Nlp = function(str) {
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
  this.Adjective = function(s) {
    return new Adjective(s);
  };
  if (str) {
    return new Text(str);
  }
};

module.exports = Nlp;


//return a Text object..
// let nlp = new Nlp('i think the lkjfen is good');
// let nlp = new Nlp('i think lkjfen is good');
// console.log(nlp.terms());

//return a Term/Value object
// let nlp2 = new Nlp();

let p = new Person('John Smith jr.');
// let w = nlp2.Verb('have walked');
// console.log(p instanceof Person);
// console.log(p instanceof Noun);
console.log(p);
