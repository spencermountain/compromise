'use strict';
const Terms = require('../../paths').Terms;
const hasPlural = require('./hasPlural');
const isPlural = require('./isPlural');
const makeArticle = require('./makeArticle');
const pluralize = require('./methods/pluralize');
const singularize = require('./methods/singularize');

class Noun extends Terms {
  constructor(arr, lexicon, refText, refTerms) {
    super(arr, lexicon, refText, refTerms);
    this.t = this.terms[0];
  }
  article() {
    let t = this.t;
    return makeArticle(t);
  }
  isPlural() {
    let t = this.t;
    return isPlural(t);
  }
  hasPlural() {
    let t = this.t;
    return hasPlural(t);
  }
  toPlural() {
    let t = this.t;
    if (hasPlural(t) && !isPlural(t)) {
      t.text = pluralize(t.text);
      t.unTag('Plural', 'toPlural');
      t.tagAs('Singular', 'toPlural');
    }
    return this;
  }
  toSingular() {
    let t = this.t;
    if (isPlural(t)) {
      t.text = singularize(t.text);
      t.unTag('Plural', 'toSingular');
      t.tagAs('Singular', 'toSingular');
    }
    return this;
  }
  data() {
    return {
      article: this.article(),
      singular: this.toSingular().out('normal'),
      plural: this.toPlural().out('normal'),
    };
  }
}
module.exports = Noun;
