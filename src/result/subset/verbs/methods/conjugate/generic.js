'use strict';
//non-specifc, 'hail-mary' transforms from infinitive, into other forms
const fns = require('../../../../../fns'); //jaja!

const generic = {

  Gerund: (o) => {
    let inf = o.Infinitive;
    if (fns.endsWith(inf, 'e')) {
      return inf.replace(/e$/, 'ing');
    }
    return inf + 'ing';
  },

  PresentTense: (o) => {
    let inf = o.Infinitive;
    if (fns.endsWith(inf, 's')) {
      return inf + 'es';
    }
    if (inf.match(/[bcdfghjklmnpqrstvwxz]y$/)) {
      return inf.slice(0, -1) + 'ies';
    }
    return inf + 's';
  },

  PastTense: (o) => {
    let inf = o.Infinitive;
    if (fns.endsWith(inf, 'e')) {
      return inf + 'd';
    }
    if (fns.endsWith(inf, 'ed')) {
      return inf;
    }
    if (inf.match(/[bcdfghjklmnpqrstvwxz]y$/)) {
      return inf.slice(0, -1) + 'ied';
    }
    return inf + 'ed';
  },

  // FutureTense: (o) => {
  //   return 'will ' + o.Infinitive;
  // },
  //
  // PerfectTense: (o) => {
  //   return 'have ' + (o.Participle || o.PastTense);
  // },
  //
  // Pluperfect: (o) => {
  //   if (o.PastTense) {
  //     return 'had ' + o.PastTense;
  //   }
  //   return null;
  // },
  // FuturePerfect: (o) => {
  //   if (o.PastTense) {
  //     return 'will have ' + o.PastTense;
  //   }
  //   return null;
  // }

};

module.exports = generic;
