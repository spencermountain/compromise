const findNouns = function (doc) {
  let m = doc.match('<Noun>')
  let commas = m.match('@hasComma')
  // allow toronto, ontario
  commas = commas.not('#Place')
  if (commas.found) {
    m = m.splitAfter(commas)
  }

  // yo there
  m = m.splitOn('#Expression')
  // these are individual nouns
  m = m.splitOn('(he|she|we|you|they)')
  // a client i saw
  m = m.splitOn('#Noun [#Pronoun]', 0)
  // give him the best
  m = m.splitOn('[#Pronoun] (#Determiner|#Value)', 0)
  // the noise the slide makes
  m = m.splitBefore('#Noun [(the|a|an)] #Adjective? #Noun', 0)

  //ensure there's actually a noun
  m = m.if('#Noun')
  return m
}
export default findNouns
