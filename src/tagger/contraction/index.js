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
  for (let i = 0; i < s._terms.length; i++) {
    let t = s._terms[i];
    //interpret irregular contractions, like "let's"
    if (data.irregulars[t.normal]) {
      let arr = data.irregulars[t.normal];
      s._terms[i].silent_term = arr[0];
      //add second word
      s._terms[i].prepend('');
      s._terms[i + 1].silent_term = arr[1];
      //if it exists, add a third word
      if (arr[2]) {
        s._terms[i + 1].prepend('');
        s._terms[i + 2].silent_term = arr[2];
      }
      break;
    }
    let parts = s._terms[i].info('contraction');
    if (parts) {
      parts = identify_contraction(parts);
      s._terms[i].silent_term = parts.start;
      s._terms[i].prepend('');
      s._terms[i + 1].silent_term = parts.end;
      break;
    }
  }
  return s;
};

module.exports = interpret_contractions;
