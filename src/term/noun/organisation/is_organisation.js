'use strict';
const firstnames = require('../../../data/firstnames');
const abbreviations = require('../../../data/abbreviations');
const org_data = require('../../../data/organisations');

//words like 'co' and ltd
let org_suffix = abbreviations.orgs.reduce(function(h, s) {
  h[s] = true;
  return h;
}, {});
org_data.suffixes.forEach(function(s) { //a few more
  org_suffix[s] = true;
});

//named orgs like google and nestle
let org_names = org_data.organisations.reduce(function(h, s) {
  h[s] = true;
  return h;
}, {});

const is_organisation = function(str, text) {
  //some known organisations, like microsoft
  if (org_names[str]) {
    return true;
  }
  //no period acronyms
  if (str.length <= 5 && text.match(/^[A-Z][A-Z]+$/) !== null) {
    return true;
  }
  //period acronyms
  if (str.length >= 4 && text.match(/^([A-Z]\.)*$/) !== null) {
    return true;
  }
  // eg 'Smith & Co'
  if (str.match(/ (&|and|of) /)) {
    return true;
  }
  // eg pets.com
  if (str.match(/[a-z]{3}\.(com|net|org|biz)/)) { //not a perfect url regex, but a "org.com"
    return true;
  }
  let words = str.split(' ');
  let last = words[words.length - 1];
  if (org_suffix[last]) {
    return true;
  }

  return false;
};

module.exports = is_organisation;

// console.log(is_organisation('FBI'));
