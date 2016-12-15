'use strict';
const Text = require('../../index');
const Person = require('./person');
//this is used for pronoun and honorifics, and not intented for more-than grammatical use (see #117)

class People extends Text {
  parse() {
    return this.list.map((ts) => ts.parse());
  }
  static find(r) {
    let people = r.splitAfter('#Comma');
    people = people.match('#Person+');
    people.list = people.list.map((ts) => {
      return new Person(ts.terms, ts.lexicon, ts.parent, ts.parentTerms);
    });
    return people;
  }
}

module.exports = People;
