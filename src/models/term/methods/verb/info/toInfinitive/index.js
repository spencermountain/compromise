'use strict';
//turn any verb into its infinitive form
const rules = require('./rules')
let irregulars = require('../../paths').data.irregular_verbs

//map the irregulars for easy infinitive lookup
const verb_mapping = () => {
  return Object.keys(irregulars).reduce((h, k) => {
    Object.keys(irregulars[k]).forEach((pos) => {
      h[irregulars[k][pos]] = k
    })
    return h
  }, {})
}

irregulars = verb_mapping()

const toInfinitive = function(t) {
  if (t.tag.Infinitive) {
    return t.normal
  }
  //check the irregular verb conjugations
  if (irregulars[t.normal]) {
    return irregulars[t.normal]
  }
  //check the suffix rules
  let form = t.info('Conjugation')
  if (rules[form]) {
    for (let i = 0; i < rules[form].length; i++) {
      let rule = rules[form][i]
      if (t.normal.match(rule.reg)) {
        return t.normal.replace(rule.reg, rule.to)
      }
    }
  }
  return t.normal
}

module.exports = toInfinitive
