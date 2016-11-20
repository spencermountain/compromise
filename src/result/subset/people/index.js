'use strict';
const Result = require('../../index');
const Person = require('./person');
//this is used for pronoun and honorifics, and not intented for more-than grammatical use (see #117)
const guessGender = require('./guessGender');

class People extends Result {
  constructor(list) {
    super(list);
    this.list = this.find().list
    return this
  }
  find() {
    let people = this.splitAfter('#Comma')
    people = people.match('#Noun+');
    people.list = people.list.map((ts) => {
      return new Person(ts.terms)
    })
    return people
  }
  parse() {
    return this.list.map((ts) => {
      return {
        firstName: ts.firstname
      }
    })
  }
}

module.exports = People;;
