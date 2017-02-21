'use strict';
const Terms = require('../../paths').Terms;
const guessGender = require('./guessGender');
const log = require('../../paths').log;

class Person extends Terms {
  data() {
    return {
      text: this.out('text'),
      normal: this.out('normal'),
      firstName: this.firstName.out('normal'),
      middleName: this.middleName.out('normal'),
      lastName: this.lastName.out('normal'),
      genderGuess: this.guessGender(),
      pronoun: this.pronoun(),
      honorifics: this.honorifics.out('array')
    };
  }
  constructor(arr, lexicon, refText, refTerms) {
    super(arr, lexicon, refText, refTerms);
    this.firstName = this.match('#FirstName+');
    this.middleName = this.match('#Acronym+');
    this.honorifics = this.match('#Honorific');
    this.lastName = this.match('#LastName+');
    //assume first-last
    if (!this.firstName.found && this.length > 1) {
      let m = this.not('(#Acronym|#Honorific)');
      this.firstName = m.first();
      this.lastName = m.last();
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
    if (this.firstName.match('#MaleName').found) {
      log.tell('known male name');
      return 'Male';
    }
    if (this.firstName.match('#FemaleName').found) {
      log.tell('known female name');
      return 'Female';
    }
    //look-for regex clues
    let str = this.firstName.out('normal');
    return guessGender(str);
  }
  pronoun() {
    let str = this.firstName.out('normal');
    let g = this.guessGender(str);
    if (g === 'Male') {
      return 'he';
    }
    if (g === 'Female') {
      return 'she';
    }
    return 'they';
  }
  root() {
    let first = this.firstName.out('root');
    let last = this.lastName.out('root');
    if (first && last) {
      return first + ' ' + last;
    }
    return last || first || this.out('root');
  }
}
module.exports = Person;
