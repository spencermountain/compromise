'use strict';
const firstnames = require('../../data/firstnames');
let honourifics = require('../../data/honourifics');

honourifics = honourifics.reduce(function(h, s) {
  h[s] = true;
  return h;
}, {});

const is_person = function(str) {
  let words = str.split(' ');
  let first = words[0];
  if (honourifics[first] || firstnames[first]) {
    return true;
  }
  return false;
};

module.exports = is_person;
