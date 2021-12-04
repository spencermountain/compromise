/** insert new words/phrases into the lexicon */
const addWords = function (words) {
  const world = this.world()
  const { methods, model } = world
  if (!words) {
    return
  }
  // add some words to our lexicon
  if (!methods.two.expandLexicon) {
    Object.assign(model.two.lexicon, words) //no fancy-business
  } else {
    // expand it, if appropriate
    let { lex, _multi } = methods.two.expandLexicon(words, world)
    Object.assign(model.two.lexicon, lex)
    Object.assign(model.two._multiCache, _multi)
  }
}

export default {
  addWords
}