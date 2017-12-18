'use strict';
//turn any verb into its infinitive form
const rules = require('./rules');
const predict = require('../predict');

const toInfinitive = function(t, world) {
  const irregulars = world.cache.toInfinitive || {}; //verb_mapping(world.conjugations); //TODO: do this at world cache
  if (t.tags.Infinitive) {
    return t.normal;
  }
  //check the irregular verb conjugations
  if (irregulars.hasOwnProperty(t.normal) === true) {
    return irregulars[t.normal];
  }
  //check the suffix rules
  let form = predict(t);
  if (rules[form]) {
    for (let i = 0; i < rules[form].length; i++) {
      let rule = rules[form][i];
      if (t.normal.match(rule.reg)) {
        return t.normal.replace(rule.reg, rule.to);
      }
    }
  }
  return t.normal;
};

module.exports = toInfinitive;
