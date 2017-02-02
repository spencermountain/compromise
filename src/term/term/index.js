'use strict';
// const normalize = require('./normalize');
const path = require('../paths');
const fns = path.fns;

const term = {

  /** interpret a term's hyphenation */
  hyphenation: function () {
    let m = this.normal.match(/^([a-z]+)-([a-z]+)$/);
    if (m && m[1] && m[2]) {
      return {
        start: m[1],
        end: m[2]
      };
    }
    return null;
  },

  /** interpret a terms' contraction */
  contraction: function () {
    let t = this;
    const allowed = {
      're': true,
      've': true,
      'll': true,
      't': true,
      's': true,
      'd': true,
      'm': true
    };
    let parts = t.text.match(/^([a-z]+)'([a-z][a-z]?)$/i);
    if (parts && parts[1] && allowed[parts[2]]) {
      //handle n't
      if (parts[2] === 't' && parts[1].match(/[a-z]n$/)) {
        parts[1] = parts[1].replace(/n$/, '');
        parts[2] = 'n\'t'; //dunno..
      }
      //fix titlecase
      if (t.tag.TitleCase) {
        parts[1] = fns.titleCase(parts[1]);
      }
      return {
        start: parts[1],
        end: parts[2]
      };
    }
    // "flanders' house"
    parts = t.text.match(/[a-z]s'$/i);
    if (parts) {
      return {
        start: t.normal.replace(/s'?$/, ''),
        end: ''
      };
    }
    return null;
  },

  /** check if the term ends with a comma */
  hasComma: function () {
    if (this.term.endPunctuation() === 'comma') {
      return true;
    }
    return false;
  },

  /** where in the sentence is it? zero-based. */
  index: function () {
    let t = this;
    let terms = t.parent.arr;
    for (let i = 0; i < terms.length; i++) {
      if (terms[i] === t) {
        return i;
      }
    }
    return null;
  },

  noPunctuation: function () {
    return this.text.replace(/([,;:])$/, '');
  },
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

module.exports = term;
