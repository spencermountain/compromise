const find = function (doc) {
  let m = doc.match('#Place+')
  m = m.splitBefore('(#City && @hasComma) [#City]', 0)
  // don't split 'paris, france'
  // let keep = this.match('(#City && @hasComma) (#Region|#Country)')
  // but split the other commas
  // let m = this.not(keep).splitAfter('@hasComma')
  return m
}
export default find
