'use strict';
const Terms = require('../../paths').Terms;
const guessGender = require('./guessGender');
const log = require('../../paths').log;

class Person extends Terms {
  data() {
    return {
      text: this.plaintext(),
      normal: this.normal(),
      firstName: this.firstName.normal(),
      middleName: this.middleName.normal(),
      lastName: this.lastName.normal(),
      genderGuess: this.guessGender(),
      honorifics: this.honorifics.asArray()
    };
  }
  constructor(arr, lexicon, refText, refTerms) {
    super(arr, lexicon, refText, refTerms);
    this.firstName = this.match('#FirstName+');
    this.middleName = this.match('#Acronym+');
    this.honorifics = this.match('#Honorific');
    this.lastName = this.match('#LastName+');
    //assume first-last
    if (!this.firstName && this.length === 2) {
      let m = this.not('(#Acronym|#Honorific)');
      this.firstName = m.first();
      this.lastName = m.last();
    } else {
      // this.lastName = this.match('#Person').list[0];
    }
    return this;
  }
  guessGender() {
    //try known honorifics
    if (this.honorifics.match('(mr|mister|sr|sir|jr)').found) {
      log.tell('known male honorific');
      return 'Male';
    }
    if (this.honorifics.match('(mrs|miss|ms|misses|mme|mlle)').found) {
      log.tell('known female honorific');
      return 'Female';
    }
    //try known first-names
    if (this.firstName.match('#MalePerson').found) {
      log.tell('known male name');
      return 'Male';
    }
    if (this.firstName.match('#FemalePerson').found) {
      log.tell('known female name');
      return 'Female';
    }
    //look-for regex clues
    return guessGender(this.firstName.normal());
  }
  root() {
    let first = this.firstName.root();
    let last = this.lastName.root();
    if (first && last) {
      return first + ' ' + last;
    }
    return last || first || this.root();
  }
}
module.exports = Person;
