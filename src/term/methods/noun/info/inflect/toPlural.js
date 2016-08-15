'use strict';
const irregulars = require('../../paths').data.irregular_plurals.toPlural
const pluralRules = require('./data/pluralRules')

//turn 'shoe' into 'shoes'
const pluralize = function(str) {
  //irregular
  if (irregulars[str]) {
    return irregulars[str]
  }

  //inflect first word of preposition-phrase
  if (str.match(/([a-z]*) (of|in|by|for) [a-z]/)) {
    const first = (str.match(/^([a-z]*) (of|in|by|for) [a-z]/) || [])[1];
    if (first) {
      const better_first = pluralize(first); //recursive
      return better_first + str.replace(first, '');
    }
  }

  //regular rule-based inflector
  for (let i = 0; i < pluralRules.length; i++) {
    if (str.match(pluralRules[i].reg)) {
      return str.replace(pluralRules[i].reg, pluralRules[i].repl);
    }
  }
  return null;
};

// console.log(pluralize('narrative') === 'narratives')
module.exports = pluralize;
