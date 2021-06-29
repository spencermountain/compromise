const _methods = require('./methods/')
const _model = { contractions: require('./model/contractions') }

const simpleContractions = function (document, world) {
  const { methods, model } = world
  methods.contractions.splitContractions(document, model, methods)
  return document
}

const plugin = function (world) {
  const { methods, model, parsers } = world
  methods.contractions = _methods
  Object.assign(model, _model)
  parsers.push(simpleContractions)
}
module.exports = plugin
