'use strict';
const Terms = require('../../paths').Terms;
const guessGender = require('./guessGender');
const log = require('../../paths').log


class Person extends Terms {
  constructor(terms, context) {
    super(terms, context);
    this.firstName = this.pluck('#FirstName+').list[0]
    this.middleName = this.pluck('#Acronym+')
    this.honorifics = this.pluck('#Honorific')
    this.lastName = new Terms([])
      //assume first-last
    if (!this.firstName && this.length === 2) {
      let m = this.clone().remove('(#Acronym|#Honorific)')
      this.firstName = m.first()
      this.lastName = m.last()
    } else {
      this.lastName = this.pluck('#Person').list[0]
    }
    return this;
  }
  guessGender() {
    //try known honorifics
    if (this.honorifics.match('(mr|mister|sr|sir|jr)').found) {
      log.tell('known male honorific')
      return 'Male'
    }
    if (this.honorifics.match('(mrs|miss|ms|misses|mme|mlle)').found) {
      log.tell('known female honorific')
      return 'Female'
    }
    //try known first-names
    if (this.firstName.match('#MalePerson').found) {
      log.tell('known male name')
      return 'Male'
    }
    if (this.firstName.match('#FemalePerson').found) {
      log.tell('known female name')
      return 'Female'
    }
    //look-for regex clues
    return guessGender(this.firstName.normal())
  }
  parse() {
    return {
      firstName: this.firstName.normal(),
      middleName: this.middleName.normal(),
      lastName: this.lastName.normal(),
      genderGuess: this.guessGender(),
      honorifics: this.honorifics.asArray()
    };
  }
}
module.exports = Person;;;
