const { Unit } = require('./units')

const parseExplicit = function(doc) {
  let str = doc.text('reduced')
  let d = new Unit(str)
  // did we find a date?
  if (d.d.isValid() === false) {
    return null
  }
  return d
}
module.exports = parseExplicit
