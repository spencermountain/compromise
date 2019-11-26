const { Unit } = require('./units')

// parse things like 'june 5th 2019'
const parseExplicit = function(doc) {
  if (doc.has('#Number of #Month')) {
  }

  let str = doc.text('reduced')
  // spacetime does the heavy-lifting
  let d = new Unit(str)
  // did we find a date?
  if (d.d.isValid() === false) {
    return null
  }
  return d
}
module.exports = parseExplicit
