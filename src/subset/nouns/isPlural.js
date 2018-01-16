'use strict';
const rules = require('./methods/data/indicators');
const prep = /([a-z]*) (of|in|by|for) [a-z]/;
const hasPlural = require('./hasPlural');

const knownPlural = {
  i: false,
  he: false,
  she: false,
  we: true,
  they: true
};

//is it potentially plural?
const noPlural = ['Place', 'Value', 'Person', 'Month', 'WeekDay', 'RelativeDay', 'Holiday', 'Possessive'];
//first, try to guess based on existing tags
const couldEvenBePlural = function(t) {
  if (hasPlural(t) === false) {
    return false;
  }
  for (let i = 0; i < noPlural.length; i++) {
    if (t.tags[noPlural[i]]) {
      return false;
    }
  }
  return true;
};

/** returns true, false, or null */
const isPlural = function(t, world) {
  if (t.tags.Plural) {
    return true;
  }
  if (t.tags.Singular) {
    return false;
  }
  let str = t.normal;
  //whitelist a few easy ones
  if (knownPlural.hasOwnProperty(str) === true) {
    return knownPlural[str];
  }
  //check given irregulars
  if (world.plurals && world.plurals.hasOwnProperty(str) === true) {
    return false;
  }
  //check opposite-ones
  if (world.cache.toSingular && world.cache.toSingular.hasOwnProperty(str) === true) {
    return true;
  }
  //inspect the existing tags to see if a plural is valid
  if (couldEvenBePlural(t) === false) {
    return null;
  }
  //handle 'mayors of chicago'
  const preposition = str.match(prep);
  if (preposition !== null) {
    str = preposition[1];
  }
  //check the suffix-type rules for indications
  for (let i = 0; i < rules.plural_indicators.length; i++) {
    if (rules.plural_indicators[i].test(str) === true) {
      return true;
    }
  }
  for (let i = 0; i < rules.singular_indicators.length; i++) {
    if (rules.singular_indicators[i].test(str) === true) {
      return false;
    }
  }
  // a fallback 'looks check plural' rule..
  if (/s$/.test(str) === true && /ss$/.test(str) === false && str.length > 3) {
    //needs some lovin'
    return true;
  }
  return false;
};

module.exports = isPlural;
// console.log(is_plural('octopus'))
