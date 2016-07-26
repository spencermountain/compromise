'use strict'
//the ordering of the requires-matters
const Term = require('./term')
const Noun = require('./noun')
const Verb = require('./verb')
const Value = require('./value')
// const Adjective = require('./adjective')

module.exports = {
  Term: Term,
  Noun: Noun,
  Verb: Verb,
  Value: Value,
// Adjective: Adjective
}
