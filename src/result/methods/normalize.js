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
    r.terms().list.forEach((ts, i) => {
      let t = ts.terms[0];
      if (i > 0) {
        t.whitespace.before = ' ';
      }
      t.whitespace.after = '';
    });
    return r;
  },

  /** make first-word titlecase, and people, places titlecase */
  case: (r) => {
    r.terms().list.forEach((ts, i) => {
      let t = ts.terms[0];
      if (i === 0 || t.tag.Person || t.tag.Place || t.tag.Organization) {
        ts.toTitleCase();
      } else {
        ts.toLowerCase();
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
    r.terms().list.forEach((ts, i) => {
      let t = ts.terms[0];
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

const addMethods = (Text) => {
  Text.prototype.normalize = function(obj) {
    obj = obj || defaultMethods;
    //do each type of normalization
    Object.keys(obj).forEach((fn) => {
      if (methods[fn]) {
        methods[fn](this);
      }
    });
  };
  return Text;
};
module.exports = addMethods;
