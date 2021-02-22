const findMoney = function (doc, n) {
  // five dollars
  let res = doc.match('#Value+? #Money+ #Currency+ (and #Money+ #Currency+)+?')
  // let res = doc.match('#Value+? #Money+ #Currency+ (and #Money #Money? #Currency+)+?')
  // res.debug()
  // $5.05
  doc.match('#Money').forEach((m) => {
    // don't duplicate it
    if (!m.lookAfter('#Currency').found) {
      res = res.concat(m)
    }
  })
  // five percent
  // m = m.concat(doc.match('#Money ', 0))
  // m = m.unique()
  // m.debug()

  // doc.debug()
  // let m = doc.splitOn('(#Money|#Currency)+')
  // m = m.if('#Money').if('#Value')
  //grab (n)th result
  if (typeof n === 'number') {
    res = res.get(n)
  }
  return res
}
module.exports = findMoney
