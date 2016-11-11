'use strict';
const Terms = require('../paths').Terms;

class Person extends Terms {
  constructor(terms) {
    super(terms);
    this.honorifics = this.subset('Honorific');
    this.firstNames = this.subset('FirstName');
    this.middleNames = this.subset('Acronym');
    this.lastNames = this.filter((t) => {
      return !t.tag.Honorific && !t.tag.FirstName && !t.tag.Acronym;
    });
    // let firstNames = this.match('#FirstName'); //.normal;
    // this.firstName = firstNames.first();
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
