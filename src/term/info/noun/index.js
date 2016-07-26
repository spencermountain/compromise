'use strict';
const isPlural = require('./inflection/isPlural');
const hasPlural = require('./inflection/hasPlural');
const article = require('./article');

const info = {
  isplural: (t) => {
    return isPlural(t);
  },
  hasplural: (t) => {
    return hasPlural(t);
  },
  article: (t) => {
    return article(t)
  }
};
module.exports = info;
