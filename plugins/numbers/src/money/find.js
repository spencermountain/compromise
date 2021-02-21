const findMoney = function (doc, n) {
  let m = doc.splitOn('(#Money|#Currency)+')
  m = m.if('#Money').if('#Value')
  return m
}
module.exports = findMoney
