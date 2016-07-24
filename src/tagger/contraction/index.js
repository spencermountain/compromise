'use strict';
const data = require('./data');
//accept [i, ll] and return [i, will]
const identify_contraction = function(parts) {
  if (data.easy_ends[parts.end]) {
    parts.end = data.easy_ends[parts.end];
    return parts;
  }
  return parts;
};

const interpret_contractions = function(s) {
  for (let i = 0; i < s.terms.length; i++) {
    let parts = s.terms[i].info('contraction');
    if (parts) {
      parts = identify_contraction(parts);
      s.terms[i].silent_term = parts.start;
      s.addWord('', i, null);
      s.terms[i + 1].silent_term = parts.end;
      break;
    }
  }
  return s;
};

module.exports = interpret_contractions;
