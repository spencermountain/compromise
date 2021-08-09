import _methods from './methods/index.js'
import _model from './model/index.js'
import View from '../View.js'
import addMethods from './api/index.js'

// turn a string input into a 'document' json format
const tokenize = function (document, world) {
  const { methods, model } = world
  const { splitSentences, splitTerms, splitWhitespace } = methods.one
  if (typeof document === 'string') {
    // split into sentences
    let sentences = splitSentences(document, model)
    // split into word objects
    document = sentences.map(txt => {
      let terms = splitTerms(txt)
      // split into [pre-text-post]
      return terms.map(splitWhitespace)
    })
    // add normalized term format
    methods.compute.normal(document)
    // support slashes, apostrophes, etc
    methods.compute.alias(document, model)
  }
  return document
}

const plugin = function (world) {
  let { methods, model, parsers } = world
  Object.assign({}, methods, _methods)
  Object.assign(model, _model)
  methods.one.tokenize = tokenize
  parsers.push('normal')
  parsers.push('alias')
  // extend View class
  addMethods(View)
}
export default plugin
