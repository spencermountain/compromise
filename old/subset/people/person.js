'use strict';
const Terms = require('../../paths').Terms;
const guessGender = require('./guessGender');

const Person = function(arr, world, refText, refTerms) {
  Terms.call(this, arr, world, refText, refTerms);
  this.firstName = this.match('#FirstName+');
  this.middleName = this.match('#Acronym+');
  this.nickName = this.match('#NickName+');
  this.honorifics = this.match('#Honorific');
  this.lastName = this.match('#LastName+');
  //assume first-last
  if (!this.firstName.found && this.length > 1) {
    let m = this.not('(#Acronym|#Honorific)');
    this.firstName = m.first();
    this.lastName = m.last();
  }
  return this;
};
//Inherit properties
Person.prototype = Object.create(Terms.prototype);

const methods = {
  data: function() {
    return {
      text: this.out('text'),
      normal: this.out('normal'),
      firstName: this.firstName.out('normal'),
      middleName: this.middleName.out('normal'),
      nickName: this.nickName.out('normal'),
      lastName: this.lastName.out('normal'),
      genderGuess: this.guessGender(),
      pronoun: this.pronoun(),
      honorifics: this.honorifics.out('array')
    };
  },
  guessGender: function() {
    //try known honorifics
    if (this.honorifics.match('(mr|mister|sr|sir|jr)').found) {
      return 'Male';
    }
    if (this.honorifics.match('(mrs|miss|ms|misses|mme|mlle)').found) {
      return 'Female';
    }
    //try known first-names
    if (this.firstName.match('#MaleName').found) {
      return 'Male';
    }
    if (this.firstName.match('#FemaleName').found) {
      return 'Female';
    }
    //look-for regex clues
    let str = this.firstName.out('normal');
    return guessGender(str);
  },
  pronoun: function() {
    let str = this.firstName.out('normal');
    let g = this.guessGender(str);
    if (g === 'Male') {
      return 'he';
    }
    if (g === 'Female') {
      return 'she';
    }
    return 'they';
  },
  root: function() {
    let first = this.firstName.out('root');
    let last = this.lastName.out('root');
    if (first && last) {
      return first + ' ' + last;
    }
    return last || first || this.out('root');
  }
};

Object.keys(methods).forEach(k => {
  Person.prototype[k] = methods[k];
});
module.exports = Person;
