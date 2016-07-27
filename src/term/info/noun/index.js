'use strict';
const isPlural = require('./inflection/isPlural');
const hasPlural = require('./inflection/hasPlural');
const article = require('./article');

const info = {
  /** is this term already plural */
  isplural: (t) => {
    return isPlural(t);
  },
  /** can this word become a plural? Some words like 'peace' cannot.*/
  hasplural: (t) => {
    return hasPlural(t);
  },
  /** whether to use a/an/this/those */
  article: (t) => {
    return article(t)
  }
};
module.exports = info;
