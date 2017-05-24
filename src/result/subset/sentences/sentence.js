'use strict';
const Terms = require('../../paths').Terms;
const toNegative = require('./toNegative');
const toPositive = require('./toPositive');
const Verb = require('../verbs/verb');
const insert = require('./smartInsert');

//decide on main subject-verb-object
const parse = function(s) {
  //strip conditions first
  let conditions = s.match('#Condition');
  let tmp = s.not('#Condition');
  //choose the verb first
  let verb = tmp.match('#VerbPhrase+').first(); //this should be much smarter
  let vb = verb.out('normal');
  //get subj noun left-of the verb
  let subject = tmp.match('#Determiner? #Adjective+? #Noun ' + vb).first().not('#VerbPhrase');
  //get obj noun right-of the verb
  let object = tmp.match(vb + ' #Preposition? #Determiner? #Noun').first().not('#VerbPhrase');

  s.conditions = conditions;
  s.subject = subject;
  s.verb = verb;
  s.object = object;
  if (s.verb.found) {
    s.verb = new Verb(s.verb.list[0].terms, s.lexicon, s.refText, s.refTerms);
  }
  return s;
};


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
    parse(this);
    if (this.verb.found) {
      return this.verb;
    }
    return null;
  },

  /** sentence tense conversion**/
  toPastTense: function() {
    let verb = this.mainVerb();
    if (verb) {
      // verb.debug();
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
  parse(this);
};
//Terms inheritence
Sentence.prototype = Object.create(Terms.prototype);
//add-in methods
Object.keys(methods).forEach((k) => {
  Sentence.prototype[k] = methods[k];
});
module.exports = Sentence;
