'use strict';
const log = require('../paths').log;
const phrasals = require('../paths').tries.utils.phrasals;
const toInfinitive = require('../../result/subset/verbs/methods/toInfinitive/index.js');
const path = 'tagger/phrasal';

//words that could be particles
const particles = {
  'aback': true,
  'along': true,
  'apart': true,
  'at': true,
  'away': true,
  'back': true,
  'by': true,
  'do': true,
  'down': true,
  'forth': true,
  'forward': true,
  'in': true,
  'into': true,
  'it': true,
  'off': true,
  'on': true,
  'out': true,
  'over': true,
  'round': true,
  'through': true,
  'together': true,
  'under': true,
  'up': true,
  'upon': true,
  'way': true,
};

//phrasal verbs are compound verbs like 'beef up'
const phrasals_step = function(ts) {
  log.here(path);
  for(let i = 1; i < ts.length; i++) {
    let t = ts.get(i);
    //is it a particle, like 'up'
    if (particles[t.normal]) {
      //look backwards
      let last = ts.get(i - 1);
      if (last.tags.Verb) {
        let inf = toInfinitive(last);
        if (phrasals.has(inf + ' ' + t.normal)) {
          t.tag('Particle', 'phrasalVerb-particle');
          t.tag('PhrasalVerb', 'phrasalVerb-particle');
          last.tag('PhrasalVerb', 'phrasalVerb-particle');
        }
      }
    }

  }
  return ts;
};

module.exports = phrasals_step;
