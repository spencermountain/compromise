'use strict';
const checkIrregulars = require('./irregulars');
const suffixPass = require('./suffixes');
const toActor = require('./toActor');
const toAdjective = require('./toAdjective');
const generic = require('./generic');

//turn a verb into all it's forms
const conjugate = function(t) {
  let all = {
    PastTense: null,
    PresentTense: null,
    FutureTense: null,
    Infinitive: null,
    Gerund: null,
    Actor: null,
    PerfectTense: null,
    Pluperfect: null,
  };
  //first, get its current form
  let form = t.info('Conjugation');
  if (form) {
    all[form] = t.normal;
  }
  if (form !== 'Infinitive') {
    all['Infinitive'] = t.info('Infinitive');
  }
  //check irregular forms
  all = Object.assign(all, checkIrregulars(t.normal));

  //ok, send this infinitive to all conjugators
  let inf = all['Infinitive'] || t.normal;

  //check suffix rules
  all = Object.assign(all, suffixPass(inf));

  //ad-hoc each missing form
  //to Actor
  if (!all.Actor) {
    //a phrasal like 'step up' can't be an actor -'step upper'?
    if (!t.tag.PhrasalVerb) {
      all.Actor = toActor(inf);
    }
  }
  //add adjective, like walk->walkable
  all.Adjective = toAdjective(all.Infinitive);

  //use fallback, generic transformations
  Object.keys(all).forEach((k) => {
    if (!all[k] && generic[k]) {
      all[k] = generic[k](all);
    }
  });

  return all;
};

module.exports = conjugate;
