const findMoney = function (doc, n) {
  // five dollars
  let res = doc.match('#Value+? #Money+ #Currency+ (and #Money+ #Currency+)+?')
  // $5.05
  doc.match('#Money').forEach((m) => {
    // don't duplicate it
    if (!m.lookAfter('#Currency').found) {
      res = res.concat(m)
    }
  })
  //grab (n)th result
  if (typeof n === 'number') {
    res = res.get(n)
  }
  return res
}
module.exports = findMoney
