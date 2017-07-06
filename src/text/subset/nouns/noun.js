'use strict';
const Terms = require('../../paths').Terms;
const hasPlural = require('./hasPlural');
const isPlural = require('./isPlural');
const makeArticle = require('./makeArticle');
const pluralize = require('./methods/pluralize');
const singularize = require('./methods/singularize');

const methods = {
  article: function() {
    let t = this.t;
    return makeArticle(t);
  },
  isPlural: function() {
    let t = this.t;
    return isPlural(t);
  },
  hasPlural: function() {
    let t = this.t;
    return hasPlural(t);
  },
  toPlural: function() {
    let t = this.t;
    if (hasPlural(t) && !isPlural(t)) {
      t.text = pluralize(t.normal) || t.text;
      t.unTag('Plural', 'toPlural');
      t.tag('Singular', 'toPlural');
    }
    return this;
  },
  toSingular: function() {
    let t = this.t;
    if (isPlural(t)) {
      t.text = singularize(t.normal) || t.text;
      t.unTag('Plural', 'toSingular');
      t.tag('Singular', 'toSingular');
    }
    return this;
  },
  data: function() {
    return {
      article: this.article(),
      singular: this.toSingular().out('normal'),
      plural: this.toPlural().out('normal')
    };
  }
};

const Noun = function(arr, lexicon, refText) {
  Terms.call(this, arr, lexicon, refText);
  this.t = this.terms[0];
};
Noun.prototype = Object.create(Terms.prototype);

Object.keys(methods).forEach(k => {
  Noun.prototype[k] = methods[k];
});
module.exports = Noun;
