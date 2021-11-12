const shouldSkip = function (last) {
  // is it our only choice?
  if (last.length <= 1) {
    return false
  }
  let obj = last.parse()[0] || {}
  return obj.isSubordinate
}

const noSubClause = function (before) {
  let parts = before.clauses()
  parts = parts.filter((m, i) => {
    // if it was raining..
    if (m.has('^(if|unless|while|but|for|per)')) {
      return false
    }
    // the fog, suddenly increasing in..
    if (i > 0 && m.has('^#Adverb')) {
      return false
    }
    return true
  })
  // don't drop the whole thing.
  if (parts.length === 0) {
    return before
  }
  return parts
}

//
const lastNoun = function (vb) {
  let before = vb.before()
  // try to drop any mid-sentence clauses
  before = noSubClause(before)
  // parse-out our preceding nouns
  let nouns = before.nouns()
  // nouns.debug()
  let last = nouns.last()
  // these are dead-ringers
  let pronoun = last.match('(he|she|we|you|they)')
  if (pronoun.found) {
    return pronoun
  }
  // should we skip a subbordinate clause or two?
  last = nouns.last()
  if (shouldSkip(last)) {
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
