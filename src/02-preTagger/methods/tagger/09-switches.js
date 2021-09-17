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
  // very rough sort, so 'Noun' is after ProperNoun, etc
  tags = tags.sort((a, b) => (a.length > b.length ? -1 : 1))
  for (let i = 0; i < tags.length; i += 1) {
    if (byTag[tags[i]]) {
      // console.log(tags[i], '->', byTag[tags[i]])
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
        // i guess we should still tag it
        tag = tag || fallback
        if (tag) {
          // term.tags.clear()
          setTag(term, tag, `[switch] ${k}`)
          if (model.two.tagSet[tag]) {
            let parents = model.two.tagSet[tag].parents
            setTag(term, parents, `switch-infer from ${tag}`)
          }
          return
        }
      }
    })
  })
}
export default swtichLexicon
