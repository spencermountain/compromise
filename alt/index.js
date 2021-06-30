import View from './View/index.js'
import tokenize from './tokenize/index.js'
import preTagger from './pre-tagger/index.js'
import contractions from './contractions/index.js'
import postTagger from './post-tagger/index.js'
import world from './world.js'

const nlp = function (document, lex) {
  if (lex) {
    Object.assign(world.model.lexicon, lex)
  }
  // vroom!)
  world.parsers.forEach(fn => {
    document = fn(document, world)
  })
  return new View(document)
}
/** parse text, without any further analysis */
nlp.tokenize = function (str) {
  let document = tokenize(str)
  document = contractions(document)
  return new View(document)
}
/** pre-parse any match statements */
nlp.parseMatch = function (str) {
  return world.methods.parseMatch(str)
}
/** extend compromise functionality */
nlp.plugin = function (fn) {
  fn(world, View)
  return this
}
nlp.extend = nlp.plugin
/** reach-into compromise internal */
nlp.methods = function () {
  return world.methods
}
/** peek-into compromise data */
nlp.model = function () {
  return world.model
}
// apply our only default plugin
nlp.plugin(tokenize)
nlp.plugin(preTagger)
nlp.plugin(contractions)
nlp.plugin(postTagger)
export default nlp
