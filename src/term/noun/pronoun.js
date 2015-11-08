'use strict';
const is_person = require('./person/is_person.js');
const is_plural = require('./is_plural.js');
const gender = require('./person/gender.js');

const pronoun = function(str) {
  if (is_person(str)) {
    let g = gender(str);
    if (g === 'Male') {
      return 'he';
    } else if (g === 'Female') {
      return 'she';
    }
    return 'they'; //singular they
  }
  //non-person, like 'microwaves'
  if (is_plural(str)) {
    return 'they';
  }
  return 'it';
};

module.exports = pronoun;

// console.log(pronoun('Illi Danza'));
