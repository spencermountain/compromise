const findFractions = function (doc) {
  // five eighths
  let m = doc.match('#Frac+')
  // Adjacent slash fractions are independent values.
  m = m.splitOn('/\\//')
  // remove 'two and five eights'
  m = m.filter(r => {
    return !r.lookBehind('#Val and$').notIf('(#Frac|#Pct)').found
  })
  // thirty seconds
  m = m.notIf('#Val seconds')
  return m
}
export default findFractions
