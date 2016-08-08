'use strict';
const data = require('./data');

// 's may be a contraction or a possessive
// 'spencer's house' vs 'spencer's good'
const isPossessive = (t) => {
  let after = t.after(3);
  for(let i = 0; i < after.length; i++) {
    //an adjective suggests 'is good'
    if (after[i].pos.Adjective) {
      return false;
    }
    //a gerund suggests 'is walking'
    if (after[i].pos.Gerund) {
      return false;
    }
    //a noun suggests a possessive
    if (after[i].pos.Noun) {
      return true;
    }
  }
  //if end of sentence, it is possessive
  return true;
};

//for 'spencer's X' decide 'is/was/will be'
const isTense = (t) => {
  let after = t.after(3);
  for(let i = 0; i < after.length; i++) {
    //adjectives are present
    if (after[i].pos.Adjective) {
      return 'is';
    }
  }
  return 'is';
};

//accept [i, ll] and return [i, will]
const identify_contraction = function(parts) {
  //easier contractions, like 'i'll'
  if (data.easy_ends[parts.end]) {
    parts.end = data.easy_ends[parts.end];
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
      //handle ambiguous "'s" contraction
      if (parts.end === 's') {
        //possessive vs contraction
        //(spencer's house vs spencer's cool)
        if (isPossessive(s._terms[i])) {
          s._terms[i].tag('Possessive');
          continue;
        }
        //handle is/was/will ambiguity
        parts.end = isTense(s._terms[i]);
      }
      s._terms[i].silent_term = parts.start;
      s._terms[i].prepend('');
      s._terms[i + 1].silent_term = parts.end;
      continue;
    }
  }
  return s;
};

module.exports = interpret_contractions;
