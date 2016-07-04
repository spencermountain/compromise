'use strict';
const firstnames = require('../../../data/firstnames').all;
let honourifics = require('../../../data/honourifics').reduce(function(h, s) {
  h[s] = true;
  return h;
}, {});

//these pronouns are people
let whitelist = {
  'he': true,
  'she': true,
  'i': true,
  'you': true,
};
const is_person = function(str) {
  if (whitelist[str] || firstnames[str]) {
    return true;
  }
  let words = str.split(' ');
  if (words.length > 1) {
    let first = words[0];
    if (honourifics[first] || firstnames[first]) {
      return true;
    }
  }
  //check middle initial - "phil k dick"
  if (words.length > 2) {
    if (words[0].length > 1 && words[2].length > 1) {
      if (words[1].match(/^[a-z]\.?$/)) {
        return true;
      }
    }
  }
  return false;
};

module.exports = is_person;

// console.log(is_person('Illi Danza'));
