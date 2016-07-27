'use strict';

const info = {

  //the punctuation at the end of this term
  endpunctuation: (t) => {
    let m = t.text.match(/[a-z]([,:;\/.(\.\.\.)\!\?]+)$/);
    if (m) {
      const allowed = {
        ',': 'comma',
        ':': 'colon',
        ';': 'semicolon',
        '.': 'period',
        '...': 'elipses',
        '!': 'exclamation',
        '?': 'question'
      };
      if (allowed[m[1]]) {
        return allowed[m[1]];
      }
    }
    return null;
  },

  hyphenation: (t) => {
    let m = t.text.match(/^([a-z]+)-([a-z]+)$/);
    if (m && m[1] && m[2]) {
      return {
        start: m[1],
        end: m[2]
      };
    }
    return null;
  },

  contraction: (t) => {
    const allowed = {
      'll': true,
      't': true,
      's': true,
      'd': true,
      'm': true
    };
    let parts = t.text.match(/^([a-z]+)'([a-z][a-z]?)$/);
    if (parts && parts[1] && allowed[parts[2]]) {
      //handle n't
      if (parts[2] === 't' && parts[1].match(/[a-z]n$/)) {
        parts[1] = parts[1].replace(/n$/, '');
        parts[2] = 'n\'t'; //dunno..
      }
      return {
        start: parts[1],
        end: parts[2]
      };
    }
    // "flanders' house"
    parts = t.text.match(/^([a-z]+s)'$/);
    if (parts) {
      return {
        start: parts[1],
        end: ''
      };
    }
    return null;
  },

  titlecase: (t) => {
    if (t.text.match(/^[A-Z][a-z]/)) {
      return true;
    }
    return false;
  },

  //is it perhaps not an english word?
  //.. to avoid lumping words with non-word stuff
  isword: (t) => {
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

  isacronym: (t) => {
    //like N.D.A
    if (t.text.match(/([A-Z]\.)+[A-Z]?$/i)) {
      return true;
    }
    //like 'F.'
    if (t.text.match(/^[A-Z]\.$/i)) {
      return true;
    }
    //like NDA
    if (t.text.match(/[A-Z]{3}$/i)) {
      return true;
    }
    return false;
  },

  hascomma: (t) => {
    if (t.info('endPunctuation') === 'comma') {
      return true;
    }
    return false;
  },
  termindex: (t) => {
    let terms = t.context.sentence.terms
    for (let i = 0; i < terms.length; i++) {
      if (terms[i] === t) {
        return i
      }
    }
    return null
  },
  before: (t) => {
    let terms = t.context.sentence.terms
    let i = t.info('TermIndex')
    return terms.slice(0, i)
  },
  after: (t) => {
    let terms = t.context.sentence.terms
    let i = t.info('TermIndex')
    return terms.slice(i, terms.length - 1)
  }

};

module.exports = info;
