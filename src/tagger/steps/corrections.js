'use strict';
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
  //set verbs as auxillaries
  for(let i = 0; i < s._terms.length; i++) {
    let t = s._terms[i];
    if (auxillary[t.normal] || auxillary[t.silent_term]) {
      let next = s._terms[i + 1];
      //if next word is a verb
      if (next && (next.pos.Verb || next.pos.Adverb || next.pos.Negative)) {
        t.tag('Auxillary', 'corrections-auxillary');
        continue;
      }
    }
  }
  return s;
};

module.exports = corrections;
