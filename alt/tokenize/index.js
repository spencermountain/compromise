const _model = require('./model')
const _methods = require('./methods')

// turn a string input into a 'document' json format
const tokenize = function (view) {
  let { document, methods, model } = view
  if (typeof document === 'string') {
    // split into sentences
    let sentences = methods.splitSentences(document, model)
    // split into word objects
    view.document = sentences.map(txt => {
      let terms = methods.splitTerms(txt)
      terms = terms.map(str => {
        // split into [pre-text-post]
        let t = methods.splitWhitespace(str)
        // add normalized term format
        if (methods.termNormalize) {
          t.normal = methods.termNormalize(t.text)
        }
        return t
      })
      return terms
    })
  }
}

const plugin = function (methods, model, process) {
  methods = Object.assign(methods, _methods)
  model = Object.assign(model, _model)
  process.push(tokenize)
}
module.exports = plugin
