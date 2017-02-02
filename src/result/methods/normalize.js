'use strict';
//
const defaultMethods = {
  whitespace: true,
  case: true,
  numbers: true,
  punctuation: true,
  unicode: true,
  contractions: true
};

const methods = {

  /** make only one space between each word */
  whitespace: (r) => {
    r.forEachTerms((t) => {
      if (i > 0) {
        t.whitespace.before = ' ';
      }
      t.whitespace.after = '';
    });
    return r;
  },

  /** make first-word titlecase, and people, places titlecase */
  case: (r) => {
    r.forEachTerms((t) => {
      if (i === 0 || t.tag.Person || t.tag.Place || t.tag.Organization) {
        t.text = t.term.titlecase();
      } else {
        t.text = t.text.toLowerCase();
      }
    });
    return r;
  },

  /** turn 'five' to 5, and 'fifth' to 5th*/
  numbers: (r) => {
    return r.values().toNumber();
  },

  /** remove commas, semicolons - but keep sentence-ending punctuation*/
  punctuation: (r) => {
    r.forEachTerms((t) => {
      if (i < ts.terms.length - 1) {
        t.text = t.killPunctuation();
      }
    });
    return r;
  },

  contractions: (r) => {
    return r.contractions().expand();
  }
};

const normalize = function(obj) {
  obj = obj || defaultMethods;
  Object.keys(obj).forEach((k) => {
    if (obj[k] && methods[k]) {
      result = methods[k](Text);
    }
  });
  return Text;
};

module.exports = normalize;
