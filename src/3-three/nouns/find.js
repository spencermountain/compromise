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
  m = split(m, 'splitOn', '#Expr')
  // these are individual nouns
  m = split(m, 'splitOn', '(he|she|we|you|they|i)')
  // a client i saw
  m = split(m, 'splitOn', '(#NN|#Adj) [(he|him|she|it)]', 0)
  // give him the best
  m = split(m, 'splitOn', '[(he|him|she|it)] (#Det|#Val)', 0)
  // the noise the slide makes
  m = split(m, 'splitBefore', '#NN [(the|a|an)] #Adj? #NN', 0)
  // here spencer slept
  m = split(m, 'splitOn', '[(here|there)] #NN', 0)
  // put it there
  m = split(m, 'splitOn', '[#NN] (here|there)', 0)
  // its great purposes
  // give [parents] [our money]
  m = split(m, 'splitBefore', '(our|my|their|your)')
  // tell my friend that he
  m = split(m, 'splitOn', '#NN [#Det]', 0)
  // his excuses
  // m = m.splitAfter('(his|hers|yours|ours|theirs)')
  // m = m.not('^#Determiner')
  //ensure there's actually a noun
  m = m.if('#NN')
  return m
}
export default findNouns
