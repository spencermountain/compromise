const findPercentages = function (doc, n) {
  // 5%
  let m = doc.match('#Percent+')
  // five percent
  m = m.concat(doc.match('[#Cardinal] percent', 0))
  if (typeof n === 'number') {
    m = m.eq(n)
  }
  return m
}
module.exports = findPercentages
