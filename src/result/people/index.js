'use strict';
const Result = require('../index');

class People extends Result {
  constructor(list) {
    super(list);
    // this.check();
    this.when('#Person+');
    return this;
  }
  parse() {
    return this.terms.map((t) => {
      return {
        honourific: this.honourific(),
        firstName: this.firstName(),
        middleName: this.middleName(),
        lastName: this.lastName(),
        pronoun: this.pronoun(),
      };
    });
  }
  honourific() {}
  firstName() {}
  middleName() {}
  lastName() {}
  pronoun() {}

}

module.exports = People;
