'use strict';
const singleRules = require('./data/singleRules');

//turn 'shoes' into 'shoe'
const toSingle = function(str, world) {
  //reverse it //TODO: cache in world object somewhere
  let irregulars = world.cache.toSingular || {};
  //check irregulars
  if (irregulars.hasOwnProperty(str) === true) {
    return irregulars[str];
  }
  if (world && world.plurals) {
    //given irregulars
    let keys = Object.keys(world.plurals);
    for (let i = 0; i < keys.length; i++) {
      if (world.plurals[keys[i]] === str) {
        return keys[i];
      }
    }
  }

  //inflect first word of preposition-phrase
  if (/([a-z]*) (of|in|by|for) [a-z]/.test(str) === true) {
    const first = (str.match(/^([a-z]*) (of|in|by|for) [a-z]/) || [])[1];
    if (first) {
      const better_first = toSingle(first); //recursive
      return better_first + str.replace(first, '');
    }
  }

  //regular rule-based inflector
  for (let i = 0; i < singleRules.length; i++) {
    if (singleRules[i].reg.test(str) === true) {
      return str.replace(singleRules[i].reg, singleRules[i].repl);
    }
  }
  return null;
};

module.exports = toSingle;
// console.log(toSingle('days'))
