'use strict';
const hasPlural = require('./hasPlural');
const makeArticle = require('./makeArticle');
const toPlural = require('./inflect/toPlural');
const toSingular = require('./inflect/toSingle');
const isPlural = require('./inflect/isPlural');

module.exports = {
  toPlural : function() {
    if (!this.noun.hasPlural() || this.noun.isPlural()) {
      return this.text;
    }
    return toPlural(this.text);
  },
  toSingular : function() {
    if (!this.noun.hasPlural() || !this.noun.isPlural()) {
      return this.text;
    }
    return toSingular(this.text);
  },
  hasPlural: function() {
    return hasPlural(this);
  },
  isPlural: function() {
    return isPlural(this);
  },
  makeArticle: function() {
    return makeArticle(this);
  }
};
