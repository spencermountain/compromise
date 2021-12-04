const underOver = /^(under|over)-?.{3}/

// tag any words in our lexicon
const checkLexicon = function (terms, i, world) {
  const { model, methods } = world
  const fastTag = methods.one.fastTag
  const lexicon = model.one.lexicon
  // basic lexicon lookup
  let t = terms[i]
  let word = t.machine || t.normal
  // normal lexicon lookup
  if (lexicon[word] !== undefined && lexicon.hasOwnProperty(word)) {
    let tag = lexicon[word]
    fastTag(t, tag, '1-lexicon')
    return true
  }
  // lookup aliases in the lexicon
  if (t.alias) {
    let found = t.alias.find(str => lexicon.hasOwnProperty(str))
    if (found) {
      let tag = lexicon[found]
      fastTag(t, tag, '1-lexicon-alias')
      return true
    }
  }
  // try removing a word-stem
  if (underOver.test(word) === true) {
    let stem = word.replace(/^(under|over)-?/, '')
    if (lexicon.hasOwnProperty(stem)) {
      let tag = lexicon[stem]
      fastTag(t, tag, '1-lexicon-prefix')
      return true
    }
  }
  return null
}
export default checkLexicon
