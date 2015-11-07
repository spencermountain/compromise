'use strict';
const firstnames = require('../../../data/firstnames');
let honourifics = require('../../../data/honourifics');

honourifics = honourifics.reduce(function(h, s) {
  h[s] = true;
  return h;
}, {});

const is_person = function(str) {
  if (str === 'he' || str === 'she' || firstnames[str]) {
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
