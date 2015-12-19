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

}
Person.fn = Person.prototype;
module.exports = Person;

// let p = new Person('John Smith');
// console.log(p.gender());
