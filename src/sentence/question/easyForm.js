'use strict';
//build-out this mapping
const interrogatives = {
  'who': 'who',
  'whose': 'who',
  'whom': 'who',
  'which person': 'who',

  'where': 'where',
  'when': 'when',

  'why': 'why',
  'how come': 'why',
};

const easyForm = function(s, i) {
  let t = s.terms[i];
  let nextTerm = s.terms[i + 1];

  //some interrogative forms are two-terms, try it.
  if (nextTerm) {
    let twoTerm = t.normal + ' ' + nextTerm.normal;
    if (interrogatives[twoTerm]) {
      return interrogatives[twoTerm];
    }
  }
  //try an interrogative first - 'who'
  if (interrogatives[t.normal]) {
    return interrogatives[t.normal];
  }
  //an interrogative as a contraction - 'why'd'
  if (interrogatives[t.expansion]) {
    return interrogatives[t.expansion];
  }
  return false;
};

module.exports = easyForm;
