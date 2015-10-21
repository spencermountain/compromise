'use strict';
const Text = require('./text/text.js');
const Term = require('./term/term.js');
const Verb = require('./term/verb/verb.js');
const Noun = require('./term/noun/noun.js');
const Value = require('./term/value/value.js');
const Adjective = require('./term/adjective/adjective.js');
const Adverb = require('./term/adverb/adverb.js');

//function returns a text object if there's a param, otherwise
const Api = function(str) {
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

module.exports = Api;

//return a Text object..
// let nlp1=new Api("john is cool")
// console.log(nlp1.text())

//return a Term/Value object
let nlp2 = new Api();
// console.log(nlp2.Term("john"));
console.log(nlp2.Verb('walk').conjugate());
