'use strict';
const hasPlural = require('./hasPlural');
const makeArticle = require('./makeArticle');
const toPlural = require('./inflect/toPlural');
const toSingular = require('./inflect/toSingle');
const isPlural = require('./inflect/isPlural');

module.exports = {
  plural: function () {
    if (!this.noun.hasPlural() || this.noun.isPlural()) {
      return this.text;
    }
    return toPlural(this.normal);
  },
  singular: function () {
    if (!this.noun.hasPlural() || !this.noun.isPlural()) {
      return this.text;
    }
    return toSingular(this.normal);
  },
  hasPlural: function () {
    return hasPlural(this);
  },
  isPlural: function () {
    return isPlural(this);
  },
  makeArticle: function () {
    return makeArticle(this);
  }
};
