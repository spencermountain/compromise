'use strict';
const Text = require('../../index');
// const Noun = require('./noun');

class Nouns extends Text {
  constructor(list) {
    super(list);
    // this.check();
    return this;
  }
  find() {
    return this.match('#Noun+');
  }
  parse() {
    return this.find().terms().map((t) => {
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
