'use strict';
const hasPlural = require('./hasPlural');
const article = require('./article');
const toPlural = require('./inflect/toPlural');
const toSingle = require('./inflect/toSingle');

const info = {

  /** can this word become a plural? Some words like 'peace' cannot.*/
  hasplural: (t) => {
    return hasPlural(t);
  },
  /** whether to use a/an/this/those */
  article: (t) => {
    return article(t)
  },
  /** inflect/pluralize a word like 'shoe' into 'shoes' */
  plural: (t) => {
    if (t.info('hasPlural') && !t.is('Plural')) {
      return toPlural(t.normal)
    }
    return t.normal
  },
  /** inflect/pluralize a word like 'shoe' into 'shoes' */
  singular: (t) => {
    if (t.info('hasPlural') && t.is('Plural')) {
      return toSingle(t.normal)
    }
    return t.normal
  }
};
module.exports = info;
