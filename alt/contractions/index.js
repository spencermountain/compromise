const _model = require('./model')
const _methods = require('./methods')

const splitContractions = function (view) {
  let { document, methods, model } = view
  if (methods.mappedContractions) {
    methods.mappedContractions(document, model)
  }
}

const plugin = function (methods, model, process) {
  methods = Object.assign(methods, _methods)
  model = Object.assign(model, _model)
  process.push(splitContractions)
}
module.exports = plugin
