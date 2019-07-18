const regex = require('./regexes')

//try each of the ^regexes in our list
const checkRegex = function(term, world) {
  let str = term.text

  // do them all!
  for (let r = 0; r < regex.length; r += 1) {
    if (regex[r][0].test(str) === true) {
      term.tagSafe(regex[r][1], 'regex #' + r, world)
      break
    }
  }
  // do some more!
}
module.exports = checkRegex
