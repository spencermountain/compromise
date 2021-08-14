const findVerbs = function (doc) {
  let match = doc.match('(#Adverb|#Auxiliary|#Verb|#Negative|#Particle)+')
  // try to ignore leading and trailing adverbs
  match = match.not('^#Adverb+')
  match = match.not('#Adverb+$')
  // handle commas:
  // don't split 'really, really'
  let keep = match.match('(#Adverb && @hasComma) #Adverb')
  // // but split the other commas
  let m = match.not(keep).splitAfter('@hasComma')

  // combine them back together
  m = m.concat(keep)
  m.sort('index')
  //handle slashes?

  //ensure there's actually a verb
  m = m.if('#Verb')

  // the reason he will is ...
  if (m.has('(is|was)$')) {
    m = m.splitBefore('(is|was)$')
  }

  //ensure it's not two verbs
  if (m.has('#PresentTense #Adverb #PresentTense')) {
    m = m.splitBefore('#Adverb #PresentTense')
  }
  return m
}
export default findVerbs
