'use strict';
const Terms = require('../../paths').Terms;
const hasPlural = require('./hasPlural');
const isPlural = require('./isPlural');
const toPossessive = require('./toPossessive');
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
  toPlural: function(verbose) {
    let t = this.main;
    if (hasPlural(t) && !isPlural(t, this.world)) {
      t.text = pluralize(t.normal, this.world, verbose) || t.text;
      t.unTag('Singular', 'toPlural');
      t.tag('Plural', 'toPlural');
    }
    return this;
  },
  toSingular: function(verbose) {
    let t = this.main;
    if (isPlural(t, this.world)) {
      t.text = singularize(t.normal, this.world, verbose) || t.text;
      t.unTag('Plural', 'toSingular');
      t.tag('Singular', 'toSingular');
    }
    return this;
  },
  toPossessive: function() {
    let t = this.main;
    if (t.tags.Possessive) {
      return this;
    }
    t = toPossessive(t);
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
    //support 'mayors of chicago'
    let qualifier = '';
    if (this.qualifier) {
      qualifier = this.qualifier.out('normal');
      singular += ' ' + qualifier;
      plural += ' ' + qualifier;
    }
    return {
      text: this.out('text'),
      normal: this.out('normal'),
      article: this.article(),
      main: t.normal,
      qualifier: qualifier,
      singular: singular,
      plural: plural
    };
  }
};

const Noun = function(arr, world, refText) {
  Terms.call(this, arr, world, refText);
  //support 'mayor of chicago' as one noun-phrase
  this.main = this.match('[#Noun+] (of|by|for)');
  if (this.main.found) {
    this.main = this.main.list[0].terms[0];
  } else {
    this.main = this.terms[this.terms.length - 1];
  }
  //'of chicago'
  this.qualifier = this.match(this.main.normal + ' [.+]').list[0];
};
Noun.prototype = Object.create(Terms.prototype);

Object.keys(methods).forEach(k => {
  Noun.prototype[k] = methods[k];
});
module.exports = Noun;
