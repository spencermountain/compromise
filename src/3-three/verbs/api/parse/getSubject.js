const shouldSkip = function (last) {
  let obj = last.parse()[0] || {}
  return obj.isSubordinate
}
//
const lastNoun = function (vb) {
  let before = vb.before()
  let nouns = before.nouns()

  let last = nouns.last()
  // these are dead-ringers
  let pronoun = last.match('(he|she|we|you|they)')
  if (pronoun.found) {
    return pronoun
  }
  // should we skip a subbordinate clause or two?
  last = nouns.last()
  if (shouldSkip(last)) {
    // console.log(vb.text())
    nouns.remove(last)
    last = nouns.last()
  }
  // i suppose we can skip two?
  if (shouldSkip(last)) {
    nouns.remove(last)
    last = nouns.last()
  }
  return last
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
