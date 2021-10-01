const findNouns = function (doc) {
  let m = doc.match('<Noun>')

  let commas = m.match('@hasComma')
  // allow toronto, ontario
  commas = commas.not('#Place')
  if (commas.found) {
    m = m.splitAfter(commas)
  }

  // these are individual nouns
  m = m.splitOn('(he|she|we|you|they)')

  //ensure there's actually a noun
  m = m.if('#Noun')
  return m
}
export default findNouns
