/** insert new words/phrases into the lexicon */
const addWords = function (words, isFrozen = false) {
  const world = this.world()
  const { methods, model } = world
  if (!words) {
    return
  }
  // normalize tag vals
  Object.entries(words).forEach(([k, v]) => {
    if (typeof v === 'string' && v.startsWith('#')) {
      words[k] = v.replace(/^#/, '')
    }
  })
  // these words go into a seperate lexicon
  if (isFrozen === true) {
    const { lex, _multi } = methods.one.expandLexicon(words, world)
    Object.assign(model.one._multiCache, _multi)
    Object.assign(model.one.frozenLex, lex)
    return
  }
  // add some words to our lexicon
  if (methods.two.expandLexicon) {
    // do fancy ./two version
    const { lex, _multi } = methods.two.expandLexicon(words, world)
    Object.assign(model.one.lexicon, lex)
    Object.assign(model.one._multiCache, _multi)
  }
  // do basic ./one version
  const { lex, _multi } = methods.one.expandLexicon(words, world)
  Object.assign(model.one.lexicon, lex)
  Object.assign(model.one._multiCache, _multi)
}

export default { addWords }
