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
    s.verb = new Verb(s.verb.list[0].terms, s.world, s.refText, s.refTerms);
  }
  return s;
};

const fixContraction = function(contr) {
  if (contr.found) {
    contr.contractions().expand();
  }
};

const killContraction = function(s) {
  s.terms = s.terms.filter(t => {
    if (t.silent_term) {
      if (t.silent_term === 'am' || t.silent_term === 'will' || t.silent_term === 'did') {
        return false;
      }
      t.text = t.silent_term;
      t.silent_term = null;
      t.unTag('Contraction');
      if (t.tags.TitleCase === true) {
        t.toTitleCase();
      }
    }
    return true;
  });
};

//if the subject of thr sentence is plural, use infinitive form of verb
// (he goes / i go)
const useInfinitive = function(s) {
  if (s.subject.found && s.subject.has('(i|we)')) {
    return true;
  }
  return false;
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
    parse(this); //re-parse
    if (this.verb.found) {
      return this.verb;
    }
    return null;
  },

  /** sentence tense conversion**/
  toPastTense: function() {
    let verb = this.mainVerb();
    if (verb) {
      //this is really ugly..
      let start = verb.out('root');
      verb.toPastTense();
      //support "i'm going"
      let contr = this.match('#Contraction ' + start);
      fixContraction(contr);
      let end = verb.out('root');
      // this.replace(start, end)
      let r = this.parentTerms.replace(start, end);
      return r;
    }
    return this;
  },
  toPresentTense: function() {
    let verb = this.mainVerb();
    if (verb) {
      let start = verb.out('normal');
      //plural/singular stuff
      if (useInfinitive(this) === true) {
        if (this.has('(am|will|did) ' + start)) {
          killContraction(this);
        }
        verb.toInfinitive();
      //irregular "i am"
      // this.debug();
      // if (this.has('i #Adverb? is')) {
      //   this.replace(' #Adverb? [is]', 'am');
      // }
      } else {
        verb.toPresentTense();
        let contr = this.match('#Contraction ' + start);
        fixContraction(contr);
      }
      //support "i'm going"
      let end = verb.out('normal');
      return this.parentTerms.replace(start, end);
    }
    return this;
  },
  toFutureTense: function() {
    let verb = this.mainVerb();
    if (verb) {
      let start = verb.clone(); //.out('root');
      verb.toFutureTense();
      //support "i'm going"
      let contr = this.match('#Contraction ' + start.out('normal'));
      fixContraction(contr);
      let end = verb.out('normal');
      return this.parentTerms.replace(start, end);
    }
    return this;
  },
  toContinuous: function() {
    let verb = this.mainVerb();
    if (verb) {
      let start = verb.clone(); //.out('root');
      //'is walking' or 'are walking'?
      // let aux = 'is';
      // if (useInfinitive(this)) {
      //   aux = 'are';
      // }
      verb.toGerund();
      // verb.insertBefore(aux);
      //support "i'm going"
      let contr = this.match('#Contraction ' + start.out('normal'));
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

  /** look for 'was _ by' patterns */
  isPassive: function() {
    return this.match('was #Adverb? #PastTense #Adverb? by').found; //haha
  }
};

const Sentence = function(arr, world, refText, refTerms) {
  Terms.call(this, arr, world, refText, refTerms);
  parse(this);
};
//Terms inheritence
Sentence.prototype = Object.create(Terms.prototype);
//add-in methods
Object.keys(methods).forEach(k => {
  Sentence.prototype[k] = methods[k];
});
module.exports = Sentence;
