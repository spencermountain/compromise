'use strict';
// const normalize = require('./normalize');
const fns = require('./paths').fns;
const info = {

  /** the punctuation at the end of this term*/
  endPunctuation: function() {
    let m = this.text.match(/[a-z]([,:;\/.(\.\.\.)\!\?]+)$/i);
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

  /** interpret a term's hyphenation */
  hyphenation: function() {
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
  contraction: function() {
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
    let parts = t.normal.match(/^([a-z]+)'([a-z][a-z]?)$/);
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
  hasComma: function() {
    if (this.term.endPunctuation() === 'comma') {
      return true;
    }
    return false;
  },

  /** where in the sentence is it? zero-based. */
  index: function() {
    let t = this;
    let terms = t.context.parent.arr;
    for (let i = 0; i < terms.length; i++) {
      if (terms[i] === t) {
        return i;
      }
    }
    return null;
  },

  /** ensure the first character is a capital. Ignore other characters. */
  titlecase: function() {
    return this.text.replace(/^[a-z]/, (x) => x.toUpperCase());
  },
  noPunctuation: function() {
    return this.text.replace(/([,;:])$/, '');
  }
};

module.exports = info;
