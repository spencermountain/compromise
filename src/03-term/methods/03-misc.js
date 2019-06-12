const doesMatch = require('./_match')
const out = require('./04-out')
const isAcronym = require('../normalize/isAcronym')

const boring = {
  TitleCase: true,
  UpperCase: true,
  CamelCase: true,
  Hyphenated: true,
  StartBracket: true,
  EndBracket: true,
  Comma: true,
  ClauseEnd: true,
}

/** check a match object against this term */
exports.doesMatch = function(reg) {
  return doesMatch(this, reg)
}

/** return term meta-data in a given format */
exports.out = function(reg) {
  return out(this, reg)
}

/** does this term look like an acryonym? */
exports.isAcronym = function() {
  return isAcronym(this.text)
}

/** does the term have one meaningful tag? */
exports.isKnown = function() {
  let tags = Object.keys(this.tags)
  tags = tags.filter(t => !boring[t])
  return tags.length > 0
}
