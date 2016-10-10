'use strict';
const hasPlural = require('./hasPlural');
const makeArticle = require('./makeArticle');
const toPlural = require('./inflect/toPlural');
const toSingular = require('./inflect/toSingle');

module.exports = {
  toPlural : function() {
    return toPlural(this.text);
  },
  toSingular : function() {
    return toSingular(this.text);
  },
  hasPlural: function() {
    return '?'; //todo
  }
};
