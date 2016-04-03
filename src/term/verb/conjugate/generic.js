'use strict';
//non-specifc, 'hail-mary' transforms from infinitive, into other forms

const generic = {

  gerund: (o) => {
    let inf = o.infinitive;
    if (inf.endsWith('e')) {
      return inf.replace(/e$/, 'ing');
    }
    return inf + 'ing';
  },

  present: (o) => {
    let inf = o.infinitive;
    if (inf.endsWith('s')) {
      return inf + 'es';
    }
    return inf + 's';
  },

  past: (o) => {
    let inf = o.infinitive;
    if (inf.endsWith('e')) {
      return inf + 'd';
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
