const _model = require('./model')
const _methods = require('./methods/')

const simpleContractions = function (document, methods, model) {
  methods.contractions(document, model, methods)
  return document
}

const plugin = function (methods, model, parsers) {
  methods = Object.assign(methods, _methods)
  model = Object.assign(model, _model)
  parsers.push(simpleContractions)
}
module.exports = plugin
