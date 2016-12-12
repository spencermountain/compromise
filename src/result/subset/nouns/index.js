'use strict';
const Text = require('../../index');
// const Noun = require('./noun');

class Things extends Text {
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
    return r.match('#Noun+');
  }
}
Things.prototype.toPlural = require('./toPlural');
Things.prototype.toSingular = require('./toSingular');

module.exports = Things;
