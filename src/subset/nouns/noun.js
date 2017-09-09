'use strict';
const Terms = require('../../paths').Terms;
const hasPlural = require('./hasPlural');
const isPlural = require('./isPlural');
const makeArticle = require('./makeArticle');
const pluralize = require('./methods/pluralize');
const singularize = require('./methods/singularize');

const methods = {
  article: function() {
    return makeArticle(this.main);
  },
  isPlural: function() {
    return isPlural(this.main);
  },
  hasPlural: function() {
    return hasPlural(this.main);
  },
  toPlural: function() {
    let t = this.main;
    if (hasPlural(t) && !isPlural(t)) {
      t.text = pluralize(t.normal, this.world) || t.text;
      t.unTag('Plural', 'toPlural');
      t.tag('Singular', 'toPlural');
    }
    return this;
  },
  toSingular: function() {
    let t = this.main;
    if (isPlural(t)) {
      t.text = singularize(t.normal, this.world) || t.text;
      t.unTag('Plural', 'toSingular');
      t.tag('Singular', 'toSingular');
    }
    return this;
  },
  data: function() {
    return {
      article: this.article(),
      text: this.out('text'),
      normal: this.out('normal'),
      singular: this.toSingular().out('normal'),
      plural: this.toPlural().out('normal')
    };
  }
};

const Noun = function(arr, world, refText) {
  Terms.call(this, arr, world, refText);
  this.main = this.terms[0];
};
Noun.prototype = Object.create(Terms.prototype);

Object.keys(methods).forEach(k => {
  Noun.prototype[k] = methods[k];
});
module.exports = Noun;
