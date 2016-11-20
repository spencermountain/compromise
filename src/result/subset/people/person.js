'use strict';
const Terms = require('../../paths').Terms;

class Person extends Terms {
  constructor(terms) {
    super(terms);
    this.firstName = this.match('#FirstName+')
      // console.log(this.firstName)
    return this;
  }
  parse() {
    return {
      honourifics: this.honorifics.map(t => t.text),
      firstName: this.firstNames.normal()
    };
  }
}
module.exports = Person;
