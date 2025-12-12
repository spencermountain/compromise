const find = function (doc) {
  let m = doc.splitAfter('@hasComma')
  m = m.match('#Honorific+? #Person+')
  // Spencer's King
  const poss = m.match('#Possessive').notIf('(his|her)') //her majesty ...
  m = m.splitAfter(poss)
  return m
}
export default find
