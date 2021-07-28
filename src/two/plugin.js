import preTagger from './pre-tagger/plugin.js'
import contractions from './contractions/plugin.js'
import postTagger from './post-tagger/plugin.js'
import View from '../View.js'

const plugin = world => {
  const { methods, model } = world
  // --- pre-tagger plugin ---
  Object.assign(methods, preTagger.methods)
  Object.assign(model.lexicon, preTagger.model.lexicon) // don't overwrite the existing lexion
  delete preTagger.model.lexicon
  Object.assign(model, preTagger.model)
  methods.compute.preTagger = preTagger.methods.tag.preTagger
  methods.tag.expandLexicon(model, methods) //expand our lexicon

  // --- contractions plugin ---
  contractions.api(View)
  Object.assign(model, contractions.model)
  Object.assign(methods, contractions.methods)
  methods.compute.contractions = contractions.methods.contractions.expand

  // --- post-tagger plugin ---
  Object.assign(methods.tag, postTagger.methods)
  Object.assign(model, postTagger.model)
  methods.compute.postTagger = postTagger.methods.postTagger

  // set them computations to run on-load
  world.parsers.push('preTagger')
  world.parsers.push('contractions')
  world.parsers.push('postTagger')
}
export default plugin
