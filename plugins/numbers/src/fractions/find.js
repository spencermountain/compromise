const findFractions = function (doc, n) {
  // five eighths
  let m = doc.match('#Fraction+')
  // remove 'two and five eights'
  m = m.filter((r) => {
    return !r.lookBehind('#Value and$').found
  })
  if (typeof n === 'number') {
    m = m.eq(n)
  }
  return m
}
module.exports = findFractions
