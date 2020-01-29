const matchAll = require('./01-matchAll')
const notMatch = require('./not')

/** return an array of matching phrases */
exports.match = function(str, justOne = false) {
  let matches = matchAll(this, str, justOne)
  //make them phrase objects
  matches = matches.map(({ match, groups }) => {
    return this.buildFrom(match[0].id, match.length, groups)
  })
  return matches
}

/** return boolean if one match is found */
exports.has = function(str) {
  let matches = matchAll(this, str, true)
  return matches.length > 0
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

/** return a list of phrases that can have this tag */
exports.canBe = function(tag, world) {
  let results = []
  let terms = this.cache.terms || this.terms()
  let previous = false
  for (let i = 0; i < terms.length; i += 1) {
    let can = terms[i].canBe(tag, world)
    if (can === true) {
      if (previous === true) {
        //add it to the end
        results[results.length - 1].push(terms[i])
      } else {
        results.push([terms[i]]) //make a new one
      }
      previous = can
    }
  }
  //turn them into Phrase objects
  results = results
    .filter(a => a.length > 0)
    .map(arr => {
      return this.buildFrom(arr[0].id, arr.length)
    })
  return results
}
