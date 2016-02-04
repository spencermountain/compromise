'use strict';

let models = {
  Term : require('./term/term.js'),
  Text : require('./text/text.js'),
  Sentence : require('./sentence/sentence.js'),
  Verb : require('./term/verb/verb.js'),
  Adjective : require('./term/adjective/adjective.js'),
  Adverb : require('./term/adverb/adverb.js'),
  Noun : require('./term/noun/noun.js'),
  Value : require('./term/noun/value/value.js'),
  Person : require('./term/noun/person/person.js'),
  Place : require('./term/noun/place/place.js'),
  Date : require('./term/noun/date/date.js'),
  Organisation : require('./term/noun/organisation/organisation.js'),
  Lexicon : require('./lexicon.js'),
};

const extend = function(m, context) {
  context = context || {};
  return m;
};

function NLP() {

  this.plugin = function(obj) {
    obj = obj || {};
    Object.keys(obj).forEach(function(k) {
      Object.keys(obj[k]).forEach(function(method) {
        models[k].fn[method] = obj[k][method];
      });
    });
  };

  this.term = function(s, context) {
    return extend(new models.Term(s), context);
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

// let t = nlp.text(`For example. This doesn't work for the US`);
// console.log(t.sentences[0].text());
