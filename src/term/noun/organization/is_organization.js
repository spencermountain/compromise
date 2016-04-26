'use strict';
const abbreviations = require('../../../data/abbreviations');
const org_data = require('../../../data/organizations');

//some boring capitalised acronyms you see frequently
const blacklist = {
  url: true,
  http: true,
  wtf: true,
  irl: true,
  ie: true,
  eg: true,
  gps: true,
  dna: true,
  sms: true, //these should maybe be somewhere else
};

//words like 'co' and ltd
let org_suffix = abbreviations.orgs.reduce(function(h, s) {
  h[s] = true;
  return h;
}, {});
org_data.suffixes.forEach(function(s) { //a few more
  org_suffix[s] = true;
});

//named orgs like google and nestle
let org_names = org_data.organizations.reduce(function(h, s) {
  h[s] = true;
  return h;
}, {});

const is_organization = function(str, text) {
  text = text || '';
  //blacklist some boring ones
  if (blacklist[str]) {
    return false;
  }
  //some known organizations, like microsoft
  if (org_names[str]) {
    return true;
  }
  //no period acronyms
  if (text.length <= 5 && text.match(/^[A-Z][A-Z]+$/) !== null) {
    return true;
  }
  //period acronyms
  if (text.length >= 4 && text.match(/^([A-Z]\.)*$/) !== null) {
    return true;
  }
  // eg 'Smith & Co'
  if (str.match(/ & /)) {
    return true;
  }
  // Girlscouts of Canada
  if (str.match(/..s of /)) {
    return true;
  }
  // eg pets.com
  if (str.match(/[a-z]{3}\.(com|net|org|biz)/)) { //not a perfect url regex, but a "org.com"
    return true;
  }
  // "foobar inc."
  let words = str.split(' ');
  if (words.length > 1) {
    let last = words[words.length - 1];
    if (org_suffix[last]) {
      return true;
    }
  }

  return false;
};

module.exports = is_organization;

// console.log(is_organization('Captain of Jamaica'));
