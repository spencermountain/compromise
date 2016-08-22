'use strict';
const predictForm = require('./predict');
const conjugate = require('./conjugation');
const toInfinitive = require('./toInfinitive');

const info = {
  /** try to predict which form this verb is */
  conjugation: (t) => {
    return predictForm(t);
  },
  /** return the main 'default' form of the verb*/
  infinitive: (t) => {
    return toInfinitive(t);
  },
  /** return all forms of this verb */
  conjugations: (t) => {
    return conjugate(t);
  },

  /** is it past/present/future tense */
  tense: (t) => {
    let tenses = {
      PresentTense: 'PresentTense',
      PastTense: 'PastTense',
      FutureTense: 'FutureTense',
      Infinitive: 'PresentTense',
      Gerund: 'PresentTense',
      Actor: 'PresentTense',
      PerfectTense: 'PastTense',
      Pluperfect: 'PastTense',
      FuturePerfect: 'FutureTense'
    };
    let keys = Object.keys(tenses);
    for (let i = 0; i < keys.length; i++) {
      if (t.tag[keys[i]]) {
        return tenses[keys[i]];
      }
    }
    return 'PresentTense'; //hmm, default?
  },

  /** look around for the auxillary terms before this, like 'would have had' */
  auxillaries: (t) => {
    //if this is an auxillary, return nothing
    if (t.is('Auxillary')) {
      return [];
    }
    let arr = [];
    let before = t.info('Before').slice(0, 4);
    for (let i = 0; i < before.length; i++) {
      if (before[i].is('Auxillary')) {
        arr.unshift(before[i]); //(before terms are reversed)
      } else if (before[i].is('Negation')) {
        continue;
      } else {
        break;
      }
    }
    return arr;
  },

  /** find a term object that reverses the meaning of this verb */
  negation: (t) => {
    //look at the words before
    let before = t.info('Before').slice(0, 3);
    for (let i = 0; i < before.length; i++) {
      if (before[i].normal === 'not' || before[i].silent_term === 'not') {
        return before[i];
      }
    }
    //look at the next word after - 'is not'
    let after = t.info('after');
    if (after[0] && after[0].normal === 'not') {
      return after[0];
    }
    return null;
  },

  /** parse-out common verb prefixes, for conjugation*/
  prefix: (t) => {
    let match = t.normal.match(/^(over|under|re|anti|full|cross)([- ])?([^aeiou][a-z]*)/i);
    if (match) {
      return {
        prefix: match[1] + (match[2] || ''),
        root: match[3]
      };
    }
    return null;
  },

  /**for phrasal verbs ('look out'), conjugate look, then append 'out'*/
  particle: (t) => {
    const phrasal_reg = new RegExp('^(.*?) (in|out|on|off|behind|way|with|of|away|across|ahead|back|over|under|together|apart|up|upon|aback|down|about|before|after|around|to|forth|round|through|along|onto)$', 'i');
    if (t.normal.match(phrasal_reg)) {
      const split = t.normal.match(phrasal_reg, '');
      return {
        phrasal: split[1],
        particle: split[2]
      };
    }
    return null;
  },

  /** find the auxillary, root, and particle of this verb*/
  components: (t) => {
    return {
      negation: t.info('Negation'),
      auxillaries: t.info('Auxillaries'),
      particle: t.info('Particle'),
      prefix: t.info('Prefix')
    };
  }
};
module.exports = info;
