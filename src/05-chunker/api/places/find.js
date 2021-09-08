const find = function (doc) {
  let m = doc.match('#Place+')

  let commas = m.match('@hasComma')
  // don't split 'paris, france'
  commas = commas.filter(c => {
    return c.after('#Country').found
  })
  m = m.splitAfter(commas)
  // toronto, chicago
  // m = m.splitBefore('(#City && @hasComma) [#City]', 0)
  // germany, sweden
  // m = m.splitBefore('(#Country && @hasComma) [#Country]', 0)
  return m
}
export default find
