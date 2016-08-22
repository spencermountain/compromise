'use strict';
const data = require('./data');

//these are always contractions
const notPossessive = {
  'it\'s': true,
  'that\'s': true
};

// 's may be a contraction or a possessive
// 'spencer's house' vs 'spencer's good'
const isPossessive = (t) => {
  //check blacklist
  if (notPossessive[t.normal]) {
    return false;
  }
  let after = t.after(3);
  for(let i = 0; i < after.length; i++) {
    //an adjective suggests 'is good'
    if (after[i].tag.Adjective) {
      return false;
    }
    //a gerund suggests 'is walking'
    if (after[i].tag.Gerund) {
      return false;
    }
    //a noun suggests a possessive
    if (after[i].tag.Noun) {
      return true;
    }
  }
  //if end of sentence, it is possessive
  return true;
};

//for 'spencer's X' decide 'is/was/will be' //todo:do this
const isTense = (t) => {
  let after = t.after(3);
  for(let i = 0; i < after.length; i++) {
    //adjectives are present
    if (after[i].tag.Adjective) {
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
  for (let i = 0; i < s.arr.length; i++) {
    let t = s.arr[i];
    //interpret irregular contractions, like "let's"
    if (data.irregulars[t.normal]) {
      let arr = data.irregulars[t.normal];
      s.arr[i].silent_term = arr[0];
      //add second word
      s.arr[i].prepend('');
      s.arr[i + 1].silent_term = arr[1];
      //if it exists, add a third word
      if (arr[2]) {
        s.arr[i + 1].prepend('');
        s.arr[i + 2].silent_term = arr[2];
      }
      break;
    }
    let parts = s.arr[i].info('contraction');
    if (parts) {
      parts = identify_contraction(parts);
      //don't create a new term for "s'"
      if (!parts.end) {
        continue;
      }
      //handle ambiguous "'s" contraction
      if (parts.end === 's') {
        //possessive vs contraction
        //(spencer's house vs spencer's cool)
        if (isPossessive(s.arr[i])) {
          s.arr[i].tagAs('Possessive');
          continue;
        }
        //handle is/was/will ambiguity
        parts.end = isTense(s.arr[i]);
      }
      s.arr[i].silent_term = parts.start;
      s.arr[i].prepend('');
      s.arr[i + 1].silent_term = parts.end;
      continue;
    }
  }
  return s;
};

module.exports = interpret_contractions;
