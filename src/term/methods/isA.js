'use strict';

const addMethods = (Term) => {

  const methods = {
    /** does it appear to be an acronym, like FBI or M.L.B. */
    isAcronym: function () {
      //like N.D.A
      if (this.text.match(/([A-Z]\.)+[A-Z]?$/)) {
        return true;
      }
      //like 'F.'
      if (this.text.match(/^[A-Z]\.$/)) {
        return true;
      }
      //like NDA
      if (this.text.match(/[A-Z]{3}$/)) {
        return true;
      }
      return false;
    },

    /** check if it is word-like in english */
    isWord: function () {
      let t = this;
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
    }
  };
  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Term.prototype[k] = methods[k];
  });
  return Term;
};

module.exports = addMethods;
