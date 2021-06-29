const _model = require('./model')
const _methods = require('./methods')

const postTagger = function (document, world) {
  const { methods, model } = world
  methods.postTagger.runner(document, model)
  return document
}

const plugin = function (world) {
  const { methods, model, parsers } = world
  methods.postTagger = _methods
  Object.assign(model, _model)
  parsers.push(postTagger)
}
module.exports = plugin
