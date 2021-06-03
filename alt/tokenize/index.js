const _model = require('./model')
const _methods = require('./methods')

const tokenize = function (view) {
  let { document, methods, model } = view
  if (typeof document === 'string') {
    // split into sentences
    let sentences = methods.tokenize.sentences(document, model)
    // split into word objects
    view.document = sentences.map(str => {
      let terms = methods.tokenize.terms(str)
      return terms.map(word => methods.tokenize.whitespace(word, methods))
    })
  }
}

const plugin = function (methods, model, process) {
  methods = Object.assign(methods, _methods)
  model = Object.assign(model, _model)
  process.push(tokenize)
}
module.exports = plugin
