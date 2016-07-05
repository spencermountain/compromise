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
  Organization : require('./term/noun/organization/organization.js')
};

function NLP() {

  this.plugin = function(obj) {
    obj = obj || {};
    // if obj is a function, pass it an instance of this nlp library
    if (fns.isFunction(obj)) {
      // run it in this current context
      obj = obj.call(this, this);
    }
    //apply each plugin to the correct prototypes
    Object.keys(obj).forEach(function(k) {
      Object.keys(obj[k]).forEach(function(method) {
        models[k].prototype[method] = obj[k][method];
      });
    });
  };
  this.lexicon = function(obj) {
    obj = obj || {};
    let lex = require('./lexicon.js');

    Object.keys(obj).forEach(function(k) {
      lex[k] = obj[k];
    });

    return lex;
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
  this.organization = function(s) {
    return new models.Organization(s);
  };

  this.text = function(s, options) {
    return new models.Text(s, options);
  };
  this.sentence = function(s, options) {
    return new models.Sentence(s, options);
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

// console.log(nlp.verb('played').conjugate());
