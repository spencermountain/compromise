'use strict';
const log = require('../paths').log;
const path = 'tagger/corrections';
//

const auxillary = {
  'do': true,
  'don\'t': true,
  'does': true,
  'doesn\'t': true,
  'will': true,
  'wont': true,
  'won\'t': true,
  'have': true,
  'haven\'t': true,
  'had': true,
  'hadn\'t': true,
  'not': true,
};

const corrections = function(s) {
  log.here(path);
  //set verbs as auxillaries
  for(let i = 0; i < s.arr.length; i++) {
    let t = s.arr[i];
    if (auxillary[t.normal] || auxillary[t.silent_term]) {
      let next = s.arr[i + 1];
      //if next word is a verb
      if (next && (next.tag.Verb || next.tag.Adverb || next.tag.Negative)) {
        t.tagAs('Auxillary', 'corrections-auxillary');
        continue;
      }
    }
  }
  return s;
};

module.exports = corrections;
