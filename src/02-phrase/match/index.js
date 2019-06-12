const matchAll = require('./01-matchAll')
const notMatch = require('./not')

/** return an array of matching phrases */
exports.match = function(str) {
  let matches = matchAll(this, str)
  //make them phrase objects
  matches = matches.map(list => {
    return this.buildFrom(list[0].id, list.length)
  })
  return matches
}

/** remove all matches from the result */
exports.not = function(str) {
  let matches = notMatch(this, str)
  //make them phrase objects
  matches = matches.map(list => {
    return this.buildFrom(list[0].id, list.length)
  })
  return matches
}
