'use strict';
//non-specifc, 'hail-mary' transforms from infinitive, into other forms
const fns = require('../../../fns');
const generic = {

  gerund: (o) => {
    let inf = o.infinitive;
    if (fns.endsWith(inf, 'e')) {
      return inf.replace(/e$/, 'ing');
    }
    return inf + 'ing';
  },

  present: (o) => {
    let inf = o.infinitive;
    if (fns.endsWith(inf, 's')) {
      return inf + 'es';
    }
    if (fns.endsWith(inf, /[bcdfghjklmnpqrstvwxz]y$/)) {
      return inf.slice(0, -1) + 'ies';
    }
    return inf + 's';
  },

  past: (o) => {
    let inf = o.infinitive;
    if (fns.endsWith(inf, 'e')) {
      return inf + 'd';
    }
    if (fns.endsWith(inf, 'ed')) {
      return inf;
    }
    if (fns.endsWith(inf, /[bcdfghjklmnpqrstvwxz]y$/)) {
      return inf.slice(0, -1) + 'ied';
    }
    return inf + 'ed';
  },

  future: (o) => {
    return 'will ' + o.infinitive;
  },

  perfect: (o) => {
    return 'have ' + (o.participle || o.past);
  },

  pluperfect: (o) => {
    return 'had ' + o.past;
  },

  future_perfect: (o) => {
    return 'will have ' + o.past;
  }

};

module.exports = generic;
