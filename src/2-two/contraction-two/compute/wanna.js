// 'i wanna pickle' is [want, pickle], not [want, to, pickle]
const hasObject = term => term && ['Determiner', 'Pronoun', 'Possessive'].some(tag => term.tags.has(tag))

const wannaNoun = function (terms, i) {
  if (terms[i].normal !== 'wanna') {
    return false
  }
  const to = terms[i + 1]
  const next = terms[i + 2]
  if (!to || to.implicit !== 'to' || !next) {
    return false
  }
  if (next.tags.has('Verb') || next.tags.has('Adverb')) {
    return false
  }
  // 'wanna pickle the beets' is still a verb, before its object
  if (hasObject(terms[i + 3])) {
    return false
  }
  terms[i].post = to.post
  terms.splice(i + 1, 1)
  return true
}
export default wannaNoun
