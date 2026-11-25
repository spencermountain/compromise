const shouldSkip = function (last) {
  // is it our only choice?
  if (last.length <= 1) {
    return false
  }
  const obj = last.parse()[0] || {}
  return obj.isSubordinate
}

// try to chop-out any obvious conditional phrases
// he wore, [if it was raining], a raincoat.
const noSubClause = function (before) {
  let parts = before.clauses()
  parts = parts.filter((m, i) => {
    // our own clause, with its subject - 'he said [that they] knew'
    if (i === parts.length - 1 && m.has('(i|he|she|it|we|you|they)$')) {
      return true
    }
    // if it was raining..
    if (m.has('^(if|unless|while|but|for|per|at|by|that|which|who|from)')) {
      return false
    }
    // bowed to her,
    if (i > 0 && m.has('^#Verb . #NN+$')) {
      return false
    }
    // the fog, suddenly increasing in..
    if (i > 0 && m.has('^#Adv')) {
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

// a describing phrase, after the subject - 'the keys [on the table]'
const preps = '(on|in|at|near|under|beside|behind|with|from)'

//
const lastNoun = function (vb) {
  let before = vb.before()
  // 'the man [who owns dogs] laughed'
  if (!before.has('@hasComma') && before.has('#NN (who|that|which) #Adv? #Verb')) {
    const head = before.splitBefore('(who|that|which)').first().nouns()
    if (head.found) {
      return head.last()
    }
  }
  // try to drop any mid-sentence clauses
  before = noSubClause(before)
  // In a subject-first clause, a trailing prepositional modifier does not
  // replace the subject: 'the keys on the table' still agrees with 'keys'.
  if (!before.has('(#Verb|@hasComma)') && before.has('#NN ' + preps)) {
    const head = before.splitBefore(preps).first().nouns()
    if (head.found) return head
  }
  // parse-out our preceding nouns
  const nouns = before.nouns()
  // look for any dead-ringers
  let last = nouns.last()
  // i/she/he/they are very strong
  const pronoun = last.match('(i|he|she|we|you|they)')
  if (pronoun.found) {
    return pronoun.nouns()
  }
  // these are also good hints
  let det = nouns.if('^(that|this|these|those)')
  if (det.found) {
    return det
  }
  if (!nouns.found) {
    det = before.match('^(that|this|these|those)')
    if (det.found) {
      return det
    }
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
  // 'we are' vs 'he is'
  if (vb.has('(are|were)')) {
    return true
  }
  if (subj.has('(these|those|they|we)')) {
    return true
  }
  const before = vb.before()
  const phrase = ' (#Det|#Poss|#Adj)* #Noun+ #Adv*$'
  // 'each of the boys' is one, 'both of the boys' is two
  if (before.has('(each|one|either|neither) of' + phrase)) {
    return false
  }
  if (before.has('(both|many|several|few) of' + phrase)) {
    return true
  }
  // 'the dog and the cat'
  if (!before.has('#Verb') && before.has('#Noun and' + phrase)) {
    return true
  }
  // Agreement belongs to the head, not the plural object of 'of':
  // 'the box of pencils' versus 'the boxes of pencils'. Keep partitives such
  // as 'some of the dogs' on the existing noun-phrase path.
  if (subj.has('(#Sing|#Plur) of')) {
    const head = subj.splitBefore('of').first().nouns()
    if (head.found) return head.isPlural().found
  }
  if (subj.found && subj.isPlural) {
    return subj.isPlural().found
  }
  return false
}

const getSubject = function (vb) {
  const subj = lastNoun(vb)
  let plural = isPlural(subj, vb)
  // 'there will be [dogs]' - the noun to agree with comes after
  if (vb.before('(there|here)$').found && !subj.not('(there|here)').found) {
    plural = isPlural(vb.after().nouns().first(), vb)
  }
  return { subject: subj, plural }
}
export default getSubject
