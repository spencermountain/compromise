'use strict';
const firstnames = require('../../../data/firstnames');
let honourifics = require('../../../data/honourifics').reduce(function(h, s) {
  h[s] = true;
  return h;
}, {});

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
  return false;
};

module.exports = is_person;

// console.log(is_person('Illi Danza'));
