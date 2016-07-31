'use strict';
const wrestleNoun = require('./wrestle')
let noun = {
  /** Convert the term to a plural form (sometimes called inflection)*/
  plural: (t) => {
    t.text += 's';
    t.tag('Plural');
    return t;
  },
  /** Convert the term to a singular form (sometimes called inflection)*/
  singular: (t) => {
    t.text.replace('s$', '');
    t.tag('Singular');
    return t;
  },
  /** Turn a generic 'Noun' term into a more detailed form*/
  specific: (t) => {
    return wrestleNoun(t)
  }
};
module.exports = noun;
