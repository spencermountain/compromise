const find = function (doc) {
  let m = doc.splitAfter('@hasComma')
  m = m.match('#Hon+? #Pers+')
  // Spencer's King - but keep 'John Smith's' together
  const poss = m.match('#Poss+').notIf('(his|her)') //her majesty ...
  m = m.splitAfter(poss)
  return m
}
export default find
