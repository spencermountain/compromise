'use strict';
const data = require('./data');
//accept [i, ll] and return [i, will]
const identify_contraction = function(parts) {
  //easier contractions, like 'i'll'
  if (data.easy_ends[parts.end]) {
    parts.end = data.easy_ends[parts.end];
    return parts;
  }
  //ambiguous contraction 's'
  if (parts.end === 's') {

  }
  return parts;
};

const interpret_contractions = function(s) {
  for (let i = 0; i < s.terms.length; i++) {
    let t = s.terms[i];
    //interpret irregular contractions, like "let's"
    if (data.irregulars[t.normal]) {
      let arr = data.irregulars[t.normal];
      s.terms[i].silent_term = arr[0];
      //add second word
      s.addWord('', i, null);
      s.terms[i + 1].silent_term = arr[1];
      //if it exists, add a third word
      if (arr[2]) {
        s.addWord('', i + 1, null);
        s.terms[i + 2].silent_term = arr[2];
      }
      break;
    }
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
