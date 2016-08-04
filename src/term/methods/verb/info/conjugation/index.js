'use strict';
const checkIrregulars = require('./irregulars');

//turn a verb into all it's forms
const to = {
  Actor: require('./toActor'),
  PastTense: require('./toPast'),
};

const conjugate = function(t) {
  let all = {};
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
  //to Actor
  if (!all.Actor) {
    //a phrasal like 'step up' can't be an actor -'step upper'?
    if (!t.pos.PhrasalVerb) {
      all.Actor = to.Actor(inf);
    }
  }
  if (!all.PastTense) {
    all.PastTense = to.PastTense(inf);
  }
  return all;
};

module.exports = conjugate;
