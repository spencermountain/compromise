'use strict';
const contract = require('./contract');

module.exports = {
  /**a readable, normalized form - trim whitespace, normalize punctuation, and lowercase */
  normal: (t) => {
    t.text = t.info('normalized');
    t.whitespace.before = '';
    t.whitespace.after = ' ';
    //don't append a space at the end
    if (t.is('last')) {
      t.whitespace.after = '';
    }
    return t;
  },
  /** set all characters to lower/downcase*/
  lowercase: (t) => {
    t.text = t.text.toLowerCase();
    return t;
  },
  /** set all characters to uper/titlecase*/
  uppercase: (t) => {
    t.text = t.text.toUpperCase();
    return t;
  },
  /** ensure the first character is a capital. Ignore other characters. */
  titlecase: (t) => {
    t.text = t.text.replace(/^[a-z]/, (x) => x.toUpperCase());
    return t;
  },

  /** normalize newlines, tabs, and multiple spaces */
  normalwhitespace: (t) => {
    t.whitespace.before = ' ';
    t.whitespace.after = '';
    return t;
  },

  /** expand all contractions */
  expansion: (t) => {
    if (t.silent_term) {
      t.text = t.silent_term;
      t.silent_term = null;
    }
    return t;
  },

  /** contract any (possible) contractions */
  contraction: (t) => {
    return contract(t);
  }

};
