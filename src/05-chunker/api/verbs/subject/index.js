const lastNoun = function (vb) {
  let before = vb.before()
  let noun = before.nouns().last()

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
