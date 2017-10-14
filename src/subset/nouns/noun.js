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
    return isPlural(this.main, this.world);
  },
  hasPlural: function() {
    return hasPlural(this.main);
  },
  toPlural: function() {
    let t = this.main;
    if (hasPlural(t) && !isPlural(t, this.world)) {
      t.text = pluralize(t.normal, this.world) || t.text;
      t.unTag('Singular', 'toPlural');
      t.tag('Plural', 'toPlural');
    }
    return this;
  },
  toSingular: function() {
    let t = this.main;
    if (isPlural(t, this.world)) {
      t.text = singularize(t.normal, this.world) || t.text;
      t.unTag('Plural', 'toSingular');
      t.tag('Singular', 'toSingular');
    }
    return this;
  },
  data: function() {
    let t = this.main;
    let singular = t.text;
    if (isPlural(t, this.world)) {
      singular = singularize(t.normal, this.world) || t.text;
    }
    let plural = t.text;
    if (hasPlural(t) && !isPlural(t, this.world)) {
      plural = pluralize(t.normal, this.world) || t.text;
    }
    return {
      text: this.out('text'),
      normal: this.out('normal'),
      article: this.article(),
      main: t.normal,
      singular: singular,
      plural: plural
    };
  }
};

const Noun = function(arr, world, refText) {
  Terms.call(this, arr, world, refText);
  this.main = this.terms[this.terms.length - 1];
};
Noun.prototype = Object.create(Terms.prototype);

Object.keys(methods).forEach(k => {
  Noun.prototype[k] = methods[k];
});
module.exports = Noun;
