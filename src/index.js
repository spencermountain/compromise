'use strict';
const Text = require('./text/text.js');
const Term = require('./term/term.js');
const Verb = require('./term/verb/verb.js');
const Noun = require('./term/noun/noun.js');
const Value = require('./term/noun/value/value.js');
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
module.exports = nlp;



console.log(nlp.Text('john is nice'));
let p = nlp.Person('John Smith jr.');
// let w = nlp2.Verb('have walked');
// console.log(p instanceof Person);
// console.log(p instanceof Noun);
console.log(p);
