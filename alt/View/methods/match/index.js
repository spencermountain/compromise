const runMatch = require('./match-runner')

/** return an array of matching phrases */
exports.match = function (regs, justOne = false) {
  let matches = runMatch(this, regs, justOne)
  //make them phrase objects
  matches = matches.map(({ match, groups }) => {
    let p = this.buildFrom(match[0].id, match.length, groups)
    p.cache.terms = match
    return p
  })
  return matches
}

/** return boolean if one match is found */
exports.has = function (regs) {
  let matches = runMatch(this, regs, true)
  return matches.length > 0
}
