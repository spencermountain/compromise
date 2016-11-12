'use strict';
const Result = require('../../index');
const Noun = require('./noun');

class Nouns extends Result {
  constructor(list) {
    super(list);
    // this.check();
    this.match('#Noun+');
    return this;
  }
  parse() {
    return this.terms.map((t) => {
      return {
        article: t.noun.makeArticle(),
        singular: t.noun.singular(),
        plural: t.noun.plural(),
      };
    });
  }
}
Nouns.prototype.toPlural = require('./toPlural');
Nouns.prototype.toSingular = require('./toSingular');

module.exports = Nouns;
