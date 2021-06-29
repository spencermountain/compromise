const _model = require('./model')
const _methods = require('./methods')

const postTagger = function (document, world) {
  const { methods, model } = world
  const m = methods.postTagger
  let byGroup = m.compile(model.matches, methods)
  m.matcher(document, byGroup, methods)
  return document
}

const plugin = function (world) {
  const { methods, model, parsers } = world
  methods.postTagger = _methods
  Object.assign(model, _model)
  parsers.push(postTagger)
}
module.exports = plugin
