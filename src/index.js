'use strict';
const fns = require('./fns.js');

let models = {
  Term : require('./term/term.js'),
  Text : require('./text/text.js'),
  Sentence : require('./sentence/sentence.js'),
  Statement : require('./sentence/statement/statement.js'),
  Question : require('./sentence/question/question.js'),
  Verb : require('./term/verb/verb.js'),
  Adjective : require('./term/adjective/adjective.js'),
  Adverb : require('./term/adverb/adverb.js'),
  Noun : require('./term/noun/noun.js'),
  Value : require('./term/noun/value/value.js'),
  Person : require('./term/noun/person/person.js'),
  Place : require('./term/noun/place/place.js'),
  Date : require('./term/noun/date/date.js'),
  Organisation : require('./term/noun/organisation/organisation.js'),
  Lexicon : require('./lexicon.js')
};


function NLP() {

  this.plugin = function(obj) {

    obj = obj || {};

    // Check if obj is a function
    // If so, pass it an instance of the library,
    // run it in current context
    // and use the returned interface

    if (fns.isFunction(obj)) {
      obj = obj.call(this, this);
    }

    Object.keys(obj).forEach(function(k) {
      Object.keys(obj[k]).forEach(function(method) {
        models[k].fn[method] = obj[k][method];
      });
    });
  };

  this.term = function(s) {
    return new models.Term(s);
  };
  this.noun = function(s) {
    return new models.Noun(s);
  };
  this.verb = function(s) {
    return new models.Verb(s);
  };
  this.adjective = function(s) {
    return new models.Adjective(s);
  };
  this.adverb = function(s) {
    return new models.Adverb(s);
  };

  this.value = function(s) {
    return new models.Value(s);
  };
  this.person = function(s) {
    return new models.Person(s);
  };
  this.place = function(s) {
    return new models.Place(s);
  };
  this.date = function(s) {
    return new models.Date(s);
  };
  this.organisation = function(s) {
    return new models.Organisation(s);
  };

  this.text = function(s) {
    return new models.Text(s);
  };
  this.sentence = function(s) {
    return new models.Sentence(s);
  };
  this.statement = function(s) {
    return new models.Statement(s);
  };
  this.question = function(s) {
    return new models.Question(s);
  };
}

let nlp = new NLP();

//export to window or webworker
if (typeof window === 'object' || typeof DedicatedWorkerGlobalScope === 'function') {
  self.nlp_compromise = nlp;
}
//export to commonjs
if (typeof module !== 'undefined' && module.exports) {
  module.exports = nlp;
}
//export to amd
if (typeof define === 'function' && define.amd) {
  define(nlp);
}

let text = nlp.sentence('ok so please go');
console.log(text.terms);
