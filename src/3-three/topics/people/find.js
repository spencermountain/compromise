const find = function (doc) {
  let m = doc.match('#Honorific+? #Person+')
  // Spencer's King
  let poss = m.match('#Possessive').notIf('(his|her)') //her majesty ...
  m = m.splitAfter(poss)
  return m
}
export default find
