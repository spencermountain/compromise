'use strict';
const isPlural = require('./isPlural');
const hasPlural = require('./hasPlural');

const info = {
  isPlural: (t) => {
    return isPlural(t.normal);
  },
  hasPlural: (t) => {
    return hasPlural(t.normal);
  },
  article: (t) => {

    //the || ''
    // not people, plurals,

    //a || an || ''

  }
};
module.exports = Object.assign({}, require('../term'), info);
