'use strict';
const firstnames = require('../../../data/firstnames');
const honourifics = require('../../../data/honourifics').reduce(function(h, s) {
  h[s] = true;
  return h;
}, {});

const parse_name = function(str) {

  let words = str.split(' ');
  let o = {
    honourific: null,
    firstName: null,
    middleName: null,
    lastName: null,
  };

  //first-word honourific
  if (honourifics[words[0]]) {
    o.honourific = words[0];
    words = words.slice(1, words.length);
  }
  //last-word honourific
  if (honourifics[words[words.length - 1]]) {
    o.honourific = words[words.length - 1];
    words = words.slice(0, words.length - 1);
  }
  //see if the first word is now a known first-name
  if (firstnames[words[0]]) {
    o.firstName = words[0];
    words = words.slice(1, words.length);
  } else {
    //ambiguous one-word name
    if (words.length === 1) {
      return o;
    }
    //looks like an unknown first-name
    o.firstName = words[0];
    words = words.slice(1, words.length);
  }
  //assume the remaining is '[middle..] [last]'
  if (words[words.length - 1]) {
    o.lastName = words[words.length - 1];
    words = words.slice(0, words.length - 1);
  }
  o.middleName = words.join(' ');
  return o;
};

module.exports = parse_name;

// console.log(parse_name('john smith'));
