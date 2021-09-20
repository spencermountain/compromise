import fastTag from '../_fastTag.js'

const lookAtWord = function (term, byWord) {
  if (!term) {
    return null
  }
  // look at word
  if (byWord.hasOwnProperty(term.normal)) {
    // console.log(term.normal, '->', byWord[term.normal])
    return byWord[term.normal]
  }
  return null
}

const lookAtTag = function (term, byTag) {
  if (!term) {
    return null
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

const swtichLexicon = function (terms, i, model) {
  let term = terms[i]
  const { switchers } = model.two
  Object.keys(switchers).forEach(k => {
    const { words, before, after, beforeWords, afterWords } = switchers[k]
    // do we already have a good tag?
    if (term.tags.has('ProperNoun') || term.tags.has('Acronym')) {
      return
    }
    if (words.hasOwnProperty(term.normal)) {
      // look -> right word first
      let tag = lookAtWord(terms[i + 1], afterWords)
      // look <- left word, second
      tag = tag || lookAtWord(terms[i - 1], beforeWords)
      // look -> right tag next
      tag = tag || lookAtTag(terms[i + 1], after)
      // look <- left tag next
      tag = tag || lookAtTag(terms[i - 1], before)
      if (tag) {
        term.tags.clear()
        fastTag(term, tag, `3-[switch] ${k}`)
        if (model.two.tagSet[tag]) {
          let parents = model.two.tagSet[tag].parents
          fastTag(term, parents, `3-switch-infer from ${tag}`)
        }
        return
      }
    }
  })
}
export default swtichLexicon
