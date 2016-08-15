'use strict';
//true/false methods for all Terms
const term = {

  /** is this the first term in the sentence? */
  first: (t) => {
    let index = t.index();
    if (index === 0) {
      return true;
    }
    return false;
  },

  /** is this the last term in the sentence? */
  last: (t) => {
    let index = t.index();
    if (index === t.context.sentence.arr.length - 1) {
      return true;
    }
    return false;
  },

  /** check if the text has one capital letter, the first one */
  titlecase: (t) => {
    if (t.text.match(/^[A-Z][a-z]/)) {
      return true;
    }
    return false;
  },

  /** check if it is word-like in english */
  word: (t) => {
    //assume a contraction produces a word-word
    if (t.silent_term) {
      return true;
    }
    //no letters or numbers
    if (!t.text.match(/[a-z|0-9]/i)) {
      return false;
    }
    //has letters, but with no vowels
    if (t.normal.match(/[a-z]/) && t.normal.length > 1 && !t.normal.match(/[aeiouy]/i)) {
      return false;
    }
    //has numbers but not a 'value'
    if (t.normal.match(/[0-9]/)) {
      //s4e
      if (t.normal.match(/[a-z][0-9][a-z]/)) {
        return false;
      }
      //ensure it looks like a 'value' eg '-$4,231.00'
      if (!t.normal.match(/^([$-])*?([0-9,\.])*?([s\$%])*?$/)) {
        return false;
      }
    }
    return true;
  },

  /** is this a word like 'not' that reverses a verb*/
  negation: (t) => {
    if (t.normal === 'not' || t.silent_term === 'not') {
      return true;
    }
    return false;
  },

  /** does it appear to be an acronym, like FBI or M.L.B. */
  acronym: (t) => {
    //like N.D.A
    if (t.text.match(/([A-Z]\.)+[A-Z]?$/)) {
      return true;
    }
    //like 'F.'
    if (t.text.match(/^[A-Z]\.$/)) {
      return true;
    }
    //like NDA
    if (t.text.match(/[A-Z]{3}$/)) {
      return true;
    }
    return false;
  }

};

module.exports = term;
