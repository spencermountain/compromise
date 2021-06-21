const _model = require('./model')
const _methods = require('./methods')

const postTagger = function (document, methods, model) {
  methods.postTagger(document, model)
  return document
}

const plugin = function (methods, model, parsers, View) {
  methods = Object.assign(methods, _methods)
  model = Object.assign(model, _model)
  parsers.push(postTagger)
}
module.exports = plugin
