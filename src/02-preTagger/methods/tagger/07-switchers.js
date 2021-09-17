import setTag from './_setTag.js'

const lookAt = function (term, rule) {
  if (!term) {
    return null
  }
  // look at the word
  if (rule.words.hasOwnProperty(term.normal)) {
    return rule.words[term.normal]
  }
  // look at the tag
  let found = Object.keys(rule.tags).find(tag => term.tags.has(tag))
  return found
}

const swtichLexicon = function (terms, model) {
  const { nounVerb } = model.two.switchers
  terms.forEach((term, i) => {
    // noun-verb
    if (nounVerb.words.hasOwnProperty(term.normal)) {
      let left = terms[i - 1]
      let right = terms[i + 1]
      let tag = lookAt(left, nounVerb.left) || lookAt(right, nounVerb.right)
      if (tag) {
        term.tags.clear()
        setTag(term, tag, 'look-left [nounVerb]')
        return
      }
    }
  })
}
export default swtichLexicon
