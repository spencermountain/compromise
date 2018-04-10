'use strict';
const Terms = require('../../paths').Terms;
const conjugate = require('./methods/conjugate');
const toAdjective = require('./methods/toAdjective');
const interpret = require('./interpret');
const toNegative = require('./toNegative');
const isPlural = require('./methods/isPlural');
const expand = require('./methods/verbContraction');

const parse = function(r) {
  let original = r;
  r.negative = r.match('#Negative');
  r.adverbs = r.match('#Adverb');
  let aux = r.clone().not('(#Adverb|#Negative)');
  r.verb = aux
    .match('#Verb')
    .not('#Particle')
    .last();
  r.particle = aux.match('#Particle').last();
  if (r.verb.found) {
    let str = r.verb.out('normal');
    r.auxiliary = original.not(str).not('(#Adverb|#Negative)');
    r.verb = r.verb.list[0].terms[0];
  // r.auxiliary = aux.match('#Auxiliary+');
  } else {
    r.verb = original.terms[0];
  }
  return r;
};

const methods = {
  parse: function() {
    return parse(this);
  },
  data: function(verbose) {
    return {
      text: this.out('text'),
      normal: this.out('normal'),
      parts: {
        negative: this.negative.out('normal'),
        auxiliary: this.auxiliary.out('normal'),
        verb: this.verb.out('normal'),
        particle: this.particle.out('normal'),
        adverbs: this.adverbs.out('normal')
      },
      interpret: interpret(this, verbose),
      conjugations: this.conjugate()
    };
  },
  getNoun: function() {
    if (!this.refTerms) {
      return null;
    }
    let str = '#Adjective? #Noun+ ' + this.out('normal');
    return this.refTerms.match(str).match('#Noun+');
  },
  //which conjugation is this right now?
  conjugation: function() {
    return interpret(this, false).tense;
  },
  //blast-out all forms
  conjugate: function(verbose) {
    return conjugate(this, verbose);
  },

  isPlural: function() {
    return isPlural(this);
  },
  /** negation **/
  isNegative: function() {
    return this.match('#Negative').list.length === 1;
  },
  isPerfect: function() {
    return this.auxiliary.match('(have|had)').found;
  },
  toNegative: function() {
    if (this.isNegative()) {
      return this;
    }
    return toNegative(this);
  },
  toPositive: function() {
    return this.match('#Negative').delete();
  },

  /** conjugation **/
  toPastTense: function() {
    if (this.has('#Contraction')) {
      this.list = expand(this.parentTerms).list;
    }
    let obj = this.conjugate();
    let end = obj.PastTense;
    let r = this.replaceWith(end, false);
    r.verb.tag('#PastTense');
    return r;
  },
  toPresentTense: function() {
    if (this.has('#Contraction')) {
      expand(this.parentTerms);
    }
    let obj = this.conjugate();
    let r = this.replaceWith(obj.PresentTense, false);
    r.verb.tag('#PresentTense');
    return r;
  },
  toFutureTense: function() {
    if (this.has('#Contraction')) {
      expand(this.parentTerms);
    }
    let obj = this.conjugate();
    let r = this.replaceWith(obj.FutureTense, false);
    r.verb.tag('#FutureTense');
    return r;
  },
  toInfinitive: function() {
    if (this.has('#Contraction')) {
      expand(this.parentTerms);
    }
    let obj = this.conjugate();
    let r = this.replaceWith(obj.Infinitive, false);
    r.verb.tag('#Infinitive');
    return r;
  },
  toGerund: function() {
    if (this.has('#Contraction')) {
      expand(this.parentTerms);
    }
    let obj = this.conjugate();
    let aux = 'is';
    //support 'i am', 'we are', 'he is'
    let noun = this.getNoun().out('normal');
    if (noun) {
      let auxList = {
        i: 'am',
        we: 'are',
        they: 'are',
      };
      if (auxList.hasOwnProperty(noun)) {
        aux = auxList[noun];
      }
    }
    let end = aux + ' ' + obj.Gerund;
    //i would go -> i would have be going
    // if (this.auxiliary && this.auxiliary.has('#Modal') && !this.auxiliary.has('will')) {
    //   end = this.auxiliary.match('#Modal').out() + ' have ' + end;
    // }
    let r = this.replaceWith(end, false);
    r.verb.tag('#Gerund');
    return r;
  },
  asAdjective: function() {
    return toAdjective(this.verb.out('normal'));
  }
};

const Verb = function(arr, world, refText, parentTerms) {
  Terms.call(this, arr, world, refText, parentTerms);
  //basic verb-phrase parsing:
  return parse(this);
};
//Terms inheritence
Verb.prototype = Object.create(Terms.prototype);
//apply methods
Object.keys(methods).forEach(k => {
  Verb.prototype[k] = methods[k];
});
module.exports = Verb;
