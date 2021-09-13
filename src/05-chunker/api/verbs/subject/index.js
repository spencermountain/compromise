const lastNoun = function (vb, parsed) {
  let before = vb.before()
  let nounPhrase = before.match('{Noun}').last()

  // cut-back the noun-phrase
  nounPhrase = nounPhrase.not('(#Adverb|#Preposition|#Adjective)')
  // 'his' cannot be a subject
  nounPhrase = nounPhrase.not('#Possessive')
  // the cloud's lining
  let noun = nounPhrase.last()
  let pronoun = noun.match('(he|she|we|you|they)')
  if (pronoun.found) {
    return pronoun
  }
  return noun
}

const isPlural = function (subj, vb) {
  // jack and jill
  if (subj.has('(and|or)')) {
    return true
  }
  // quarterbacks
  if (subj.has('#Plural')) {
    return true
  }
  if (subj.has('(we|they)')) {
    return true
  }
  // 'we are' vs 'he is'
  if (vb.has('(are)')) {
    return true
  }
  return false
}

const getSubject = function (vb) {
  let subj = lastNoun(vb)
  return {
    subject: subj,
    plural: isPlural(subj, vb),
  }
}
export default getSubject
