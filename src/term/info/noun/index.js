'use strict';
const isPlural = require('./isPlural');
const hasPlural = require('./hasPlural');

const info = {
  isplural: (t) => {
    return isPlural(t.normal);
  },
  hasplural: (t) => {
    return hasPlural(t.normal);
  },
  article: (t) => {

    //the || ''
    // not people, plurals,

    //a || an || ''

  }
};
module.exports = info;
