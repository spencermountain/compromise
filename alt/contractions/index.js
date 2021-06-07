const _model = require('./model')
const _methods = require('./methods')

const simpleContractions = function (view) {
  let { document, methods, model } = view
  if (methods.simpleContractions) {
    methods.simpleContractions(document, model)
  }
}

const plugin = function (methods, model, process) {
  methods = Object.assign(methods, _methods)
  model = Object.assign(model, _model)
  process.push(simpleContractions)
}
module.exports = plugin
