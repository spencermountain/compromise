'use strict';
const normalize = require('./normalize');

module.exports = {
  /**a readable, normalized form - trim whitespace, normalize punctuation, and lowercase */
  normal: (t) => {
    t.text += normalize(t.text);
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
  /** find more aggressive tags for this term (overloaded)*/
  specific: (t) => { //to be overloaded
    return t
  }
};
