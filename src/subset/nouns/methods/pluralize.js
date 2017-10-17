'use strict';
// const irregulars = require('../../../lexicon/uncompressed/irregularPlurals').toPlural;
const pluralRules = require('./data/pluralRules');

//turn 'shoe' into 'shoes'
const pluralize = function(str, world) {
  const irregulars = world.plurals || {};
  //irregular
  if (irregulars.hasOwnProperty(str) === true) {
    return irregulars[str];
  }
  //regular rule-based inflector
  for (let i = 0; i < pluralRules.length; i++) {
    if (pluralRules[i].reg.test(str) === true) {
      return str.replace(pluralRules[i].reg, pluralRules[i].repl);
    }
  }
  return null;
};

module.exports = pluralize;
