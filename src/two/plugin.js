import preTagger from './pre-tagger/plugin.js'
import contractions from './contractions/plugin.js'
import postTagger from './post-tagger/plugin.js'
import View from '../View.js'

const plugin = world => {
  const { methods, model } = world
  model.two = model.two || {}
  methods.two = methods.two || {}

  // --- pre-tagger plugin ---
  Object.assign(methods.two, preTagger.methods) // - methods
  Object.assign(methods.compute, preTagger.compute) // - compute
  Object.assign(model, preTagger.model) // - model
  Object.assign(model.two.lexicon, preTagger.lexicon) // - lexicon

  // --- contractions plugin ---
  contractions.api(View) // - api
  Object.assign(model.two, contractions.model) // - model
  Object.assign(methods.compute, contractions.compute) // - compute

  // --- post-tagger plugin ---
  Object.assign(methods.two, postTagger.methods) // - methods
  Object.assign(methods.compute, postTagger.compute) // - compute
  Object.assign(model, postTagger.model) // - model

  // set them computations to run on-load
  world.parsers.push('preTagger')
  world.parsers.push('contractions')
  world.parsers.push('postTagger')

  //expand our lexicon
  methods.two.expandLexicon(model, methods)
}
export default plugin
