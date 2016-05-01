// not all cultures use the firstname-lastname practice. this does make some assumptions.
'use strict';
const Noun = require('../noun.js');
const guess_gender = require('./gender.js');
const parse_name = require('./parse_name.js');

class Person extends Noun {
  constructor(str, tag) {
    super(str);
    this.tag = tag;
    this.pos['Person'] = true;
    this.honourific = null;
    this.firstName = null;
    this.middleName = null;
    this.lastName = null;
    this.parse();
    if (this.isPronoun()) {
      this.pos['Pronoun'] = true;
    }
  }

  isPronoun() {
    let whitelist = {
      'he': true,
      'she': true,
      'i': true,
      'you': true,
    };
    return whitelist[this.normal];
  }

  //proper normalised name without the cruft
  root() {
    if (this.isPronoun()) {
      return this.normal;
    }
    let str = this.firstName || '';
    if (this.middleName) {
      str += ' ' + this.middleName;
    }
    if (this.lastName) {
      str += ' ' + this.lastName;
    }
    return str.trim() || this.normal;
  }

  //turn a multi-word string into [first, middle, last, honourific]
  parse() {
    let o = parse_name(this.normal);
    this.honourific = o.honourific;
    this.firstName = o.firstName;
    this.middleName = o.middleName;
    this.lastName = o.lastName;
  }

  gender() {
    return guess_gender(this.normal);
  }

  pronoun() {
    const pronouns = {
      Male: 'he',
      Female: 'she',
    };
    let gender = this.gender();
    //return 'singular they' if no gender is found
    return pronouns[gender] || 'they';
  }

}
Person.fn = Person.prototype;
module.exports = Person;

// let p = new Person('John Smith');
// console.log(p.gender());
