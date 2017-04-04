'use strict';
//regs-
const periodAcronym = /([A-Z]\.)+[A-Z]?$/;
const oneLetterAcronym = /^[A-Z]\.$/;
const noPeriodAcronym = /[A-Z]{3}$/;
const hasVowel = /[aeiouy]/i;
const hasLetter = /[a-z]/;
const hasNumber = /[0-9]/;

const addMethods = (Term) => {

  const methods = {
    /** does it appear to be an acronym, like FBI or M.L.B. */
    isAcronym: function () {
      //like N.D.A
      if (periodAcronym.test(this.text) === true) {
        return true;
      }
      //like 'F.'
      if (oneLetterAcronym.test(this.text) === true) {
        return true;
      }
      //like NDA
      if (noPeriodAcronym.test(this.text) === true) {
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
      if (/[a-z|A-Z|0-9]/.test(t.text) === false) {
        return false;
      }
      //has letters, but with no vowels
      if (t.normal.length > 1 && hasLetter.test(t.normal) === true && hasVowel.test(t.normal) === false) {
        return false;
      }
      //has numbers but not a 'value'
      if (hasNumber.test(t.normal) === true) {
        //s4e
        if (/[a-z][0-9][a-z]/.test(t.normal) === true) {
          return false;
        }
        //ensure it looks like a 'value' eg '-$4,231.00'
        if (/^([$-])*?([0-9,\.])*?([s\$%])*?$/.test(t.normal) === false) {
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
