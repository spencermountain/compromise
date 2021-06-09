// const runMatch = require('./match-runner')
const matchOne = require('././match-runner/matchOne')
const parseMatch = require('./match-syntax')

const _parseMatch = function (regs) {
  if (typeof regs === 'string') {
    return parseMatch(regs)
  }
  return regs
}

/** return an array of matching phrases */
exports.match = function (regs) {
  regs = _parseMatch(regs)
  let pointers = matchOne(this, regs)
  console.log(pointers)
  return this.update(pointers)
}

/** return boolean if one match is found */
exports.has = function (regs) {
  let matches = matchOne(this, regs)
  return matches.length > 0
}
