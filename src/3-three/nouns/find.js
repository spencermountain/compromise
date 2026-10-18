import split from './_lib.js'

const findNouns = function (doc) {
  let m = doc.clauses().match('<Noun>')
  let commas = m.match('@hasComma')
  // allow toronto, ontario
  commas = commas.not('#Place')
  if (commas.found) {
    m = m.splitAfter(commas)
  }
  // yo there
  m = split(m, 'splitOn', '#Expression')
  // these are individual nouns
  m = split(m, 'splitOn', '(he|she|we|you|they|i)')
  // a client i saw
  m = split(m, 'splitOn', '(#Noun|#Adjective) [(he|him|she|it)]', 0)
  // give him the best
  m = split(m, 'splitOn', '[(he|him|she|it)] (#Determiner|#Value)', 0)
  // the noise the slide makes
  m = split(m, 'splitBefore', '#Noun [(the|a|an)] #Adjective? #Noun', 0)
  // here spencer slept
  m = split(m, 'splitOn', '[(here|there)] #Noun', 0)
  // put it there
  m = split(m, 'splitOn', '[#Noun] (here|there)', 0)
  // its great purposes
  // give [parents] [our money]
  m = split(m, 'splitBefore', '(our|my|their|your)')
  // tell my friend that he
  m = split(m, 'splitOn', '#Noun [#Determiner]', 0)
  // his excuses
  // m = m.splitAfter('(his|hers|yours|ours|theirs)')
  // m = m.not('^#Determiner')
  //ensure there's actually a noun
  m = m.if('#Noun')
  return m
}
export default findNouns
