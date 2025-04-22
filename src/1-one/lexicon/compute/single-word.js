const prefix = /^(under|over|mis|re|un|dis|semi|pre|post)-?/
// anti|non|extra|inter|intra|over
const allowPrefix = new Set(['Verb', 'Infinitive', 'PastTense', 'Gerund', 'PresentTense', 'Adjective', 'Participle'])

// tag any words in our lexicon
const checkLexicon = function (terms, i, world) {
  const { model, methods } = world
  // const fastTag = methods.one.fastTag
  const setTag = methods.one.setTag
  const { lexicon } = model.one

  // basic lexicon lookup
  const t = terms[i]
  const word = t.machine || t.normal
  // normal lexicon lookup
  if (lexicon[word] !== undefined && lexicon.hasOwnProperty(word)) {
    setTag([t], lexicon[word], world, false, '1-lexicon')
    return true
  }
  // lookup aliases in the lexicon
  if (t.alias) {
    const found = t.alias.find(str => lexicon.hasOwnProperty(str))
    if (found) {
      setTag([t], lexicon[found], world, false, '1-lexicon-alias')
      return true
    }
  }
  // prefixing for verbs/adjectives
  if (prefix.test(word) === true) {
    const stem = word.replace(prefix, '')
    if (lexicon.hasOwnProperty(stem) && stem.length > 3) {
      // only allow prefixes for verbs/adjectives
      if (allowPrefix.has(lexicon[stem])) {
        // console.log('->', word, stem, lexicon[stem])
        setTag([t], lexicon[stem], world, false, '1-lexicon-prefix')
        return true
      }
    }
  }
  return null
}
export default checkLexicon
