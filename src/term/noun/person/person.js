// not all cultures use the firstname-lastname practice. this does make some assumptions.

'use strict';
const Noun = require('../noun.js');
const firstnames = require('../../../data/firstnames');
let honourifics = require('../../../data/honourifics');
honourifics = honourifics.reduce(function(h, s) {
  h[s] = true;
  return h;
}, {});

const Person = class Person extends Noun {
constructor(str) {
  super(str);
  this.pos = 'Person';
  this.honourific = null;
  this.firstName = null;
  this.middleName = null;
  this.lastName = null;
  this.parse();
}

//turn a multi-word string into [first, middle, last, honourific]
parse() {
  let words = this.normal.split(' ');

  //first-word honourific
  if (honourifics[words[0]]) {
    this.honourific = words[0];
    words = words.slice(1, words.length);
  }
  //last-word honourific
  if (honourifics[words[words.length - 1]]) {
    this.honourific = words[words.length - 1];
    words = words.slice(0, words.length - 1);
  }
  //see if the first word is now a known first-name
  if (firstnames[words[0]]) {
    this.firstName = words[0];
    words = words.slice(1, words.length);
  } else {
    //ambiguous one-word name
    if (words.length === 1) {
      return;
    }
    //looks like an unknown first-name
    this.firstName = words[0];
    words = words.slice(1, words.length);
  }
  //assume the remaining is '[middle..] [last]'
  if (words[words.length - 1]) {
    this.lastName = words[words.length - 1];
    words = words.slice(0, words.length - 1);
  }
  this.middleName = words.join(' ');
}

gender() {
  if (!this.firstName) {
    return null;
  }
  if (firstnames[this.firstName] === 'm') {
    return 'Male';
  }
  if (firstnames[this.firstName] === 'f') {
    return 'Female';
  }
  if (this.firstName.match(/.(i|ee|[a|e]y|a)$/)) { //this is almost-always true
    return 'Female';
  }
  return null;
}

pronoun() {
  let gender = this.gender();
  if (gender === 'Male') {
    return 'he';
  }
  if (gender === 'Female') {
    return 'she';
  }
  return 'they'; //singular 'they'
}

};

module.exports = Person;
