'use strict';
const Terms = require('../../paths').Terms;
const toNegative = require('./toNegative');
const toPositive = require('./toPositive');
const Verb = require('../verbs/verb');
const insert = require('./smartInsert');

const fixContraction = function(contr) {
  if (contr.found) {
    contr.list[0].terms.forEach((t) => {
      if (t.silent_term) {
        t.text = t.silent_term;
        t.silent_term = null;
        t.unTag('Contraction');
      }
    });
  }
};
//decide subject-verb-object
const parse = function(s) {
  let conditions = s.match('#Condition');
  let tmp = s.not('#Condition');
  s.debug();

  //get the verb
  let verb = tmp.match('(#Adverb|#Auxiliary|#Verb|#Negative|#Particle)+').if('#Verb').first(); //this should be (much) smarter

  return {
    conditions: conditions.out(),
    verb: verb.out()
  };
};

const methods = {
  /** inflect the main/first noun*/
  toSingular: function() {
    let nouns = this.match('#Noun').match('!#Pronoun').firstTerm();
    nouns.things().toSingular();
    return this;
  },
  toPlural: function() {
    let nouns = this.match('#Noun').match('!#Pronoun').firstTerm();
    nouns.things().toPlural();
    return this;
  },

  /** find the first important verbPhrase. returns a Term object */
  mainVerb: function() {
    let terms = this.match('(#Adverb|#Auxiliary|#Verb|#Negative|#Particle)+').if('#Verb'); //this should be (much) smarter
    if (terms.found) {
      terms = terms.list[0].terms;
      return new Verb(terms, this.lexicon, this.refText, this.refTerms);
    }
    return null;
  },

  /** sentence tense conversion**/
  toPastTense: function() {
    let verb = this.mainVerb();
    if (verb) {
      //this is really ugly..
      let start = verb.out('normal');
      verb.toPastTense();
      //support "i'm going"
      let contr = this.match('#Contraction ' + start);
      fixContraction(contr);
      let end = verb.out('normal');
      let r = this.parentTerms.replace(start, end);
      return r;
    }
    return this;
  },
  toPresentTense: function() {
    let verb = this.mainVerb();
    if (verb) {
      let start = verb.out('normal');
      verb.toPresentTense();
      //support "i'm going"
      let contr = this.match('#Contraction ' + start);
      fixContraction(contr);
      let end = verb.out('normal');
      return this.parentTerms.replace(start, end);
    }
    return this;
  },
  toFutureTense: function() {
    let verb = this.mainVerb();
    if (verb) {
      let start = verb.out('normal');
      verb.toFutureTense();
      //support "i'm going"
      let contr = this.match('#Contraction ' + start);
      fixContraction(contr);
      let end = verb.out('normal');
      return this.parentTerms.replace(start, end);
    }
    return this;
  },

  /** negation **/
  isNegative: function() {
    return this.match('#Negative').list.length === 1;
  },
  toNegative: function() {
    if (this.isNegative()) {
      return this;
    }
    return toNegative(this);
  },
  toPositive: function() {
    if (!this.isNegative()) {
      return this;
    }
    return toPositive(this);
  },

  /** smarter insert methods*/
  append: function(str) {
    return insert.append(this, str);
  },
  prepend: function(str) {
    return insert.prepend(this, str);
  },

  /** punctuation */
  setPunctuation: function(punct) {
    let last = this.terms[this.terms.length - 1];
    last.setPunctuation(punct);
  },
  getPunctuation: function() {
    let last = this.terms[this.terms.length - 1];
    return last.getPunctuation();
  },
  /** look for 'was _ by' patterns */
  isPassive: function() {
    return this.match('was #Adverb? #PastTense #Adverb? by').found; //haha
  }
};

const Sentence = function(arr, lexicon, refText, refTerms) {
  Terms.call(this, arr, lexicon, refText, refTerms);
// console.log(parse(this));
};
//Terms inheritence
Sentence.prototype = Object.create(Terms.prototype);
//add-in methods
Object.keys(methods).forEach((k) => {
  Sentence.prototype[k] = methods[k];
});
module.exports = Sentence;
