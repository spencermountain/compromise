const _methods = require('./methods')
const _model = { abbreviations: require('./model/abbreviations') }

// turn a string input into a 'document' json format
const tokenize = function (document, methods, model) {
  if (typeof document === 'string') {
    // split into sentences
    let sentences = methods.splitSentences(document, model)
    // split into word objects
    document = sentences.map(txt => {
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
  return document
}

const plugin = function (methods, model, parsers) {
  methods = Object.assign(methods, _methods)
  model = Object.assign(model, _model)
  parsers.push(tokenize)
}
module.exports = plugin
