import preTagger from './pre-tagger/plugin.js'
import contractions from './contractions/plugin.js'
import postTagger from './post-tagger/index.js'
import View from '../View.js'

const plugin = world => {
  const { methods, model } = world
  // --- pre-tagger plugin ---
  Object.assign(methods, preTagger.methods)
  Object.assign(model.lexicon, preTagger.model.lexicon) // don't overwrite the existing lexion
  delete preTagger.model.lexicon
  Object.assign(model, preTagger.model)
  methods.compute.preTagger = preTagger.methods.tag.preTagger

  // --- contractions plugin ---
  Object.assign(View.prototype, contractions.api)
  Object.assign(model, contractions.model)
  Object.assign(methods, contractions.methods)
  methods.compute.contractions = contractions.methods.contractions.expand

  // set them computations to run on-load
  world.parsers.push('preTagger')
  world.parsers.push('contractions')
}
export default plugin
