/** insert new words/phrases into the lexicon */
const addWords = function (words) {
  const world = this.world()
  const { methods, model } = world
  if (!words) {
    return
  }
  // normalize tag vals
  Object.keys(words).forEach(k => {
    if (typeof words[k] === 'string' && words[k].startsWith('#')) {
      words[k] = words[k].replace(/^#/, '')
    }
  })
  // add some words to our lexicon
  if (methods.two.expandLexicon) {
    // do fancy ./two version
    let { lex, _multi } = methods.two.expandLexicon(words, world)
    Object.assign(model.one.lexicon, lex)
    Object.assign(model.one._multiCache, _multi)
  } else if (methods.one.expandLexicon) {
    // do basic ./one version
    let { lex, _multi } = methods.one.expandLexicon(words, world)
    Object.assign(model.one.lexicon, lex)
    Object.assign(model.one._multiCache, _multi)
  } else {
    //no fancy-business
    Object.assign(model.one.lexicon, words)
  }
}

export default { addWords }