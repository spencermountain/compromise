'use strict';
const irregulars = require('../../paths').data.irregular_plurals;
const rules = require('./rules')

//first, try to guess based on existing tags
const couldEvenBePlural = (t) => {
  if (t.tag.Person || t.tag.Value || t.tag.Organization || t.tag.Date) {
    return false
  }
  return true
}

const is_plural = function(t) {
  let str = t.normal
  //inspect the existing tags to see if a plural is valid
  if (!couldEvenBePlural(t)) {
    return false
  }
  //handle 'mayors of chicago'
  const preposition = str.match(/([a-z]*) (of|in|by|for) [a-z]/);
  if (preposition && preposition[1]) {
    str = preposition[1];
  }
  // if it's a known irregular case
  if (irregulars.toSingle[str]) {
    return true;
  }
  if (irregulars.toPlural[str]) {
    return false;
  }
  //check the suffix-type rules for indications
  for (let i = 0; i < rules.plural_indicators.length; i++) {
    if (str.match(rules.plural_indicators[i])) {
      return true;
    }
  }
  for (let i = 0; i < rules.singular_indicators.length; i++) {
    if (str.match(rules.singular_indicators[i])) {
      return false;
    }
  }
  // a fallback 'looks pretty plural' rule..
  if (str.match(/s$/) && !str.match(/ss$/) && str.length > 3) { //needs some lovin'
    return true;
  }
  return false;
};

// console.log(is_plural('octopus') === false)
// console.log(is_plural('octopi') === true)
// console.log(is_plural('eyebrow') === false)
// console.log(is_plural('eyebrows') === true)
// console.log(is_plural('child') === false)
// console.log(is_plural('children') === true)

module.exports = is_plural;
