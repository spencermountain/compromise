'use strict';
//change a sentence to past, present, or future tense
const pos = require('./pos/parts_of_speech.js');

//conjugate a specific verb
const flip_verb = function(t, tense) {
  if (tense === 'present') {
    t.to_present();
  } else if (tense === 'past') {
    t.to_past();
  } else if (tense === 'future') {
    t.to_future();
  }
  return t;
};

const change_tense = function(s, tense) {
  //convert all verbs
  for(let i = 0; i < s.terms.length; i++) {
    let t = s.terms[i];
    if (t instanceof pos.Verb) {
      //ignore gerunds too - "is walking"
      if (t.pos['Gerund']) {
        continue;
      }
      //ignore true infinitives, "go to sleep"
      if (t.pos['Infinitive']) {
        if (s.terms[i - 1] && s.terms[i - 1].normal === 'to') {
          continue;
        }
      }
      s.terms[i] = flip_verb(t, tense);
    }
  }
  return s;
};

// [
//   'john walks to the church',
//   'john walks and feeds the birds',
//   'john always walks',
//   'will you walk?',
// ];


module.exports = change_tense;
