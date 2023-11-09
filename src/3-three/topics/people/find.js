const find = function (doc) {
  let m = doc.match('#Honorific+? #Person+')
  // Spencer's King
  m = m.splitAfter('#Possessive')
  return m
}
export default find
