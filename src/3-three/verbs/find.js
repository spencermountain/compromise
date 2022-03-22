const findVerbs = function (doc) {
  let m = doc.match('<Verb>')

  m = m.splitAfter('@hasComma')

  // the reason he will is ...
  // all i do is talk
  m = m.splitAfter('[(do|did|am|was|is|will)] (is|was)', 0)
  // m = m.splitAfter('[(do|did|am|was|is|will)] #PresentTense', 0)

  // cool

  // like being pampered
  m = m.splitBefore('(#Verb && !#Copula) [being] #Verb', 0)
  // like to be pampered
  m = m.splitBefore('#Verb [to be] #Verb', 0)

  // implicit conjugation - 'help fix'

  m = m.splitAfter('[help] #PresentTense', 0)
  // what i can sell is..
  m = m.splitBefore('(#PresentTense|#PastTense) [#Copula]$', 0)
  // what i can sell will be
  m = m.splitBefore('(#PresentTense|#PastTense) [will be]$', 0)

  // professes love
  let toVerbs = m.match('(#PresentTense|#PastTense) #Infinitive')
  if (toVerbs.found && !toVerbs.has('^go')) {
    m = m.splitBefore('(#PresentTense|#PastTense) [#Infinitive]', 0)
  }
  // 'allow yourself'
  m = m.not('#Reflexive$')
  //ensure there's actually a verb
  m = m.if('#Verb')
  // the reason he will is ...
  // ensure it's not two verbs
  return m
}
export default findVerbs
