const matchAll = require('./01-matchAll')

/** return anything that doesn't match.
 * returns a simple array of arrays
 */
const notMatch = function (p, regs) {
  let found = {}
  let arr = matchAll(p, regs)
  arr.forEach(({ match: ts }) => {
    ts.forEach(t => {
      found[t.id] = true
    })
  })
  //return anything not found
  let terms = p.terms()
  let result = []
  let current = []
  terms.forEach(t => {
    if (found[t.id] === true) {
      if (current.length > 0) {
        result.push(current)
        current = []
      }
      return
    }
    current.push(t)
  })
  if (current.length > 0) {
    result.push(current)
  }
  return result
}
module.exports = notMatch
