'use strict';
const Text = require('../../index');
const Person = require('./person');
//this is used for pronoun and honorifics, and not intented for more-than grammatical use (see #117)

class People extends Text {
  constructor(list) {
    super(list);
    this.list = this.find().list
    return this
  }
  find() {
    let people = this.splitAfter('#Comma')
    people = people.match('#Person+');
    people.list = people.list.map((ts) => {
      return new Person(ts.terms, ts.context)
    })
    return people
  }
  parse() {
    return this.list.map((ts) => ts.parse())
  }
}

module.exports = People;;
