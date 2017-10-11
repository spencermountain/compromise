'use strict';
// const irregulars = require('../../../lexicon/uncompressed/irregularPlurals').toPlural;
const pluralRules = require('./data/pluralRules');

//turn 'shoe' into 'shoes'
const pluralize = function(str, world) {
  const irregulars = world.plurals;
  //irregular
  if (irregulars.hasOwnProperty(str) === true) {
    return irregulars[str];
  } else if (world && world.plurals) {
    //check irregulars in world.
    if (world.plurals.hasOwnProperty(str) === true) {
      return world.plurals[str];
    }
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
