const _model = require('./model')
const _methods = require('./methods/')

const simpleContractions = function (view) {
  let { document, methods, model } = view
  methods.contractions(document, model, methods)
}

const plugin = function (methods, model, process) {
  methods = Object.assign(methods, _methods)
  model = Object.assign(model, _model)
  process.push(simpleContractions)
}
module.exports = plugin
