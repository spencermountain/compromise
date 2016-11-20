'use strict';
const Terms = require('../../paths').Terms;

class Person extends Terms {
  constructor(terms) {
    super(terms);
    this.firstName = this.match('#FirstName+').first()
    return this;
  }
  parse() {
    return {
      firstName: this.firstName.normal()
    };
  }
}
module.exports = Person;
