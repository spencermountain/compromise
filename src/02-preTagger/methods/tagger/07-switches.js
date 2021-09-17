import setTag from './_setTag.js'

const lookAt = function (term, byTag, byWord) {
  if (!term) {
    return null
  }
  // look at word
  if (byWord.hasOwnProperty(term.normal)) {
    return byWord[term.normal]
  }
  // look at tags
  let tags = Array.from(term.tags)
  for (let i = 0; i < tags.length; i += 1) {
    if (byTag[tags[i]]) {
      return byTag[tags[i]]
    }
  }
  return null
}

const swtichLexicon = function (terms, model) {
  const { switchers } = model.two
  Object.keys(switchers).forEach(k => {
    const { words, before, after, beforeWords, afterWords, fallback } = switchers[k]
    terms.forEach((term, i) => {
      if (words.hasOwnProperty(term.normal)) {
        // look -> right first
        let tag = lookAt(terms[i + 1], after, afterWords)
        // look <- left second
        tag = tag || lookAt(terms[i - 1], before, beforeWords)
        if (tag) {
          term.tags.clear()
          setTag(term, tag, `[switch] ${k}`)
          return
        }
        // found nothing, use the built-in fallback
        if (term.tags.size === 0) {
          setTag(term, fallback, `[switch-fallback] ${k}`)
        }
      }
    })
  })
}
export default swtichLexicon
