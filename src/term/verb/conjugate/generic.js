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
