'use strict';
const hasPlural = require('./hasPlural');
const article = require('./article');

const info = {

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
