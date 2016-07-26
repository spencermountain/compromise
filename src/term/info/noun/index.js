'use strict';
const isPlural = require('./inflection/isPlural');
const hasPlural = require('./inflection/hasPlural');
const article = require('./article');

const info = {
  isplural: (t) => {
    return isPlural(t.normal);
  },
  hasplural: (t) => {
    return hasPlural(t.normal);
  },
  article: (t) => {
    return article(t.normal)
  }
};
module.exports = info;
