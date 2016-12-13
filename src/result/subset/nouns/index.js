'use strict';
const Text = require('../../index');
// const Noun = require('./noun');

class Nouns extends Text {
  toSingular() {}
  toPlural() {}
  parse() {
    return this.terms().map((t) => {
      return {
        article: t.noun.makeArticle(),
        singular: t.noun.singular(),
        plural: t.noun.plural(),
      };
    });
  }
  static find(r) {
    r = r.splitAfter('#Comma');
    r = r.match('#Noun+');
    r = r.not('#Pronoun');
    r = r.not('#Date');
    return r;
  }
}
Nouns.prototype.toPlural = require('./toPlural');
Nouns.prototype.toSingular = require('./toSingular');

module.exports = Nouns;
