const findVerbs = function (doc) {
  let m = doc.match('<Verb>')
  // want to see
  m = m.not('#Conj')
  // by walking
  m = m.not('#Prep')
  // Gerunds governed by a preposition are non-finite: 'by swimming'.
  let gerunds = doc.match('#Prep (#Adv|#Neg)+? [#Ger]', 0)
  // Auxiliary 'being/having' may no longer carry the Gerund tag. Protect the
  // complete non-finite chain, not just its first word.
  const passive = '(being|having) (#Adv|#Neg|#Aux)+? (#Past|#Participle|#Ger)'
  let chains = doc.match('#Prep (#Adv|#Neg)+? [' + passive + ']', 0)
  gerunds = gerunds.concat(chains)
  // Extend through coordination, but stop at a finite verb or a new subject.
  while (gerunds.found) {
    chains = gerunds.growRight('(and|or) (#Adv|#Neg)+? ' + passive)
    const next = chains.growRight('(and|or) (#Adv|#Neg)+? #Ger')
    if (next.wordCount() === gerunds.wordCount()) {
      break
    }
    gerunds = next
  }
  m = m.not(gerunds.terms())


  m = m.splitAfter('@hasComma')

  // the reason he will is ...
  // all i do is talk
  m = m.splitAfter('[(do|did|am|was|is|will)] (is|was)', 0)
  // m = m.splitAfter('[(do|did|am|was|is|will)] #PresentTense', 0)

  // cool

  // like being pampered
  m = m.splitBefore('(#Verb && !#Cop && !#Aux) [being] #Verb', 0)
  // like to be pampered
  m = m.splitBefore('(#Verb && !#Aux) [to be] #Verb', 0)

  // implicit conjugation - 'help fix'

  m = m.splitAfter('[help] #Pres', 0)
  // what i can sell is..
  m = m.splitBefore('(#Pres|#Past) [#Cop]$', 0)
  // what i can sell will be
  m = m.splitBefore('(#Pres|#Past) [will be]$', 0)
  // directing had
  m = m.splitBefore('(#Pres|#Past) [(had|has)]', 0)

  // 'allow yourself'
  m = m.not('#Refl$')
  // sitting near
  m = m.not('#Adj')

  // pastTense-pastTense
  // Everyone he [met] [told] him
  m = m.splitAfter('[#Past] #Past', 0)
  // Everyone he [met] had [told] him
  m = m.splitAfter('[#Past] #Aux+ #Past', 0)

  // fans that were blowing felt amazing
  m = m.splitAfter('#Cop [#Ger] #Past', 0)

  // managed to see
  // m = m.splitOn('#PastTense [to] #Infinitive', 0)


  //ensure there's actually a verb
  m = m.if('#Verb')
  // the reason he will is ...
  // ensure it's not two verbs
  // held annually is called
  if (m.has('(#Verb && !#Aux) #Adv+? #Cop')) {
    m = m.splitBefore('#Cop')
  }
  return m
}
export default findVerbs
